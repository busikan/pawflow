"use client";

import { ArrowLeft, Camera, ChevronRight, PawPrint } from "lucide-react";

export default function PetProfileScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  return (
    <div className="h-full bg-gradient-to-b from-orange-400 to-[#fffaf1] overflow-y-auto">
      <div className="px-5 pt-6 pb-4 flex items-center justify-between text-white">
        <button className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft className="h-5 w-5" />
        </button>

        <h1 className="text-lg font-semibold">宠物档案编辑</h1>

        <div className="h-10 w-10" />
      </div>

      <div className="mx-5 mt-4 rounded-[32px] bg-white px-5 pt-8 pb-6 shadow-xl">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center">
              <PawPrint className="h-12 w-12 text-orange-500" />
            </div>

            <button className="absolute right-0 bottom-0 h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center shadow-md">
              <Camera className="h-4 w-4 text-white" />
            </button>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-zinc-900">Coco</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Golden Retriever · 3 岁
          </p>
        </div>

        <div className="mt-8 divide-y divide-zinc-100">
          <InfoRow label="宠物名" value="Coco" />
          <InfoRow label="品种" value="金毛 Golden Retriever" />
          <InfoRow label="年龄" value="3 岁" />
          <InfoRow label="体重" value="30 kg" />
          <InfoRow label="健康状态" value="健康，无明显关节问题" />
          <InfoRow label="活动偏好" value="户外散步、草地、短途自驾" />
          <InfoRow label="饮食偏好" value="低脂鸡肉零食" />
        </div>
      </div>

      <div className="mx-5 mt-5 rounded-[28px] bg-white/90 p-5 shadow-sm">
        <h3 className="text-base font-bold text-zinc-900">AI 推荐依据</h3>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          PawFlow 会根据 Coco 的体重、年龄、健康状态和活动偏好，
          估算周末出行强度、运动热量消耗，并推荐合适的宠物友好地点与补给商品。
        </p>
      </div>

      <div className="px-5 pt-6 pb-8">
        <button
          onClick={onComplete}
          className="w-full rounded-2xl bg-zinc-900 text-white py-4 font-semibold shadow-lg"
        >
          保存并进入 PawFlow
        </button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <button className="w-full flex items-start justify-between py-5 text-left">
      <div className="flex-1 pr-4">
        <p className="text-sm text-zinc-400">
          {label}
        </p>

        <p className="mt-2 text-[17px] leading-7 font-semibold text-zinc-900 break-words">
          {value}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 text-zinc-300 mt-7 shrink-0" />
    </button>
  );
}