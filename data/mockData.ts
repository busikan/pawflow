import { PetProfile, Product, Spot } from "@/types/app";

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
];5