
import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Mock data for expenses
const initialExpenses = [
  {
    id: 1,
    category: "Fixed",
    subcategory: "Rent",
    amount: 850.00,
    date: "2025-04-01",
    description: "Monthly garage/storage rent"
  },
  {
    id: 2,
    category: "Fixed",
    subcategory: "Insurance",
    amount: 275.00,
    date: "2025-04-03",
    description: "Liability insurance monthly premium"
  },
  {
    id: 3,
    category: "Variable",
    subcategory: "Equipment Repairs",
    amount: 123.45,
    date: "2025-04-08",
    description: "Mower blade replacement and tune-up"
  },
  {
    id: 4,
    category: "Variable",
    subcategory: "Subcontractor",
    amount: 350.00,
    date: "2025-04-12",
    description: "Tree removal subcontractor"
  },
  {
    id: 5,
    category: "Employee",
    subcategory: "Uniforms",
    amount: 95.50,
    date: "2025-04-15",
    description: "New uniforms for summer"
  },
  {
    id: 6,
    category: "Hidden",
    subcategory: "Card Fees",
    amount: 42.75,
    date: "2025-04-18",
    description: "Payment processing fees"
  },
];

type Expense = {
  id: number;
  category: string;
  subcategory: string;
  amount: number;
  date: string;
  description: string;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const costChartConfig = {
  fixed: { label: "Fixed", theme: { light: "#0088FE", dark: "#0088FE" } },
  variable: { label: "Variable", theme: { light: "#00C49F", dark: "#00C49F" } },
  employee: { label: "Employee", theme: { light: "#FFBB28", dark: "#FFBB28" } },
  hidden: { label: "Hidden", theme: { light: "#FF8042", dark: "#FF8042" } },
};

const CostTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredExpenses = filterCategory === "all" 
    ? expenses 
    : expenses.filter(expense => expense.category.toLowerCase() === filterCategory.toLowerCase());

  // Calculate total by category for the pie chart
  const categoryTotals = expenses.reduce((acc, expense) => {
    const category = expense.category.toLowerCase();
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  const handleAddExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newExpense = {
      id: expenses.length + 1,
      category: formData.get("category") as string,
      subcategory: formData.get("subcategory") as string,
      amount: parseFloat(formData.get("amount") as string),
      date: formData.get("date") as string,
      description: formData.get("description") as string
    };
    
    setExpenses([...expenses, newExpense]);
    setIsDialogOpen(false);
    toast({
      title: "Expense Added",
      description: `New ${newExpense.category} expense of $${newExpense.amount.toFixed(2)} has been recorded.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="filter-category">Filter by Category:</Label>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fixed">Fixed</SelectItem>
              <SelectItem value="variable">Variable</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="hidden">Hidden</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Expense</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>
                Enter expense details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue="variable">
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fixed">Fixed</SelectItem>
                      <SelectItem value="Variable">Variable</SelectItem>
                      <SelectItem value="Employee">Employee</SelectItem>
                      <SelectItem value="Hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input id="subcategory" name="subcategory" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input id="amount" name="amount" type="number" min="0" step="0.01" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" />
              </div>
              
              <DialogFooter>
                <Button type="submit">Save Expense</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>
              Distribution of expenses by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={costChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <ChartTooltip />
              </ChartContainer>
            </div>
            <div className="mt-4 space-y-3">
              {Object.entries(categoryTotals).map(([category, total]) => (
                <div key={category} className="flex justify-between">
                  <span className="capitalize">{category} Expenses:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-border font-bold">
                <span>Total Expenses:</span>
                <span>${Object.values(categoryTotals).reduce((a, b) => a + b, 0).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Expenses</CardTitle>
            <CardDescription>
              Recently added expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.slice(-5).reverse().map((expense) => (
                <div key={expense.id} className="flex items-start justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{expense.subcategory}</div>
                    <div className="text-xs text-muted-foreground">
                      {expense.category} • {new Date(expense.date).toLocaleDateString()}
                    </div>
                    {expense.description && (
                      <div className="text-sm mt-1">{expense.description}</div>
                    )}
                  </div>
                  <div className="font-medium">${expense.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Expense List</CardTitle>
          <CardDescription>
            Track and categorize all business expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.subcategory}</TableCell>
                    <TableCell className="max-w-xs truncate">{expense.description}</TableCell>
                    <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostTracker;
