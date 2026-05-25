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

const timeline = [
  {
    time: "09:00",
    title: "从家出发",
    desc: "短途自驾，适合周末半日活动",
    icon: Car,
  },
  {
    time: "09:35",
    title: "到达森林步道",
    desc: "阴凉路线较多，适合宠物活动",
    icon: Trees,
  },
  {
    time: "10:10",
    title: "散步与拍照",
    desc: "预计活动距离 2.4 km",
    icon: PawPrint,
  },
  {
    time: "11:20",
    title: "Paw Coffee 休息",
    desc: "宠物友好咖啡馆，提供水碗",
    icon: Coffee,
  },
  {
    time: "12:10",
    title: "运动后补给",
    desc: "推荐 65 kcal 轻量零食",
    icon: Bone,
  },
];

export default function PlanScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full overflow-y-auto pb-10">
      <div className="px-5 pt-5">
        <button onClick={onBack} className="text-sm text-zinc-500 mb-3">
          ← 返回
        </button>

        <div className="rounded-3xl bg-white shadow-lg overflow-hidden">
          <div className="h-44 bg-gradient-to-br from-emerald-200 via-amber-100 to-orange-200 relative overflow-hidden">
            <SimpleMap />

            <div className="absolute left-4 bottom-4 right-4">
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-orange-700">
                最佳匹配 · 92/100
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 mt-2">
                青山湖森林步道
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-4 divide-x p-4 text-center">
            <Metric label="自驾" value="35min" />
            <Metric label="时长" value="3h" />
            <Metric label="活动" value="2.4km" />
            <Metric label="消耗" value="75" />
          </div>
        </div>

        <SectionTitle title="为什么 AI 推荐这里？" />

        <div className="rounded-3xl bg-white shadow-sm p-4 text-sm text-zinc-700 space-y-2">
          <p>1. 今日温度适中，适合中大型犬进行户外活动。</p>
          <p>2. 森林步道阴凉区域较多，适合短途自驾。</p>
          <p>3. 附近有宠物友好咖啡馆和补给商家。</p>
        </div>

        <SectionTitle title="周末活动时间线" />

        <div className="space-y-3">
          {timeline.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.time} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-orange-600" />
                  </div>

                  {index !== timeline.length - 1 && (
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
              <p className="text-4xl font-bold mt-1">75 kcal</p>
            </div>
            <Flame className="h-10 w-10 text-orange-400" />
          </div>

          <div className="mt-5 rounded-3xl bg-white text-zinc-900 p-4 flex gap-3 items-center">
            <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Bone className="h-7 w-7 text-orange-600" />
            </div>

            <div className="flex-1">
              <p className="font-bold">鸡肉洁牙棒</p>
              <p className="text-xs text-zinc-500">
                65 kcal · 300m · 适合作为轻量运动后补给
              </p>
            </div>

            <ShoppingBag className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </div>
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

function SimpleMap() {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 390 230" className="w-full h-full">
        <rect width="390" height="230" fill="#ecfdf5" />
        <circle cx="70" cy="70" r="48" fill="#bbf7d0" opacity="0.8" />
        <circle cx="310" cy="80" r="56" fill="#fde68a" opacity="0.7" />

        <path
          d="M30 180 C 80 120, 130 160, 180 105 S 290 70, 360 120"
          fill="none"
          stroke="#f97316"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <MapPinText x={40} y={175} label="家" color="#111827" />
        <MapPinText x={180} y={105} label="步道" color="#16a34a" />
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