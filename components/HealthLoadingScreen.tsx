"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function HealthLoadingScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDone, 7600);
    return () => clearTimeout(timer);
  }, [onDone]);

  const humanSteps = [
    { x: 96, y: 438, r: -8 },
    { x: 124, y: 392, r: 8 },
    { x: 100, y: 346, r: -8 },
    { x: 128, y: 300, r: 8 },
    { x: 104, y: 254, r: -8 },
    { x: 132, y: 208, r: 8 },
    { x: 108, y: 162, r: -8 },
    { x: 136, y: 116, r: 8 },
    { x: 112, y: 70, r: -8 },
  ];

  const pawSteps = [
    { x: 204, y: 430, r: 8 },
    { x: 228, y: 386, r: -8 },
    { x: 206, y: 342, r: 8 },
    { x: 230, y: 298, r: -8 },
    { x: 208, y: 254, r: 8 },
    { x: 232, y: 210, r: -8 },
    { x: 210, y: 166, r: 8 },
    { x: 234, y: 122, r: -8 },
    { x: 212, y: 78, r: 8 },
  ];

  const plants = [
    { x: 52, y: 398, delay: 1.4, type: "flower" },
    { x: 282, y: 354, delay: 2.2, type: "grass" },
    { x: 60, y: 242, delay: 3.5, type: "grass" },
    { x: 274, y: 188, delay: 4.5, type: "flower" },
    { x: 68, y: 108, delay: 5.4, type: "dot" },
    { x: 286, y: 92, delay: 5.9, type: "dot" },
  ];

  return (
    <div className="relative h-full overflow-hidden bg-[#fffaf1]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8ea] via-[#fffaf1] to-[#f4fff4]" />

      <div className="absolute inset-0">
        <div className="absolute left-10 top-24 h-24 w-24 rounded-full bg-orange-100/35" />
        <div className="absolute right-8 top-40 h-28 w-28 rounded-full bg-emerald-100/35" />
        <div className="absolute left-14 bottom-36 h-20 w-20 rounded-full bg-amber-100/35" />
      </div>

      <div className="absolute left-1/2 top-[43%] h-[520px] w-[360px] -translate-x-1/2 -translate-y-1/2">
        {humanSteps.map((step, index) => (
          <HumanStep
            key={`human-${index}`}
            x={step.x}
            y={step.y}
            rotate={step.r}
            delay={index * 0.46}
          />
        ))}

        {pawSteps.map((step, index) => (
          <PawStep
            key={`paw-${index}`}
            x={step.x}
            y={step.y}
            rotate={step.r}
            delay={index * 0.46 + 0.18}
          />
        ))}

        {plants.map((item, index) => {
          if (item.type === "flower") {
            return (
              <CreamFlower
                key={`plant-${index}`}
                x={item.x}
                y={item.y}
                delay={item.delay}
              />
            );
          }

          if (item.type === "grass") {
            return (
              <CreamGrass
                key={`plant-${index}`}
                x={item.x}
                y={item.y}
                delay={item.delay}
              />
            );
          }

          return (
            <SoftDot
              key={`plant-${index}`}
              x={item.x}
              y={item.y}
              delay={item.delay}
            />
          );
        })}
      </div>

      <div className="absolute left-6 bottom-10 z-20">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="h-9 w-9 rounded-2xl bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-100"
          >
            <PawPrint className="h-5 w-5 text-white" />
          </motion.div>

          <p className="text-xl font-bold text-zinc-800">
            PawFlow <span className="text-orange-500">AI</span>
          </p>
        </div>

        <motion.p
          className="mt-4 text-xl font-medium text-zinc-600"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          正在生成健康画像...
        </motion.p>
      </div>
    </div>
  );
}

