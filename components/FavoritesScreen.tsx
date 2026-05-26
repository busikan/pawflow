"use client";

import { Business } from "@/types/app";
import { Heart, MapPin, Store, ChevronRight } from "lucide-react";

export default function FavoritesScreen({
  businesses,
  onBack,
  onOpenBusiness,
}: {
  businesses: Business[];
  onBack: () => void;
  onOpenBusiness: (business: Business) => void;
}) {
  return (
    <div className="h-full overflow-y-auto bg-[#fffaf1] px-5 pt-6 pb-10">
      <button onClick={onBack} className="text-sm text-zinc-500 mb-5">
        ← 返回
      </button>

      <h1 className="text-3xl font-bold text-zinc-900">收藏商家</h1>
      <p className="mt-2 text-sm text-zinc-500">
        这里保存了你感兴趣的宠物友好地点。
      </p>

      <div className="mt-6 space-y-4">
        {businesses.length === 0 ? (
          <div className="rounded-[32px] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto h-16 w-16 rounded-full bg-orange-50 flex items-center justify-center">
              <Heart className="h-8 w-8 text-orange-500" />
            </div>

            <p className="mt-5 font-semibold text-zinc-900">还没有收藏</p>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              在计划页点击“收藏”，这里会显示你喜欢的宠物友好商家。
            </p>
          </div>
        ) : (
          businesses.map((business) => (
            <button
              key={business.id}
              onClick={() => onOpenBusiness(business)}
              className="w-full rounded-[32px] bg-white p-5 text-left shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <Store className="h-7 w-7 text-orange-600" />
                </div>

                <div className="flex-1">
                  <div className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                    {business.tag}
                  </div>

                  <h2 className="mt-3 text-lg font-bold text-zinc-900">
                    {business.name}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">{business.type}</p>

                  <p className="mt-2 flex items-center gap-1 text-sm text-zinc-500">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    {business.distance}
                  </p>
                </div>

                <ChevronRight className="mt-2 h-5 w-5 text-zinc-300 shrink-0" />
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-600">
                {business.desc}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}