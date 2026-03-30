import React from "react";
import Link from "next/link";
import { HomeIcon } from "@radix-ui/react-icons";

export type NavLink = {
  id?: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  target?: string;
  disabled?: boolean;
};

export const navLinks: NavLink[] = [
  { id: "home", label: "Home", href: "/dashboard", icon: <HomeIcon /> },
  { id: "Budgets", label: "Budgets", href: "/budgets" },
  { id: "Incomes", label: "Income", href: "/income" },
];

type SidebarProps = {
  links: NavLink[];
  className?: string;
  collapsed?: boolean;
};

export default function Sidebar({
  links,
  className = "",
  collapsed = false,
}: SidebarProps) {
  return (
    <aside
      className={`bg-white text-bb-text ${className} ${
        collapsed ? "w-20" : "w-64"
      } h-full border-r border-border p-6`}
      aria-label="Primary"
    >
      <nav className="flex flex-col gap-1" role="navigation">
        {links.map((l) => (
          <Link
            key={l.id ?? l.href}
            href={l.disabled ? "#" : l.href}
            target={l.target}
            aria-disabled={l.disabled ? "true" : undefined}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-ring ${
              l.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } hover:bg-blue-300 hover:rounded-full transition-transform duration-200 hover:scale-105`}
          >
            {l.icon && <span className="w-5 h-5 flex-none">{l.icon}</span>}
            <span
              className={`transition-opacity ${
                collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {l.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
