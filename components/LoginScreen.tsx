"use client";

import { useState } from "react";
import { Eye, EyeOff, PawPrint } from "lucide-react";

export default function LoginScreen({
  onLogin,
  onRegister,
  onGuest,
}: {
  onLogin: () => void;
  onRegister: () => void;
  onGuest: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail.includes("@")) {
      setError("请输入有效邮箱");
      return;
    }

    if (normalizedPassword.length < 6) {
      setError("密码至少需要 6 位");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password: normalizedPassword,
        }),
      });

      const text = await res.text();

      let data: { user?: { id: string; email: string }; error?: string };

      try {
        data = JSON.parse(text);
      } catch {
        console.error("后端返回的不是 JSON:", text);
        setError("后端接口没有正常返回 JSON，请检查 API route");
        return;
      }

      if (!res.ok) {
        setError(data.error || "登录失败");
        return;
      }

      if (!data.user) {
        setError("登录成功但没有返回用户信息");
        return;
      }

      localStorage.setItem("pawflow-current-user", JSON.stringify(data.user));
      onLogin();
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("登录请求失败，请确认 npm run dev 正在运行");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full bg-[#fffaf1] px-6 flex flex-col justify-center">
      <div className="mx-auto h-20 w-20 rounded-[28px] bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-xl shadow-orange-200">
        <PawPrint className="h-10 w-10 text-white" />
      </div>

      <h1 className="mt-8 text-center text-3xl font-bold text-zinc-900">
        欢迎回到 PawFlow
      </h1>

      <p className="mt-3 text-center text-sm text-zinc-500">
        登录后继续查看你的宠物档案和周末计划。
      </p>

      <div className="mt-8 space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="请输入邮箱"
          className="w-full rounded-2xl bg-white px-4 py-4 text-sm text-zinc-900 outline-none shadow-sm placeholder:text-zinc-400"
        />

        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            type={showPassword ? "text" : "password"}
            className="w-full rounded-2xl bg-white px-4 py-4 pr-12 text-sm text-zinc-900 outline-none shadow-sm placeholder:text-zinc-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-center text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 w-full rounded-2xl bg-zinc-900 py-4 font-semibold text-white disabled:opacity-60"
      >
        {loading ? "登录中..." : "登录"}
      </button>

      <button
        onClick={onRegister}
        className="mt-4 w-full rounded-2xl bg-white py-4 font-semibold text-orange-600 shadow-sm"
      >
        创建新账号
      </button>

      <button
        onClick={onGuest}
        className="mt-5 text-sm font-medium text-zinc-500"
      >
        先以游客身份体验
      </button>
    </div>
  );
}