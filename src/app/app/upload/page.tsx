import CsvUploader from "@/components/app/CsvUploader";

export default function UploadPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">엑셀 업로드</h1>
        <p className="text-gray-400 text-sm">
          관리하던 엑셀을 CSV로 변환 후 업로드하면, 직원 정보를 자동으로 가져옵니다.
        </p>
      </div>
      <CsvUploader />
    </div>
  );
}
