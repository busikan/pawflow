import { defaultPet, products, spots, businesses, HOME_LOCATION } from "../data/mockData";
import { MapWaypoint, WeekendPlan } from "../types/app";
import { Pet } from "../store/useAppStore";

function parseWeight(weight: string | number | undefined) {
  if (typeof weight === "number") return weight;
  if (!weight) return defaultPet.weight;

  const matched = weight.match(/\d+(\.\d+)?/);
  return matched ? Number(matched[0]) : defaultPet.weight;
}

function getPetSize(weight: number) {
  if (weight >= 25) return "large";
  if (weight >= 10) return "medium";
  return "small";
}

export function generateWeekendPlan(
  userInput: unknown = "",
  activePet?: Pet | null
): WeekendPlan {
  const input = typeof userInput === "string" ? userInput.toLowerCase() : "";

  const petName = activePet?.name || defaultPet.name;
  const petBreed = activePet?.breed || defaultPet.breed;
  const petWeight = parseWeight(activePet?.weight);
  const petSize = getPetSize(petWeight);

  let selectedSpot = spots[0];

  if (input.includes("咖啡") || input.includes("下雨")) {
    selectedSpot = spots[1];
  }

  if (input.includes("河") || input.includes("city walk") || input.includes("拍照")) {
    selectedSpot = spots[2];
  }

  if (petSize === "small" && input.includes("轻松")) {
    selectedSpot = spots[1];
  }

  const activityCoefficient =
    petSize === "large" ? 1.05 : petSize === "medium" ? 0.9 : 0.65;

  const calories = Math.round(
    petWeight * selectedSpot.distanceKm * activityCoefficient
  );

  const selectedProduct =
    products.find((p) => Math.abs(p.calories - calories) < 30) || products[0];

  const cafeBusiness = businesses[0];
  const supplyBusiness = businesses[1];

  const waypoints: MapWaypoint[] = [
    {
      id: "home",
      label: "家",
      position: HOME_LOCATION,
      timelineIndex: 0,
      color: "#111827",
    },
    {
      id: "spot",
      label: selectedSpot.type,
      position: selectedSpot.location,
      timelineIndex: 1,
      color: "#16a34a",
    },
    {
      id: "cafe",
      label: "咖啡",
      position: cafeBusiness.location,
      timelineIndex: 3,
      color: "#f97316",
    },
    {
      id: "supply",
      label: "补给",
      position: supplyBusiness.location,
      timelineIndex: 4,
      color: "#a855f7",
    },
  ];

  return {
    id: Date.now().toString(),
    title: `${selectedSpot.name} 周末活动计划`,
    spot: selectedSpot,
    product: selectedProduct,
    businesses,
    score: selectedSpot.id === "forest-trail" ? 92 : 86,
    duration: selectedSpot.id === "forest-trail" ? "3 h" : "2 h",
    calories,
    reason: [
      `${petName} 是 ${petWeight}kg 的${petSize === "large" ? "中大型犬" : petSize === "medium" ? "中型犬" : "小型犬"}，适合相应强度的周末活动。`,
      `${selectedSpot.name} 符合当前需求：${selectedSpot.tags.join("、")}。`,
      `根据 ${petBreed} 的体型和预计活动距离，本次活动预计消耗 ${calories} kcal。`,
    ],
    timeline: [
      {
        time: "09:00",
        title: `带 ${petName} 从家出发`,
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
    waypoints,
  };
}

export function getPlanWaypoints(plan: WeekendPlan): MapWaypoint[] {
  if (plan.waypoints?.length) {
    return plan.waypoints;
  }

  const cafeBusiness = plan.businesses[0] ?? businesses[0];
  const supplyBusiness = plan.businesses[1] ?? businesses[1];

  return [
    {
      id: "home",
      label: "家",
      position: HOME_LOCATION,
      timelineIndex: 0,
      color: "#111827",
    },
    {
      id: "spot",
      label: plan.spot.type,
      position: plan.spot.location,
      timelineIndex: 1,
      color: "#16a34a",
    },
    {
      id: "cafe",
      label: "咖啡",
      position: cafeBusiness.location,
      timelineIndex: 3,
      color: "#f97316",
    },
    {
      id: "supply",
      label: "补给",
      position: supplyBusiness.location,
      timelineIndex: 4,
      color: "#a855f7",
    },
  ];
}