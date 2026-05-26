"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  PawPrint,
  Sparkles,
  X,
  Car,
  Trees,
  Flame,
  Coffee,
  CloudSun,
  ChevronRight,
  Clock3,
  MapPinned,
} from "lucide-react";

export default function HomeScreen({
  onGenerate,
  onOpenHistory,
  showWelcome,
  onCloseWelcome,
  onOpenProfile,
}: {
  onGenerate: (input: string) => void;
  onOpenHistory: () => void;
  showWelcome: boolean;
  onCloseWelcome: () => void;
  onOpenProfile: () => void;
}) {
  const [prompt, setPrompt] = useState(
    "周末想带金毛出去玩，希望风景好一点，可以短途自驾，顺便找一家宠物友好咖啡馆。"
  );

  return (
    <div className="relative h-full overflow-y-auto bg-[#fffaf1] pb-24">
      {/* 顶部 */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <p className="text-xs text-zinc-500">AI Pet Weekend Planner</p>
          <h1 className="text-2xl font-bold text-zinc-900">PawFlow</h1>
        </div>

        <button
        onClick={onOpenProfile}
        className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center"
        >
        <PawPrint className="h-5 w-5 text-orange-600" />
        </button>
      </div>

      {/* 欢迎弹窗 */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/45 backdrop-blur-md flex items-center justify-center px-5"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative overflow-hidden rounded-[36px] bg-zinc-900 text-white shadow-2xl"
            >
              {/* 背景图 */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop')",
                }}
              />

              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-900/40 via-black/40 to-black/80" />

              {/* 内容 */}
              <div className="relative z-10 p-7 w-[320px]">
                <button
                  onClick={onCloseWelcome}
                  className="absolute top-5 right-5 h-12 w-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"
                >
                  <X className="h-5 w-5 text-white" />
                </button>

                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                  <Sparkles className="h-4 w-4 text-orange-300" />
                  <span className="text-sm font-semibold">今日 AI 推荐</span>
                </div>

                <h2 className="mt-6 text-[28px] leading-tight font-bold">
                  今天适合带 Coco
                  <br />
                  去青山湖森林步道
                </h2>

                <p className="mt-5 text-[17px] leading-8 text-white/90">
                  天气凉爽，适合短途自驾，
                  <br />
                  附近有宠物友好咖啡馆。
                </p>

                <div className="grid grid-cols-2 gap-4 mt-7">
                  <GlassStat
                    icon={CloudSun}
                    title="天气"
                    value="晴 · 26°C"
                  />

                  <GlassStat
                    icon={MapPinned}
                    title="地点"
                    value="青山湖森林"
                  />

                  <GlassStat
                    icon={Car}
                    title="车程"
                    value="35min"
                  />

                  <GlassStat
                    icon={Flame}
                    title="消耗"
                    value="75kcal"
                  />
                </div>

                <button
                  onClick={() => {
                    onCloseWelcome();
                    onGenerate(prompt);
                  }}
                  className="mt-8 w-full rounded-[24px] bg-white py-5 text-xl font-bold text-orange-600"
                >
                  进入今日推荐
                </button>

                <button
                  onClick={onCloseWelcome}
                  className="mt-4 w-full rounded-[24px] bg-white/10 py-5 text-xl font-bold text-white backdrop-blur"
                >
                  稍后查看
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主内容 */}
      <div className="px-5 pt-2">
        <div className="rounded-[36px] bg-gradient-to-br from-orange-500 to-amber-400 p-6 text-white shadow-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold">今日 AI 推荐</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold leading-tight">
            今天适合带 Coco 去青山湖森林步道
          </h2>

          <p className="mt-4 text-base leading-7 text-white/90">
            天气凉爽，适合短途自驾，附近有宠物友好咖啡馆。
          </p>

          <div className="grid grid-cols-4 gap-3 mt-5">
            <MiniStat icon={Car} label="35min" />
            <MiniStat icon={Trees} label="森林" />
            <MiniStat icon={Flame} label="75kcal" />
            <MiniStat icon={Coffee} label="咖啡" />
          </div>

          <button
            onClick={() => onGenerate(prompt)}
            className="mt-6 w-full rounded-[24px] bg-white py-4 text-lg font-bold text-orange-600 flex items-center justify-center"
          >
            查看完整周末计划
            <ChevronRight className="ml-1 h-5 w-5" />
          </button>
        </div>

        {/* 标题 */}
        <h2 className="mt-9 text-4xl font-bold leading-tight text-zinc-900">
          周末带宠物去哪玩？
        </h2>

        <p className="mt-4 text-[17px] leading-8 text-zinc-600">
          根据天气、宠物状态、周边地点和本地商家，
          AI 自动生成宠物友好的周末活动计划。
        </p>

        {/* 输入框 */}
        <div className="mt-6 rounded-[32px] bg-white p-5 shadow-sm">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-32 w-full resize-none bg-transparent text-[16px] leading-8 text-zinc-800 outline-none"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "短途自驾",
              "风景好",
              "凉快一点",
              "宠物友好",
              "运动后补给",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-orange-50 px-4 py-2 text-sm text-orange-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => onGenerate(prompt)}
            className="mt-6 w-full rounded-[24px] bg-zinc-900 py-5 text-xl font-bold text-white"
          >
            生成周末计划
          </button>
        </div>

        {/* 历史按钮 */}
        <button
          onClick={onOpenHistory}
          className="mt-5 w-full rounded-[28px] bg-white p-5 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Clock3 className="h-5 w-5 text-orange-600" />
            </div>

            <div className="text-left">
              <p className="font-semibold text-zinc-900">历史计划</p>
              <p className="text-sm text-zinc-500">
                查看之前生成过的路线
              </p>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 text-zinc-400" />
        </button>

        {/* 信息卡片 */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <InfoCard icon={CloudSun} title="今日天气" value="晴，26°C" />

          <InfoCard
            icon={PawPrint}
            title="宠物状态"
            value="Coco，30kg"
          />
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label }: any) {
  return (
    <div className="rounded-[22px] bg-white/20 py-4 flex flex-col items-center gap-2 backdrop-blur">
      <Icon className="h-5 w-5" />
      <span className="text-xs font-semibold">{label}</span>
    </div>
  );
}

function InfoCard({ icon: Icon, title, value }: any) {
  return (
    <div className="rounded-[28px] bg-white p-5 shadow-sm">
      <Icon className="h-5 w-5 text-orange-500 mb-4" />

      <p className="text-sm text-zinc-500">{title}</p>

      <p className="mt-1 text-lg font-bold text-zinc-900">{value}</p>
    </div>
  );
}

function GlassStat({ icon: Icon, title, value }: any) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
      <Icon className="h-6 w-6 text-white mb-4" />

      <p className="text-sm text-white/70">{title}</p>

      <p className="mt-1 text-lg font-bold text-white">{value}</p>
    </div>
  );
}