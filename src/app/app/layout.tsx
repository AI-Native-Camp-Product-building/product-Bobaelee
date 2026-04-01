import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0f1a' }}>
      <nav className="border-b border-white/10 px-6 py-4" style={{ backgroundColor: 'rgba(10, 15, 26, 0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            신고해죠
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/app" className="text-gray-400 hover:text-success-300 transition-colors">
              대시보드
            </Link>
            <Link href="/app/report" className="text-gray-400 hover:text-success-300 transition-colors">
              신고서 작성
            </Link>
            <Link href="/app/setup" className="text-gray-400 hover:text-success-300 transition-colors">
              사업장 설정
            </Link>
            <Link href="/app/upload" className="text-gray-400 hover:text-success-300 transition-colors">
              엑셀 업로드
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto py-8 px-6">{children}</main>
    </div>
  );
}
