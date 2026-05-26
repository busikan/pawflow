"use client";

import { WeekendPlan } from "@/types/app";
import { Clock3, MapPin, Flame } from "lucide-react";

export default function HistoryScreen({
  plans,
  onBack,
  onOpenPlan,
}: {
  plans: WeekendPlan[];
  onBack: () => void;
  onOpenPlan: (plan: WeekendPlan) => void;
}) {
  return (
    <div className="h-full overflow-y-auto bg-[#fffaf1] px-5 pt-6 pb-10">
      <button onClick={onBack} className="text-sm text-zinc-500 mb-5">
        ← 返回
      </button>

      <h1 className="text-3xl font-bold text-zinc-900">历史计划</h1>
      <p className="mt-2 text-sm text-zinc-500">
        查看之前生成过的宠物周末活动计划。
      </p>

      <div className="mt-6 space-y-4">
        {plans.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-zinc-500">还没有历史计划</p>
          </div>
        ) : (
          plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => onOpenPlan(plan)}
              className="w-full rounded-3xl bg-white p-5 text-left shadow-sm"
            >
              <h2 className="text-lg font-bold text-zinc-900">
                {plan.spot.name}
              </h2>

              <div className="mt-3 space-y-2 text-sm text-zinc-500">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  {plan.spot.type}
                </p>

                <p className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-orange-500" />
                  {plan.duration} · {plan.spot.driveTime}min 自驾
                </p>

                <p className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  预计消耗 {plan.calories} kcal
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}