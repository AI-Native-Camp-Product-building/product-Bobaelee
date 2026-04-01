import SetupForm from "@/components/app/SetupForm";

export default function SetupPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">사업장 정보 설정</h1>
      <div className="glass-card rounded-2xl p-6">
        <p className="text-gray-400 mb-6">
          최초 1회 입력하면 이후 신고서에 자동으로 반영됩니다.
        </p>
        <SetupForm />
      </div>
    </div>
  );
}
