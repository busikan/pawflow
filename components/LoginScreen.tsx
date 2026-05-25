"use client";

import { PawPrint } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginScreen({
  onLogin,
  onRegister,
  onGuest,
}: {
  onLogin: () => void;
  onRegister: () => void;
  onGuest: () => void;
}) {
  return (
    // 💡 核心修改：使用 min-h-screen 确保撑满全屏，添加 items-center justify-center 垂直水平完美居中
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-[#fffaf1] to-emerald-50 px-6 flex flex-col items-center justify-center">
      

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md" // 💡 顺手加了个 max-w-md，防止在大屏幕/PC端上输入框被拉得太宽变形
      >
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-[28px] bg-orange-500 flex items-center justify-center shadow-2xl shadow-orange-200">
            <PawPrint className="h-10 w-10 text-white" />
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900">
            PawFlow
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            AI 宠物周末 life 规划助手
            <br />
            为宠物生成更适合的周末活动路线
          </p>
        </div>

        <div className="mt-9 rounded-[32px] bg-white/90 p-5 shadow-xl shadow-orange-100">
          <label className="block">
            <span className="text-xs font-medium text-zinc-500">邮箱</span>
            <input
              className="mt-2 w-full rounded-2xl bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 outline-none border border-zinc-100 focus:border-orange-400"
              placeholder="请输入邮箱"
              defaultValue="cjhcgd@163.com"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-xs font-medium text-zinc-500">密码</span>
            <input
              className="mt-2 w-full rounded-2xl bg-zinc-50 px-4 py-3.5 text-sm text-zinc-900 outline-none border border-zinc-100 focus:border-orange-400"
              placeholder="请输入密码"
              type="password"
              defaultValue="123456"
            />
          </label>

          <button
            onClick={onLogin}
            className="mt-6 w-full rounded-2xl bg-zinc-900 text-white py-3.5 font-semibold shadow-md"
          >
            登录
          </button>

          <button
            onClick={onGuest}
            className="mt-3 w-full rounded-2xl bg-orange-100 text-orange-700 py-3.5 font-semibold"
          >
            游客体验 Demo
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-zinc-500">
          还没有账号？
          <button
            onClick={onRegister}
            className="ml-1 font-semibold text-orange-600"
          >
            注册
          </button>
        </p>
      </motion.div>

      
    </div>
  );
}