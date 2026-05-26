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
} from "lucide-react";
import { Business, WeekendPlan } from "@/types/app";

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

  return (
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
              <div key={`${item.time}-${item.title}`} className="flex gap-3">
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

        <SectionTitle title="活动路线预览" />

        <div className="rounded-3xl bg-white shadow-sm overflow-hidden">
          <div className="h-56 relative bg-emerald-50">
            <SimpleMap spotType={plan.spot.type} />
          </div>

          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-zinc-900">
                家 → {plan.spot.name} → 宠物友好咖啡馆
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                包含活动地点、休息点、补给店和备用宠物医院
              </p>
            </div>

            <MapPin className="h-5 w-5 text-orange-500" />
          </div>
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

function SimpleMap({ spotType }: { spotType: string }) {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 390 230" className="w-full h-full">
        <rect width="390" height="230" fill="#ecfdf5" />
        <circle cx="70" cy="70" r="48" fill="#bbf7d0" opacity="0.8" />
        <circle cx="310" cy="80" r="56" fill="#fde68a" opacity="0.7" />
        <circle cx="300" cy="180" r="40" fill="#bfdbfe" opacity="0.45" />

        <path
          d="M30 180 C 80 120, 130 160, 180 105 S 290 70, 360 120"
          fill="none"
          stroke="#fed7aa"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <path
          d="M30 180 C 80 120, 130 160, 180 105 S 290 70, 360 120"
          fill="none"
          stroke="#f97316"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <MapPinText x={40} y={175} label="家" color="#111827" />
        <MapPinText x={180} y={105} label={spotType} color="#16a34a" />
        <MapPinText x={285} y={75} label="咖啡" color="#f97316" />
        <MapPinText x={345} y={120} label="补给" color="#a855f7" />
      </svg>
    </div>
  );
}

function MapPinText({
  x,
  y,
  label,
  color,
}: {
  x: number;
  y: number;
  label: string;
  color: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill="white" />
      <circle cx={x} cy={y} r="6" fill={color} />
      <text
        x={x}
        y={y - 15}
        textAnchor="middle"
        fontSize="11"
        fill="#111827"
        fontWeight="700"
      >
        {label}
      </text>
    </g>
  );
}