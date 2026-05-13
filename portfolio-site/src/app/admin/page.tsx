"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://weyhuopnfwdryokojkva.supabase.co",
  "sb_publishable_lm3y_VvHpRKVSFPLNojKPA_OSJuhgOO"
);

type Message = {
  id: number;
  name: string;
  content: string;
  created_at: string;
};

export default function AdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setMessages(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-6 text-[#f0eee6] sm:p-10">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">留言管理</h1>
      <p className="mb-8 text-sm text-[#94a3b8]">
        共 {messages.length} 条留言
      </p>

      {loading ? (
        <p className="text-sm text-[#5c5a52]">加载中...</p>
      ) : messages.length === 0 ? (
        <p className="text-sm text-[#5c5a52]">暂无留言</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl border border-white/[0.06] bg-[#141414] p-5"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">{msg.name}</span>
                <span className="text-xs text-[#5c5a52]">
                  {new Date(msg.created_at).toLocaleString("zh-CN")}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#94a3b8]">
                {msg.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
