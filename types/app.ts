import { LucideIcon } from "lucide-react";

export type PetProfile = {
  name: string;
  breed: string;
  age: number;
  weight: number;
  health: string;
  preference: string;
};

export type Spot = {
  id: string;
  name: string;
  type: string;
  driveTime: number;
  distanceKm: number;
  tags: string[];
  image: string;
};

export type Product = {
  id: string;
  name: string;
  calories: number;
  price: string;
  distance: string;
};

export type WeekendPlan = {
  id: string;
  title: string;
  spot: Spot;
  product: Product;
  score: number;
  duration: string;
  calories: number;
  reason: string[];
  timeline: {
    time: string;
    title: string;
    desc: string;
  }[];
};