import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TransactionList({
  transactions,
  categories,
  onDelete,
  onUpdate,
}) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  const handleOpenEdit = (transaction) => {
    setEditingTransaction(transaction);
    setEditForm({
      amount: transaction.amount,
      category: transaction.category_id || "",
      description: transaction.description,
    });
    setShowEditDialog(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await onUpdate(editingTransaction.id, editForm);
    setShowEditDialog(false);
    setEditingTransaction(null);
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-start p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {parseFloat(transaction.amount).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  {transaction.description}
                </div>
                <Badge variant="outline" className="mt-1">
                  {getCategoryName(transaction.category_id)}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-sm text-gray-500 mr-2">Today</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleOpenEdit(transaction)}
                  className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(transaction.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No transactions yet. Add your first transaction above!
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Edit Transaction Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                step="0.01"
                value={editForm.amount}
                onChange={(e) =>
                  setEditForm({ ...editForm, amount: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={editForm.category}
                onValueChange={(value) =>
                  setEditForm({ ...editForm, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.type === editingTransaction?.type)
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Update Transaction
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
