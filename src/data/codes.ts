// 국민연금 취득 부호
export const PENSION_ACQUISITION_CODES = [
  { code: "01", label: "18세이상당연취득" },
  { code: "03", label: "18세미만" },
  { code: "09", label: "전입" },
  { code: "11", label: "대학강사" },
  { code: "12", label: "60시간미만신청" },
  { code: "14", label: "일용근로자" },
  { code: "15", label: "상실취소" },
] as const;

// 건강보험 취득 부호
export const HEALTH_ACQUISITION_CODES = [
  { code: "00", label: "최초취득" },
  { code: "04", label: "의료급여제외" },
  { code: "05", label: "직장가입자변경" },
  { code: "06", label: "직장피부양자상실" },
  { code: "07", label: "지역가입자변경" },
  { code: "10", label: "유공자신청" },
  { code: "13", label: "기타" },
  { code: "14", label: "거주불명재등록" },
  { code: "29", label: "이중가입" },
  { code: "30", label: "상실취소" },
] as const;

// 건강보험 보험료 경감 부호
export const HEALTH_REDUCTION_CODES = [
  { code: "", label: "해당없음" },
  { code: "11", label: "해외근무전액" },
  { code: "12", label: "해외근무반액" },
  { code: "21", label: "현역군입대" },
  { code: "22", label: "상근예비역현역입대" },
  { code: "24", label: "상근예비역근무" },
  { code: "31", label: "시설수용교도소" },
  { code: "32", label: "시설수용기타" },
  { code: "41", label: "섬벽지사업장" },
  { code: "42", label: "섬벽지거주지" },
  { code: "81", label: "휴직" },
] as const;

// 국민연금 상실 부호
export const PENSION_LOSS_CODES = [
  { code: "1", label: "사망" },
  { code: "3", label: "사용관계종료" },
  { code: "4", label: "국적상실" },
  { code: "5", label: "60세도달" },
  { code: "6", label: "다른공적연금" },
  { code: "9", label: "전출" },
  { code: "15", label: "노령연금수급권" },
  { code: "16", label: "협정국연금" },
  { code: "19", label: "체류기간만료" },
  { code: "20", label: "적용제외체류자격" },
  { code: "21", label: "무보수대표이사" },
  { code: "22", label: "근로자제외" },
  { code: "26", label: "취득취소" },
] as const;

// 건강보험 상실 부호
export const HEALTH_LOSS_CODES = [
  { code: "01", label: "퇴직" },
  { code: "02", label: "사망" },
  { code: "04", label: "의료급여수급권자" },
  { code: "10", label: "유공자배제신청" },
  { code: "13", label: "그밖의사유" },
  { code: "16", label: "취득취소" },
  { code: "17", label: "국적상실" },
  { code: "19", label: "이민출국" },
  { code: "24", label: "가입제외외국법령" },
  { code: "25", label: "가입제외외국보험" },
  { code: "26", label: "가입제외사용자계약" },
  { code: "58", label: "무보수대표자" },
] as const;

// 고용보험 상실 사유 코드
export const EMPLOYMENT_LOSS_REASON_CODES = [
  { code: "11", label: "개인사정자진퇴사", category: "자진퇴사" },
  { code: "12", label: "사업장이전등자진퇴사", category: "자진퇴사" },
  { code: "22", label: "폐업도산", category: "회사사정" },
  { code: "23", label: "경영상인원감축", category: "회사사정" },
  { code: "26", label: "징계해고", category: "회사사정" },
  { code: "31", label: "정년", category: "기간만료" },
  { code: "32", label: "계약기간만료", category: "기간만료" },
  { code: "41", label: "비적용", category: "기타" },
  { code: "42", label: "이중고용", category: "기타" },
] as const;
