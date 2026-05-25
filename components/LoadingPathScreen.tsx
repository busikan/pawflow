"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Trees, PawPrint } from "lucide-react";

const steps = [
  "正在分析今日天气...",
  "正在寻找风景好的宠物友好地点...",
  "正在生成通向蘑菇小屋的曲折路线...",
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
    <div className="h-full flex flex-col items-center justify-center px-6 bg-gradient-to-b from-orange-50 via-[#fffaf1] to-emerald-50">
      <h1 className="text-2xl font-bold text-zinc-900 text-center">
        AI 正在生成周末路线
      </h1>

      <p className="text-sm text-zinc-500 mt-3 h-8 text-center">
        {steps[step]}
      </p>

      <div className="relative mt-10 w-full h-72">
        <svg viewBox="0 0 320 260" className="w-full h-full">
          {/* 背景小装饰 */}
          <circle cx="55" cy="72" r="18" fill="#dcfce7" />
          <circle cx="262" cy="190" r="20" fill="#fef3c7" />
          <circle cx="92" cy="205" r="10" fill="#bbf7d0" />
          <circle cx="210" cy="70" r="9" fill="#fed7aa" />

          {/* 小草 */}
          <path
            d="M65 202 C68 190, 75 190, 78 202 C82 192, 90 193, 92 203"
            fill="none"
            stroke="#86efac"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M230 205 C233 190, 240 190, 244 205 C249 195, 255 197, 258 207"
            fill="none"
            stroke="#86efac"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* 蘑菇小屋 */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <path
              d="M232 50 C240 20, 288 20, 298 50 C304 68, 288 78, 264 78 C238 78, 226 66, 232 50Z"
              fill="#fb923c"
            />
            <circle cx="250" cy="46" r="6" fill="#fff7ed" />
            <circle cx="273" cy="37" r="7" fill="#fff7ed" />
            <circle cx="286" cy="55" r="5" fill="#fff7ed" />

            <rect x="242" y="66" width="46" height="48" rx="14" fill="#fff" />
            <path
              d="M258 114 V92 C258 84, 272 84, 272 92 V114"
              fill="#92400e"
            />
            <circle cx="269" cy="102" r="2" fill="#fef3c7" />
            <circle cx="280" cy="85" r="7" fill="#fde68a" />
            <path
              d="M276 85 H284 M280 81 V89"
              stroke="#92400e"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>

          {/* 底层宽路 */}
          <path
            d="M35 225 C70 185, 100 210, 118 165 C136 120, 175 145, 190 105 C205 65, 245 95, 266 114"
            fill="none"
            stroke="#fed7aa"
            strokeWidth="22"
            strokeLinecap="round"
          />

          {/* 内层虚线 */}
          <path
            d="M35 225 C70 185, 100 210, 118 165 C136 120, 175 145, 190 105 C205 65, 245 95, 266 114"
            fill="none"
            stroke="#fdba74"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 10"
          />

          {/* 动态生成路线 */}
          <motion.path
            d="M35 225 C70 185, 100 210, 118 165 C136 120, 175 145, 190 105 C205 65, 245 95, 266 114"
            fill="none"
            stroke="#f97316"
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.8, ease: "easeInOut" }}
          />

          {/* 动态小圆点 */}
          <motion.circle
            r="8"
            fill="#f97316"
            initial={{ cx: 35, cy: 225 }}
            animate={{
              cx: [35, 82, 118, 168, 190, 232, 266],
              cy: [225, 194, 165, 132, 105, 91, 114],
            }}
            transition={{ duration: 3.8, ease: "easeInOut" }}
          />

          {/* 起点 */}
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <circle cx="35" cy="225" r="13" fill="#fff" />
            <circle cx="35" cy="225" r="8" fill="#111827" />
          </motion.g>

          {/* 脚印 */}
          <motion.g
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <circle cx="140" cy="150" r="4" fill="#f97316" />
            <circle cx="150" cy="144" r="4" fill="#f97316" />
            <ellipse cx="146" cy="156" rx="8" ry="6" fill="#f97316" />
          </motion.g>
        </svg>

      </div>

      <div className="mt-3 w-full">
        <div className="mb-2 flex items-center gap-2 text-sm text-zinc-600">
          <PawPrint className="h-4 w-4 text-orange-500" />
          <span>{steps[step].replace("...", "")}</span>
        </div>

        <div className="w-full h-2 rounded-full bg-orange-100 overflow-hidden">
          <motion.div
            className="h-full bg-orange-500 rounded-full"
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}