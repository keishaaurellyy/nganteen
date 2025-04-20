import {
    BookLockIcon,
  HandPlatterIcon,
  HistoryIcon,
  HomeIcon,
  LifeBuoyIcon,
} from "lucide-react";

export type Role = "buyer" | "kitchen" | "admin" | "guest"; //ini tar ganti dari endpoint

export interface Route {
  label: string;
  href: string;
  icon?: any;
  roles: Role[];
  children?: Route[];
}

export const ROUTES_BUYER: Route[] = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
    roles: ["buyer"],
  },
  {
    label: "Explore Kitchen",
    href: "/kitchens",
    icon: HandPlatterIcon,
    roles: ["buyer"],
  },
  {
    label: "History Order",
    href: "/history",
    icon: HistoryIcon,
    roles: ["buyer"],
  },
  {
    label: "Help Center",
    href: "/help",
    icon: LifeBuoyIcon,
    roles: ["buyer"],
  },
  // Logout bukan link, jadi nggak dimasukin sini
];

export const ROUTES_KITCHEN: Route[] = [
  {
    label: "Home",
    href: "/",
    roles: ["kitchen"],
  },
  {
    label: "Balance",
    href: "/balance",
    roles: ["kitchen"],
  },
  {
    label: "On-going Orders",
    href: "/orders",
    roles: ["kitchen"],
  },
  {
    label: "Order History",
    href: "/history",
    roles: ["kitchen"],
  },
  {
    label: "Contract Policy",
    href: "/policy",
    icon: BookLockIcon,
    roles: ["kitchen"],
  },
  {
    label: "Help Center",
    href: "/help",
    icon: LifeBuoyIcon,
    roles: ["kitchen"],
  },
  {
    label: "Set your MENU",
    href: "/menu",
    roles: ["kitchen"],
  },
  // Logout bukan link, jadi nggak dimasukin sini
];

export const ROUTES_ADMIN: Route[] = [
  {
    label: "Home",
    href: "/",
    roles: ["admin"],
  },
];
