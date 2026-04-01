import type { BusinessInfo, EmployeeInfo, ReportHistory } from "@/types";

const KEYS = {
  business: "singohejwo_business",
  employees: "singohejwo_employees",
  history: "singohejwo_history",
} as const;

// 사업장 정보
export function getBusinessInfo(): BusinessInfo | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(KEYS.business);
  return data ? JSON.parse(data) : null;
}

export function saveBusinessInfo(info: BusinessInfo): void {
  localStorage.setItem(KEYS.business, JSON.stringify(info));
}

// 직원 목록
export function getEmployees(): EmployeeInfo[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(KEYS.employees);
  return data ? JSON.parse(data) : [];
}

export function saveEmployees(employees: EmployeeInfo[]): void {
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function addEmployee(employee: EmployeeInfo): void {
  const employees = getEmployees();
  employees.push(employee);
  saveEmployees(employees);
}

// 신고 이력
export function getHistory(): ReportHistory[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(KEYS.history);
  return data ? JSON.parse(data) : [];
}

export function addHistory(entry: ReportHistory): void {
  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem(KEYS.history, JSON.stringify(history));
}
