"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  MapPin,
  Trash2,
  Info,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function SettingScreen({
  onBack,
  onClearData,
}: {
  onBack: () => void;
  onClearData: () => void;
}) {
  const [notificationOn, setNotificationOn] = useState(true);
  const [locationOn, setLocationOn] = useState(true);

  return (
    <div className="h-full overflow-y-auto bg-[#fffaf1] px-5 pt-6 pb-10">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="h-5 w-5 text-zinc-700" />
        </button>

        <h1 className="text-lg font-bold text-zinc-900">设置</h1>

        <div className="h-10 w-10" />
      </div>

      <div className="mt-6 rounded-[32px] bg-gradient-to-br from-orange-500 to-amber-400 p-6 text-white shadow-xl">
        <ShieldCheck className="h-9 w-9" />

        <h2 className="mt-4 text-2xl font-bold">PawFlow 设置中心</h2>

        <p className="mt-2 text-sm leading-6 text-white/85">
          管理通知、定位、缓存和本地演示数据。
        </p>
      </div>

      <div className="mt-6 rounded-[32px] bg-white shadow-sm overflow-hidden">
        <SettingSwitchRow
          icon={Bell}
          title="活动提醒"
          desc="周末前提醒你查看宠物出行计划"
          checked={notificationOn}
          onChange={() => setNotificationOn(!notificationOn)}
        />

        <SettingSwitchRow
          icon={MapPin}
          title="定位服务"
          desc="用于推荐附近宠物友好商家"
          checked={locationOn}
          onChange={() => setLocationOn(!locationOn)}
        />

        <SettingInfoRow
          icon={Info}
          title="关于 PawFlow"
          desc="AI Pet Weekend Planner · Demo Version"
        />
      </div>

      <button
        onClick={onClearData}
        className="mt-6 w-full rounded-2xl bg-white py-4 text-sm font-semibold text-red-500 shadow-sm flex items-center justify-center gap-2"
      >
        <Trash2 className="h-4 w-4" />
        清除本地演示数据
      </button>
    </div>
  );
}

function SettingSwitchRow({
  icon: Icon,
  title,
  desc,
  checked,
  onChange,
}: {
  icon: any;
  title: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-5 border-b border-zinc-100">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-orange-50 flex items-center justify-center">
          <Icon className="h-5 w-5 text-orange-600" />
        </div>

        <div>
          <p className="font-semibold text-zinc-900">{title}</p>
          <p className="mt-1 text-xs text-zinc-500">{desc}</p>
        </div>
      </div>

      <button
        onClick={onChange}
        className={`h-7 w-12 rounded-full p-1 transition ${
          checked ? "bg-orange-500" : "bg-zinc-200"
        }`}
      >
        <div
          className={`h-5 w-5 rounded-full bg-white transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function SettingInfoRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-orange-50 flex items-center justify-center">
          <Icon className="h-5 w-5 text-orange-600" />
        </div>

        <div>
          <p className="font-semibold text-zinc-900">{title}</p>
          <p className="mt-1 text-xs text-zinc-500">{desc}</p>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 text-zinc-300" />
    </div>
  );
}