import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { calculateGoalProgress } from "@/utils/calculations";

export function GoalManager({ goals, onAdd, onUpdate, onDelete, categories }) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    type: "saving",
    amount: "",
    category: "",
  });
  const [editingGoal, setEditingGoal] = useState(null);
  const [editGoal, setEditGoal] = useState({
    name: "",
    type: "saving",
    amount: "",
    category: "",
  });

  const handleAddGoal = async (e) => {
    e.preventDefault();
    await onAdd(newGoal);
    setNewGoal({ name: "", type: "saving", amount: "", category: "" });
    setShowAddDialog(false);
  };

  const handleOpenEdit = (goal) => {
    setEditingGoal(goal);
    setEditGoal({
      name: goal.name || "",
      type: goal.goal_type,
      amount: goal.target_amount,
      category: goal.category_id || "",
    });
    setShowEditDialog(true);
  };

  const handleUpdateGoal = async (e) => {
    e.preventDefault();
    await onUpdate(editingGoal.id, editGoal);
    setShowEditDialog(false);
    setEditingGoal(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">🎯 Financial Goals</CardTitle>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddGoal} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Goal Name</Label>
                    <Input
                      value={newGoal.name}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, name: e.target.value })
                      }
                      placeholder="e.g. Save for NYC Trip, New Car"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Goal Type</Label>
                    <Select
                      value={newGoal.type}
                      onValueChange={(value) =>
                        setNewGoal({ ...newGoal, type: value, category: "" })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spending">Spending Limit</SelectItem>
                        <SelectItem value="saving">Savings Goal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newGoal.type === "spending" && (
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={newGoal.category}
                        onValueChange={(value) =>
                          setNewGoal({ ...newGoal, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
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
                  )}
                  <div className="space-y-2">
                    <Label>Target Amount ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newGoal.amount}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, amount: e.target.value })
                      }
                      placeholder="500.00"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#B6862C] to-[#1E3A5F]"
                  >
                    Create Goal
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {goals.map((goal) => {
                const progress = calculateGoalProgress(
                  goal.current_amount,
                  goal.target_amount
                );
                return (
                  <Card key={goal.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">
                          {goal.name || `${goal.period} ${goal.goal_type} Goal`}
                        </h3>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(goal)}
                            className="h-6 w-6 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(goal.id)}
                            className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Progress value={progress} className="mb-2" />
                      <div className="flex justify-between text-sm">
                        <span>
                          ${goal.current_amount.toFixed(2)} of $
                          {goal.target_amount.toFixed(2)}
                        </span>
                        <span
                          className={
                            progress >= 100
                              ? "text-green-600"
                              : "text-blue-600"
                          }
                        >
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {goals.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No goals yet. Click "+ Add Goal" to create one!
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Edit Goal Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateGoal} className="space-y-4">
            <div className="space-y-2">
              <Label>Goal Name</Label>
              <Input
                value={editGoal.name}
                onChange={(e) => setEditGoal({ ...editGoal, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Goal Type</Label>
              <Select value={editGoal.type} onValueChange={(value) => setEditGoal({ ...editGoal, type: value, category: "" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spending">Spending Limit</SelectItem>
                  <SelectItem value="saving">Savings Goal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {editGoal.type === "spending" && (
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={editGoal.category}
                  onValueChange={(value) =>
                    setEditGoal({ ...editGoal, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
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
            )}
            <div className="space-y-2">
              <Label>Target Amount ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={editGoal.amount}
                onChange={(e) => setEditGoal({ ...editGoal, amount: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Update Goal
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
