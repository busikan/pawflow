"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Car,
  Trees,
  Coffee,
  Bone,
  PawPrint,
  Clock3,
  Flame,
  ShoppingBag,
  MapPin,
  X,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Business, WeekendPlan } from "@/types/app";
import AmapRouteMap from "@/components/AmapRouteMap";
import { getPlanWaypoints } from "@/lib/recommendation";

type TimelineItem = {
  time: string;
  title: string;
  desc: string;
};

export default function PlanScreen({
  plan,
  favoriteBusinesses,
  onToggleFavorite,
  onOpenBusiness,
  onBack,
}: {
  plan: WeekendPlan;
  favoriteBusinesses: Business[];
  onToggleFavorite: (business: Business) => void;
  onOpenBusiness: (business: Business) => void;
  onBack: () => void;
}) {
  const icons = [Car, Trees, PawPrint, Coffee, Bone];
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const relatedBusiness = plan.businesses[0];

  return (
    <div className="relative h-full overflow-hidden bg-[#fffaf1]">
      <div className="h-full overflow-y-auto pb-10">
        <div className="px-5 pt-5">
          <button onClick={onBack} className="text-sm text-zinc-500 mb-3">
            ← 返回
          </button>

          <div className="rounded-3xl bg-white shadow-lg overflow-hidden">
            <div
              className="h-44 relative overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: `url('${plan.spot.image}')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/65" />

              <div className="absolute left-4 bottom-4 right-4 text-white">
                <span className="rounded-full bg-white/25 backdrop-blur-md px-3 py-1 text-xs font-semibold">
                  最佳匹配 · {plan.score}/100
                </span>

                <h2 className="text-2xl font-bold mt-2 leading-tight">
                  {plan.spot.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-4 divide-x p-4 text-center">
              <Metric label="自驾" value={`${plan.spot.driveTime}min`} />
              <Metric label="时长" value={plan.duration} />
              <Metric label="活动" value={`${plan.spot.distanceKm}km`} />
              <Metric label="消耗" value={`${plan.calories}`} />
            </div>
          </div>

          <SectionTitle title="活动路线预览" />

          <div className="rounded-3xl bg-white shadow-sm overflow-hidden">
            <div className="h-56 relative bg-emerald-50">
              <AmapRouteMap
                waypoints={getPlanWaypoints(plan)}
                onSelectNode={(index) =>
                  setSelectedItem(plan.timeline[index] || plan.timeline[0])
                }
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-zinc-900">
                  家 → {plan.spot.name} → 宠物友好咖啡馆
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  点击地图上的数字节点查看详情
                </p>
              </div>

              <MapPin className="h-5 w-5 text-orange-500" />
            </div>
          </div>

          <SectionTitle title="为什么 AI 推荐这里？" />

          <div className="rounded-3xl bg-white shadow-sm p-4 text-sm text-zinc-700 space-y-2">
            {plan.reason.map((item, index) => (
              <p key={item}>
                {index + 1}. {item}
              </p>
            ))}
          </div>

          <SectionTitle title="周末活动时间线" />

          <div className="space-y-3">
            {plan.timeline.map((item, index) => {
              const Icon = icons[index] || PawPrint;

              return (
                <div key={`${item.time}-${item.title}`} className="w-full flex gap-3 text-left">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-orange-600" />
                    </div>

                    {index !== plan.timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-orange-100 mt-2" />
                    )}
                  </div>

                  <div className="flex-1 rounded-3xl bg-white shadow-sm p-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                      <Clock3 className="h-3 w-3" />
                      {item.time}
                    </div>

                    <p className="font-semibold text-zinc-900">{item.title}</p>
                    <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <SectionTitle title="运动消耗与补给推荐" />

          <div className="rounded-3xl bg-zinc-900 text-white p-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">预计运动消耗</p>
                <p className="text-4xl font-bold mt-1">{plan.calories} kcal</p>
              </div>

              <Flame className="h-10 w-10 text-orange-400" />
            </div>

            <div className="mt-5 rounded-3xl bg-white text-zinc-900 p-4 flex gap-3 items-center">
              <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                <Bone className="h-7 w-7 text-orange-600" />
              </div>

              <div className="flex-1">
                <p className="font-bold">{plan.product.name}</p>
                <p className="text-xs text-zinc-500">
                  {plan.product.calories} kcal · {plan.product.distance} ·{" "}
                  {plan.product.price}
                </p>
              </div>

              <ShoppingBag className="h-5 w-5 text-orange-500" />
            </div>
          </div>

          <SectionTitle title="沿途宠物友好商家" />

          <div className="space-y-3 mb-8">
            {plan.businesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                isFavorite={favoriteBusinesses.some(
                  (item) => item.id === business.id
                )}
                onToggleFavorite={onToggleFavorite}
                onOpenBusiness={onOpenBusiness}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <TimelineBottomSheet
            item={selectedItem}
            plan={plan}
            business={relatedBusiness}
            onClose={() => setSelectedItem(null)}
            onOpenBusiness={() => {
              if (relatedBusiness) {
                setSelectedItem(null);
                onOpenBusiness(relatedBusiness);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TimelineBottomSheet({
  item,
  plan,
  business,
  onClose,
  onOpenBusiness,
}: {
  item: TimelineItem;
  plan: WeekendPlan;
  business?: Business;
  onClose: () => void;
  onOpenBusiness: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        exit={{ y: 120 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative w-full max-h-[78%] rounded-t-[36px] bg-[#fffaf1] shadow-2xl overflow-hidden"
      >
        <div className="sticky top-0 z-20 bg-[#fffaf1]/95 backdrop-blur px-5 pt-5 pb-4 border-b border-orange-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-orange-600">
                {item.time}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-zinc-900">
                {item.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="h-10 w-10 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm"
            >
              <X className="h-5 w-5 text-zinc-500" />
            </button>
          </div>
        </div>

        <div className="max-h-[calc(78vh-88px)] overflow-y-auto px-5 pb-8 pt-4">
          <p className="text-sm leading-7 text-zinc-600">{item.desc}</p>

          <div className="mt-5 rounded-[28px] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <p className="font-bold text-zinc-900">AI 节点说明</p>
            </div>

            <p className="mt-3 text-sm leading-7 text-zinc-600">
              PawFlow 会把这一节点放入整体路线中判断：结合宠物体型、
              预计运动量、出行时间和附近商家，帮助你决定这一站更适合活动、
              休息还是补给。
            </p>
          </div>

          <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-orange-500" />
              <p className="font-bold text-zinc-900">附近补给商品</p>
            </div>

            <div className="mt-3 rounded-3xl bg-orange-50 p-4 flex gap-3 items-center">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center">
                <Bone className="h-6 w-6 text-orange-600" />
              </div>

              <div className="flex-1">
                <p className="font-bold text-zinc-900">{plan.product.name}</p>

                <p className="mt-1 text-xs text-zinc-500">
                  {plan.product.calories} kcal · {plan.product.price} ·
                  适合运动后轻补给
                </p>
              </div>
            </div>
          </div>

          {business && (
            <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-500" />
                <p className="font-bold text-zinc-900">相关商家</p>
              </div>

              <div className="mt-3">
                <div className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                  {business.tag}
                </div>

                <h4 className="mt-3 text-lg font-bold text-zinc-900">
                  {business.name}
                </h4>

                <p className="mt-1 text-sm text-zinc-500">
                  {business.type} · {business.distance}
                </p>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {business.desc}
                </p>

                <button
                  onClick={onOpenBusiness}
                  className="mt-4 w-full rounded-2xl bg-orange-100 py-3 text-sm font-semibold text-orange-700"
                >
                  查看商家详情
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 rounded-[28px] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <p className="font-bold text-zinc-900">注意事项</p>
            </div>

            <p className="mt-3 text-sm leading-7 text-zinc-600">
              如果天气过热，建议避开柏油路面；如果宠物近期运动量不足，
              可以适当缩短路线并增加休息点。
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BusinessCard({
  business,
  isFavorite,
  onToggleFavorite,
  onOpenBusiness,
}: {
  business: Business;
  isFavorite: boolean;
  onToggleFavorite: (business: Business) => void;
  onOpenBusiness: (business: Business) => void;
}) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
            {business.tag}
          </div>

          <h4 className="mt-3 text-lg font-bold text-zinc-900">
            {business.name}
          </h4>

          <p className="mt-1 text-sm text-zinc-500">
            {business.type} · {business.distance}
          </p>
        </div>

        <button
          onClick={() => onToggleFavorite(business)}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isFavorite
              ? "bg-orange-500 text-white"
              : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {isFavorite ? "已收藏" : "收藏"}
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-600">{business.desc}</p>

      <button
        onClick={() => onOpenBusiness(business)}
        className="mt-4 w-full rounded-2xl bg-orange-100 py-3 text-sm font-semibold text-orange-700"
      >
        查看商家
      </button>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h3 className="mt-6 mb-3 text-lg font-bold text-zinc-900">{title}</h3>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="text-sm font-bold text-zinc-900 mt-1">{value}</p>
    </div>
  );
}