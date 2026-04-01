export default function Security() {
  return (
    <section className="relative text-white py-24 px-6 overflow-hidden" style={{ backgroundColor: '#0a0f1a' }}>
      {/* 배경 패턴 오버레이 */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      {/* 그라디언트 글로우 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-success-500/8 rounded-full blur-[100px]" />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* 실드 아이콘 */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-success-400/10 border border-success-400/25 mb-8" style={{ boxShadow: '0 0 30px rgba(56, 178, 172, 0.15)' }}>
          <svg className="w-10 h-10 text-success-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
          개인정보를 서버에 저장하지 않습니다
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-10">
          직원의 주민등록번호, 급여 정보 등 민감한 데이터는 브라우저에서만
          처리됩니다. 서버를 거치지 않아 유출 위험이 없습니다. FAX 발송 시에도
          전송 후 즉시 삭제합니다.
        </p>

        {/* 신뢰 배지들 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "브라우저 처리" },
            { icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2", label: "서버 미저장" },
            { icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", label: "전송 후 즉시 삭제" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="glass-card flex items-center gap-2.5 rounded-xl px-4 py-2.5"
              style={{ borderColor: 'rgba(56, 178, 172, 0.15)' }}
            >
              <svg className="w-4 h-4 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
              </svg>
              <span className="text-sm text-gray-300 font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
