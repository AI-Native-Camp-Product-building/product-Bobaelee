"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBusinessInfo, getHistory } from "@/lib/storage";
import type { ReportHistory } from "@/types";

// 신고 유형 한글 표기
const TYPE_LABEL: Record<string, string> = {
  acquisition: "취득",
  loss: "상실",
};

// 처리 상태 한글 표기
const STATUS_LABEL: Record<string, string> = {
  generated: "생성됨",
  faxSent: "팩스 전송",
  downloaded: "다운로드",
};

const STATUS_COLOR: Record<string, string> = {
  generated: "text-yellow-400",
  faxSent: "text-success-300",
  downloaded: "text-blue-400",
};

export default function DashboardPage() {
  const [hasBusinessInfo, setHasBusinessInfo] = useState(true);
  const [history, setHistory] = useState<ReportHistory[]>([]);

  useEffect(() => {
    const info = getBusinessInfo();
    setHasBusinessInfo(!!info);
    setHistory(getHistory());
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">대시보드</h1>
        <p className="text-gray-400 text-sm">4대보험 신고 현황을 확인하세요.</p>
      </div>

      {/* 사업장 정보 미설정 경고 */}
      {!hasBusinessInfo && (
        <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-4 flex items-start gap-3">
          <span className="text-yellow-400 text-lg mt-0.5">⚠</span>
          <div>
            <p className="text-yellow-300 font-medium text-sm">
              사업장 정보가 설정되지 않았습니다.
            </p>
            <p className="text-yellow-400/70 text-sm mt-0.5">
              신고서 작성 전에{" "}
              <Link
                href="/app/setup"
                className="underline hover:text-yellow-300 transition-colors"
              >
                사업장 설정
              </Link>
              을 먼저 완료해 주세요.
            </p>
          </div>
        </div>
      )}

      {/* 빠른 실행 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/app/report" className="group block">
          <div className="glass-card rounded-2xl p-6 hover:border-success-400/40 transition-all duration-300 cursor-pointer h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-success-400/15 flex items-center justify-center text-success-300 text-lg">
                📄
              </div>
              <h2 className="text-white font-semibold text-lg">신고서 작성하기</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              취득·상실 신고서를 작성하고 팩스 전송 또는 파일로 내보냅니다.
            </p>
            <p className="mt-4 text-success-400 text-sm font-medium group-hover:text-success-300 transition-colors">
              시작하기 →
            </p>
          </div>
        </Link>

        <Link href="/app/setup" className="group block">
          <div className="glass-card rounded-2xl p-6 hover:border-success-400/40 transition-all duration-300 cursor-pointer h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 text-lg">
                ⚙️
              </div>
              <h2 className="text-white font-semibold text-lg">사업장 설정</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              사업장관리번호, 주소, 대표자 등 기본 정보를 등록·수정합니다.
            </p>
            <p className="mt-4 text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">
              설정 바로가기 →
            </p>
          </div>
        </Link>

        <Link href="/app/upload" className="group block">
          <div className="glass-card rounded-2xl p-6 hover:border-success-400/40 transition-all duration-300 cursor-pointer h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-400/15 flex items-center justify-center text-blue-300 text-lg">
                📊
              </div>
              <h2 className="text-white font-semibold text-lg">엑셀 업로드</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              관리하던 엑셀 그대로, 직원 정보를 한 번에 가져옵니다.
            </p>
            <p className="mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
              업로드하기 →
            </p>
          </div>
        </Link>
      </div>

      {/* 최근 신고 이력 */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">최근 신고 이력</h2>

        {history.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-gray-500 text-sm">아직 신고 이력이 없습니다.</p>
          </div>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-gray-400 font-medium px-5 py-3">직원명</th>
                  <th className="text-left text-gray-400 font-medium px-5 py-3">신고 유형</th>
                  <th className="text-left text-gray-400 font-medium px-5 py-3">상태</th>
                  <th className="text-left text-gray-400 font-medium px-5 py-3">일시</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-3 text-white font-medium">{item.employeeName}</td>
                    <td className="px-5 py-3 text-gray-300">
                      {TYPE_LABEL[item.type] ?? item.type}
                    </td>
                    <td className={`px-5 py-3 font-medium ${STATUS_COLOR[item.status] ?? "text-gray-400"}`}>
                      {STATUS_LABEL[item.status] ?? item.status}
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {new Date(item.createdAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
