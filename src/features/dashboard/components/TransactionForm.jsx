import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function TransactionForm({
  categories,
  onAddExpense,
  onAddIncome,
  onAddCategory,
}) {
  const [expenseForm, setExpenseForm] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const [incomeForm, setIncomeForm] = useState({
    amount: "",
    source: "",
    description: "",
  });
  const [showExpenseCategoryDialog, setShowExpenseCategoryDialog] =
    useState(false);
  const [showIncomeCategoryDialog, setShowIncomeCategoryDialog] = useState(false);
  const [newExpenseCategoryName, setNewExpenseCategoryName] = useState("");
  const [newIncomeCategoryName, setNewIncomeCategoryName] = useState("");

  const handleAddExpenseCategory = async () => {
    if (newExpenseCategoryName.trim()) {
      await onAddCategory(newExpenseCategoryName, "expense");
      setNewExpenseCategoryName("");
      setShowExpenseCategoryDialog(false);
    }
  };

  const handleAddIncomeCategory = async () => {
    if (newIncomeCategoryName.trim()) {
      await onAddCategory(newIncomeCategoryName, "income");
      setNewIncomeCategoryName("");
      setShowIncomeCategoryDialog(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    await onAddExpense(expenseForm);
    setExpenseForm({ amount: "", category: "", description: "" });
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    await onAddIncome(incomeForm);
    setIncomeForm({ amount: "", source: "", description: "" });
  };

  return (
    <Tabs defaultValue="expense" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="expense">Log Expense</TabsTrigger>
        <TabsTrigger value="income">Add Income</TabsTrigger>
      </TabsList>

      <TabsContent value="expense" className="space-y-4 mt-4">
        <h3 className="text-xl font-semibold">💳 Track Expenses</h3>
        <form onSubmit={handleAddExpense} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expense-amount">
                Amount <span className="text-red-500">*</span>
              </Label>
              <Input
                id="expense-amount"
                type="number"
                step="0.01"
                value={expenseForm.amount}
                onChange={(e) =>
                  setExpenseForm({ ...expenseForm, amount: e.target.value })
                }
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="expense-category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Dialog
                  open={showExpenseCategoryDialog}
                  onOpenChange={setShowExpenseCategoryDialog}
                >
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Category Name</Label>
                        <Input
                          value={newExpenseCategoryName}
                          onChange={(e) =>
                            setNewExpenseCategoryName(e.target.value)
                          }
                          placeholder="e.g. Coffee & Snacks"
                          required
                          autoFocus
                        />
                      </div>
                      <Button
                        onClick={handleAddExpenseCategory}
                        className="w-full"
                      >
                        Add Category
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Select
                value={expenseForm.category}
                onValueChange={(value) =>
                  setExpenseForm({ ...expenseForm, category: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.type === "expense")
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Input
              id="expense-description"
              value={expenseForm.description}
              onChange={(e) =>
                setExpenseForm({ ...expenseForm, description: e.target.value })
              }
              placeholder="What did you spend on?"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#B6862C] to-[#1E3A5F]"
          >
            ADD EXPENSE
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="income" className="space-y-4 mt-4">
        <h3 className="text-xl font-semibold">💰 Add Income</h3>
        <form onSubmit={handleAddIncome} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income-amount">
                Amount <span className="text-red-500">*</span>
              </Label>
              <Input
                id="income-amount"
                type="number"
                step="0.01"
                value={incomeForm.amount}
                onChange={(e) =>
                  setIncomeForm({ ...incomeForm, amount: e.target.value })
                }
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="income-source">
                  Source <span className="text-red-500">*</span>
                </Label>
                <Dialog
                  open={showIncomeCategoryDialog}
                  onOpenChange={setShowIncomeCategoryDialog}
                >
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Income Source</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Source Name</Label>
                        <Input
                          value={newIncomeCategoryName}
                          onChange={(e) =>
                            setNewIncomeCategoryName(e.target.value)
                          }
                          placeholder="e.g. Freelance Work"
                          required
                          autoFocus
                        />
                      </div>
                      <Button
                        onClick={handleAddIncomeCategory}
                        className="w-full"
                      >
                        Add Source
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Select
                value={incomeForm.source}
                onValueChange={(value) =>
                  setIncomeForm({ ...incomeForm, source: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Source" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.type === "income")
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Input
              id="income-description"
              value={incomeForm.description}
              onChange={(e) =>
                setIncomeForm({ ...incomeForm, description: e.target.value })
              }
              placeholder="e.g. Part-time job, FAFSA"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600"
          >
            ADD INCOME
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
