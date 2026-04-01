"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { getBusinessInfo, addHistory, addEmployee } from "@/lib/storage";
import {
  generateAcquisitionPdf,
  generateLossPdf,
  downloadPdf,
} from "@/lib/pdf-engine";
import {
  PENSION_ACQUISITION_CODES,
  HEALTH_ACQUISITION_CODES,
  HEALTH_REDUCTION_CODES,
  PENSION_LOSS_CODES,
  HEALTH_LOSS_CODES,
  EMPLOYMENT_LOSS_REASON_CODES,
} from "@/data/codes";
import { KECO_CODES } from "@/data/keco";
import officesData from "@/data/offices.json";
import type {
  BusinessInfo,
  EmployeeInfo,
  AcquisitionReport,
  LossReport,
  RegionOffices,
} from "@/types";

// ── 스타일 상수 ──
const INPUT_CLASS =
  "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-success-400 focus:border-transparent";
const SELECT_CLASS =
  "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-success-400 focus:border-transparent";
const LABEL_CLASS = "block text-sm font-medium text-gray-300 mb-1";
const CHECKBOX_CLASS =
  "w-4 h-4 rounded bg-white/5 border border-white/10 text-success-400 focus:ring-success-400 focus:ring-offset-0 accent-[#38b2ac]";

// ── 오늘 날짜 YYYY-MM-DD ──
function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ── 날짜 +1일 계산 ──
function addOneDay(dateStr: string): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ── 날짜 포맷 변환 (YYYY-MM-DD → YYYY.MM.DD) ──
function toDisplayDate(dateStr: string): string {
  return dateStr.replace(/-/g, ".");
}

