"use client";

import { useEffect, useState } from "react";

type Message = {
  id: number;
  name: string;
  content: string;
  created_at: string;
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/admin/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then(({ messages: nextMessages, error }) => {
        if (error) console.error(error);
        else setMessages(nextMessages ?? []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [authenticated, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const { valid } = await res.json();
    if (valid) {
      setAuthenticated(true);
      setPasswordError(false);
      setLoading(true);
    } else {
      setPasswordError(true);
      setPassword("");
    }
  };

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg-primary p-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/[0.06] bg-bg-card p-8 shadow-card">
          <h1 className="mb-2 text-xl font-semibold tracking-tight text-text-primary">
            留言管理
          </h1>
          <p className="mb-6 text-sm text-text-secondary">请输入管理员密码</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 focus:border-accent-primary/50 focus:bg-white/[0.05]"
              autoFocus
            />
            {passwordError && (
              <p className="text-xs text-red-400">访问密码错误</p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl border border-accent-primary/20 bg-gradient-to-b from-accent-primary/15 to-accent-primary/5 px-6 py-3 text-sm font-medium text-accent-secondary transition-all duration-300 hover:border-accent-primary/40 hover:from-accent-primary/25 hover:to-accent-primary/10"
            >
              验证
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary p-6 text-text-primary sm:p-10">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">留言管理</h1>
      <p className="mb-8 text-sm text-text-secondary">
        共 {messages.length} 条留言
      </p>

      {loading ? (
        <p className="text-sm text-text-muted">加载中...</p>
      ) : messages.length === 0 ? (
        <p className="text-sm text-text-muted">暂无留言</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl border border-white/[0.06] bg-bg-card p-5"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">{msg.name}</span>
                <span className="text-xs text-text-muted">
                  {new Date(msg.created_at).toLocaleString("zh-CN")}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {msg.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
