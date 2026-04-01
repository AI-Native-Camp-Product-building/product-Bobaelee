"use client";

import { useState, useRef, useCallback } from "react";
import { saveEmployees, getEmployees } from "@/lib/storage";
import type { EmployeeInfo } from "@/types";

// 매핑 가능한 필드 목록
const FIELD_OPTIONS = [
  { value: "", label: "— 무시 —" },
  { value: "name", label: "성명 *" },
  { value: "residentNumber", label: "주민등록번호 *" },
  { value: "phone", label: "전화번호" },
  { value: "monthlySalary", label: "월 소득액" },
  { value: "weeklyWorkHours", label: "1주 소정근로시간" },
];

// 헤더 → 필드 자동 감지 규칙
const AUTO_DETECT_MAP: Record<string, string> = {
  이름: "name",
  성명: "name",
  name: "name",
  성: "name",
  이름_성명: "name",
  주민등록번호: "residentNumber",
  주민번호: "residentNumber",
  resident_number: "residentNumber",
  residentnumber: "residentNumber",
  주민: "residentNumber",
  전화번호: "phone",
  전화: "phone",
  phone: "phone",
  연락처: "phone",
  휴대폰: "phone",
  핸드폰: "phone",
  월소득액: "monthlySalary",
  "월 소득액": "monthlySalary",
  보수월액: "monthlySalary",
  월급: "monthlySalary",
  급여: "monthlySalary",
  salary: "monthlySalary",
  monthlysalary: "monthlySalary",
  "1주소정근로시간": "weeklyWorkHours",
  "1주 소정근로시간": "weeklyWorkHours",
  소정근로시간: "weeklyWorkHours",
  근로시간: "weeklyWorkHours",
  workhours: "weeklyWorkHours",
  weeklyworkhours: "weeklyWorkHours",
};

// CSV 한 줄 파싱 (쉼표·탭 구분, 따옴표 처리)
function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // 이스케이프된 따옴표
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delimiter && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

// CSV 텍스트 전체 파싱
function parseCsv(text: string): string[][] {
  // BOM 제거
  const cleaned = text.replace(/^\uFEFF/, "");
  const lines = cleaned.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length === 0) return [];

  // 구분자 자동 감지 (탭 vs 쉼표)
  const delimiter = lines[0].includes("\t") ? "\t" : ",";
  return lines.map((line) => parseCsvLine(line, delimiter));
}

// 헤더 기반 자동 필드 감지
function autoDetectField(header: string): string {
  const key = header.replace(/\s/g, "").toLowerCase();
  // 공백 제거 후 소문자로 비교
  for (const [pattern, field] of Object.entries(AUTO_DETECT_MAP)) {
    if (pattern.replace(/\s/g, "").toLowerCase() === key) {
      return field;
    }
  }
  return "";
}

// 매핑된 데이터 → EmployeeInfo 변환
function mapRowToEmployee(
  row: string[],
  mapping: Record<number, string>
): Partial<EmployeeInfo> {
  const emp: Partial<EmployeeInfo> = {};

  for (const [colIdx, field] of Object.entries(mapping)) {
    if (!field) continue;
    const value = row[Number(colIdx)] ?? "";

    if (field === "name") emp.name = value;
    else if (field === "residentNumber") emp.residentNumber = value;
    else if (field === "phone") emp.phone = value;
    else if (field === "monthlySalary") {
      const num = Number(value.replace(/[,\s원]/g, ""));
      emp.monthlySalary = isNaN(num) ? 0 : num;
    } else if (field === "weeklyWorkHours") {
      const num = Number(value.replace(/[^0-9.]/g, ""));
      emp.weeklyWorkHours = isNaN(num) ? 40 : num;
    }
  }

  return emp;
}

