"use client";

import { useState } from "react";
import {
  ArrowLeft,
  PawPrint,
  Plus,
  Trash2,
  Edit3,
  Check,
  Clock3,
  Heart,
  Settings,
  ChevronRight,
} from "lucide-react";

import { Pet, useAppStore } from "@/store/useAppStore";

export default function PetProfileScreen({
  onBack,
  onOpenHistory,
  onOpenFavorites,
}: {
  onBack: () => void;
  onOpenHistory: () => void;
  onOpenFavorites: () => void;
}) {
  const {
    pets,
    activePetId,
    addPet,
    updatePet,
    deletePet,
    setActivePetId,
  } = useAppStore();

  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  function openAddPet() {
    setEditingPet({
      id: Date.now().toString(),
      name: "",
      breed: "",
      age: "",
      weight: "",
      health: "",
      preference: "",
    });
    setShowEditor(true);
  }

  function openEditPet(pet: Pet) {
    setEditingPet({ ...pet });
    setShowEditor(true);
  }

  function saveEditingPet() {
    if (!editingPet) return;

    const exists = pets.some((pet) => pet.id === editingPet.id);

    if (exists) {
      updatePet(editingPet);
    } else {
      addPet(editingPet);
    }

    setShowEditor(false);
    setEditingPet(null);
  }

  function handleDeletePet(id: string) {
    deletePet(id);
  }

  const activePet = pets.find((pet) => pet.id === activePetId) || pets[0];

  return (
    <div className="relative h-full overflow-y-auto bg-[#fffaf1] pb-10">
      <div className="h-48 bg-gradient-to-br from-orange-500 to-amber-400 px-5 pt-6 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <h1 className="text-lg font-semibold">我的宠物</h1>

          <button
            onClick={openAddPet}
            className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-7">
          <p className="text-sm text-white/75">当前 AI 推荐宠物</p>

          <h2 className="mt-2 text-3xl font-bold">
            {activePet ? activePet.name : "暂无宠物"}
          </h2>

          <p className="mt-2 text-sm text-white/80">
            {activePet
              ? `${activePet.breed} · ${activePet.age} · ${activePet.weight}`
              : "请先添加宠物档案"}
          </p>
        </div>
      </div>

      <div className="px-5 -mt-10">
        <div className="rounded-[32px] bg-white p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-zinc-900">宠物档案</h3>

            <button
              onClick={openAddPet}
              className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600"
            >
              添加宠物
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {pets.map((pet) => {
              const isActive = pet.id === activePetId;

              return (
                <div
                  key={pet.id}
                  className={`rounded-[28px] border p-4 ${
                    isActive
                      ? "border-orange-300 bg-orange-50"
                      : "border-zinc-100 bg-zinc-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
                        isActive ? "bg-orange-500" : "bg-white"
                      }`}
                    >
                      <PawPrint
                        className={`h-7 w-7 ${
                          isActive ? "text-white" : "text-orange-500"
                        }`}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-zinc-900">
                          {pet.name || "未命名宠物"}
                        </h4>

                        {isActive && (
                          <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                            当前推荐
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-zinc-500">
                        {pet.breed || "未填写品种"} · {pet.age || "年龄未知"} ·{" "}
                        {pet.weight || "体重未知"}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-zinc-500">
                        {pet.preference || "暂无活动偏好"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setActivePetId(pet.id)}
                      className={`rounded-2xl py-2 text-xs font-semibold ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "bg-white text-zinc-600"
                      }`}
                    >
                      {isActive ? "使用中" : "设为当前"}
                    </button>

                    <button
                      onClick={() => openEditPet(pet)}
                      className="rounded-2xl bg-white py-2 text-xs font-semibold text-zinc-600 flex items-center justify-center gap-1"
                    >
                      <Edit3 className="h-3 w-3" />
                      编辑
                    </button>

                    <button
                      onClick={() => handleDeletePet(pet.id)}
                      className="rounded-2xl bg-white py-2 text-xs font-semibold text-red-500 flex items-center justify-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      删除
                    </button>
                  </div>
                </div>
              );
            })}

            {pets.length === 0 && (
              <div className="rounded-[28px] bg-zinc-50 p-8 text-center">
                <PawPrint className="mx-auto h-10 w-10 text-orange-400" />

                <p className="mt-4 font-semibold text-zinc-900">
                  还没有宠物档案
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  添加宠物后，AI 会根据它的状态生成周末计划。
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 rounded-[32px] bg-white shadow-sm overflow-hidden">
          <ProfileRow
            icon={Clock3}
            title="历史计划"
            desc="查看之前生成过的周末活动"
            onClick={onOpenHistory}
          />

          <ProfileRow
            icon={Heart}
            title="收藏商家"
            desc="查看已收藏的宠物友好地点"
            onClick={onOpenFavorites}
          />

          <ProfileRow
            icon={Settings}
            title="设置"
            desc="账号、通知与隐私设置"
            onClick={() => {}}
          />
        </div>
      </div>

      {showEditor && editingPet && (
        <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-end">
          <div className="w-full max-h-[88%] overflow-y-auto rounded-t-[36px] bg-[#fffaf1] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-zinc-900">
                {pets.some((pet) => pet.id === editingPet.id)
                  ? "编辑宠物档案"
                  : "添加宠物"}
              </h3>

              <button
                onClick={() => {
                  setShowEditor(false);
                  setEditingPet(null);
                }}
                className="text-sm text-zinc-500"
              >
                取消
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <EditField
                label="宠物名"
                value={editingPet.name}
                onChange={(value) =>
                  setEditingPet({ ...editingPet, name: value })
                }
              />

              <EditField
                label="品种"
                value={editingPet.breed}
                onChange={(value) =>
                  setEditingPet({ ...editingPet, breed: value })
                }
              />

              <EditField
                label="年龄"
                value={editingPet.age}
                onChange={(value) =>
                  setEditingPet({ ...editingPet, age: value })
                }
              />

              <EditField
                label="体重"
                value={editingPet.weight}
                onChange={(value) =>
                  setEditingPet({ ...editingPet, weight: value })
                }
              />

              <EditField
                label="健康状态"
                value={editingPet.health}
                onChange={(value) =>
                  setEditingPet({ ...editingPet, health: value })
                }
              />

              <EditField
                label="活动偏好"
                value={editingPet.preference}
                onChange={(value) =>
                  setEditingPet({ ...editingPet, preference: value })
                }
              />
            </div>

            <button
              onClick={saveEditingPet}
              className="mt-6 w-full rounded-2xl bg-zinc-900 py-4 font-semibold text-white flex items-center justify-center gap-2"
            >
              <Check className="h-4 w-4" />
              保存宠物档案
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <p className="mb-2 text-xs font-medium text-zinc-500">{label}</p>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl bg-white px-4 py-4 text-sm text-zinc-900 outline-none shadow-sm"
      />
    </label>
  );
}

function ProfileRow({
  icon: Icon,
  title,
  desc,
  onClick,
}: {
  icon: any;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-3 px-5 py-5 border-b border-zinc-100 last:border-b-0 text-left"
    >
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-orange-50 flex items-center justify-center">
          <Icon className="h-5 w-5 text-orange-600" />
        </div>

        <div>
          <p className="font-semibold text-zinc-900">{title}</p>
          <p className="mt-1 text-xs text-zinc-500">{desc}</p>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 text-zinc-300 shrink-0" />
    </button>
  );
}