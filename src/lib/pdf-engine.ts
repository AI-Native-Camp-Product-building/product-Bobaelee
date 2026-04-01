import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { BusinessInfo, AcquisitionReport, LossReport } from "@/types";
import { ACQUISITION_COORDS, LOSS_COORDS } from "./pdf-coordinates";

const FONT_SIZE = 8;
const SMALL_FONT_SIZE = 7;
const CHECK = "V";

let cachedFont: ArrayBuffer | null = null;

async function loadKoreanFont(): Promise<ArrayBuffer> {
  if (cachedFont) return cachedFont;
  // pdf-lib는 woff2를 지원하지 않음 — OTF 사용
  const res = await fetch(
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/public/static/Pretendard-Regular.otf"
  );
  cachedFont = await res.arrayBuffer();
  return cachedFont;
}

async function loadTemplate(type: "acquisition" | "loss"): Promise<Uint8Array> {
  const path =
    type === "acquisition"
      ? "/templates/acquisition.pdf"
      : "/templates/loss.pdf";
  const res = await fetch(path);
  return new Uint8Array(await res.arrayBuffer());
}

export async function generateAcquisitionPdf(
  business: BusinessInfo,
  reports: AcquisitionReport[]
): Promise<Uint8Array> {
  const templateBytes = await loadTemplate("acquisition");
  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);
  const fontBytes = await loadKoreanFont();
  const font = await pdfDoc.embedFont(fontBytes);
  const page = pdfDoc.getPages()[0];
  const c = ACQUISITION_COORDS;

  // 텍스트 그리기 헬퍼
  const draw = (text: string, x: number, y: number, size = FONT_SIZE) => {
    if (!text) return;
    page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
  };

  // 사업장 정보
  draw(
    business.managementNumber,
    c.business.managementNumber.x,
    c.business.managementNumber.y
  );
  draw(business.name, c.business.name.x, c.business.name.y);
  draw(business.subName || "", c.business.subName.x, c.business.subName.y);
  draw(
    business.branchName || "",
    c.business.branchName.x,
    c.business.branchName.y
  );
  draw(
    business.address,
    c.business.address.x,
    c.business.address.y,
    SMALL_FONT_SIZE
  );
  draw(business.zipCode, c.business.zipCode.x, c.business.zipCode.y);
  draw(business.phone, c.business.phone.x, c.business.phone.y);
  draw(business.fax || "", c.business.fax.x, c.business.fax.y);

  // 근로자 행 (최대 4명)
  reports.slice(0, 4).forEach((report, i) => {
    const baseY = c.rowStartY - i * c.rowHeight;
    const e = report.employee;
    const emp = c.employee;
    const chk = c.checkmarks;

    draw(e.name, emp.name.x, baseY + emp.name.dy);
    draw(e.residentNumber, emp.residentNumber.x, baseY + emp.residentNumber.dy);
    if (e.nationality) {
      draw(e.nationality, emp.nationality.x, baseY + emp.nationality.dy);
    }
    draw(
      e.monthlySalary.toLocaleString(),
      emp.monthlySalary.x,
      baseY + emp.monthlySalary.dy
    );
    draw(
      report.acquisitionDate,
      emp.acquisitionDate.x,
      baseY + emp.acquisitionDate.dy
    );
    draw(report.pensionCode, emp.pensionCode.x, baseY + emp.pensionCode.dy);
    draw(report.healthCode, emp.healthCode.x, baseY + emp.healthCode.dy);
    draw(e.kecoCode, emp.kecoCode.x, baseY + emp.kecoCode.dy);
    draw(
      String(e.weeklyWorkHours),
      emp.weeklyHours.x,
      baseY + emp.weeklyHours.dy
    );
    if (e.isContract && e.contractEndDate) {
      draw(e.contractEndDate, emp.contractEnd.x, baseY + emp.contractEnd.dy);
    }

    // 대표자 여부 체크박스
    if (e.isRepresentative) {
      draw(CHECK, chk.representativeYes.x, baseY + chk.representativeYes.dy);
    } else {
      draw(CHECK, chk.representativeNo.x, baseY + chk.representativeNo.dy);
    }

    // 보험 종류 체크박스
    if (report.selectedInsurance.pension) {
      draw(CHECK, chk.pension.x, baseY + chk.pension.dy);
    }
    if (report.selectedInsurance.health) {
      draw(CHECK, chk.health.x, baseY + chk.health.dy);
    }
    if (report.selectedInsurance.employment) {
      draw(CHECK, chk.employment.x, baseY + chk.employment.dy);
    }
    if (report.selectedInsurance.industrial) {
      draw(CHECK, chk.industrial.x, baseY + chk.industrial.dy);
    }
  });

  // 신고일자
  const today = new Date();
  draw(
    `${today.getFullYear()}    ${today.getMonth() + 1}    ${today.getDate()}`,
    c.signature.date.x,
    c.signature.date.y
  );

  return pdfDoc.save();
}

