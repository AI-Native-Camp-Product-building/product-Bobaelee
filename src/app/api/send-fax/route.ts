import { NextRequest, NextResponse } from "next/server";
import { sendFax } from "@/lib/popbill";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get("pdf") as File | null;
    const receiverFax = formData.get("receiverFax") as string | null;
    const receiverName = formData.get("receiverName") as string | null;
    const senderFax = formData.get("senderFax") as string | null;

    if (!pdfFile || !receiverFax) {
      return NextResponse.json(
        { error: "PDF 파일과 수신 FAX 번호가 필요합니다" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await pdfFile.arrayBuffer());

    const result = await sendFax(
      senderFax || "02-0000-0000",
      receiverFax,
      receiverName || "수신자",
      buffer,
      "singohejwo-report.pdf"
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("FAX 발송 실패:", error);
    return NextResponse.json(
      { error: "FAX 발송에 실패했습니다", details: String(error) },
      { status: 500 }
    );
  }
}
