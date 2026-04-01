import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ backgroundColor: '#0a0f1a' }}>
      {/* 패턴 오버레이 */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>
      {/* 글로우 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-success-400/8 rounded-full blur-[120px] animate-glow-pulse" />

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          4대보험 딸깍 신고, 지금 시작하세요
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          회원가입 없이 바로 사용할 수 있습니다
        </p>
        <Link
          href="/app"
          className="inline-block bg-gradient-to-r from-success-400 to-success-500 hover:from-success-300 hover:to-success-400 text-navy-950 font-bold py-4 px-12 rounded-xl text-lg transition-all duration-300 btn-glow hover:-translate-y-0.5"
        >
          무료로 시작하기
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {["PDF 생성 무료", "설치 없음", "웹에서 바로 사용"].map((text) => (
            <span key={text} className="glass-card text-gray-400 text-sm px-4 py-2 rounded-full" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
