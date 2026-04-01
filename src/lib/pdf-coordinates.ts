// 취득신고서 좌표 (A4 가로 841.89 x 595.28 pt)
export const ACQUISITION_COORDS = {
  // 사업장 정보 (상단 영역)
  business: {
    managementNumber: { x: 148, y: 510 },
    name: { x: 305, y: 510 },
    subName: { x: 525, y: 510 },
    branchName: { x: 695, y: 510 },
    address: { x: 148, y: 490 },
    zipCode: { x: 718, y: 490 },
    phone: { x: 148, y: 470 },
    fax: { x: 418, y: 470 },
  },
  // 근로자 행 설정
  rowStartY: 395,
  rowHeight: 62,
  // 근로자별 필드 (dy는 행 기준 상대 오프셋)
  employee: {
    name: { x: 68, dy: 20 },
    residentNumber: { x: 68, dy: 5 },
    nationality: { x: 168, dy: 5 },
    monthlySalary: { x: 268, dy: 12 },
    acquisitionDate: { x: 338, dy: 12 },
    pensionCode: { x: 398, dy: 12 },
    healthCode: { x: 498, dy: 12 },
    kecoCode: { x: 638, dy: 12 },
    weeklyHours: { x: 678, dy: 12 },
    contractEnd: { x: 718, dy: 12 },
  },
  checkmarks: {
    representativeYes: { x: 228, dy: 20 },
    representativeNo: { x: 228, dy: 5 },
    pension: { x: 398, dy: 35 },
    health: { x: 498, dy: 35 },
    employment: { x: 638, dy: 35 },
    industrial: { x: 638, dy: 25 },
  },
  signature: {
    date: { x: 598, y: 112 },
  },
} as const;

// 상실신고서 좌표
export const LOSS_COORDS = {
  business: {
    managementNumber: { x: 148, y: 510 },
    name: { x: 305, y: 510 },
    phone: { x: 528, y: 510 },
    fax: { x: 678, y: 510 },
    address: { x: 148, y: 490 },
    zipCode: { x: 718, y: 490 },
  },
  rowStartY: 395,
  rowHeight: 62,
  employee: {
    name: { x: 68, dy: 12 },
    residentNumber: { x: 148, dy: 12 },
    phone: { x: 248, dy: 12 },
    lossDate: { x: 318, dy: 12 },
    pensionLossCode: { x: 378, dy: 12 },
    healthLossCode: { x: 448, dy: 12 },
    currentYearSalary: { x: 488, dy: 12 },
    currentYearMonths: { x: 538, dy: 12 },
    prevYearSalary: { x: 558, dy: 12 },
    prevYearMonths: { x: 608, dy: 12 },
    lossReason: { x: 638, dy: 12 },
    lossReasonCode: { x: 728, dy: 12 },
    empCurrentSalary: { x: 755, dy: 20 },
    empPrevSalary: { x: 790, dy: 20 },
    indCurrentSalary: { x: 755, dy: 5 },
    indPrevSalary: { x: 790, dy: 5 },
  },
  checkmarks: {
    pensionPay: { x: 415, dy: 12 },
  },
  signature: {
    date: { x: 598, y: 112 },
  },
} as const;
