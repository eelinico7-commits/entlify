/**
 * 从 Obsidian 06-公开发布 同步笔记数据到网站可用的 JSON
 *
 * 用法: node scripts/sync-obsidian.mjs
 * 会在构建前自动运行（通过 prebuild hook）
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join, relative } from "path";
import matter from "gray-matter";

const OBSIDIAN_PATH = "C:/Users/DELL/Desktop/杨存邦ob/06-公开发布";
const OUTPUT_PATH = "src/data/notes.json";

// 需要展示的分类（按此顺序排列）
const DISPLAY_CATEGORIES = ["AI工具实战", "项目实践复盘", "个人IP定位", "学生成长路径"];

function slugify(name) {
  // 基于完整路径生成固定短 hash
  let hash = 0;
  for (const c of name) {
    hash = ((hash << 5) - hash + c.charCodeAt(0)) | 0;
  }
  return `note-${Math.abs(hash).toString(36)}`;
}

function formatDate(raw) {
  if (!raw) return "未知";
  // gray-matter 可能会把 YYYY-MM-DD 解析成 Date 对象
  if (raw instanceof Date && !isNaN(raw)) {
    return `${raw.getFullYear()} 年 ${raw.getMonth() + 1} 月`;
  }
  // 已经是字符串的情况
  const str = String(raw);
  const m = str.match(/^(\d{4})[-\/](\d{1,2})/);
  if (m) return `${m[1]} 年 ${parseInt(m[2])} 月`;
  return str;
}

function estimateReadTime(text) {
  // 中文字符 ~250字/分钟, 英文 ~200词/分钟
  const chineseChars = (text.match(/[一-鿿]/g) || []).length;
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
  const totalMinutes = chineseChars / 250 + englishWords / 200;
  return Math.max(1, Math.round(totalMinutes));
}

function collectNotes(dir, notes = []) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      collectNotes(fullPath, notes);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const raw = readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);

      // 只收录 public: true 的笔记
      if (data.public !== true) continue;

      // 排除 README
      if (entry.name.toUpperCase() === "README.MD") continue;

      // 只收录指定分类
      if (!DISPLAY_CATEGORIES.includes(data.category)) continue;

      // 相对路径作为 slug 的一部分，避免同名冲突
      const relPath = relative(OBSIDIAN_PATH, fullPath);
      const slug = slugify(relPath);

      notes.push({
        slug,
        title: data.title || entry.name.replace(/\.md$/, ""),
        date: formatDate(data.date),
        category: data.category || "未分类",
        summary: data.summary || "",
        content,
        readTime: data.readTime || `${estimateReadTime(content)} min`,
      });
    }
  }

  return notes;
}

// 确保目录存在
const outDir = join(process.cwd(), "src/data");
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

if (!existsSync(OBSIDIAN_PATH)) {
  console.warn(`⚠ Obsidian path not found: ${OBSIDIAN_PATH}`);
  console.warn("  Creating empty notes.json. Run this script on your local machine to sync.");
  writeFileSync(join(process.cwd(), OUTPUT_PATH), JSON.stringify([], null, 2), "utf-8");
  process.exit(0);
}

const notes = collectNotes(OBSIDIAN_PATH);

// 按分类排序
notes.sort((a, b) => {
  const ai = DISPLAY_CATEGORIES.indexOf(a.category);
  const bi = DISPLAY_CATEGORIES.indexOf(b.category);
  return ai - bi;
});

writeFileSync(join(process.cwd(), OUTPUT_PATH), JSON.stringify(notes, null, 2), "utf-8");
console.log(`✅ Synced ${notes.length} notes from Obsidian → ${OUTPUT_PATH}`);
