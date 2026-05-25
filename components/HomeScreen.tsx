"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
  MapPin,
} from "lucide-react";

export default function HomeScreen({
  onGenerate,
  showWelcome,
  onCloseWelcome,
}: {
  onGenerate: () => void;
  showWelcome: boolean;
  onCloseWelcome: () => void;
}) {
  return (
    <div className="relative h-full overflow-hidden bg-[#fffaf1]">
      <div className="h-full overflow-y-auto pb-24">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <p className="text-xs text-zinc-500">
              AI Pet Weekend Planner
            </p>

            <h1 className="text-2xl font-bold text-zinc-900">
              PawFlow
            </h1>
          </div>

          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
            <PawPrint className="h-5 w-5 text-orange-600" />
          </div>
        </div>

        <div className="px-5">
          <div className="mb-5 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-400 text-white p-5 shadow-lg relative">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold">
                今日 AI 推荐
              </span>
            </div>

            <h2 className="text-xl font-bold leading-snug pr-6">
              今天适合带 Coco 去青山湖森林步道
            </h2>

            <p className="text-sm text-white/90 mt-2">
              天气凉爽，适合短途自驾，附近有宠物友好咖啡馆。
            </p>

            <div className="grid grid-cols-4 gap-2 mt-4 text-center">
              <MiniStat icon={Car} label="35min" />
              <MiniStat icon={Trees} label="森林" />
              <MiniStat icon={Flame} label="75kcal" />
              <MiniStat icon={Coffee} label="咖啡" />
            </div>

            <button
              onClick={onGenerate}
              className="mt-4 w-full rounded-2xl bg-white text-orange-600 py-3 font-semibold flex items-center justify-center"
            >
              查看完整周末计划
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <h2 className="text-3xl font-bold leading-tight text-zinc-900">
            周末带宠物去哪玩？
          </h2>

          <p className="text-sm text-zinc-600 mt-3">
            根据天气、宠物状态、周边地点和本地商家，
            AI 自动生成宠物友好的周末活动计划。
          </p>

          <div className="mt-5 rounded-3xl bg-white p-4 shadow-sm">
            <textarea
              className="w-full h-28 resize-none outline-none text-sm bg-transparent text-zinc-800"
              defaultValue="周末想带金毛出去玩，希望风景好一点，可以短途自驾，顺便找一家宠物友好咖啡馆。"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "短途自驾",
                "风景好",
                "凉快一点",
                "宠物友好",
                "运动后补给",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={onGenerate}
              className="mt-4 w-full rounded-2xl bg-zinc-900 text-white py-3 font-semibold"
            >
              生成周末计划
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <InfoCard
              icon={CloudSun}
              title="今日天气"
              value="晴，26°C"
            />

            <InfoCard
              icon={PawPrint}
              title="宠物状态"
              value="Coco，30kg"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              className="relative overflow-hidden rounded-[36px] w-full min-h-[540px] shadow-2xl"
              style={{
                backgroundImage:
                  "url('/scenic/qingshan-lake.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

              <button
                onClick={onCloseWelcome}
                className="absolute right-4 top-4 z-10 h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative z-10 flex min-h-[540px] flex-col justify-end p-6 text-white">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                  <Sparkles className="h-4 w-4" />
                  今日 AI 推荐
                </div>

                <h2 className="text-3xl font-bold leading-tight">
                  今天适合带 Coco
                  <br />
                  去青山湖森林步道
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/85">
                  天气凉爽，适合短途自驾，
                  附近有宠物友好咖啡馆。
                </p>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <GlassCard
                    icon={CloudSun}
                    title="天气"
                    value="晴 · 26°C"
                  />

                  <GlassCard
                    icon={MapPin}
                    title="地点"
                    value="青山湖森林"
                  />

                  <GlassCard
                    icon={Car}
                    title="车程"
                    value="35min"
                  />

                  <GlassCard
                    icon={Flame}
                    title="消耗"
                    value="75kcal"
                  />
                </div>

                <button
                  onClick={() => {
                    onCloseWelcome();
                    onGenerate();
                  }}
                  className="mt-6 w-full rounded-2xl bg-white py-4 font-semibold text-orange-600"
                >
                  进入今日推荐
                </button>

                <button
                  onClick={onCloseWelcome}
                  className="mt-3 w-full rounded-2xl bg-white/20 backdrop-blur-md py-4 font-semibold text-white"
                >
                  稍后查看
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MiniStat({ icon: Icon, label }: any) {
  return (
    <div className="rounded-2xl bg-white/20 py-2 flex flex-col items-center gap-1">
      <Icon className="h-4 w-4" />

      <span className="text-[11px] font-medium">
        {label}
      </span>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
}: any) {
  return (
    <div className="rounded-3xl bg-white shadow-sm p-4">
      <Icon className="h-5 w-5 text-orange-500 mb-3" />

      <p className="text-xs text-zinc-500">
        {title}
      </p>

      <p className="text-sm font-semibold text-zinc-900 mt-1">
        {value}
      </p>
    </div>
  );
}

function GlassCard({
  icon: Icon,
  title,
  value,
}: any) {
  return (
    <div className="rounded-2xl bg-white/15 backdrop-blur-md p-3 border border-white/10">
      <Icon className="h-5 w-5 text-white mb-2" />

      <p className="text-xs text-white/70">
        {title}
      </p>

      <p className="text-sm font-semibold text-white mt-1">
        {value}
      </p>
    </div>
  );
}