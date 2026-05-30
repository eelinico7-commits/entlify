import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yangcunbang.icu"),
  title: "杨存邦 | 医学生 & AI 内容实践者",
  description:
    "杨存邦的个人作品集 —— 一个医学生记录 AI 工具、校园 IP、社群运营与项目实践。",
  openGraph: {
    title: "杨存邦 | 医学生 & AI 内容实践者",
    description:
      "从医学学习、AI 工具到校园项目实践，一个大学生的成长记录与作品集。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "杨存邦",
  alternateName: "Yang Cunbang",
  description: "医学生 / AI内容创作者 / 校园项目实践者",
  url: "https://yangcunbang.icu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
