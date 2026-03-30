"use client";

import Sidebar from "@/components/ui/sidebar";
import { navLinks } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatCard {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCard) {
  return (
    <Card className="flex flex-col bg-gradient-to-br from-blue-100 to-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && <div className="text-2xl">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {description && (
          <CardDescription className="mt-2">{description}</CardDescription>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const stats: StatCard[] = [
    {
      title: "Total Budgets",
      value: "12",
      description: "Budgets created this month",
    },
    {
      title: "Total Income",
      value: "RFW 5,420",
      description: "Income recorded",
    },
    {
      title: "Total Expenses",
      value: "RFW 3,205",
      description: "Expenses recorded",
    },
    {
      title: "Balance",
      value: "RFW 2,215",
      description: "Remaining balance",
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar links={navLinks} />
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Budgets</CardTitle>
              <CardDescription>Your latest budget entries</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Add recent budgets list here
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Add quick action buttons here
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