function HumanStep({
  x,
  y,
  rotate,
  delay,
}: {
  x: number;
  y: number;
  rotate: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.7, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.42, ease: "easeOut" }}
    >
      <div
        className="relative h-16 w-10"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="absolute left-1 top-0 h-10 w-8 rounded-full bg-[#f4bf83] shadow-[inset_0_-4px_8px_rgba(197,108,40,0.12),0_4px_10px_rgba(244,191,131,0.28)]" />
        <div className="absolute left-1 top-9 h-5 w-8 rounded-b-full rounded-t-md bg-[#f4bf83] shadow-[inset_0_-3px_7px_rgba(197,108,40,0.12),0_4px_10px_rgba(244,191,131,0.25)]" />
        <div className="absolute left-3 top-2 h-2.5 w-4 rounded-full bg-white/35" />
      </div>
    </motion.div>
  );
}

function PawStep({
  x,
  y,
  rotate,
  delay,
}: {
  x: number;
  y: number;
  rotate: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.7, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.42, ease: "easeOut" }}
    >
      <div
        className="relative h-13 w-13"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="absolute left-[15px] top-[22px] h-6 w-7 rounded-full bg-[#f1a24d] shadow-[inset_0_-3px_6px_rgba(181,91,23,0.16),0_4px_9px_rgba(241,162,77,0.25)]" />
        <div className="absolute left-[5px] top-[11px] h-3.5 w-3.5 rounded-full bg-[#f1a24d] shadow-[0_3px_7px_rgba(241,162,77,0.2)]" />
        <div className="absolute left-[17px] top-[4px] h-3.5 w-3.5 rounded-full bg-[#f1a24d] shadow-[0_3px_7px_rgba(241,162,77,0.2)]" />
        <div className="absolute left-[30px] top-[11px] h-3.5 w-3.5 rounded-full bg-[#f1a24d] shadow-[0_3px_7px_rgba(241,162,77,0.2)]" />
        <div className="absolute left-[8px] top-[25px] h-3.5 w-3.5 rounded-full bg-[#f1a24d] shadow-[0_3px_7px_rgba(241,162,77,0.2)]" />
        <div className="absolute left-[32px] top-[25px] h-3.5 w-3.5 rounded-full bg-[#f1a24d] shadow-[0_3px_7px_rgba(241,162,77,0.2)]" />
        <div className="absolute left-[19px] top-[24px] h-2 w-4 rounded-full bg-white/35" />
      </div>
    </motion.div>
  );
}

function CreamFlower({
  x,
  y,
  delay,
}: {
  x: number;
  y: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.2, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "backOut" }}
    >
      <div className="relative h-12 w-12">
        <div className="absolute left-[22px] top-7 h-8 w-[4px] rounded-full bg-[#a8d88b]" />
        <div className="absolute left-[10px] top-8 h-5 w-3 rotate-[-45deg] rounded-full bg-[#9fd7ad]" />
        <div className="absolute left-[28px] top-8 h-5 w-3 rotate-[45deg] rounded-full bg-[#9fd7ad]" />

        <div className="absolute left-[19px] top-1 h-4 w-4 rounded-full bg-[#ffe18a]" />
        <div className="absolute left-[19px] top-[19px] h-4 w-4 rounded-full bg-[#ffe18a]" />
        <div className="absolute left-[5px] top-[10px] h-4 w-4 rounded-full bg-[#ffe18a]" />
        <div className="absolute left-[32px] top-[10px] h-4 w-4 rounded-full bg-[#ffe18a]" />
        <div className="absolute left-[17px] top-[9px] h-5 w-5 rounded-full bg-[#f6b35f]" />
      </div>
    </motion.div>
  );
}

function CreamGrass({
  x,
  y,
  delay,
}: {
  x: number;
  y: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.25, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "backOut" }}
    >
      <div className="relative h-12 w-14">
        <div className="absolute left-2 bottom-0 h-9 w-3 origin-bottom rotate-[-28deg] rounded-full bg-[#9fd7ad]" />
        <div className="absolute left-6 bottom-0 h-11 w-3 origin-bottom rounded-full bg-[#83cf97]" />
        <div className="absolute left-10 bottom-0 h-9 w-3 origin-bottom rotate-[28deg] rounded-full bg-[#9fd7ad]" />
      </div>
    </motion.div>
  );
}

function SoftDot({
  x,
  y,
  delay,
}: {
  x: number;
  y: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute h-4 w-4 rounded-full bg-[#c8ead8]"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
    />
  );
}