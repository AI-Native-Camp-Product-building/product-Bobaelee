import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "신고해죠 — 4대보험 신고 자동화",
  description:
    "직원 정보만 연동하면 4대보험 신고서를 자동 작성하고 관할 지사에 FAX를 발송하는 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard Variable 폰트 (CDN) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-pretendard antialiased">{children}</body>
    </html>
  );
}
