import { PetProfile, Product, Spot } from "@/types/app";
import { Business } from "@/types/app";
export const defaultPet: PetProfile = {
  name: "Coco",
  breed: "金毛 Golden Retriever",
  age: 3,
  weight: 30,
  health: "健康，无明显关节问题",
  preference: "户外散步、草地、短途自驾",
};

export const spots: Spot[] = [
  {
    id: "forest-trail",
    name: "青山湖森林步道",
    type: "森林步道",
    driveTime: 35,
    distanceKm: 2.4,
    tags: ["风景好", "短途自驾", "宠物友好", "凉快一点"],
    image: "/scenic/qingshan-lake.jpg",
  },
  {
    id: "pet-cafe",
    name: "Paw Coffee 宠物友好咖啡馆",
    type: "宠物咖啡馆",
    driveTime: 18,
    distanceKm: 1.2,
    tags: ["宠物友好", "咖啡馆", "轻松", "下雨"],
    image: "/scenic/pet-cafe.jpg",
  },
  {
    id: "riverside",
    name: "河岸 City Walk 路线",
    type: "城市步道",
    driveTime: 20,
    distanceKm: 1.8,
    tags: ["风景好", "拍照", "轻运动"],
    image: "/scenic/riverside.jpg",
  },
];

export const products: Product[] = [
  {
    id: "chicken-stick",
    name: "鸡肉洁牙棒",
    calories: 65,
    price: "¥18.8",
    distance: "300m",
  },
  {
    id: "protein-snack",
    name: "高蛋白鸡肉粒",
    calories: 90,
    price: "¥25.9",
    distance: "450m",
  },
  {
    id: "low-fat-snack",
    name: "低脂训练零食",
    calories: 45,
    price: "¥16.8",
    distance: "520m",
  },
];

export const businesses: Business[] = [
  {
    id: "paw-coffee",
    name: "Paw Coffee",
    type: "宠物友好咖啡馆",
    distance: "距离目的地 500m",
    desc: "提供宠物水碗、户外座位，适合作为活动中段休息点。",
    tag: "休息推荐",
  },
  {
    id: "happy-pet-store",
    name: "Happy Pet Store",
    type: "宠物补给店",
    distance: "距离路线 300m",
    desc: "可购买低脂训练零食、鸡肉洁牙棒等运动后轻补给。",
    tag: "补给推荐",
  },
  {
    id: "city-pet-clinic",
    name: "City Pet Clinic",
    type: "宠物医院",
    distance: "距离路线 1.2km",
    desc: "作为周末短途出行的备用安全点。",
    tag: "安全备用",
  },
];