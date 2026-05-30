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
  Search,
  MapPin,
  TentTree,
  Hospital,
  Heart,
} from "lucide-react";

export default function HomeScreen({
  onGenerate,
  onOpenHistory,
  onOpenProfile,
  showWelcome,
  onCloseWelcome,
}: {
  onGenerate: (input: string) => void;
  onOpenHistory: () => void;
  onOpenProfile: () => void;
  showWelcome: boolean;
  onCloseWelcome: () => void;
}) {
  const [aiOpen, setAiOpen] = useState(false);
  const [prompt, setPrompt] = useState(
    "周末想带金毛出去玩，希望风景好一点，可以短途自驾，顺便找一家宠物友好咖啡馆。"
  );

  function startGenerate() {
    setAiOpen(false);
    onGenerate(prompt);
  }

  return (
    <div className="relative h-full overflow-hidden bg-[#fffaf1]">
      <div className="h-full overflow-y-auto pb-28">
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

        <div className="px-5">
          <div className="rounded-[32px] bg-gradient-to-br from-orange-500 to-amber-400 p-5 text-white shadow-xl">
            <p className="text-sm text-white/80">今日宜出门指数</p>

            <div className="mt-2 flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold">87</p>
                <p className="mt-1 text-sm text-white/85">
                  天气凉爽，适合带 Coco 出门活动
                </p>
              </div>

              <CloudSun className="h-12 w-12 text-white/90" />
            </div>
          </div>

          <div className="mt-5 rounded-3xl bg-white px-4 py-3 shadow-sm flex items-center gap-3">
            <Search className="h-5 w-5 text-zinc-400" />

            <input
              className="flex-1 bg-transparent outline-none text-sm text-zinc-800"
              placeholder="搜索咖啡馆、步道、露营地、宠物医院"
            />
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {["宠物咖啡", "阴凉步道", "短途自驾", "大型犬", "露营地"].map(
              (item) => (
                <button
                  key={item}
                  className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm"
                >
                  {item}
                </button>
              )
            )}
          </div>

          <SectionTitle title="附近好去处" />

          <div className="grid grid-cols-2 gap-3">
            <LocalCard
              icon={Trees}
              title="青山湖森林步道"
              desc="阴凉 · 适合大型犬"
            />

            <LocalCard
              icon={Coffee}
              title="Paw Coffee"
              desc="宠物友好咖啡馆"
            />

            <LocalCard
              icon={TentTree}
              title="湖边露营地"
              desc="短途自驾 · 风景好"
            />

            <LocalCard
              icon={Hospital}
              title="City Pet Clinic"
              desc="附近备用医院"
            />
          </div>

          <SectionTitle title="AI 今日推荐" />

          <div className="rounded-[32px] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <p className="text-sm font-semibold text-orange-600">
                今日 AI 推荐
              </p>
            </div>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-zinc-900">
              今天适合带 Coco 去青山湖森林步道
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              天气凉爽，适合短途自驾，附近有宠物友好咖啡馆和补给商家。
            </p>

            <div className="grid grid-cols-4 gap-2 mt-4 text-center">
              <MiniStat icon={Car} label="35min" />
              <MiniStat icon={Trees} label="森林" />
              <MiniStat icon={Flame} label="75kcal" />
              <MiniStat icon={Coffee} label="咖啡" />
            </div>

            <button
              onClick={() =>
                onGenerate(
                  "今天适合带 Coco 去青山湖森林步道，要求短途自驾、风景好、附近有宠物友好咖啡馆。"
                )
              }
              className="mt-5 w-full rounded-2xl bg-zinc-900 py-4 font-semibold text-white flex items-center justify-center"
            >
              查看完整周末计划
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <button
            onClick={onOpenHistory}
            className="mt-5 w-full rounded-[28px] bg-white p-5 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <Heart className="h-5 w-5 text-orange-600" />
              </div>

              <div className="text-left">
                <p className="font-semibold text-zinc-900">历史计划</p>
                <p className="text-sm text-zinc-500">查看之前生成过的路线</p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-zinc-400" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setAiOpen(true)}
        className="absolute left-1/2 bottom-5 z-30 -translate-x-1/2"
      >
        <motion.div
          animate={{
            scale: [1, 1.055, 1],
            y: [0, -4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.3,
            ease: "easeInOut",
          }}
          className="
            relative
            h-24
            w-24
            rounded-[34px]
            flex
            flex-col
            items-center
            justify-center
            text-white
            overflow-hidden

            bg-gradient-to-br
            from-orange-300
            via-orange-500
            to-amber-500

            shadow-2xl
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/45 via-white/10 to-transparent" />

          <div className="absolute top-3 left-4 h-7 w-11 rounded-full bg-white/55 blur-sm" />

          <div className="absolute right-3 bottom-3 h-5 w-8 rounded-full bg-white/25 blur-sm" />

          <div className="absolute inset-0 rounded-[34px] border border-white/35" />

          <div className="absolute inset-0 rounded-[34px] shadow-inner" />

          <PawPrint className="relative z-10 h-9 w-9 drop-shadow-md" />

          <span className="relative z-10 mt-1 text-[11px] font-bold tracking-wide drop-shadow-sm">
            带我去哪
          </span>
        </motion.div>
      </button>

      <AnimatePresence>
        {showWelcome && (
          <WelcomeModal
            onClose={onCloseWelcome}
            onGenerate={() => {
              onCloseWelcome();
              onGenerate(prompt);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aiOpen && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/50 backdrop-blur-md flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              className="w-full rounded-t-[36px] bg-[#fffaf1] p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-semibold">
                    PawFlow AI
                  </p>

                  <h2 className="text-2xl font-bold text-zinc-900">
                    今天想怎么玩？
                  </h2>
                </div>

                <button
                  onClick={() => setAiOpen(false)}
                  className="h-10 w-10 rounded-full bg-white flex items-center justify-center"
                >
                  <X className="h-5 w-5 text-zinc-500" />
                </button>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mt-5 h-32 w-full resize-none rounded-3xl bg-white p-4 text-sm leading-6 text-zinc-800 outline-none shadow-sm"
              />

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "凉快一点",
                  "短途自驾",
                  "风景好",
                  "宠物友好",
                  "运动后补给",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setPrompt((prev) => `${prev} ${tag}`)}
                    className="rounded-full bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <button
                onClick={startGenerate}
                className="mt-5 w-full rounded-2xl bg-zinc-900 py-4 text-white font-semibold"
              >
                生成周末计划
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WelcomeModal({
  onClose,
  onGenerate,
}: {
  onClose: () => void;
  onGenerate: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        className="relative overflow-hidden rounded-[36px] w-full min-h-[540px] shadow-2xl"
        style={{
          backgroundImage: "url('/scenic/qingshan-lake.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

        <button
          onClick={onClose}
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
            天气凉爽，适合短途自驾，附近有宠物友好咖啡馆。
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <GlassCard icon={CloudSun} title="天气" value="晴 · 26°C" />
            <GlassCard icon={MapPin} title="地点" value="青山湖森林" />
            <GlassCard icon={Car} title="车程" value="35min" />
            <GlassCard icon={Flame} title="消耗" value="75kcal" />
          </div>

          <button
            onClick={onGenerate}
            className="mt-6 w-full rounded-2xl bg-white py-4 font-semibold text-orange-600"
          >
            进入今日推荐
          </button>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-2xl bg-white/20 backdrop-blur-md py-4 font-semibold text-white"
          >
            稍后查看
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h3 className="mt-6 mb-3 text-lg font-bold text-zinc-900">{title}</h3>;
}

function LocalCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="rounded-[28px] bg-white p-4 shadow-sm">
      <div className="h-11 w-11 rounded-2xl bg-orange-50 flex items-center justify-center">
        <Icon className="h-5 w-5 text-orange-600" />
      </div>

      <p className="mt-4 font-semibold text-zinc-900">{title}</p>

      <p className="mt-1 text-xs text-zinc-500">{desc}</p>
    </div>
  );
}

function MiniStat({ icon: Icon, label }: any) {
  return (
    <div className="rounded-2xl bg-orange-50 py-2 flex flex-col items-center gap-1">
      <Icon className="h-4 w-4 text-orange-600" />

      <span className="text-[11px] font-medium text-orange-700">{label}</span>
    </div>
  );
}

function GlassCard({ icon: Icon, title, value }: any) {
  return (
    <div className="rounded-2xl bg-white/15 backdrop-blur-md p-3 border border-white/10">
      <Icon className="h-5 w-5 text-white mb-2" />

      <p className="text-xs text-white/70">{title}</p>

      <p className="text-sm font-semibold text-white mt-1">{value}</p>
    </div>
  );
}