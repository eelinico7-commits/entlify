import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import notes from "@/data/notes.json";

// 生成静态路径
export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

// SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) return { title: "未找到" };
  return {
    title: `${note.title} | 破局日记`,
    description: note.summary,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  return (
    <article>
      {/* Back link */}
      <Link
        href="/#blog"
        className="mb-8 inline-flex items-center gap-1 text-xs text-text-muted/80 transition-colors hover:text-accent-secondary"
      >
        ← 返回破局日记
      </Link>

      {/* Meta */}
      <div className="mb-2 mt-4 flex items-center gap-2">
        <span className="rounded-md border border-accent-primary/20 bg-accent-primary/[0.14] px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-accent-secondary/90">
          {note.category}
        </span>
        <span className="text-[10px] text-text-muted/80">
          {note.date} · {note.readTime}
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-8 text-xl font-bold text-text-primary sm:text-2xl">
        {note.title}
      </h1>

      {/* Content */}
      <div className="prose-config">
        <Markdown remarkPlugins={[remarkGfm]}>{note.content}</Markdown>
      </div>

      {/* Bottom back link */}
      <div className="mt-16 border-t border-white/[0.10] pt-8">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1 text-sm text-text-muted/80 transition-colors hover:text-accent-secondary"
        >
          ← 返回破局日记
        </Link>
      </div>
    </article>
  );
}
