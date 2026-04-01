"use client";

import { useState, useEffect } from "react";
import { getBusinessInfo, saveBusinessInfo } from "@/lib/storage";
import type { BusinessInfo } from "@/types";

const INPUT_CLASS =
  "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-success-400 focus:border-transparent";

const LABEL_CLASS = "block text-sm font-medium text-gray-300 mb-1";

const EMPTY_FORM: BusinessInfo = {
  managementNumber: "",
  name: "",
  address: "",
  sido: "",
  sigungu: "",
  zipCode: "",
  representative: "",
  phone: "",
  fax: "",
};

export default function SetupForm() {
  const [form, setForm] = useState<BusinessInfo>(EMPTY_FORM);
  const [saved, setSaved] = useState(false);

  // 기존 저장 데이터 불러오기
  useEffect(() => {
    const existing = getBusinessInfo();
    if (existing) {
      setForm(existing);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveBusinessInfo(form);
    setSaved(true);
    // 2초 후 피드백 메시지 숨기기
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 사업장관리번호 + 명칭 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS} htmlFor="managementNumber">
            사업장관리번호
          </label>
          <input
            id="managementNumber"
            name="managementNumber"
            type="text"
            value={form.managementNumber}
            onChange={handleChange}
            placeholder="예: 12345678901234"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="name">
            사업장 명칭
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="예: (주)퓨쳐스콜레"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* 소재지 주소 */}
      <div>
        <label className={LABEL_CLASS} htmlFor="address">
          소재지 주소
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={form.address}
          onChange={handleChange}
          placeholder="예: 서울특별시 강남구 테헤란로 123"
          className={INPUT_CLASS}
        />
      </div>

      {/* 시/도, 시/군/구, 우편번호 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={LABEL_CLASS} htmlFor="sido">
            시/도
          </label>
          <input
            id="sido"
            name="sido"
            type="text"
            value={form.sido}
            onChange={handleChange}
            placeholder="예: 서울특별시"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="sigungu">
            시/군/구
          </label>
          <input
            id="sigungu"
            name="sigungu"
            type="text"
            value={form.sigungu}
            onChange={handleChange}
            placeholder="예: 강남구"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="zipCode">
            우편번호
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={form.zipCode}
            onChange={handleChange}
            placeholder="예: 06234"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* 대표자명 + 전화번호 + 팩스 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS} htmlFor="representative">
            대표자명
          </label>
          <input
            id="representative"
            name="representative"
            type="text"
            value={form.representative}
            onChange={handleChange}
            placeholder="예: 홍길동"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="phone">
            전화번호
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
            placeholder="예: 02-1234-5678"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS} htmlFor="fax">
            팩스번호
          </label>
          <input
            id="fax"
            name="fax"
            type="text"
            value={form.fax ?? ""}
            onChange={handleChange}
            placeholder="예: 02-1234-5679"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          className="bg-gradient-to-r from-success-400 to-success-500 hover:from-success-300 hover:to-success-400 text-navy-950 font-bold py-3 px-6 rounded-xl transition-all duration-300 btn-glow"
        >
          저장하기
        </button>
        {saved && (
          <span className="text-success-300 text-sm font-medium animate-pulse">
            저장 완료!
          </span>
        )}
      </div>
    </form>
  );
}
