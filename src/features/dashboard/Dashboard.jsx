import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  calculateDailyAverage,
  calculateCategorySpending,
  getTopCategory,
} from "@/utils/calculations";
import { StatsCards } from "./components/StatsCards";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { SpendingChart } from "./components/SpendingChart";
import { SpendingSummary } from "./components/SpendingSummary";
import { CategoryManager } from "./components/CategoryManager";
import { GoalManager } from "./components/GoalManager";

function Dashboard({ user }) {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchTransactions(), fetchGoals(), fetchCategories()]);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error: err } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;
      setTransactions(data || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      throw err;
    }
  };

  const fetchGoals = async () => {
    try {
      const { data, error: err } = await supabase
        .from("goals")
        .select("*");

      if (err) throw err;
      setGoals(data || []);
    } catch (err) {
      console.error("Error fetching goals:", err);
      throw err;
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error: err } = await supabase
        .from("categories")
        .select("*");

      if (err) throw err;
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      throw err;
    }
  };

  // Unified category management - handles both expense and income categories
  const addCategory = async (categoryName, type) => {
    if (!user?.id) {
      setError("User not authenticated");
      return false;
    }

    try {
      setError(null);
      const { error: err } = await supabase.from("categories").insert({
        user_id: user.id,
        name: categoryName,
        type,
      });

      if (err) throw err;
      await fetchCategories();
      return true;
    } catch (err) {
      const errorMsg = `Error adding ${type} category: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg);
      return false;
    }
  };

  const updateCategory = async (categoryId, newName) => {
    try {
      setError(null);
      const { error: err } = await supabase
        .from("categories")
        .update({ name: newName })
        .eq("id", categoryId);

      if (err) throw err;
      await fetchCategories();
      return true;
    } catch (err) {
      const errorMsg = `Error updating category: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg);
      return false;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      setError(null);
      const { error: err } = await supabase
        .from("categories")
        .delete()
        .eq("id", categoryId);

      if (err) throw err;
      await fetchCategories();
      return true;
    } catch (err) {
      const errorMsg = `Error deleting category: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg);
      return false;
    }
  };

  // Transaction management
  const addTransaction = async (type, transactionForm) => {
    if (!user?.id) {
      setError("User not authenticated");
      return false;
    }

    try {
      setError(null);
      const categoryField = type === "expense" ? "category" : "source";
      
      const { error: err } = await supabase.from("transactions").insert({
        user_id: user.id,
        type,
        amount: parseFloat(transactionForm.amount),
        category_id: transactionForm[categoryField] || null,
        description: transactionForm.description,
        date: new Date().toISOString().split("T")[0],
      });

      if (err) throw err;
      await fetchTransactions();
      return true;
    } catch (err) {
      const errorMsg = `Error adding transaction: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg);
      return false;
    }
  };

  const addExpense = async (expenseForm) => {
    return addTransaction("expense", expenseForm);
  };

  const addIncome = async (incomeForm) => {
    return addTransaction("income", incomeForm);
  };

  const updateTransaction = async (transactionId, editForm) => {
    try {
      setError(null);
      const { error: err } = await supabase
        .from("transactions")
        .update({
          amount: parseFloat(editForm.amount),
          category_id: editForm.category || null,
          description: editForm.description,
        })
        .eq("id", transactionId);

      if (err) throw err;
      await fetchTransactions();
      return true;
    } catch (err) {
      const errorMsg = `Error updating transaction: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg);
      return false;
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      setError(null);
      const { error: err } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transactionId);

      if (err) throw err;
      await fetchTransactions();
      return true;
    } catch (err) {
      const errorMsg = `Error deleting transaction: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg);
      return false;
    }
  };

  // Goal management
  const addGoal = async (goalForm) => {
    if (!user?.id) {
      setError("User not authenticated");
      return false;
    }

    try {
      setError(null);
      const { error: err } = await supabase.from("goals").insert({
        user_id: user.id,
        name: goalForm.name,
        goal_type: goalForm.type,
        period: null,
        target_amount: parseFloat(goalForm.amount),
        current_amount: 0,
      });

      if (err) throw err;
      await fetchGoals();
      return true;
    } catch (err) {
      const errorMsg = `Error adding goal: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg);
      return false;
    }
  };

  const updateGoal = async (goalId, editGoal) => {
    try {
      setError(null);
      const { error: err } = await supabase
        .from("goals")
        .update({
          name: editGoal.name,
          target_amount: parseFloat(editGoal.amount),
          goal_type: editGoal.type,
        })
        .eq("id", goalId);

      if (err) throw err;
      await fetchGoals();
      return true;
    } catch (err) {
      const errorMsg = `Error updating goal: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg);
      return false;
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      setError(null);
      const { error: err } = await supabase
        .from("goals")
        .delete()
        .eq("id", goalId);

      if (err) throw err;
      await fetchGoals();
      return true;
    } catch (err) {
      const errorMsg = `Error deleting goal: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg);
      return false;
    }
  };

  // Calculate stats using utility functions
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const balance = calculateBalance(transactions);
  const dailyAverage = calculateDailyAverage(transactions, 30);

  // Calculate spending by category
  const categorySpending = calculateCategorySpending(transactions, categories);
  const topCategory = getTopCategory(categorySpending);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#B6862C] via-[#1E3A5F] to-[#B6862C] flex items-center justify-center p-4">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B6862C] via-[#1E3A5F] to-[#B6862C] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 font-bold hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* Header Stats */}
        <StatsCards
          balance={balance}
          totalExpenses={totalExpenses}
          totalIncome={totalIncome}
          dailyAverage={dailyAverage}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Transactions */}
          <Card>
            <CardHeader>
              <TransactionForm
                categories={categories}
                onAddExpense={addExpense}
                onAddIncome={addIncome}
                onAddCategory={addCategory}
              />
            </CardHeader>
            <div className="px-6 pb-6">
              <TransactionList
                transactions={transactions}
                categories={categories}
                onDelete={deleteTransaction}
                onUpdate={updateTransaction}
              />
            </div>
          </Card>

          {/* Right Panel - Goals */}
          <GoalManager
            goals={goals}
            onAdd={addGoal}
            onUpdate={updateGoal}
            onDelete={deleteGoal}
          />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spending Chart */}
          <SpendingChart
            transactions={transactions}
            categories={categories}
          />

          {/* Spending Summary */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">📈 Spending Summary</h2>
            </CardHeader>
            <div className="px-6 pb-6">
              <SpendingSummary
                totalExpenses={totalExpenses}
                topCategory={topCategory}
                dailyAverage={dailyAverage}
                balance={balance}
              />
            </div>
          </Card>
        </div>

        {/* Category Management */}
        <CategoryManager
          categories={categories}
          onDelete={deleteCategory}
          onUpdate={updateCategory}
        />

        {/* Sign Out Button */}
        <div className="flex justify-end">
          <Button
            variant="destructive"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
