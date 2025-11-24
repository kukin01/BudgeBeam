"use client";

import Sidebar, { NavLink } from "@/components/ui/sidebar";
import { HomeIcon }from "@radix-ui/react-icons"

const links: NavLink[] = [
  { id: "home", label: "Home", href: "/dashboard", icon: <HomeIcon /> },
  { id: "Budgets", label: "Budgets", href: "/budgets" },
  { id: "Incomes", label: "Income", href: "/income" },
  // {
  //   id: "settings",
  //   label: "Settings",
  //   href: "/dashboard/settings",
  //   disabled: true,
  // },
];
 
export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar links={links} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      </main>
    </div>
  );
}
