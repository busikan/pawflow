"use client";

import { Activity, Beef, Clock3, Flame, PawPrint, ShieldCheck } from "lucide-react";

export default function HealthSummaryScreen({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <div className="h-full overflow-y-auto bg-[#fffaf1] px-5 pt-8 pb-10">
      <div className="rounded-[36px] bg-gradient-to-br from-orange-500 to-amber-400 p-6 text-white shadow-xl">
        <div className="h-16 w-16 rounded-3xl bg-white/20 flex items-center justify-center">
          <PawPrint className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-3xl font-bold">Coco 的健康画像</h1>

        <p className="mt-3 text-sm leading-6 text-white/85">
          根据体重、年龄和活动偏好，PawFlow 已生成每日运动与喂养建议。
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <HealthCard icon={Clock3} title="建议遛狗时长" value="90 min / day" />
        <HealthCard icon={Flame} title="每日运动消耗" value="320 kcal" />
        <HealthCard icon={Activity} title="推荐活动强度" value="中等强度" />
        <HealthCard icon={Beef} title="每日喂食建议" value="约 420 g" />
      </div>

      <div className="mt-6 rounded-[32px] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-bold text-zinc-900">AI 健康提醒</h2>
        </div>

        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Coco 属于中大型犬，适合每天保持稳定运动。天气较热时建议选择阴凉路线，
          避免长时间在柏油路面行走，并注意补水与关节保护。
        </p>
      </div>

      <button
        onClick={onContinue}
        className="mt-7 w-full rounded-2xl bg-zinc-900 py-4 font-semibold text-white"
      >
        进入 PawFlow 首页
      </button>
    </div>
  );
}

function HealthCard({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[28px] bg-white p-4 shadow-sm">
      <Icon className="h-5 w-5 text-orange-500" />
      <p className="mt-4 text-xs text-zinc-500">{title}</p>
      <p className="mt-1 text-lg font-bold text-zinc-900">{value}</p>
    </div>
  );
}