// ── 스텝 인디케이터 ──
const STEPS = ["직원 정보", "신고 유형", "미리보기", "생성 완료"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={stepNum} className="flex items-center">
            {/* 원 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isActive
                    ? "bg-success-400 text-navy-950 shadow-[0_0_12px_rgba(56,178,172,0.5)]"
                    : isDone
                      ? "bg-success-700 text-white"
                      : "bg-white/10 text-gray-500"
                }`}
              >
                {isDone ? "✓" : stepNum}
              </div>
              <span
                className={`mt-1 text-xs ${isActive ? "text-success-400 font-semibold" : isDone ? "text-success-600" : "text-gray-500"}`}
              >
                {label}
              </span>
            </div>
            {/* 연결선 */}
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-0.5 mx-1 ${
                  stepNum < current ? "bg-success-600" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── KECO 검색 드롭다운 ──
function KecoSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 선택된 코드의 라벨 표시
  const selectedLabel = useMemo(() => {
    const found = KECO_CODES.find((k) => k.code === value);
    return found ? `${found.code} - ${found.label}` : "";
  }, [value]);

  // 필터링
  const filtered = useMemo(() => {
    if (!query) return KECO_CODES;
    const q = query.toLowerCase();
    return KECO_CODES.filter(
      (k) =>
        k.code.includes(q) ||
        k.label.toLowerCase().includes(q) ||
        k.category.toLowerCase().includes(q)
    );
  }, [query]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        className={INPUT_CLASS}
        placeholder="코드 또는 직종명으로 검색..."
        value={open ? query : selectedLabel || query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-lg bg-navy-900 border border-white/10 shadow-lg">
          {filtered.slice(0, 50).map((k) => (
            <button
              key={k.code}
              type="button"
              className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              onClick={() => {
                onChange(k.code);
                setQuery("");
                setOpen(false);
              }}
            >
              <span className="text-success-400 font-mono mr-2">{k.code}</span>
              {k.label}
              <span className="text-gray-500 text-xs ml-2">
                ({k.category})
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════
// 메인 위저드 컴포넌트
// ══════════════════════════════════════
export default function ReportWizard() {
  const [step, setStep] = useState(1);
  const [reportType, setReportType] = useState<"acquisition" | "loss" | null>(
    null
  );
  const [business, setBusiness] = useState<BusinessInfo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState<Uint8Array | null>(null);
  const [showFax, setShowFax] = useState(false);

  // 직원 정보
  const [employee, setEmployee] = useState<Partial<EmployeeInfo>>({
    name: "",
    residentNumber: "",
    phone: "",
    isRepresentative: false,
    monthlySalary: 0,
    weeklyWorkHours: 40,
    isContract: false,
    contractEndDate: "",
    kecoCode: "",
  });

  // 취득 신고 필드
  const [acqData, setAcqData] = useState({
    acquisitionDate: todayStr(),
    pensionCode: "01",
    healthCode: "00",
    healthReductionCode: "",
    selectedInsurance: {
      pension: true,
      health: true,
      employment: true,
      industrial: true,
    },
  });

  // 상실 신고 필드
  const [lossData, setLossData] = useState({
    resignDate: "", // 퇴사일
    pensionLossCode: "3",
    healthLossCode: "01",
    lossReasonCode: "11",
    lossReason: "",
    currentYearSalary: 0,
    currentYearMonths: 0,
    employmentCurrentSalary: 0,
    industrialCurrentSalary: 0,
  });

  // 마운트 시 사업장 정보 확인
  useEffect(() => {
    setBusiness(getBusinessInfo());
  }, []);

  // 유효성 검증
  const isStep1Valid =
    (employee.name?.trim() ?? "") !== "" &&
    (employee.residentNumber?.trim() ?? "") !== "" &&
    (employee.monthlySalary ?? 0) > 0 &&
    (employee.weeklyWorkHours ?? 0) > 0 &&
    (employee.kecoCode?.trim() ?? "") !== "";

  const isStep2Valid =
    reportType !== null &&
    (reportType === "acquisition"
      ? acqData.acquisitionDate !== ""
      : lossData.resignDate !== "");

  // ── 사업장 미설정 경고 ──
  if (business === null) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-2">
          사업장 정보가 필요합니다
        </h2>
        <p className="text-gray-400 mb-6">
          신고서를 작성하려면 먼저 사업장 정보를 등록해주세요.
        </p>
        <a
          href="/app/setup"
          className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-success-500 to-success-400 text-navy-950 font-semibold btn-glow"
        >
          사업장 설정으로 이동
        </a>
      </div>
    );
  }

  // ── PDF 생성 핸들러 ──
  async function handleGenerate() {
    if (!business) return;
    setIsGenerating(true);

    try {
      const emp: EmployeeInfo = {
        name: employee.name!,
        residentNumber: employee.residentNumber!,
        phone: employee.phone,
        isRepresentative: employee.isRepresentative ?? false,
        monthlySalary: employee.monthlySalary!,
        weeklyWorkHours: employee.weeklyWorkHours!,
        isContract: employee.isContract ?? false,
        contractEndDate: employee.contractEndDate,
        kecoCode: employee.kecoCode!,
      };

      let pdfBytes: Uint8Array;

      if (reportType === "acquisition") {
        const report: AcquisitionReport = {
          type: "acquisition",
          employee: emp,
          acquisitionDate: toDisplayDate(acqData.acquisitionDate),
          pensionCode: acqData.pensionCode,
          healthCode: acqData.healthCode,
          healthReductionCode: acqData.healthReductionCode || undefined,
          selectedInsurance: acqData.selectedInsurance,
        };
        pdfBytes = await generateAcquisitionPdf(business, [report]);
      } else {
        const lossDate = addOneDay(lossData.resignDate);
        const report: LossReport = {
          type: "loss",
          employee: emp,
          lossDate: toDisplayDate(lossDate),
          pensionLossCode: lossData.pensionLossCode,
          pensionFirstMonthPay: false,
          healthLossCode: lossData.healthLossCode,
          currentYearSalary: lossData.currentYearSalary,
          currentYearMonths: lossData.currentYearMonths,
          lossReason: lossData.lossReason,
          lossReasonCode: lossData.lossReasonCode,
          employmentCurrentSalary: lossData.employmentCurrentSalary,
          industrialCurrentSalary: lossData.industrialCurrentSalary,
        };
        pdfBytes = await generateLossPdf(business, [report]);
      }

      setGeneratedPdf(pdfBytes);

      // 직원 저장
      addEmployee(emp);

      // 이력 저장
      addHistory({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        type: reportType!,
        employeeName: emp.name,
        status: "generated",
      });

      setStep(4);
    } catch (err) {
      console.error("PDF 생성 실패:", err);
      alert("PDF 생성 중 오류가 발생했습니다. 콘솔을 확인해주세요.");
    } finally {
      setIsGenerating(false);
    }
  }

  // ── 관할 지사 조회 ──
  function getMatchingOffices() {
    const offices = officesData as RegionOffices[];
    return offices.find(
      (o) => o.sido === business?.sido && o.sigungu === business?.sigungu
    );
  }

  // ── PDF 다운로드 핸들러 ──
  function handleDownload() {
    if (!generatedPdf) return;
    const typeLabel = reportType === "acquisition" ? "취득" : "상실";
    const filename = `${typeLabel}신고서_${employee.name}_${todayStr()}.pdf`;
    downloadPdf(generatedPdf, filename);
  }

  return (
    <div>
      <StepIndicator current={step} />

      {/* ── 스텝 1: 직원 정보 입력 ── */}
      {step === 1 && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">직원 정보 입력</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 성명 */}
            <div>
              <label className={LABEL_CLASS}>
                성명 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="홍길동"
                value={employee.name || ""}
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
              />
            </div>

            {/* 주민등록번호 */}
            <div>
              <label className={LABEL_CLASS}>
                주민등록번호 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="000000-0000000"
                value={employee.residentNumber || ""}
                onChange={(e) =>
                  setEmployee({ ...employee, residentNumber: e.target.value })
                }
              />
            </div>

            {/* 전화번호 */}
            <div>
              <label className={LABEL_CLASS}>전화번호</label>
              <input
                type="text"
                className={INPUT_CLASS}
                placeholder="010-0000-0000"
                value={employee.phone || ""}
                onChange={(e) =>
                  setEmployee({ ...employee, phone: e.target.value })
                }
              />
            </div>

            {/* 보수월액 */}
            <div>
              <label className={LABEL_CLASS}>
                월 소득액 / 보수월액 (원){" "}
                <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                className={INPUT_CLASS}
                placeholder="3000000"
                value={employee.monthlySalary || ""}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    monthlySalary: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* 1주 소정근로시간 */}
            <div>
              <label className={LABEL_CLASS}>
                1주 소정근로시간 <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                className={INPUT_CLASS}
                value={employee.weeklyWorkHours ?? 40}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    weeklyWorkHours: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* KECO 직종코드 */}
            <div>
              <label className={LABEL_CLASS}>
                KECO 직종코드 <span className="text-red-400">*</span>
              </label>
              <KecoSelect
                value={employee.kecoCode || ""}
                onChange={(code) => setEmployee({ ...employee, kecoCode: code })}
              />
            </div>
          </div>

          {/* 체크박스 영역 */}
          <div className="mt-5 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
              <input
                type="checkbox"
                className={CHECKBOX_CLASS}
                checked={employee.isRepresentative ?? false}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    isRepresentative: e.target.checked,
                  })
                }
              />
              대표자 여부
            </label>

            <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
              <input
                type="checkbox"
                className={CHECKBOX_CLASS}
                checked={employee.isContract ?? false}
                onChange={(e) =>
                  setEmployee({ ...employee, isContract: e.target.checked })
                }
              />
              계약직 여부
            </label>
          </div>

          {/* 계약종료연월 (계약직일 때만) */}
          {employee.isContract && (
            <div className="mt-4 max-w-xs">
              <label className={LABEL_CLASS}>계약종료연월</label>
              <input
                type="month"
                className={INPUT_CLASS}
                value={employee.contractEndDate || ""}
                onChange={(e) =>
                  setEmployee({ ...employee, contractEndDate: e.target.value })
                }
              />
            </div>
          )}

          {/* 다음 버튼 */}
          <div className="mt-8 flex justify-end">
            <button
              disabled={!isStep1Valid}
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-success-500 to-success-400 text-navy-950 font-semibold btn-glow disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
            >
              다음 →
            </button>
          </div>
        </div>
      )}

      {/* ── 스텝 2: 신고 유형 선택 ── */}
      {step === 2 && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">신고 유형 선택</h2>

          {/* 유형 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* 입사 */}
            <button
              type="button"
              onClick={() => setReportType("acquisition")}
              className={`glass-card rounded-xl p-6 text-left transition-all cursor-pointer ${
                reportType === "acquisition"
                  ? "glow-border-teal shadow-[0_0_20px_rgba(56,178,172,0.15)]"
                  : "hover:border-white/20"
              }`}
            >
              <div className="text-3xl mb-3">📥</div>
              <h3 className="text-white font-bold text-lg mb-1">
                입사 (자격취득)
              </h3>
              <p className="text-gray-400 text-sm">
                새로 입사한 직원의 4대보험 자격취득 신고서를 작성합니다.
              </p>
            </button>

            {/* 퇴사 */}
            <button
              type="button"
              onClick={() => setReportType("loss")}
              className={`glass-card rounded-xl p-6 text-left transition-all cursor-pointer ${
                reportType === "loss"
                  ? "glow-border-teal shadow-[0_0_20px_rgba(56,178,172,0.15)]"
                  : "hover:border-white/20"
              }`}
            >
              <div className="text-3xl mb-3">📤</div>
              <h3 className="text-white font-bold text-lg mb-1">
                퇴사 (자격상실)
              </h3>
              <p className="text-gray-400 text-sm">
                퇴사한 직원의 4대보험 자격상실 신고서를 작성합니다.
              </p>
            </button>
          </div>

          {/* 취득 신고 세부 필드 */}
          {reportType === "acquisition" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 취득일 */}
                <div>
                  <label className={LABEL_CLASS}>자격취득일</label>
                  <input
                    type="date"
                    className={INPUT_CLASS}
                    value={acqData.acquisitionDate}
                    onChange={(e) =>
                      setAcqData({
                        ...acqData,
                        acquisitionDate: e.target.value,
                      })
                    }
                  />
                </div>

                {/* 국민연금 취득부호 */}
                <div>
                  <label className={LABEL_CLASS}>국민연금 자격취득부호</label>
                  <select
                    className={SELECT_CLASS}
                    value={acqData.pensionCode}
                    onChange={(e) =>
                      setAcqData({ ...acqData, pensionCode: e.target.value })
                    }
                  >
                    {PENSION_ACQUISITION_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 건강보험 취득부호 */}
                <div>
                  <label className={LABEL_CLASS}>건강보험 자격취득부호</label>
                  <select
                    className={SELECT_CLASS}
                    value={acqData.healthCode}
                    onChange={(e) =>
                      setAcqData({ ...acqData, healthCode: e.target.value })
                    }
                  >
                    {HEALTH_ACQUISITION_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 건강보험 감면부호 */}
                <div>
                  <label className={LABEL_CLASS}>건강보험 감면부호</label>
                  <select
                    className={SELECT_CLASS}
                    value={acqData.healthReductionCode}
                    onChange={(e) =>
                      setAcqData({
                        ...acqData,
                        healthReductionCode: e.target.value,
                      })
                    }
                  >
                    {HEALTH_REDUCTION_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code ? `${c.code} - ${c.label}` : c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 보험 선택 */}
              <div>
                <label className={LABEL_CLASS}>적용 보험 선택</label>
                <div className="flex flex-wrap gap-5 mt-1">
                  {(
                    [
                      ["pension", "국민연금"],
                      ["health", "건강보험"],
                      ["employment", "고용보험"],
                      ["industrial", "산재보험"],
                    ] as const
                  ).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className={CHECKBOX_CLASS}
                        checked={acqData.selectedInsurance[key]}
                        onChange={(e) =>
                          setAcqData({
                            ...acqData,
                            selectedInsurance: {
                              ...acqData.selectedInsurance,
                              [key]: e.target.checked,
                            },
                          })
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 상실 신고 세부 필드 */}
          {reportType === "loss" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 퇴사일 */}
                <div>
                  <label className={LABEL_CLASS}>퇴사일</label>
                  <input
                    type="date"
                    className={INPUT_CLASS}
                    value={lossData.resignDate}
                    onChange={(e) =>
                      setLossData({ ...lossData, resignDate: e.target.value })
                    }
                  />
                  {lossData.resignDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      상실일 (퇴사일+1):{" "}
                      <span className="text-success-400">
                        {toDisplayDate(addOneDay(lossData.resignDate))}
                      </span>
                    </p>
                  )}
                </div>

                {/* 국민연금 상실부호 */}
                <div>
                  <label className={LABEL_CLASS}>국민연금 상실부호</label>
                  <select
                    className={SELECT_CLASS}
                    value={lossData.pensionLossCode}
                    onChange={(e) =>
                      setLossData({
                        ...lossData,
                        pensionLossCode: e.target.value,
                      })
                    }
                  >
                    {PENSION_LOSS_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 건강보험 상실부호 */}
                <div>
                  <label className={LABEL_CLASS}>건강보험 상실부호</label>
                  <select
                    className={SELECT_CLASS}
                    value={lossData.healthLossCode}
                    onChange={(e) =>
                      setLossData({
                        ...lossData,
                        healthLossCode: e.target.value,
                      })
                    }
                  >
                    {HEALTH_LOSS_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 상실사유 구분코드 */}
                <div>
                  <label className={LABEL_CLASS}>상실사유 구분코드</label>
                  <select
                    className={SELECT_CLASS}
                    value={lossData.lossReasonCode}
                    onChange={(e) =>
                      setLossData({
                        ...lossData,
                        lossReasonCode: e.target.value,
                      })
                    }
                  >
                    {EMPLOYMENT_LOSS_REASON_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.label} ({c.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 구체적 상실사유 */}
                <div className="md:col-span-2">
                  <label className={LABEL_CLASS}>구체적 상실사유</label>
                  <input
                    type="text"
                    className={INPUT_CLASS}
                    placeholder="자진 퇴사, 계약 만료 등"
                    value={lossData.lossReason}
                    onChange={(e) =>
                      setLossData({ ...lossData, lossReason: e.target.value })
                    }
                  />
                </div>

                {/* 해당연도 보수총액 */}
                <div>
                  <label className={LABEL_CLASS}>해당연도 보수총액 (원)</label>
                  <input
                    type="number"
                    className={INPUT_CLASS}
                    placeholder="0"
                    value={lossData.currentYearSalary || ""}
                    onChange={(e) =>
                      setLossData({
                        ...lossData,
                        currentYearSalary: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* 근무개월수 */}
                <div>
                  <label className={LABEL_CLASS}>근무개월수</label>
                  <input
                    type="number"
                    className={INPUT_CLASS}
                    placeholder="0"
                    value={lossData.currentYearMonths || ""}
                    onChange={(e) =>
                      setLossData({
                        ...lossData,
                        currentYearMonths: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* 고용보험 보수총액 */}
                <div>
                  <label className={LABEL_CLASS}>
                    고용보험 해당연도 보수총액 (원)
                  </label>
                  <input
                    type="number"
                    className={INPUT_CLASS}
                    placeholder="0"
                    value={lossData.employmentCurrentSalary || ""}
                    onChange={(e) =>
                      setLossData({
                        ...lossData,
                        employmentCurrentSalary: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* 산재보험 보수총액 */}
                <div>
                  <label className={LABEL_CLASS}>
                    산재보험 해당연도 보수총액 (원)
                  </label>
                  <input
                    type="number"
                    className={INPUT_CLASS}
                    placeholder="0"
                    value={lossData.industrialCurrentSalary || ""}
                    onChange={(e) =>
                      setLossData({
                        ...lossData,
                        industrialCurrentSalary: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* 이전 / 다음 버튼 */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2.5 rounded-lg border border-white/20 text-gray-300 hover:border-white/40 hover:text-white transition-all"
            >
              ← 이전
            </button>
            <button
              disabled={!isStep2Valid}
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-success-500 to-success-400 text-navy-950 font-semibold btn-glow disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
            >
              다음 →
            </button>
          </div>
        </div>
      )}

      {/* ── 스텝 3: 미리보기 확인 ── */}
      {step === 3 && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">미리보기 확인</h2>

          {/* 사업장 정보 */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-success-400 uppercase tracking-wider mb-3">
              사업장 정보
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <SummaryRow label="사업장명" value={business.name} />
              <SummaryRow
                label="관리번호"
                value={business.managementNumber}
              />
              <SummaryRow label="대표자" value={business.representative} />
              <SummaryRow label="소재지" value={business.address} />
            </div>
          </div>

          <hr className="border-white/10 mb-6" />

          {/* 직원 정보 */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-success-400 uppercase tracking-wider mb-3">
              직원 정보
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <SummaryRow label="성명" value={employee.name || ""} />
              <SummaryRow
                label="주민등록번호"
                value={employee.residentNumber || ""}
              />
              <SummaryRow
                label="보수월액"
                value={`${(employee.monthlySalary || 0).toLocaleString()}원`}
              />
              <SummaryRow
                label="1주 소정근로시간"
                value={`${employee.weeklyWorkHours}시간`}
              />
              <SummaryRow
                label="KECO 코드"
                value={
                  KECO_CODES.find((k) => k.code === employee.kecoCode)
                    ? `${employee.kecoCode} - ${KECO_CODES.find((k) => k.code === employee.kecoCode)!.label}`
                    : employee.kecoCode || ""
                }
              />
              <SummaryRow
                label="대표자 여부"
                value={employee.isRepresentative ? "예" : "아니오"}
              />
              {employee.isContract && (
                <SummaryRow
                  label="계약종료연월"
                  value={employee.contractEndDate || "-"}
                />
              )}
            </div>
          </div>

          <hr className="border-white/10 mb-6" />

          {/* 신고 유형 + 코드 */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-success-400 uppercase tracking-wider mb-3">
              {reportType === "acquisition"
                ? "취득 신고 정보"
                : "상실 신고 정보"}
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {reportType === "acquisition" ? (
                <>
                  <SummaryRow
                    label="자격취득일"
                    value={toDisplayDate(acqData.acquisitionDate)}
                  />
                  <SummaryRow
                    label="연금 취득부호"
                    value={`${acqData.pensionCode} - ${PENSION_ACQUISITION_CODES.find((c) => c.code === acqData.pensionCode)?.label || ""}`}
                  />
                  <SummaryRow
                    label="건강 취득부호"
                    value={`${acqData.healthCode} - ${HEALTH_ACQUISITION_CODES.find((c) => c.code === acqData.healthCode)?.label || ""}`}
                  />
                  <SummaryRow
                    label="감면부호"
                    value={
                      acqData.healthReductionCode
                        ? `${acqData.healthReductionCode} - ${HEALTH_REDUCTION_CODES.find((c) => c.code === acqData.healthReductionCode)?.label || ""}`
                        : "해당없음"
                    }
                  />
                  <SummaryRow
                    label="적용 보험"
                    value={[
                      acqData.selectedInsurance.pension && "국민연금",
                      acqData.selectedInsurance.health && "건강보험",
                      acqData.selectedInsurance.employment && "고용보험",
                      acqData.selectedInsurance.industrial && "산재보험",
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  />
                </>
              ) : (
                <>
                  <SummaryRow
                    label="퇴사일"
                    value={toDisplayDate(lossData.resignDate)}
                  />
                  <SummaryRow
                    label="상실일"
                    value={toDisplayDate(addOneDay(lossData.resignDate))}
                  />
                  <SummaryRow
                    label="연금 상실부호"
                    value={`${lossData.pensionLossCode} - ${PENSION_LOSS_CODES.find((c) => c.code === lossData.pensionLossCode)?.label || ""}`}
                  />
                  <SummaryRow
                    label="건강 상실부호"
                    value={`${lossData.healthLossCode} - ${HEALTH_LOSS_CODES.find((c) => c.code === lossData.healthLossCode)?.label || ""}`}
                  />
                  <SummaryRow
                    label="상실사유"
                    value={`${lossData.lossReasonCode} - ${EMPLOYMENT_LOSS_REASON_CODES.find((c) => c.code === lossData.lossReasonCode)?.label || ""}`}
                  />
                  <SummaryRow
                    label="보수총액"
                    value={`${lossData.currentYearSalary.toLocaleString()}원 / ${lossData.currentYearMonths}개월`}
                  />
                </>
              )}
            </div>
          </div>

          {/* 이전 / 생성 버튼 */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-lg border border-white/20 text-gray-300 hover:border-white/40 hover:text-white transition-all"
            >
              ← 이전
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-success-500 to-success-400 text-navy-950 font-semibold btn-glow disabled:opacity-60 disabled:cursor-wait transition-all"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                  생성 중...
                </span>
              ) : (
                "신고서 생성"
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── 스텝 4: 생성 완료 ── */}
      {step === 4 && (
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-white mb-2">
            신고서가 생성되었습니다
          </h2>
          <p className="text-gray-400 mb-8">
            {employee.name} 님의{" "}
            {reportType === "acquisition" ? "자격취득" : "자격상실"} 신고서가
            준비되었습니다.
          </p>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              onClick={handleDownload}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-success-500 to-success-400 text-navy-950 font-semibold btn-glow transition-all"
            >
              📄 PDF 다운로드
            </button>
            <button
              onClick={() => setShowFax(!showFax)}
              className="px-6 py-3 rounded-lg border border-white/20 text-gray-300 hover:border-success-400 hover:text-white transition-all"
            >
              📠 관할 지사 FAX 번호 확인
            </button>
          </div>

          {/* FAX 정보 */}
          {showFax && (
            <div className="text-left max-w-xl mx-auto">
              {(() => {
                const region = getMatchingOffices();
                if (!region) {
                  return (
                    <p className="text-gray-400 text-sm text-center">
                      사업장 관할 지역({business.sido} {business.sigungu})에
                      해당하는 지사 정보를 찾을 수 없습니다.
                    </p>
                  );
                }
                return (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-success-400 mb-3">
                      {region.sido} {region.sigungu} 관할 지사
                    </h3>
                    {region.offices.map((office, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"
                      >
                        <div>
                          <span className="text-white font-medium text-sm">
                            {office.institution}
                          </span>
                          <span className="text-gray-400 text-sm ml-2">
                            {office.officeName}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-success-400 font-mono text-sm">
                            FAX {office.fax}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {/* 새 신고서 작성 */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setStep(1);
                setReportType(null);
                setGeneratedPdf(null);
                setShowFax(false);
                setEmployee({
                  name: "",
                  residentNumber: "",
                  phone: "",
                  isRepresentative: false,
                  monthlySalary: 0,
                  weeklyWorkHours: 40,
                  isContract: false,
                  contractEndDate: "",
                  kecoCode: "",
                });
              }}
              className="text-gray-400 hover:text-white text-sm underline underline-offset-4 transition-colors"
            >
              새 신고서 작성하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── 요약 행 헬퍼 컴포넌트 ──
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex">
      <span className="text-gray-500 w-28 shrink-0">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