export async function generateLossPdf(
  business: BusinessInfo,
  reports: LossReport[]
): Promise<Uint8Array> {
  const templateBytes = await loadTemplate("loss");
  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);
  const fontBytes = await loadKoreanFont();
  const font = await pdfDoc.embedFont(fontBytes);
  const page = pdfDoc.getPages()[0];
  const c = LOSS_COORDS;

  // 텍스트 그리기 헬퍼
  const draw = (text: string, x: number, y: number, size = FONT_SIZE) => {
    if (!text) return;
    page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
  };

  // 사업장 정보
  draw(
    business.managementNumber,
    c.business.managementNumber.x,
    c.business.managementNumber.y
  );
  draw(business.name, c.business.name.x, c.business.name.y);
  draw(business.phone, c.business.phone.x, c.business.phone.y);
  draw(business.fax || "", c.business.fax.x, c.business.fax.y);
  draw(
    business.address,
    c.business.address.x,
    c.business.address.y,
    SMALL_FONT_SIZE
  );
  draw(business.zipCode || "", c.business.zipCode.x, c.business.zipCode.y);

  // 근로자 행 (최대 4명)
  reports.slice(0, 4).forEach((report, i) => {
    const baseY = c.rowStartY - i * c.rowHeight;
    const e = report.employee;
    const emp = c.employee;

    draw(e.name, emp.name.x, baseY + emp.name.dy);
    draw(e.residentNumber, emp.residentNumber.x, baseY + emp.residentNumber.dy);
    draw(e.phone || "", emp.phone.x, baseY + emp.phone.dy);
    draw(report.lossDate, emp.lossDate.x, baseY + emp.lossDate.dy);
    draw(
      report.pensionLossCode,
      emp.pensionLossCode.x,
      baseY + emp.pensionLossCode.dy
    );
    draw(
      report.healthLossCode,
      emp.healthLossCode.x,
      baseY + emp.healthLossCode.dy
    );
    draw(
      report.currentYearSalary.toLocaleString(),
      emp.currentYearSalary.x,
      baseY + emp.currentYearSalary.dy,
      SMALL_FONT_SIZE
    );
    draw(
      String(report.currentYearMonths),
      emp.currentYearMonths.x,
      baseY + emp.currentYearMonths.dy
    );
    if (report.prevYearSalary) {
      draw(
        report.prevYearSalary.toLocaleString(),
        emp.prevYearSalary.x,
        baseY + emp.prevYearSalary.dy,
        SMALL_FONT_SIZE
      );
    }
    if (report.prevYearMonths) {
      draw(
        String(report.prevYearMonths),
        emp.prevYearMonths.x,
        baseY + emp.prevYearMonths.dy
      );
    }
    draw(
      report.lossReason,
      emp.lossReason.x,
      baseY + emp.lossReason.dy,
      SMALL_FONT_SIZE
    );
    draw(
      report.lossReasonCode,
      emp.lossReasonCode.x,
      baseY + emp.lossReasonCode.dy
    );

    // 고용/산재 보수총액
    draw(
      report.employmentCurrentSalary.toLocaleString(),
      emp.empCurrentSalary.x,
      baseY + emp.empCurrentSalary.dy,
      SMALL_FONT_SIZE
    );
    if (report.employmentPrevSalary) {
      draw(
        report.employmentPrevSalary.toLocaleString(),
        emp.empPrevSalary.x,
        baseY + emp.empPrevSalary.dy,
        SMALL_FONT_SIZE
      );
    }
    draw(
      report.industrialCurrentSalary.toLocaleString(),
      emp.indCurrentSalary.x,
      baseY + emp.indCurrentSalary.dy,
      SMALL_FONT_SIZE
    );
    if (report.industrialPrevSalary) {
      draw(
        report.industrialPrevSalary.toLocaleString(),
        emp.indPrevSalary.x,
        baseY + emp.indPrevSalary.dy,
        SMALL_FONT_SIZE
      );
    }

    // 연금보험료 첫달 납부 체크박스
    if (report.pensionFirstMonthPay) {
      draw(CHECK, c.checkmarks.pensionPay.x, baseY + c.checkmarks.pensionPay.dy);
    }
  });

  // 신고일자
  const today = new Date();
  draw(
    `${today.getFullYear()}    ${today.getMonth() + 1}    ${today.getDate()}`,
    c.signature.date.x,
    c.signature.date.y
  );

  return pdfDoc.save();
}

// 브라우저에서 PDF 다운로드 헬퍼
export function downloadPdf(pdfBytes: Uint8Array, filename: string): void {
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
