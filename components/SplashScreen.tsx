"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-white">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-24 w-24 rounded-3xl bg-orange-500 flex items-center justify-center shadow-xl"
      >
        <PawPrint className="h-12 w-12 text-white" />
      </motion.div>

      <motion.h1
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-4xl font-bold text-zinc-900"
      >
        PawFlow
      </motion.h1>

      <p className="mt-3 text-sm text-zinc-500">
        AI 宠物周末生活规划助手
      </p>
    </div>
  );
}