"use client";

import { useState } from "react";
import Sidebar, { navLinks } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import AddBudgetModal, {
  Budget,
  Expense,
} from "@/components/modals/addBudgetModal";

export default function BudgetPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const handleSaveBudget = (budget: Budget) => {
    setBudgets([...budgets, budget]);
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen flex">
      <Sidebar links={navLinks} />
      <main className="flex-1 overflow-auto">
        <section className="flex flex-row items-center justify-between p-4 border-b">
          <div>
            <h1 className="text-2xl font-bold">Budgets</h1>
            <span>Plan for tomorrow</span>
          </div>
          <div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="text-white cursor-pointer"
            >
              + New Budget
            </Button>
          </div>
        </section>

        {/* Budgets Table */}
        <div className="p-4">
          {budgets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No budgets yet. Click "+ New Budget" to create one.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left font-semibold">Month</th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Purpose
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Income
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Expenses
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {budgets.map((budget) => (
                    <tr key={budget.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">{budget.month}</td>
                      <td className="px-4 py-3">{budget.purpose}</td>
                      <td className="px-4 py-3 text-right">
                        ${budget.income.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        ${budget.totalExpenses.toFixed(2)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-semibold ${
                          budget.balance >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        ${budget.balance.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <AddBudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBudget}
      />
    </div>
  );
}
