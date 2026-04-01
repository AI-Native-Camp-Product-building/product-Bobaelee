const painPoints = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    title: "필드마다 수기 입력",
    description:
      "정보연계센터에 공동인증서로 로그인 → 필드 하나하나 직원 정보를 직접 입력",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "보험별로 다른 필드",
    description:
      "국민연금, 건강보험, 고용보험, 산재보험마다 입력 항목이 달라서 매번 헷갈림",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "14일 기한 압박",
    description:
      "입사일로부터 14일 이내 신고.\n놓치면 과태료 최대 300만원",
  },
];

export default function PainPoints() {
  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ backgroundColor: '#0d1219' }}>
      {/* 미묘한 배경 글로우 */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-success-600/5 rounded-full blur-[100px]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-success-400 font-semibold text-sm tracking-wide uppercase mb-3">Problem</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            혹시 이런 경험 있으신가요?
          </h2>
          <p className="text-gray-400 text-lg">
            입사자 1명 처리에 20~30분, 매번 반복되는 수작업
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="group glass-card rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{ borderTop: '2px solid rgba(56, 178, 172, 0.3)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-success-400/10 border border-success-400/20 flex items-center justify-center mb-5 text-success-300">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {point.title}
              </h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
