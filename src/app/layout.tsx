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
  title: "杨存邦 | AIGC Developer & Explorer",
  description:
    "杨存邦的个人作品集 —— AIGC开发者 / 美团AIGC俱乐部主席 / 新东方校园大使 / 极客与探索者",
  openGraph: {
    title: "杨存邦 | AIGC Developer & Explorer",
    description:
      "复合型人才 · 极客精神 · 商业思维 —— 从校园到领航者的成长轨迹",
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
  description: "AIGC开发者 / 美团AIGC俱乐部主席 / 新东方校园大使 / 医学生",
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
