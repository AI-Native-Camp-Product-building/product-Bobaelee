"use client";

import { useState } from "react";

const faqs = [
  {
    question: "어떤 서식을 지원하나요?",
    answer:
      "현재 자격취득 신고서(입사)와 자격상실 신고서(퇴사) 2종을 지원합니다. 추가 서식은 순차적으로 확장할 예정입니다.",
  },
  {
    question: "FAX가 제대로 갔는지 어떻게 알 수 있나요?",
    answer:
      "원클릭 FAX 발송 시 팝빌 API를 통해 전송 결과를 확인할 수 있습니다. 발송 이력에서 상태를 확인하세요.",
  },
  {
    question: "우리 회사 복합기로도 보낼 수 있나요?",
    answer:
      "네. PDF를 다운로드한 후 회사 복합기의 FAX 기능으로 직접 발송할 수 있습니다. 관할 지사 FAX 번호도 함께 안내해드립니다.",
  },
  {
    question: "비용이 발생하나요?",
    answer:
      "신고서 PDF 자동 생성과 다운로드는 완전 무료입니다. 원클릭 FAX 발송을 이용할 경우에만 건당 50원이 부과됩니다.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 px-6" style={{ backgroundColor: '#0d1219' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-success-400 font-semibold text-sm tracking-wide uppercase mb-3">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            자주 묻는 질문
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "!border-success-400/30"
                    : ""
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-white font-semibold transition-colors"
                  onClick={() => toggle(index)}
                >
                  <span>{faq.question}</span>
                  <span className={`ml-4 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "bg-success-400/20 text-success-300 rotate-45"
                      : "bg-white/5 text-gray-500"
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 border-l-2 border-success-400 ml-6 animate-accordion-open">
                    <p className="text-gray-400 leading-relaxed pl-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
