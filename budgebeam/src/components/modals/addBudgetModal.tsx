"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Trash2 } from "lucide-react";

export interface Budget {
  id: string;
  month: string;
  income: number;
  purpose: string;
  expenses: Expense[];
  totalExpenses: number;
  balance: number;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: Budget) => void;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AddBudgetModal({
  isOpen,
  onClose,
  onSave,
}: AddBudgetModalProps) {
  const [month, setMonth] = useState<string>("January");
  const [income, setIncome] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", name: "", amount: 0 },
  ]);

  const handleAddExpense = () => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      name: "",
      amount: 0,
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleRemoveExpense = (id: string) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  const handleExpenseChange = (
    id: string,
    field: "name" | "amount",
    value: string | number,
  ) => {
    setExpenses(
      expenses.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]:
                field === "amount" ? parseFloat(value.toString()) || 0 : value,
            }
          : exp,
      ),
    );
  };

  const handleSave = () => {
    if (!income || !purpose || !month) {
      alert("Please fill in all required fields");
      return;
    }

    const incomeNum = parseFloat(income);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const balance = incomeNum - totalExpenses;

    const newBudget: Budget = {
      id: Date.now().toString(),
      month,
      income: incomeNum,
      purpose,
      expenses: expenses.filter((exp) => exp.name.trim() !== ""),
      totalExpenses,
      balance,
    };

    onSave(newBudget);
    handleReset();
  };

  const handleReset = () => {
    setMonth("January");
    setIncome("");
    setPurpose("");
    setExpenses([{ id: "1", name: "", amount: 0 }]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Budget</h2>
          <button
            onClick={handleReset}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="month">Month</Label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-transparent text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="income">Income</Label>
            <Input
              id="income"
              type="number"
              placeholder="Enter monthly income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="purpose">Purpose/Plan</Label>
            <textarea
              id="purpose"
              placeholder="Enter the purpose or plan for this budget"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3 py-2 mt-3 border border-input rounded-md bg-transparent text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:ring-[3px] min-h-[100px] resize-none"
            />
          </div>

          <div className="col-span-2">
            <h3 className="font-semibold text-lg mb-3">Expenses</h3>
            <div className="space-y-3">
              {expenses.map((expense, index) => (
                <div key={expense.id} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Label className="text-sm">Expense {index + 1} Name</Label>
                    <Input
                      type="text"
                      placeholder={`Expense ${index + 1} name`}
                      value={expense.name}
                      onChange={(e) =>
                        handleExpenseChange(expense.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-sm">Amount</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={expense.amount || ""}
                      onChange={(e) =>
                        handleExpenseChange(
                          expense.id,
                          "amount",
                          e.target.value,
                        )
                      }
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveExpense(expense.id)}
                    disabled={expenses.length === 1}
                    className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <Button
              onClick={handleAddExpense}
              className="w-full mt-3 gap-2 text-white cursor-pointer"
            >
              <Plus size={18} />
              Add Expense
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mt-6 border-t pt-4">
          <Button onClick={handleReset} variant="outline" className="flex-1 cursor-pointer">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 text-white cursor-pointer">
            Save Budget
          </Button>
        </div>
      </div>
    </div>
  );
}
