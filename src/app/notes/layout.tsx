import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export const metadata: Metadata = {
  title: "破局日记 | 杨存邦",
  description:
    "记录一个大学生用 AI、内容与项目实践不断升级自己的过程。",
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      <ScrollProgressBar />
      <NavBar />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 sm:px-10">
        {children}
      </div>
      <Footer />
    </main>
  );
}
