import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-navy-950 text-white py-28 px-6 overflow-hidden">
      {/* 배경 그라디언트 글로우 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-success-400/10 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-success-700/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-success-600/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 텍스트 영역 */}
          <div className="text-center lg:text-left">
            {/* 배지 */}
            <div className="inline-flex items-center gap-2 glass-card glow-border-teal rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
              <span className="text-sm text-success-200 font-medium">4대보험 신고 자동화</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              신고해죠
            </h1>
            <p className="text-xl text-gray-400 mb-1">
              지금 엑셀 그대로
            </p>
            <p className="text-xl text-gray-400 mb-1">
              4대보험 신고서 자동 작성
            </p>
            <p className="text-xl text-gray-400 mb-10">
              공단전송까지 <span className="text-success-300 font-bold text-2xl" style={{ textShadow: '0 0 20px rgba(56,178,172,0.5), 0 0 40px rgba(56,178,172,0.2)' }}>딸깍</span>
            </p>
            <Link
              href="/app"
              className="inline-block bg-gradient-to-r from-success-400 to-success-500 hover:from-success-300 hover:to-success-400 text-navy-950 font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 btn-glow hover:-translate-y-0.5"
            >
              무료로 시작하기
            </Link>
          </div>

          {/* 오른쪽: 제품 플로우 모형 */}
          <div className="hidden lg:flex flex-col items-center gap-4 relative">
            {/* 플로우 카드 1: 직원정보 */}
            <div className="animate-float w-72 glass-card rounded-2xl p-5 shadow-xl min-h-[140px]" style={{ borderColor: 'rgba(56, 178, 172, 0.2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-success-400/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white">직원 정보</span>
              </div>
              <div className="space-y-2">
                <div className="h-2.5 bg-white/10 rounded-full w-full" />
                <div className="h-2.5 bg-white/10 rounded-full w-4/5" />
                <div className="h-2.5 bg-white/10 rounded-full w-3/5" />
              </div>
            </div>

            {/* 화살표 */}
            <div className="flex flex-col items-center text-success-500/50">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* 플로우 카드 2: 서식 자동생성 */}
            <div className="animate-float-delayed w-72 glass-card rounded-2xl p-5 shadow-xl min-h-[140px]" style={{ borderColor: 'rgba(56, 178, 172, 0.2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-success-400/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white">서식 자동 생성</span>
              </div>
              <div className="flex gap-2">
                {["국민연금", "건강보험", "고용보험", "산재보험"].map((label) => (
                  <span key={label} className="text-[10px] bg-success-400/15 text-success-200 px-2 py-1 rounded-md font-medium border border-success-400/20">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* 화살표 */}
            <div className="flex flex-col items-center text-success-500/50">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* 플로우 카드 3: FAX 발송 */}
            <div className="animate-float-slow w-72 glass-card rounded-2xl p-5 shadow-xl min-h-[140px]" style={{ borderColor: 'rgba(56, 178, 172, 0.2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-success-400/15 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white">FAX 발송</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success-400 shadow-[0_0_8px_rgba(56,178,172,0.5)]" />
                <span className="text-xs text-success-200 font-medium">전송 완료</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
