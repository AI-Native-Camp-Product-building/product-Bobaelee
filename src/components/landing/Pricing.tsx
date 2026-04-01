import Link from "next/link";

const plans = [
  {
    name: "세무사 대행",
    highlight: false,
    features: [
      { label: "월 비용", value: "10~30만원" },
      { label: "FAX 발송", value: "대행 포함" },
      { label: "시작까지", value: "계약 필요" },
    ],
  },
  {
    name: "신고해죠",
    highlight: true,
    features: [
      { label: "월 비용", value: "무료~" },
      { label: "FAX 발송", value: "건당 50원" },
      { label: "시작까지", value: "지금 바로" },
    ],
  },
  {
    name: "ERP 도입",
    highlight: false,
    features: [
      { label: "월 비용", value: "월 수만원/인" },
      { label: "FAX 발송", value: "EDI 전자신고" },
      { label: "시작까지", value: "도입 수개월" },
    ],
  },
];

export default function Pricing() {
  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ backgroundColor: '#0d1219' }}>
      {/* 배경 글로우 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-success-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-success-400 font-semibold text-sm tracking-wide uppercase mb-3">Pricing</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            다른 방법과 비교해보세요
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 transition-all duration-300 ${
                plan.highlight
                  ? "md:scale-105 glow-border-teal"
                  : "glass-card"
              }`}
              style={plan.highlight ? {
                background: 'linear-gradient(to bottom, rgba(56, 178, 172, 0.08), rgba(10, 15, 26, 0.9))',
                border: '1px solid rgba(56, 178, 172, 0.4)',
                boxShadow: '0 0 30px rgba(56, 178, 172, 0.15), 0 25px 50px rgba(0, 0, 0, 0.3)',
              } : undefined}
            >
              {/* 추천 배지 */}
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-success-400 to-success-500 text-navy-950 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg" style={{ boxShadow: '0 0 20px rgba(56, 178, 172, 0.4)' }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                    추천
                  </span>
                </div>
              )}

              {/* 플랜 이름 */}
              <h3 className={`text-xl font-bold mb-8 text-center ${plan.highlight ? "text-white mt-2" : "text-gray-300"}`}>
                {plan.name}
              </h3>

              {/* 비교 항목 */}
              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature.label} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.highlight ? "bg-success-400/20" : "bg-white/5"
                    }`}>
                      <svg className={`w-3 h-3 ${plan.highlight ? "text-success-300" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className={`text-sm ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                        {feature.label}
                      </span>
                      <span className={`block text-base font-semibold ${plan.highlight ? "text-white" : "text-gray-300"}`}>
                        {feature.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA 버튼 (하이라이트 카드만) */}
              {plan.highlight && (
                <Link
                  href="/app"
                  className="block mt-8 w-full text-center bg-gradient-to-r from-success-400 to-success-500 hover:from-success-300 hover:to-success-400 text-navy-950 font-bold py-3.5 rounded-xl text-sm transition-all duration-300 btn-glow"
                >
                  무료로 시작하기
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