export default function CsvUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [rows, setRows] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  // 컬럼 인덱스 → 필드 이름 매핑
  const [mapping, setMapping] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<"idle" | "preview" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 파일 처리
  const processFile = useCallback((file: File) => {
    setMessage("");
    setStatus("idle");

    // xlsx 처리 불가 안내
    if (
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls") ||
      file.type.includes("spreadsheetml")
    ) {
      setStatus("error");
      setMessage(
        "엑셀 파일(.xlsx)은 CSV로 변환 후 업로드해주세요. (파일 열기 → 다른 이름으로 저장 → CSV)"
      );
      return;
    }

    if (!file.name.endsWith(".csv") && !file.type.includes("csv") && !file.type.includes("text")) {
      setStatus("error");
      setMessage("CSV 파일(.csv)만 업로드할 수 있습니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCsv(text);
      if (parsed.length < 2) {
        setStatus("error");
        setMessage("파일에 데이터가 없습니다. 헤더 포함 2행 이상이어야 합니다.");
        return;
      }

      const headerRow = parsed[0];
      const dataRows = parsed.slice(1);

      // 자동 매핑
      const autoMapping: Record<number, string> = {};
      headerRow.forEach((h, i) => {
        autoMapping[i] = autoDetectField(h);
      });

      setHeaders(headerRow);
      setRows(dataRows);
      setMapping(autoMapping);
      setStatus("preview");
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  // 드래그 이벤트
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  // 클릭으로 파일 선택
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  // 가져오기 실행
  const handleImport = () => {
    // 필수 필드 검증
    const mappedFields = Object.values(mapping);
    if (!mappedFields.includes("name")) {
      setStatus("error");
      setMessage("성명 컬럼을 지정해주세요.");
      return;
    }
    if (!mappedFields.includes("residentNumber")) {
      setStatus("error");
      setMessage("주민등록번호 컬럼을 지정해주세요.");
      return;
    }

    const employees: EmployeeInfo[] = rows
      .map((row) => mapRowToEmployee(row, mapping))
      .filter((emp): emp is EmployeeInfo => !!(emp.name && emp.residentNumber))
      .map((emp) => ({
        name: emp.name!,
        residentNumber: emp.residentNumber!,
        phone: emp.phone,
        nationality: undefined,
        visaStatus: undefined,
        isRepresentative: false,
        monthlySalary: emp.monthlySalary ?? 0,
        weeklyWorkHours: emp.weeklyWorkHours ?? 40,
        isContract: false,
        contractEndDate: undefined,
        kecoCode: "",
      }));

    if (employees.length === 0) {
      setStatus("error");
      setMessage("가져올 수 있는 직원 정보가 없습니다. 성명과 주민등록번호를 확인해주세요.");
      return;
    }

    // 기존 직원 목록에 추가 (중복 주민번호 제외)
    const existing = getEmployees();
    const existingIds = new Set(existing.map((e) => e.residentNumber));
    const newEmployees = employees.filter((e) => !existingIds.has(e.residentNumber));
    saveEmployees([...existing, ...newEmployees]);

    setStatus("done");
    setMessage(
      `${newEmployees.length}명의 직원 정보를 가져왔습니다.${
        employees.length > newEmployees.length
          ? ` (${employees.length - newEmployees.length}명은 이미 등록된 직원으로 건너뜀)`
          : ""
      }`
    );
  };

  // 초기화
  const handleReset = () => {
    setRows([]);
    setHeaders([]);
    setMapping({});
    setStatus("idle");
    setMessage("");
    if (inputRef.current) inputRef.current.value = "";
  };

  // 미리보기 행 (최대 3개)
  const previewRows = rows.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 업로드 영역 */}
      {status === "idle" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200
            ${isDragging
              ? "border-success-400/60 bg-success-400/10"
              : "border-white/20 hover:border-white/40 hover:bg-white/5"
            }
          `}
        >
          <div className="text-4xl mb-4">📂</div>
          <p className="text-white font-medium mb-2">
            CSV 파일을 드래그하거나 클릭해서 업로드하세요
          </p>
          <p className="text-gray-500 text-sm">
            .csv 파일 지원 · 엑셀(.xlsx)은 CSV로 변환 후 업로드
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv,text/plain"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* 오류 메시지 */}
      {status === "error" && (
        <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-5 py-4">
          <p className="text-red-300 font-medium text-sm">⚠ {message}</p>
          <button
            onClick={handleReset}
            className="mt-3 text-sm text-red-400 hover:text-red-300 underline transition-colors"
          >
            다시 시도하기
          </button>
        </div>
      )}

      {/* 성공 메시지 */}
      {status === "done" && (
        <div className="rounded-xl border border-success-400/30 bg-success-400/10 px-5 py-4">
          <p className="text-success-300 font-medium text-sm">✓ {message}</p>
          <button
            onClick={handleReset}
            className="mt-3 text-sm text-success-400 hover:text-success-300 underline transition-colors"
          >
            다른 파일 업로드하기
          </button>
        </div>
      )}

      {/* 미리보기 + 컬럼 매핑 */}
      {status === "preview" && (
        <div className="space-y-6">
          {/* 미리보기 테이블 */}
          <div>
            <h2 className="text-white font-semibold mb-3">
              데이터 미리보기{" "}
              <span className="text-gray-400 text-sm font-normal">
                (전체 {rows.length}행 중 상위 3행)
              </span>
            </h2>
            <div className="glass-card rounded-2xl overflow-x-auto">
              <table className="w-full text-sm min-w-max">
                <thead>
                  <tr className="border-b border-white/10">
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        className="text-left text-gray-400 font-medium px-4 py-3 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                    >
                      {headers.map((_, ci) => (
                        <td
                          key={ci}
                          className="px-4 py-3 text-gray-300 whitespace-nowrap"
                        >
                          {row[ci] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 컬럼 매핑 */}
          <div>
            <h2 className="text-white font-semibold mb-1">컬럼 매핑</h2>
            <p className="text-gray-500 text-sm mb-4">
              각 컬럼이 어떤 항목에 해당하는지 지정해주세요. 자동 감지된 항목을 확인하세요.
            </p>
            <div className="glass-card rounded-2xl p-5 space-y-3">
              {headers.map((header, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm w-40 truncate shrink-0" title={header}>
                    {header}
                  </span>
                  <span className="text-gray-600 text-sm">→</span>
                  <select
                    value={mapping[i] ?? ""}
                    onChange={(e) =>
                      setMapping((prev) => ({ ...prev, [i]: e.target.value }))
                    }
                    className="
                      flex-1 bg-white/5 border border-white/10 rounded-lg
                      px-3 py-2 text-sm text-white
                      focus:outline-none focus:border-success-400/50 focus:ring-1 focus:ring-success-400/20
                      transition-colors
                    "
                  >
                    {FIELD_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-gray-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* 오류 메시지 (매핑 검증) */}
          {status === "preview" && message && (
            <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-5 py-3">
              <p className="text-red-300 text-sm">⚠ {message}</p>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={handleImport}
              className="
                px-6 py-2.5 rounded-xl bg-success-400 text-gray-900 font-semibold text-sm
                hover:bg-success-300 active:scale-95 transition-all duration-150
              "
            >
              가져오기 ({rows.length}명)
            </button>
            <button
              onClick={handleReset}
              className="
                px-6 py-2.5 rounded-xl border border-white/20 text-gray-400 font-medium text-sm
                hover:border-white/40 hover:text-white transition-all duration-150
              "
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
