"use client";

import {
  ArrowLeft,
  Star,
  MapPin,
  Clock3,
  PawPrint,
  Sparkles,
  Navigation,
  ShoppingBag,
  Heart,
  MessageCircle,
} from "lucide-react";

import { Business } from "@/types/app";

export default function BusinessDetailScreen({
  business,
  isFavorite,
  onToggleFavorite,
  onBack,
}: {
  business: Business;
  isFavorite: boolean;
  onToggleFavorite: (business: Business) => void;
  onBack: () => void;
}) {
  return (
    <div className="h-full overflow-y-auto bg-[#fffaf1] pb-10">
      <div className="relative h-64 bg-gradient-to-br from-orange-400 via-amber-300 to-emerald-200 overflow-hidden">
        <div className="absolute inset-0 opacity-35">
          <div className="absolute left-8 top-16 h-24 w-24 rounded-full bg-white" />
          <div className="absolute right-8 top-24 h-32 w-32 rounded-full bg-white" />
          <div className="absolute left-28 bottom-8 h-20 w-20 rounded-full bg-white" />
        </div>

        <button
          onClick={onBack}
          className="absolute left-5 top-6 h-10 w-10 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => onToggleFavorite(business)}
          className={`absolute right-5 top-6 h-10 w-10 rounded-full backdrop-blur flex items-center justify-center ${
            isFavorite ? "bg-orange-500 text-white" : "bg-white/30 text-white"
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-white" : ""}`} />
        </button>

        <div className="absolute left-5 right-5 bottom-6 text-white">
          <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
            {business.tag}
          </div>

          <h1 className="mt-3 text-3xl font-bold leading-tight">
            {business.name}
          </h1>

          <p className="mt-2 text-sm text-white/85">
            {business.type} · {business.distance}
          </p>
        </div>
      </div>

      <div className="px-5 -mt-5 relative z-10">
        <div className="rounded-[32px] bg-white p-5 shadow-xl">
          <div className="grid grid-cols-3 gap-3 text-center">
            <DetailStat icon={Star} title="评分" value="4.8" />
            <DetailStat icon={Clock3} title="营业" value="09:00-21:00" />
            <DetailStat icon={PawPrint} title="宠物友好" value="Yes" />
          </div>
        </div>

        <div className="mt-5 rounded-[32px] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-bold text-zinc-900">AI 推荐理由</h2>
          </div>

          <p className="mt-3 text-sm leading-7 text-zinc-600">
            {business.desc}
            PawFlow 认为这里适合作为本次宠物周末活动的配套地点：
            它靠近活动路线，能够提供休息、补给或安全保障，能让整个出行计划更完整。
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Tag text="宠物友好" />
            <Tag text="适合周末" />
            <Tag text="路线附近" />
            <Tag text="美团生态" />
          </div>
        </div>

        <div className="mt-5 rounded-[32px] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900">推荐服务</h2>

          <div className="mt-4 rounded-3xl bg-orange-50 p-4 flex gap-3 items-center">
            <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center">
              <ShoppingBag className="h-7 w-7 text-orange-600" />
            </div>

            <div className="flex-1">
              <p className="font-bold text-zinc-900">
                运动后轻量补给套餐
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                适合宠物活动后补充能量，可用于美团闪购场景展示。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[32px] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900">位置预览</h2>

          <div className="mt-4 h-40 rounded-[28px] bg-emerald-50 overflow-hidden relative">
            <svg viewBox="0 0 330 160" className="h-full w-full">
              <rect width="330" height="160" fill="#ecfdf5" />
              <circle cx="70" cy="56" r="38" fill="#bbf7d0" opacity="0.8" />
              <circle cx="250" cy="88" r="50" fill="#fde68a" opacity="0.7" />
              <path
                d="M30 125 C80 70, 140 110, 190 58 S270 70, 305 105"
                fill="none"
                stroke="#f97316"
                strokeWidth="8"
                strokeLinecap="round"
              />

              <circle cx="190" cy="58" r="13" fill="white" />
              <circle cx="190" cy="58" r="8" fill="#f97316" />

              <text
                x="190"
                y="38"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#111827"
              >
                {business.name}
              </text>
            </svg>
          </div>

          <button className="mt-4 w-full rounded-2xl bg-zinc-900 py-4 text-sm font-semibold text-white flex items-center justify-center gap-2">
            <Navigation className="h-4 w-4" />
            模拟导航到这里
          </button>
        </div>

        <div className="mt-5 rounded-[32px] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-bold text-zinc-900">用户评价</h2>
          </div>

          <div className="mt-4 space-y-3 text-sm text-zinc-600">
            <p className="rounded-2xl bg-zinc-50 p-3">
              “带狗狗来休息很方便，户外区域比较舒服。”
            </p>

            <p className="rounded-2xl bg-zinc-50 p-3">
              “离路线很近，适合作为周末活动的中途补给点。”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailStat({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-orange-50 p-3">
      <Icon className="mx-auto h-5 w-5 text-orange-600" />

      <p className="mt-2 text-xs text-zinc-500">{title}</p>

      <p className="mt-1 text-sm font-bold text-zinc-900">{value}</p>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
      {text}
    </span>
  );
}