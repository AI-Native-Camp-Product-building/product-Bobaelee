// ============================================================
// 취득신고서 좌표 (A4 가로 842 x 595 pt)
// pdf-lib 좌표계: 좌하단 원점 (y=0 하단)
// fitz→pdf-lib 변환: pdf_lib_y = 595 - fitz_y
// ============================================================
// 셀 경계 (수직선 x좌표):
// 72.0 | 150.8 | 177.1 | 219.6 | 292.4 | 337.4 | 381.8 |
// 426.2 | 473.4 | 507.2 | 544.0 | 579.5 | 617.8 | 649.9 |
// 681.1 | 718.2
// ============================================================

export const ACQUISITION_COORDS = {
  // 상단 보험종류 체크 (이미지 체크박스 위에 V 삽입)
  // fitz 좌표 → pdf-lib 변환
  insuranceCheck: {
    pension: { x: 70, y: 595 - 88 },     // 국민연금
    health: { x: 448, y: 595 - 88 },     // 건강보험
    employment: { x: 70, y: 595 - 108 },  // 고용보험
    industrial: { x: 448, y: 595 - 108 }, // 산재보험
  },

  // 사업장 정보
  business: {
    managementNumber: { x: 190, y: 595 - 176 },  // 사업장관리번호
    name: { x: 318, y: 595 - 176 },              // 명칭
    subName: { x: 558, y: 595 - 176 },           // 단위사업장 명칭
    branchName: { x: 665, y: 595 - 176 },        // 영업소 명칭
    address: { x: 140, y: 595 - 193 },           // 소재지
    zipCode: { x: 700, y: 595 - 193 },           // 우편번호
    phone: { x: 160, y: 595 - 211 },             // 전화번호
    fax: { x: 530, y: 595 - 211 },               // 팩스번호
  },

  // 근로자 행 설정
  // fitz 기준: Row1=308.4, Row2=351.6, Row3=394.8, Row4=438.1
  rowStartY: 595 - 308.4,  // pdf-lib Y (Row 1 상단)
  rowHeight: 43.2,          // 행 간격 (pdf-lib에서는 아래로 감소)

  // 각 행 내 서브행 Y 오프셋 (fitz 기준 row_top으로부터의 delta)
  // pdf-lib에서는 rowStartY에서 빼는 방식
  upperY: 316 - 308.4,   // 상단 서브행 (성명, 소득 등) = +7.6
  lowerY: 347 - 308.4,   // 하단 서브행 (주민번호, 부호 등) = +38.6

  // 근로자 데이터 필드 (x좌표 + dy는 행 상단 기준 오프셋)
  employee: {
    // 상단 서브행
    name: { x: 75, dy: 7.6 },                // 성명
    monthlySalary: { x: 225, dy: 13.6 },     // 월소득액
    acquisitionDate: { x: 295, dy: 13.6 },   // 자격취득일

    // 하단 서브행
    residentNumber: { x: 75, dy: 38.6 },     // 주민등록번호
    nationality: { x: 153, dy: 38.6 },       // 국적 (외국인)
    visaStatus: { x: 153, dy: 38.6 },        // 체류자격 (외국인)
    pensionCode: { x: 355, dy: 38.6 },       // 국민연금 취득부호
    specialJobCode: { x: 400, dy: 38.6 },    // 특수직종부호
    pensionTypeCode: { x: 445, dy: 38.6 },   // 직역연금부호
    healthCode: { x: 480, dy: 38.6 },        // 건강보험 취득부호
    reductionCode: { x: 520, dy: 38.6 },     // 감면부호
    accountCode: { x: 555, dy: 38.6 },       // 회계명/부호
    jobNameCode: { x: 592, dy: 38.6 },       // 직종명/부호
    kecoCode: { x: 625, dy: 38.6 },          // KECO 직종부호
    weeklyHours: { x: 658, dy: 38.6 },       // 1주소정근로시간
    contractEnd: { x: 688, dy: 38.6 },       // 계약종료연월
    chargeCode: { x: 722, dy: 38.6 },        // 보험료부과구분 부호
    chargeReason: { x: 752, dy: 38.6 },      // 보험료부과구분 사유
  },

  // 체크박스 (각 행 내 fitz 좌표 기준 오프셋)
  checkmarks: {
    // 대표자여부
    representativeYes: { x: 183, dy: 8 },    // [ ]예 → V
    representativeNo: { x: 183, dy: 29.6 },  // [ ]아니오 → V

    // 보험선택 (상단 서브행)
    pension: { x: 384, dy: 9.6 },            // [ ]국민연금
    // 취득 월 납부 희망은 항상 체크하지 않음
    health: { x: 478, dy: 14.6 },            // [ ]건강보험
    dependentRequest: { x: 538, dy: 11 },    // [ ]피부양자 신청
    employment: { x: 625, dy: 9.6 },         // [ ]고용보험
    industrial: { x: 625, dy: 19.6 },        // [ ]산재보험

    // 계약직 여부
    contractYes: { x: 712, dy: 9.6 },        // 계약직 [ ]예
    contractNo: { x: 737, dy: 9.6 },         // 계약직 [ ]아니오
  },

  // 서명 영역
  signature: {
    date: { x: 694, y: 595 - 509 },
  },
} as const;

