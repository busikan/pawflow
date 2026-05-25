"use client";

import { useState } from "react";

import PhoneFrame from "@/components/PhoneFrame";
import SplashScreen from "@/components/SplashScreen";
import LoginScreen from "@/components/LoginScreen";
import RegisterScreen from "@/components/RegisterScreen";
import PetProfileScreen from "@/components/PetProfileScreen";
import HomeScreen from "@/components/HomeScreen";
import LoadingPathScreen from "@/components/LoadingPathScreen";
import PlanScreen from "@/components/PlanScreen";

type Screen =
  | "splash"
  | "login"
  | "register"
  | "pet"
  | "home"
  | "loading"
  | "plan";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("splash");

  // 是否已经显示过首页欢迎弹窗
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  return (
    <PhoneFrame>
      {screen === "splash" && (
        <SplashScreen onDone={() => setScreen("login")} />
      )}

      {screen === "login" && (
        <LoginScreen
          onLogin={() => setScreen("pet")}
          onRegister={() => setScreen("register")}
          onGuest={() => setScreen("home")}
        />
      )}

      {screen === "register" && (
        <RegisterScreen onRegister={() => setScreen("pet")} />
      )}

      {screen === "pet" && (
        <PetProfileScreen onComplete={() => setScreen("home")} />
      )}

      {screen === "home" && (
        <HomeScreen
          onGenerate={() => setScreen("loading")}
          showWelcome={!hasShownWelcome}
          onCloseWelcome={() => setHasShownWelcome(true)}
        />
      )}

      {screen === "loading" && (
        <LoadingPathScreen onDone={() => setScreen("plan")} />
      )}

      {screen === "plan" && (
        <PlanScreen onBack={() => setScreen("home")} />
      )}
    </PhoneFrame>
  );
}