const steps = [
  {
    number: 1,
    title: "직원 정보 입력",
    description:
      "관리하던 엑셀 그대로, 업로드만 하세요",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "서식 자동 생성",
    description:
      "입사/퇴사를 선택하면 4대보험 통합 서식이 자동으로 완성됩니다",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "발송",
    description:
      "원클릭 FAX 발송(건당 50원) 또는 PDF를 다운로드하여 직접 발송",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ backgroundColor: '#0a0f1a' }}>
      {/* 배경 글로우 */}
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-success-500/5 rounded-full blur-[100px]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-success-400 font-semibold text-sm tracking-wide uppercase mb-3">How It Works</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            이렇게 간단합니다
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {/* 연결선 (데스크탑에서만 표시) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-gradient-to-r from-success-400/50 via-success-500/30 to-success-400/50" />

          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center px-6 relative">
              {/* 그라디언트 넘버 서클 */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success-400 to-success-600 text-navy-950 flex items-center justify-center text-2xl font-bold z-10 relative">
                  {step.number}
                </div>
                {/* 글로우 효과 */}
                <div className="absolute inset-0 rounded-2xl bg-success-400/30 blur-lg" />
              </div>

              {/* 카드 */}
              <div className="glass-card rounded-2xl p-6 w-full min-h-[200px] flex flex-col items-center justify-start">
                <div className="w-11 h-11 rounded-xl bg-success-400/10 border border-success-400/20 text-success-300 flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