// ============================================================
// 피부양자 신고서 좌표 (5페이지, A4 가로 842 x 595 pt)
// ============================================================
export const DEPENDENT_COORDS = {
  // 가입자 정보
  subscriberName: { x: 120, y: 595 - 104 },
  subscriberResidentNumber: { x: 475, y: 595 - 104 },

  // 피부양자 행 설정
  // fitz 수평선: 148.7, 161.5, 174.4, 187.1, 199.9, 212.8, 225.5
  // 셀 경계 (수직선): 106.3 | 148.0 | 228.5 | 338.6 | 410.3 | 549.8 | 619.6 | 702.4 | 730.0
  rowStartY: 595 - 155,    // 첫 번째 피부양자 행
  rowHeight: 12.8,          // 행 간격

  dependent: {
    relation: { x: 110, dy: 0 },          // 관계
    name: { x: 155, dy: 0 },              // 성명
    residentNumber: { x: 235, dy: 0 },    // 주민등록번호
    disabilityCode: { x: 360, dy: 0 },    // 장애인 종별부호
    disabilityRegDate: { x: 420, dy: 0 }, // 등록일
    nationality: { x: 580, dy: 0 },       // 국적
    visaStatus: { x: 645, dy: 0 },        // 체류자격
    visaPeriod: { x: 710, dy: 0 },        // 체류기간
  },

  // 서명 영역
  signature: {
    date: { x: 696, y: 595 - 253 },
  },
} as const;

// ============================================================
// 상실신고서 좌표 (추후 동일 방식으로 보정 예정)
// ============================================================
export const LOSS_COORDS = {
  business: {
    managementNumber: { x: 190, y: 595 - 176 },
    name: { x: 318, y: 595 - 176 },
    phone: { x: 530, y: 595 - 176 },
    fax: { x: 680, y: 595 - 176 },
    address: { x: 140, y: 595 - 193 },
    zipCode: { x: 700, y: 595 - 193 },
  },
  rowStartY: 595 - 308,
  rowHeight: 43.2,
  employee: {
    name: { x: 75, dy: 8 },
    residentNumber: { x: 155, dy: 8 },
    phone: { x: 255, dy: 8 },
    lossDate: { x: 320, dy: 8 },
    pensionLossCode: { x: 380, dy: 8 },
    healthLossCode: { x: 450, dy: 8 },
    currentYearSalary: { x: 490, dy: 8 },
    currentYearMonths: { x: 540, dy: 8 },
    prevYearSalary: { x: 560, dy: 8 },
    prevYearMonths: { x: 610, dy: 8 },
    lossReason: { x: 640, dy: 8 },
    lossReasonCode: { x: 730, dy: 8 },
    empCurrentSalary: { x: 755, dy: 16 },
    empPrevSalary: { x: 790, dy: 16 },
    indCurrentSalary: { x: 755, dy: 1 },
    indPrevSalary: { x: 790, dy: 1 },
  },
  checkmarks: {
    pensionPay: { x: 415, dy: 8 },
  },
  signature: {
    date: { x: 694, y: 595 - 509 },
  },
} as const;
