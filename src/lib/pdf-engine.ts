import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { BusinessInfo, AcquisitionReport, LossReport, Dependent } from "@/types";
import { ACQUISITION_COORDS, DEPENDENT_COORDS, LOSS_COORDS } from "./pdf-coordinates";

const FONT_SIZE = 8;
const SMALL_FONT_SIZE = 7;
const CHECK_SIZE = 9;
const CHECK = "V";

let cachedFont: ArrayBuffer | null = null;

async function loadKoreanFont(): Promise<ArrayBuffer> {
  if (cachedFont) return cachedFont;
  // pdf-lib는 TTF만 안정적으로 지원 (OTF CFF 글리프 파싱 에러 발생)
  // Spoqa Han Sans Neo TTF 사용
  const res = await fetch(
    "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf"
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

  // 2~4페이지 삭제 (인덱스 1,2,3) — 뒤에서부터 삭제해야 인덱스 안 밀림
  const pageCount = pdfDoc.getPageCount();
  if (pageCount >= 5) {
    pdfDoc.removePage(3); // 원래 4페이지 (KECO표)
    pdfDoc.removePage(2); // 원래 3페이지 (취득부호 등)
    pdfDoc.removePage(1); // 원래 2페이지 (첨부서류)
  }

  // 피부양자가 없으면 5페이지(현재 인덱스 1)도 삭제
  const hasDependents = reports.some(
    (r) => r.dependents && r.dependents.length > 0
  );
  if (!hasDependents && pdfDoc.getPageCount() > 1) {
    pdfDoc.removePage(1);
  }

  const page = pdfDoc.getPages()[0];
  const c = ACQUISITION_COORDS;

  // 텍스트 그리기 헬퍼
  const draw = (text: string, x: number, y: number, size = FONT_SIZE) => {
    if (!text) return;
    page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
  };

  // 체크마크 헬퍼
  const check = (x: number, y: number) => {
    page.drawText(CHECK, { x, y, size: CHECK_SIZE, font, color: rgb(0, 0, 0) });
  };

  // ===== 상단 보험종류 체크 =====
  const anyPension = reports.some((r) => r.selectedInsurance.pension);
  const anyHealth = reports.some((r) => r.selectedInsurance.health);
  const anyEmployment = reports.some((r) => r.selectedInsurance.employment);
  const anyIndustrial = reports.some((r) => r.selectedInsurance.industrial);

  if (anyPension) check(c.insuranceCheck.pension.x, c.insuranceCheck.pension.y);
  if (anyHealth) check(c.insuranceCheck.health.x, c.insuranceCheck.health.y);
  if (anyEmployment) check(c.insuranceCheck.employment.x, c.insuranceCheck.employment.y);
  if (anyIndustrial) check(c.insuranceCheck.industrial.x, c.insuranceCheck.industrial.y);

  // ===== 사업장 정보 =====
  draw(business.managementNumber, c.business.managementNumber.x, c.business.managementNumber.y);
  draw(business.name, c.business.name.x, c.business.name.y);
  draw(business.subName || "", c.business.subName.x, c.business.subName.y);
  draw(business.branchName || "", c.business.branchName.x, c.business.branchName.y);
  draw(business.address, c.business.address.x, c.business.address.y, SMALL_FONT_SIZE);
  draw(business.zipCode, c.business.zipCode.x, c.business.zipCode.y);
  draw(business.phone, c.business.phone.x, c.business.phone.y);
  draw(business.fax || "", c.business.fax.x, c.business.fax.y);

  // ===== 근로자 행 (최대 4명) =====
  reports.slice(0, 4).forEach((report, i) => {
    const baseY = c.rowStartY - i * c.rowHeight;
    const e = report.employee;
    const emp = c.employee;
    const chk = c.checkmarks;

    // 상단 서브행: 성명, 소득액, 취득일
    draw(e.name, emp.name.x, baseY - emp.name.dy);
    draw(
      e.monthlySalary.toLocaleString(),
      emp.monthlySalary.x,
      baseY - emp.monthlySalary.dy,
      SMALL_FONT_SIZE
    );
    draw(report.acquisitionDate, emp.acquisitionDate.x, baseY - emp.acquisitionDate.dy, SMALL_FONT_SIZE);

    // 하단 서브행: 주민번호, 부호 값
    draw(e.residentNumber, emp.residentNumber.x, baseY - emp.residentNumber.dy, SMALL_FONT_SIZE);
    if (e.nationality) {
      draw(e.nationality, emp.nationality.x, baseY - emp.nationality.dy, SMALL_FONT_SIZE);
    }
    draw(report.pensionCode, emp.pensionCode.x, baseY - emp.pensionCode.dy);
    draw(report.healthCode, emp.healthCode.x, baseY - emp.healthCode.dy);
    draw(e.kecoCode, emp.kecoCode.x, baseY - emp.kecoCode.dy);
    draw(
      String(e.weeklyWorkHours),
      emp.weeklyHours.x,
      baseY - emp.weeklyHours.dy
    );
    if (e.isContract && e.contractEndDate) {
      draw(e.contractEndDate, emp.contractEnd.x, baseY - emp.contractEnd.dy);
    } else {
      draw("-", emp.contractEnd.x, baseY - emp.contractEnd.dy);
    }
    if (report.insuranceChargeCode) {
      draw(report.insuranceChargeCode, emp.chargeCode.x, baseY - emp.chargeCode.dy);
    }
    if (report.insuranceChargeReason) {
      draw(report.insuranceChargeReason, emp.chargeReason.x, baseY - emp.chargeReason.dy, SMALL_FONT_SIZE);
    }

    // 대표자 여부 체크
    if (e.isRepresentative) {
      check(chk.representativeYes.x, baseY - chk.representativeYes.dy);
    } else {
      check(chk.representativeNo.x, baseY - chk.representativeNo.dy);
    }

    // 보험 종류 체크
    if (report.selectedInsurance.pension) {
      check(chk.pension.x, baseY - chk.pension.dy);
      // 취득 월 납부 희망은 체크하지 않음
    }
    if (report.selectedInsurance.health) {
      check(chk.health.x, baseY - chk.health.dy);
    }
    // 피부양자 신청 체크
    if (report.dependents && report.dependents.length > 0) {
      check(chk.dependentRequest.x, baseY - chk.dependentRequest.dy);
    }
    if (report.selectedInsurance.employment) {
      check(chk.employment.x, baseY - chk.employment.dy);
    }
    if (report.selectedInsurance.industrial) {
      check(chk.industrial.x, baseY - chk.industrial.dy);
    }

    // 계약직 여부 체크
    if (e.isContract) {
      check(chk.contractYes.x, baseY - chk.contractYes.dy);
    } else {
      check(chk.contractNo.x, baseY - chk.contractNo.dy);
    }
  });

  // 신고일자
  const today = new Date();
  draw(
    `${today.getFullYear()}      ${today.getMonth() + 1}      ${today.getDate()}`,
    c.signature.date.x,
    c.signature.date.y
  );

  // ===== 피부양자 페이지 =====
  if (hasDependents && pdfDoc.getPageCount() > 1) {
    const depPage = pdfDoc.getPages()[1];
    const dc = DEPENDENT_COORDS;

    const drawDep = (text: string, x: number, y: number, size = FONT_SIZE) => {
      if (!text) return;
      depPage.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
    };

    // 각 근로자의 피부양자 기입
    let depRowIndex = 0;
    reports.forEach((report) => {
      if (!report.dependents || report.dependents.length === 0) return;

      // 가입자 정보 (첫 번째 피부양자 있는 근로자 기준)
      if (depRowIndex === 0) {
        drawDep(report.employee.name, dc.subscriberName.x, dc.subscriberName.y);
        drawDep(
          report.employee.residentNumber,
          dc.subscriberResidentNumber.x,
          dc.subscriberResidentNumber.y
        );
      }

      report.dependents.forEach((dep: Dependent) => {
        if (depRowIndex >= 5) return; // 최대 5명
        const depY = dc.rowStartY - depRowIndex * dc.rowHeight;
        const d = dc.dependent;

        drawDep(dep.relation, d.relation.x, depY - d.relation.dy);
        drawDep(dep.name, d.name.x, depY - d.name.dy);
        drawDep(dep.residentNumber, d.residentNumber.x, depY - d.residentNumber.dy, SMALL_FONT_SIZE);
        if (dep.disabilityCode) {
          drawDep(dep.disabilityCode, d.disabilityCode.x, depY - d.disabilityCode.dy);
        }
        if (dep.disabilityRegDate) {
          drawDep(dep.disabilityRegDate, d.disabilityRegDate.x, depY - d.disabilityRegDate.dy, SMALL_FONT_SIZE);
        }
        if (dep.nationality) {
          drawDep(dep.nationality, d.nationality.x, depY - d.nationality.dy);
        }
        if (dep.visaStatus) {
          drawDep(dep.visaStatus, d.visaStatus.x, depY - d.visaStatus.dy);
        }
        if (dep.visaPeriod) {
          drawDep(dep.visaPeriod, d.visaPeriod.x, depY - d.visaPeriod.dy, SMALL_FONT_SIZE);
        }

        depRowIndex++;
      });
    });

    // 피부양자 페이지 신고일자
    const todayDep = new Date();
    drawDep(
      `${todayDep.getFullYear()}      ${todayDep.getMonth() + 1}      ${todayDep.getDate()}`,
      dc.signature.date.x,
      dc.signature.date.y
    );
  }

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

  const draw = (text: string, x: number, y: number, size = FONT_SIZE) => {
    if (!text) return;
    page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
  };

  // 사업장 정보
  draw(business.managementNumber, c.business.managementNumber.x, c.business.managementNumber.y);
  draw(business.name, c.business.name.x, c.business.name.y);
  draw(business.phone, c.business.phone.x, c.business.phone.y);
  draw(business.fax || "", c.business.fax.x, c.business.fax.y);
  draw(business.address, c.business.address.x, c.business.address.y, SMALL_FONT_SIZE);
  draw(business.zipCode || "", c.business.zipCode.x, c.business.zipCode.y);

  // 근로자 행 (최대 4명)
  reports.slice(0, 4).forEach((report, i) => {
    const baseY = c.rowStartY - i * c.rowHeight;
    const e = report.employee;
    const emp = c.employee;

    draw(e.name, emp.name.x, baseY - emp.name.dy);
    draw(e.residentNumber, emp.residentNumber.x, baseY - emp.residentNumber.dy);
    draw(e.phone || "", emp.phone.x, baseY - emp.phone.dy);
    draw(report.lossDate, emp.lossDate.x, baseY - emp.lossDate.dy);
    draw(report.pensionLossCode, emp.pensionLossCode.x, baseY - emp.pensionLossCode.dy);
    draw(report.healthLossCode, emp.healthLossCode.x, baseY - emp.healthLossCode.dy);
    draw(
      report.currentYearSalary.toLocaleString(),
      emp.currentYearSalary.x,
      baseY - emp.currentYearSalary.dy,
      SMALL_FONT_SIZE
    );
    draw(String(report.currentYearMonths), emp.currentYearMonths.x, baseY - emp.currentYearMonths.dy);
    if (report.prevYearSalary) {
      draw(
        report.prevYearSalary.toLocaleString(),
        emp.prevYearSalary.x,
        baseY - emp.prevYearSalary.dy,
        SMALL_FONT_SIZE
      );
    }
    if (report.prevYearMonths) {
      draw(String(report.prevYearMonths), emp.prevYearMonths.x, baseY - emp.prevYearMonths.dy);
    }
    draw(report.lossReason, emp.lossReason.x, baseY - emp.lossReason.dy, SMALL_FONT_SIZE);
    draw(report.lossReasonCode, emp.lossReasonCode.x, baseY - emp.lossReasonCode.dy);

    // 고용/산재 보수총액
    draw(
      report.employmentCurrentSalary.toLocaleString(),
      emp.empCurrentSalary.x,
      baseY - emp.empCurrentSalary.dy,
      SMALL_FONT_SIZE
    );
    if (report.employmentPrevSalary) {
      draw(
        report.employmentPrevSalary.toLocaleString(),
        emp.empPrevSalary.x,
        baseY - emp.empPrevSalary.dy,
        SMALL_FONT_SIZE
      );
    }
    draw(
      report.industrialCurrentSalary.toLocaleString(),
      emp.indCurrentSalary.x,
      baseY - emp.indCurrentSalary.dy,
      SMALL_FONT_SIZE
    );
    if (report.industrialPrevSalary) {
      draw(
        report.industrialPrevSalary.toLocaleString(),
        emp.indPrevSalary.x,
        baseY - emp.indPrevSalary.dy,
        SMALL_FONT_SIZE
      );
    }

    if (report.pensionFirstMonthPay) {
      page.drawText(CHECK, {
        x: c.checkmarks.pensionPay.x,
        y: baseY - c.checkmarks.pensionPay.dy,
        size: CHECK_SIZE,
        font,
        color: rgb(0, 0, 0),
      });
    }
  });

  // 신고일자
  const today = new Date();
  draw(
    `${today.getFullYear()}      ${today.getMonth() + 1}      ${today.getDate()}`,
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
