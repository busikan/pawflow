"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Trees, PawPrint } from "lucide-react";

const steps = [
  "正在分析今日天气...",
  "正在寻找风景好的宠物友好地点...",
  "正在生成通向森林小屋的活动路线...",
  "正在估算运动距离和热量消耗...",
  "正在匹配附近补给商家...",
];

export default function LoadingPathScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(onDone, 900);
          return s;
        }
        return s + 1;
      });
    }, 900);

    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 bg-gradient-to-b from-orange-50 to-emerald-50">
      <h1 className="text-2xl font-bold text-zinc-900 text-center">
        AI 正在生成周末路线
      </h1>

      <p className="text-sm text-zinc-500 mt-3 h-8 text-center">{steps[step]}</p>

      <div className="relative mt-10 w-full h-72">
        <svg viewBox="0 0 320 260" className="w-full h-full">
          <path
            d="M40 220 C 80 170, 100 190, 135 130 S 230 95, 270 45"
            fill="none"
            stroke="#fed7aa"
            strokeWidth="18"
            strokeLinecap="round"
          />

          <motion.path
            d="M40 220 C 80 170, 100 190, 135 130 S 230 95, 270 45"
            fill="none"
            stroke="#f97316"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.8, ease: "easeInOut" }}
          />

          <motion.circle
            r="9"
            fill="#f97316"
            initial={{ cx: 40, cy: 220 }}
            animate={{
              cx: [40, 90, 135, 205, 270],
              cy: [220, 175, 130, 92, 45],
            }}
            transition={{ duration: 3.8, ease: "easeInOut" }}
          />

          <rect x="245" y="28" width="48" height="42" rx="10" fill="#fff" />
          <path d="M238 34 L269 12 L300 34" fill="#f59e0b" />
        </svg>

        <div className="absolute left-4 bottom-3 flex items-center gap-2 text-zinc-600 text-sm">
          <Home className="h-4 w-4" />
          出发点
        </div>

        <div className="absolute right-5 top-5 flex items-center gap-2 text-zinc-700 text-sm">
          <Trees className="h-4 w-4 text-emerald-600" />
          森林小屋
        </div>

        <motion.div
          className="absolute left-[125px] top-[126px]"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <PawPrint className="h-6 w-6 text-orange-500" />
        </motion.div>
      </div>

      <div className="w-full h-2 rounded-full bg-orange-100 mt-4 overflow-hidden">
        <motion.div
          className="h-full bg-orange-500"
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}