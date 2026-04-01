// 팝빌 FAX API 클라이언트 (서버 전용)
// MVP에서는 테스트 모드로 동작

const IS_TEST = process.env.NODE_ENV !== "production";

export async function sendFax(
  senderNum: string,
  receiverNum: string,
  receiverName: string,
  pdfBuffer: Buffer,
  fileName: string
): Promise<{ success: boolean; receiptNum: string; message: string }> {
  // MVP: 팝빌 연동 전 mock 응답
  // 실제 연동 시 popbill SDK 사용
  if (!process.env.POPBILL_LINK_ID || !process.env.POPBILL_SECRET_KEY) {
    console.log("[FAX Mock] 팝빌 API 키가 설정되지 않아 Mock 모드로 동작합니다.");
    console.log(`[FAX Mock] 발신: ${senderNum}, 수신: ${receiverNum} (${receiverName})`);
    console.log(`[FAX Mock] 파일: ${fileName}, 크기: ${pdfBuffer.length} bytes`);

    return {
      success: true,
      receiptNum: `MOCK-${Date.now()}`,
      message: "테스트 모드: FAX 발송이 시뮬레이션되었습니다.",
    };
  }

  // TODO: 실제 팝빌 SDK 연동
  // const Popbill = require("popbill");
  // Popbill.config({ LinkID: process.env.POPBILL_LINK_ID, ... });

  return {
    success: true,
    receiptNum: `MOCK-${Date.now()}`,
    message: "팝빌 연동 준비 중",
  };
}
