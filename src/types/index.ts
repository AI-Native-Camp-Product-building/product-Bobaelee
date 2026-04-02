// 사업장 정보
export interface BusinessInfo {
  managementNumber: string; // 사업장관리번호
  name: string; // 명칭
  subName?: string; // 단위사업장 명칭
  branchName?: string; // 영업소 명칭
  address: string; // 소재지
  zipCode: string; // 우편번호
  phone: string; // 전화번호
  fax?: string; // 팩스번호
  representative: string; // 대표자명
  sido: string; // 시/도
  sigungu: string; // 시/군/구
}

// 직원 정보
export interface EmployeeInfo {
  name: string;
  residentNumber: string; // 주민등록번호
  phone?: string;
  nationality?: string; // 외국인만
  visaStatus?: string; // 외국인만
  isRepresentative: boolean;
  monthlySalary: number; // 보수월액
  weeklyWorkHours: number; // 1주 소정근로시간
  isContract: boolean;
  contractEndDate?: string; // YYYY.MM
  kecoCode: string; // KECO 직종코드
}

// 취득 신고
export interface AcquisitionReport {
  type: "acquisition";
  employee: EmployeeInfo;
  acquisitionDate: string; // YYYY.MM.DD
  pensionCode: string;
  healthCode: string;
  healthReductionCode?: string;
  insuranceChargeCode?: string;
  insuranceChargeReason?: string;
  selectedInsurance: {
    pension: boolean;
    health: boolean;
    employment: boolean;
    industrial: boolean;
  };
  dependents?: Dependent[]; // 피부양자 목록 (건강보험)
}

// 상실 신고
export interface LossReport {
  type: "loss";
  employee: EmployeeInfo;
  lossDate: string; // YYYY.MM.DD (퇴사일+1)
  pensionLossCode: string;
  pensionFirstMonthPay: boolean;
  healthLossCode: string;
  currentYearSalary: number;
  currentYearMonths: number;
  prevYearSalary?: number;
  prevYearMonths?: number;
  lossReason: string;
  lossReasonCode: string;
  employmentCurrentSalary: number;
  employmentPrevSalary?: number;
  industrialCurrentSalary: number;
  industrialPrevSalary?: number;
}

// 피부양자 정보 (건강보험)
export interface Dependent {
  relation: string; // 가입자와의 관계 (배우자, 부, 모, 자녀 등)
  name: string;
  residentNumber: string;
  disabilityCode?: string; // 장애인 종별부호
  disabilityRegDate?: string; // 등록일 YYYY.MM.DD
  nationality?: string; // 외국인만
  visaStatus?: string; // 외국인만
  visaPeriod?: string; // 체류기간
}

export type Report = AcquisitionReport | LossReport;

// 관할지사 정보
export interface OfficeInfo {
  institution: string;
  officeName: string;
  address: string;
  phone: string;
  fax: string;
}

export interface RegionOffices {
  sido: string;
  sigungu: string;
  offices: OfficeInfo[];
}

// 신고 이력
export interface ReportHistory {
  id: string;
  createdAt: string;
  type: "acquisition" | "loss";
  employeeName: string;
  status: "generated" | "faxSent" | "downloaded";
  faxNumber?: string;
}
