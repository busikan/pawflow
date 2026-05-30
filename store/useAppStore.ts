"use client";

import { create } from "zustand";
import { Business, WeekendPlan } from "@/types/app";

export type Pet = {
  id: string;
  name: string;
  breed: string;
  age: string;
  weight: string;
  health: string;
  preference: string;
};

type AppState = {
  pets: Pet[];
  activePetId: string;
  currentPlan: WeekendPlan | null;
  historyPlans: WeekendPlan[];
  favoriteBusinesses: Business[];

  setPets: (pets: Pet[]) => void;
  addPet: (pet: Pet) => void;
  updatePet: (pet: Pet) => void;
  deletePet: (id: string) => void;
  setActivePetId: (id: string) => void;
  resetPetProfile: () => void;

  setCurrentPlan: (plan: WeekendPlan | null) => void;
  addHistoryPlan: (plan: WeekendPlan) => void;

  toggleFavoriteBusiness: (business: Business) => void;

  loadFromLocalStorage: () => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  pets: [],
  activePetId: "",
  currentPlan: null,
  historyPlans: [],
  favoriteBusinesses: [],

  setPets: (pets) => {
    set({ pets });
    localStorage.setItem("pawflow-pets", JSON.stringify(pets));

    if (pets.length === 0) {
      set({ activePetId: "" });
      localStorage.removeItem("pawflow-active-pet");
    }
  },

  addPet: (pet) => {
    const nextPets = [pet, ...get().pets];

    set({
      pets: nextPets,
      activePetId: pet.id,
    });

    localStorage.setItem("pawflow-pets", JSON.stringify(nextPets));
    localStorage.setItem("pawflow-active-pet", pet.id);
  },

  updatePet: (pet) => {
    const nextPets = get().pets.map((item) =>
      item.id === pet.id ? pet : item
    );

    set({ pets: nextPets });
    localStorage.setItem("pawflow-pets", JSON.stringify(nextPets));
  },

  deletePet: (id) => {
    const nextPets = get().pets.filter((pet) => pet.id !== id);
    const currentActiveId = get().activePetId;

    const nextActivePetId =
      currentActiveId === id ? nextPets[0]?.id || "" : currentActiveId;

    set({
      pets: nextPets,
      activePetId: nextActivePetId,
    });

    localStorage.setItem("pawflow-pets", JSON.stringify(nextPets));

    if (nextActivePetId) {
      localStorage.setItem("pawflow-active-pet", nextActivePetId);
    } else {
      localStorage.removeItem("pawflow-active-pet");
    }
  },

  setActivePetId: (id) => {
    set({ activePetId: id });
    localStorage.setItem("pawflow-active-pet", id);
  },

  resetPetProfile: () => {
    set({
      pets: [],
      activePetId: "",
      currentPlan: null,
    });

    localStorage.removeItem("pawflow-pets");
    localStorage.removeItem("pawflow-active-pet");
  },

  setCurrentPlan: (plan) => {
    set({ currentPlan: plan });
  },

  addHistoryPlan: (plan) => {
    const nextHistory = [plan, ...get().historyPlans].slice(0, 10);

    set({ historyPlans: nextHistory });
    localStorage.setItem("pawflow-history", JSON.stringify(nextHistory));
  },

  toggleFavoriteBusiness: (business) => {
    const exists = get().favoriteBusinesses.some(
      (item) => item.id === business.id
    );

    const nextFavorites = exists
      ? get().favoriteBusinesses.filter((item) => item.id !== business.id)
      : [business, ...get().favoriteBusinesses];

    set({ favoriteBusinesses: nextFavorites });
    localStorage.setItem("pawflow-favorites", JSON.stringify(nextFavorites));
  },

  loadFromLocalStorage: () => {
    const savedPets = localStorage.getItem("pawflow-pets");
    const savedActivePetId = localStorage.getItem("pawflow-active-pet");
    const savedHistory = localStorage.getItem("pawflow-history");
    const savedFavorites = localStorage.getItem("pawflow-favorites");

    if (savedPets) {
      const parsedPets = JSON.parse(savedPets) as Pet[];

      set({
        pets: parsedPets,
        activePetId: savedActivePetId || parsedPets[0]?.id || "",
      });
    } else {
      set({
        pets: [],
        activePetId: "",
      });
    }

    if (savedHistory) {
      set({ historyPlans: JSON.parse(savedHistory) });
    }

    if (savedFavorites) {
      set({ favoriteBusinesses: JSON.parse(savedFavorites) });
    }
  },
}));