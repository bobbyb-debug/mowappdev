import React, { useState, useEffect } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Tabs, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface Expense {
  id: number;
  date: string;
  category: string;
  subcategory: string;
  amount: number;
  description: string;
  notes: string;
}

const chartColors = ["#4ADE80", "#F87171", "#60A5FA", "#FBBF24"];

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [skipDeleteConfirm, setSkipDeleteConfirm] = useState(false);
  const { toast } = useToast();

  const fetchExpenses = () => {
    fetch('http://127.0.0.1:5000/api/expenses')
      .then(response => response.json())
      .then(data => setExpenses(data))
      .catch(error => console.error('Error fetching expenses:', error));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const expenseData = {
      date: formData.get('date') as string,
      category: formData.get('category') as string,
      subcategory: (formData.get('subcategory') as string)?.trim() || "N/A",
      amount: parseFloat(formData.get('amount') as string),
      description: (formData.get('description') as string)?.trim() || "N/A",
      notes: (formData.get('notes') as string)?.trim() || ""
    };

    try {
      const url = editExpense ? `http://127.0.0.1:5000/api/expenses/${editExpense.id}` : 'http://127.0.0.1:5000/api/expenses';
      const method = editExpense ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData)
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setEditExpense(null);
        fetchExpenses();
        toast({ title: editExpense ? "Expense Updated" : "Expense Added", description: "Operation successful." });
      } else {
        toast({ variant: "destructive", title: "Failed", description: "Server error. Try again." });
      }
    } catch (error) {
      console.error('Error saving expense:', error);
      toast({ variant: "destructive", title: "Network Error", description: "Could not connect to server." });
    }
  };

  const handleEditClick = (expense: Expense) => {
    setEditExpense(expense);
    setIsDialogOpen(true);
  };

  const handleDeleteExpense = async (id: number) => {
    if (!skipDeleteConfirm) {
      const confirmDelete = window.confirm("Are you sure you want to delete this expense?\n(You can disable this confirmation later.)");
      if (!confirmDelete) return;
      if (window.confirm("Don't ask again for deletes?")) {
        setSkipDeleteConfirm(true);
      }
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/expenses/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchExpenses();
        toast({ title: "Expense Deleted", description: "The expense has been removed." });
      } else {
        toast({ variant: "destructive", title: "Delete Failed", description: "Could not delete. Try again." });
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast({ variant: "destructive", title: "Network Error", description: "Could not connect to server." });
    }
  };

  const filteredExpenses = activeCategory === "all"
    ? expenses
    : expenses.filter(expense => expense.category === activeCategory);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = [
    { name: "Fixed Costs", value: expenses.filter(e => e.category === 'fixed').reduce((sum, e) => sum + e.amount, 0), color: chartColors[0] },
    { name: "Variable Costs", value: expenses.filter(e => e.category === 'variable').reduce((sum, e) => sum + e.amount, 0), color: chartColors[1] },
    { name: "Employee Costs", value: expenses.filter(e => e.category === 'employee').reduce((sum, e) => sum + e.amount, 0), color: chartColors[2] },
    { name: "Hidden Costs", value: expenses.filter(e => e.category === 'hidden').reduce((sum, e) => sum + e.amount, 0), color: chartColors[3] }
  ];

  const formatTooltipValue = (value: number | string) => typeof value === 'number' ? `$${value.toFixed(2)}` : value;

  return (
    <div className="min-h-screen flex flex-col animate-in fade-in duration-700">
      <Navbar />

      <main className="flex-1 container py-8 animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expense Management</h1>
            <p className="text-muted-foreground mt-2">Track and categorize your business expenses to monitor overhead costs</p>
          </div>
          <Button onClick={() => { setEditExpense(null); setIsDialogOpen(true); }}>
            ➕ Add Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Expense Summary</CardTitle>
              <CardDescription>Breakdown of expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 animate-in fade-in-90 duration-700">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      startAngle={90}
                      endAngle={-270}
                      data={categoryTotals}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      dataKey="value"
                      isAnimationActive={true}
                      animationDuration={1000}
                    >
                      {categoryTotals.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={formatTooltipValue} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expense Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="fixed">Fixed</TabsTrigger>
            <TabsTrigger value="variable">Variable</TabsTrigger>
            <TabsTrigger value="employee">Employee</TabsTrigger>
            <TabsTrigger value="hidden">Hidden</TabsTrigger>
          </TabsList>
        </Tabs>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Subcategory</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id} className="hover:animate-in hover:fade-in-50">
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.subcategory}</TableCell>
                <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.notes}</TableCell>
                <TableCell className="space-x-2 text-center">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(expense)} title="Edit" className="transition-all hover:scale-110 hover:text-blue-500">✏️</Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteExpense(expense.id)} title="Delete" className="transition-all hover:scale-110 hover:text-red-500">🗑️</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>

      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="animate-in fade-in-90 slide-in-from-top-10 duration-300">
          <DialogHeader>
            <DialogTitle>{editExpense ? "Edit Expense" : "Add Expense"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <Input id="date" name="date" type="date" defaultValue={editExpense?.date.split('T')[0]} required />
            <Input id="amount" name="amount" type="number" step="0.01" defaultValue={editExpense?.amount} required />
            <Select name="category" defaultValue={editExpense?.category || ""} required>
              <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="variable">Variable</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
            <Input id="subcategory" name="subcategory" defaultValue={editExpense?.subcategory || ""} />
            <Textarea id="description" name="description" defaultValue={editExpense?.description || ""} />
            <Textarea id="notes" name="notes" defaultValue={editExpense?.notes || ""} />
            <DialogFooter>
              <Button type="submit">{editExpense ? "Update" : "Save"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseManagement;
