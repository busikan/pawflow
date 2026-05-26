"use client";

import { useEffect, useState } from "react";

import PhoneFrame from "@/components/PhoneFrame";
import SplashScreen from "@/components/SplashScreen";
import LoginScreen from "@/components/LoginScreen";
import RegisterScreen from "@/components/RegisterScreen";
import PetProfileScreen from "@/components/PetProfileScreen";
import HomeScreen from "@/components/HomeScreen";
import LoadingPathScreen from "@/components/LoadingPathScreen";
import PlanScreen from "@/components/PlanScreen";
import HistoryScreen from "@/components/HistoryScreen";
import FavoritesScreen from "@/components/FavoritesScreen";
import BusinessDetailScreen from "@/components/BusinessDetailScreen";

import { generateWeekendPlan } from "@/lib/recommendation";
import { useAppStore } from "@/store/useAppStore";
import { Business } from "@/types/app";

type Screen =
  | "splash"
  | "login"
  | "register"
  | "petProfile"
  | "home"
  | "loading"
  | "plan"
  | "history"
  | "favorites"
  | "businessDetail";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  const [pendingInput, setPendingInput] = useState(
    "周末想带金毛出去玩，希望风景好一点，可以短途自驾，顺便找一家宠物友好咖啡馆。"
  );

  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );

  const {
    pets,
    activePetId,
    currentPlan,
    historyPlans,
    favoriteBusinesses,
    setCurrentPlan,
    addHistoryPlan,
    toggleFavoriteBusiness,
    loadFromLocalStorage,
  } = useAppStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  function handleGenerate(input: string) {
    setPendingInput(input);
    setScreen("loading");
  }

  function finishLoading() {
    const activePet = pets.find((pet) => pet.id === activePetId) || pets[0];
    const plan = generateWeekendPlan(pendingInput, activePet);

    setCurrentPlan(plan);
    addHistoryPlan(plan);

    setScreen("plan");
  }

  function openBusinessDetail(business: Business) {
    setSelectedBusiness(business);
    setScreen("businessDetail");
  }

  return (
    <PhoneFrame>
      {screen === "splash" && (
        <SplashScreen onDone={() => setScreen("login")} />
      )}

      {screen === "login" && (
        <LoginScreen
          onLogin={() => setScreen("petProfile")}
          onRegister={() => setScreen("register")}
          onGuest={() => setScreen("home")}
        />
      )}

      {screen === "register" && (
        <RegisterScreen onRegister={() => setScreen("petProfile")} />
      )}

      {screen === "petProfile" && (
        <PetProfileScreen
          onBack={() => setScreen("home")}
          onOpenHistory={() => setScreen("history")}
          onOpenFavorites={() => setScreen("favorites")}
        />
      )}

      {screen === "home" && (
        <HomeScreen
          onGenerate={handleGenerate}
          onOpenHistory={() => setScreen("history")}
          onOpenProfile={() => setScreen("petProfile")}
          showWelcome={!hasShownWelcome}
          onCloseWelcome={() => setHasShownWelcome(true)}
        />
      )}

      {screen === "loading" && <LoadingPathScreen onDone={finishLoading} />}

      {screen === "plan" && currentPlan && (
        <PlanScreen
          plan={currentPlan}
          favoriteBusinesses={favoriteBusinesses}
          onToggleFavorite={toggleFavoriteBusiness}
          onOpenBusiness={openBusinessDetail}
          onBack={() => setScreen("home")}
        />
      )}

      {screen === "history" && (
        <HistoryScreen
          plans={historyPlans}
          onBack={() => setScreen("home")}
          onOpenPlan={(plan) => {
            setCurrentPlan(plan);
            setScreen("plan");
          }}
        />
      )}

      {screen === "favorites" && (
        <FavoritesScreen
          businesses={favoriteBusinesses}
          onBack={() => setScreen("petProfile")}
          onOpenBusiness={openBusinessDetail}
        />
      )}

      {screen === "businessDetail" && selectedBusiness && (
        <BusinessDetailScreen
          business={selectedBusiness}
          isFavorite={favoriteBusinesses.some(
            (item) => item.id === selectedBusiness.id
          )}
          onToggleFavorite={toggleFavoriteBusiness}
          onBack={() => setScreen("plan")}
        />
      )}
    </PhoneFrame>
  );
}