import { defaultPet, products, spots } from "@/data/mockData";
import { WeekendPlan } from "@/types/app";

export function generateWeekendPlan(userInput: string): WeekendPlan {
  const input = userInput.toLowerCase();

  let selectedSpot = spots[0];

  if (input.includes("咖啡") || input.includes("下雨")) {
    selectedSpot = spots[1];
  }

  if (input.includes("河") || input.includes("city walk") || input.includes("拍照")) {
    selectedSpot = spots[2];
  }

  const activityCoefficient = 1.05;
  const calories = Math.round(
    defaultPet.weight * selectedSpot.distanceKm * activityCoefficient
  );

  const selectedProduct =
    products.find((p) => Math.abs(p.calories - calories) < 25) || products[0];

  return {
    id: Date.now().toString(),
    title: `${selectedSpot.name} 周末活动计划`,
    spot: selectedSpot,
    product: selectedProduct,
    score: selectedSpot.id === "forest-trail" ? 92 : 86,
    duration: selectedSpot.id === "forest-trail" ? "3 h" : "2 h",
    calories,
    reason: [
      `Coco 是 ${defaultPet.weight}kg 的中大型犬，适合中等强度户外活动。`,
      `${selectedSpot.name} 符合你的需求：${selectedSpot.tags.join("、")}。`,
      `本次活动预计消耗 ${calories} kcal，可匹配附近宠物补给商品。`,
    ],
    timeline: [
      {
        time: "09:00",
        title: "从家出发",
        desc: `预计自驾 ${selectedSpot.driveTime} 分钟`,
      },
      {
        time: "09:35",
        title: `到达 ${selectedSpot.name}`,
        desc: "开始宠物友好周末活动",
      },
      {
        time: "10:10",
        title: "散步与拍照",
        desc: `预计活动距离 ${selectedSpot.distanceKm} km`,
      },
      {
        time: "11:20",
        title: "宠物友好地点休息",
        desc: "附近可找到咖啡馆或休息点",
      },
      {
        time: "12:10",
        title: "运动后补给",
        desc: `推荐 ${selectedProduct.name}，约 ${selectedProduct.calories} kcal`,
      },
    ],
  };
}