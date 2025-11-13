import { useState } from 'react';
import { DollarSign, Download, Search, Filter, Plus, CheckCircle, XCircle, Clock, TrendingUp, TrendingDown, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';
import { ScrollArea } from '../ui/scroll-area';

const feeRecords = [
  { 
    id: 1, 
    student: 'Emily Rodriguez', 
    rollNo: 'ST001', 
    class: 'Grade 10A', 
    amount: 45000, 
    paid: 45000, 
    due: 0, 
    status: 'Paid', 
    dueDate: '2024-01-15',
    paidDate: '2024-01-10',
    paidTime: '10:30 AM',
    createdDate: '2024-01-05',
    createdTime: '09:15 AM'
  },
  { 
    id: 2, 
    student: 'James Wilson', 
    rollNo: 'ST002', 
    class: 'Grade 9B', 
    amount: 42000, 
    paid: 21000, 
    due: 21000, 
    status: 'Partial', 
    dueDate: '2024-01-15',
    paidDate: '2024-01-05',
    paidTime: '02:45 PM',
    createdDate: '2024-01-05',
    createdTime: '09:15 AM'
  },
  { 
    id: 3, 
    student: 'Sophia Lee', 
    rollNo: 'ST003', 
    class: 'Grade 11A', 
    amount: 48000, 
    paid: 48000, 
    due: 0, 
    status: 'Paid', 
    dueDate: '2024-01-15',
    paidDate: '2024-01-12',
    paidTime: '11:20 AM',
    createdDate: '2024-01-05',
    createdTime: '09:15 AM'
  },
  { 
    id: 4, 
    student: 'Oliver Thompson', 
    rollNo: 'ST004', 
    class: 'Grade 8C', 
    amount: 40000, 
    paid: 0, 
    due: 40000, 
    status: 'Pending', 
    dueDate: '2024-01-15',
    paidDate: null,
    paidTime: null,
    createdDate: '2024-01-05',
    createdTime: '09:15 AM'
  },
];

const expenseRecords = [
  { 
    id: 1, 
    category: 'Salaries', 
    description: 'Teacher salaries - January 2024', 
    amount: 1500000, 
    date: '2024-01-01',
    time: '09:00 AM',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    approvedBy: 'Admin',
    createdDate: '2023-12-28',
    createdTime: '03:30 PM'
  },
  { 
    id: 2, 
    category: 'Infrastructure', 
    description: 'Classroom renovation - Science Lab', 
    amount: 450000, 
    date: '2024-01-05',
    time: '02:15 PM',
    status: 'Paid',
    paymentMethod: 'Cheque',
    approvedBy: 'Principal',
    createdDate: '2024-01-03',
    createdTime: '11:45 AM'
  },
  { 
    id: 3, 
    category: 'Utilities', 
    description: 'Electricity & Water bills - December', 
    amount: 125000, 
    date: '2024-01-10',
    time: '10:30 AM',
    status: 'Pending',
    paymentMethod: 'Cash',
    approvedBy: 'Finance Manager',
    createdDate: '2024-01-08',
    createdTime: '04:20 PM'
  },
  { 
    id: 4, 
    category: 'Supplies', 
    description: 'Books and stationery for library', 
    amount: 285000, 
    date: '2024-01-12',
    time: '03:45 PM',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    approvedBy: 'Admin',
    createdDate: '2024-01-10',
    createdTime: '01:10 PM'
  },
  { 
    id: 5, 
    category: 'Maintenance', 
    description: 'HVAC system repair and servicing', 
    amount: 95000, 
    date: '2024-01-15',
    time: '11:00 AM',
    status: 'Approved',
    paymentMethod: 'Cash',
    approvedBy: 'Principal',
    createdDate: '2024-01-13',
    createdTime: '02:50 PM'
  },
  { 
    id: 6, 
    category: 'Transportation', 
    description: 'Bus fuel and maintenance - January', 
    amount: 175000, 
    date: '2024-01-08',
    time: '09:30 AM',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    approvedBy: 'Admin',
    createdDate: '2024-01-06',
    createdTime: '10:15 AM'
  },
];

const expenseCategories = [
  'Salaries',
  'Infrastructure',
  'Utilities',
  'Supplies',
  'Maintenance',
  'Transportation',
  'Technology',
  'Events',
  'Marketing',
  'Other'
];

export function FeeManagement() {
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);
  const [expenses, setExpenses] = useState(expenseRecords);

  const totalFees = feeRecords.reduce((sum, record) => sum + record.amount, 0);
  const totalPaid = feeRecords.reduce((sum, record) => sum + record.paid, 0);
  const totalDue = feeRecords.reduce((sum, record) => sum + record.due, 0);
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = expenses.filter(e => e.status === 'Paid').reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenses.filter(e => e.status === 'Pending' || e.status === 'Approved').reduce((sum, expense) => sum + expense.amount, 0);

  const handleAddExpense = () => {
    toast.success('Expense added successfully!');
    setShowExpenseDialog(false);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
    toast.success('Expense deleted successfully!');
  };

  const formatCurrency = (amount: number) => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };

  const formatDateTime = (date: string | null, time: string | null) => {
    if (!date) return 'N/A';
    const dateStr = new Date(date).toLocaleDateString('en-PK', { 
      day: '2-digit',
      month: 'short', 
      year: 'numeric' 
    });
    return time ? `${dateStr} at ${time}` : dateStr;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 dark:text-white mb-2">Fee Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track payments, invoices, and expenses</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowExpenseDialog(true)} variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
          <Button onClick={() => setShowInvoiceDialog(true)} className="bg-[#0A66C2] hover:bg-[#0052A3]">
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Summary Cards - Compact Gradient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="relative">
            <p className="text-white/90 text-sm mb-2 font-medium">Total Fees</p>
            <h3 className="text-white text-3xl mb-1 tracking-tight">{formatCurrency(totalFees)}</h3>
            <p className="text-white/80 text-sm font-medium">This month</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="relative">
            <p className="text-white/90 text-sm mb-2 font-medium">Collected</p>
            <h3 className="text-white text-3xl mb-1 tracking-tight">{formatCurrency(totalPaid)}</h3>
            <p className="text-white/80 text-sm font-medium">+12%</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="relative">
            <p className="text-white/90 text-sm mb-2 font-medium">Pending Fees</p>
            <h3 className="text-white text-3xl mb-1 tracking-tight">{formatCurrency(totalDue)}</h3>
            <p className="text-white/80 text-sm font-medium">{feeRecords.filter(r => r.status !== 'Paid').length} students</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="relative">
            <p className="text-white/90 text-sm mb-2 font-medium">Total Expenses</p>
            <h3 className="text-white text-3xl mb-1 tracking-tight">{formatCurrency(totalExpenses)}</h3>
            <p className="text-white/80 text-sm font-medium">{expenses.length} transactions</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">Invoices & Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reminders">Payment Reminders</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search by student name or roll number..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800">
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Payment Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell>
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">{record.student}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{record.rollNo}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">{record.class}</TableCell>
                      <TableCell className="text-gray-900 dark:text-white">{formatCurrency(record.amount)}</TableCell>
                      <TableCell className="text-green-600">{formatCurrency(record.paid)}</TableCell>
                      <TableCell className={record.due > 0 ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}>
                        {formatCurrency(record.due)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="text-gray-700 dark:text-gray-300">{formatDateTime(record.createdDate, record.createdTime)}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {record.paidDate ? (
                            <p className="text-gray-700 dark:text-gray-300">{formatDateTime(record.paidDate, record.paidTime)}</p>
                          ) : (
                            <p className="text-gray-400 dark:text-gray-600">Not paid</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            record.status === 'Paid' ? 'bg-green-100 text-green-700 border-green-200' :
                            record.status === 'Partial' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                            'bg-red-100 text-red-700 border-red-200'
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Invoice</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          {/* Expense Summary - Compact Gradient Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 bg-white/5"></div>
              <div className="relative">
                <p className="text-white/90 text-sm mb-2 font-medium">Total Expenses</p>
                <h3 className="text-white text-3xl mb-1 tracking-tight">{formatCurrency(totalExpenses)}</h3>
                <p className="text-white/80 text-sm font-medium">{expenses.length} entries</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-green-500 to-green-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 bg-white/5"></div>
              <div className="relative">
                <p className="text-white/90 text-sm mb-2 font-medium">Paid Expenses</p>
                <h3 className="text-white text-3xl mb-1 tracking-tight">{formatCurrency(paidExpenses)}</h3>
                <p className="text-white/80 text-sm font-medium">{expenses.filter(e => e.status === 'Paid').length} transactions</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 bg-white/5"></div>
              <div className="relative">
                <p className="text-white/90 text-sm mb-2 font-medium">Pending/Approved</p>
                <h3 className="text-white text-3xl mb-1 tracking-tight">{formatCurrency(pendingExpenses)}</h3>
                <p className="text-white/80 text-sm font-medium">{expenses.filter(e => e.status !== 'Paid').length} pending</p>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-lg text-gray-900 dark:text-white">Expense Log</h3>
              <div className="flex-1"></div>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search expenses..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800">
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Created On</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {expense.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300 max-w-xs">
                        {expense.description}
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-white">
                        {formatCurrency(expense.amount)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {expense.paymentMethod}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="text-gray-700 dark:text-gray-300">{formatDateTime(expense.date, expense.time)}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="text-gray-600 dark:text-gray-400">{formatDateTime(expense.createdDate, expense.createdTime)}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {expense.approvedBy}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            expense.status === 'Paid' ? 'bg-green-100 text-green-700 border-green-200' : 
                            expense.status === 'Approved' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            'bg-yellow-100 text-yellow-700 border-yellow-200'
                          }
                        >
                          {expense.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteExpense(expense.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 dark:text-white mb-4">Pending Payment Reminders</h3>
            <div className="space-y-3">
              {feeRecords.filter(r => r.status !== 'Paid').map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white mb-1">{record.student}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {record.class} • Due: {formatCurrency(record.due)} • Deadline: {record.dueDate}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Created: {formatDateTime(record.createdDate, record.createdTime)}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">Send Reminder</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg text-gray-900 dark:text-white mb-4">Fee Collection Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Fees Generated</span>
                  <span className="text-gray-900 dark:text-white">{formatCurrency(totalFees)}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Amount Collected</span>
                  <span className="text-green-600">{formatCurrency(totalPaid)}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pending Collection</span>
                  <span className="text-orange-600">{formatCurrency(totalDue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Collection Rate</span>
                  <span className="text-gray-900 dark:text-white">
                    {((totalPaid / totalFees) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <Button className="w-full mt-6" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg text-gray-900 dark:text-white mb-4">Expense Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</span>
                  <span className="text-gray-900 dark:text-white">{formatCurrency(totalExpenses)}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Paid Expenses</span>
                  <span className="text-green-600">{formatCurrency(paidExpenses)}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pending/Approved</span>
                  <span className="text-orange-600">{formatCurrency(pendingExpenses)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Net Balance</span>
                  <span className={totalPaid - paidExpenses > 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(totalPaid - paidExpenses)}
                  </span>
                </div>
              </div>
              <Button className="w-full mt-6" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg text-gray-900 dark:text-white mb-4">Expense Breakdown by Category</h3>
            <div className="space-y-3">
              {expenseCategories.map(category => {
                const categoryTotal = expenses
                  .filter(e => e.category === category)
                  .reduce((sum, e) => sum + e.amount, 0);
                const percentage = totalExpenses > 0 ? (categoryTotal / totalExpenses) * 100 : 0;
                
                if (categoryTotal === 0) return null;
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{category}</span>
                      <span className="text-gray-900 dark:text-white">{formatCurrency(categoryTotal)}</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#0A66C2]"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Invoice Dialog */}
      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
            <DialogDescription>Generate a new fee invoice for a student</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 py-4 pr-4">
              <div className="space-y-2">
                <Label htmlFor="student">Select Student</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="st1">Emily Rodriguez - ST001</SelectItem>
                    <SelectItem value="st2">James Wilson - ST002</SelectItem>
                    <SelectItem value="st3">Sophia Lee - ST003</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="feeType">Fee Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fee type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tuition">Tuition Fee</SelectItem>
                      <SelectItem value="exam">Exam Fee</SelectItem>
                      <SelectItem value="transport">Transport Fee</SelectItem>
                      <SelectItem value="library">Library Fee</SelectItem>
                      <SelectItem value="sports">Sports Fee</SelectItem>
                      <SelectItem value="lab">Lab Fee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (PKR)</Label>
                  <Input id="amount" type="number" placeholder="0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input id="issueDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" placeholder="Add any additional notes..." rows={3} />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvoiceDialog(false)}>Cancel</Button>
            <Button 
              className="bg-[#0A66C2] hover:bg-[#0052A3]"
              onClick={() => {
                toast.success('Invoice created successfully!');
                setShowInvoiceDialog(false);
              }}
            >
              Generate Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Expense Dialog */}
      <Dialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>Record a new expense transaction</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 py-4 pr-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map(cat => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expenseAmount">Amount (PKR)</Label>
                  <Input id="expenseAmount" type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter expense details..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expenseDate">Date</Label>
                  <Input id="expenseDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expenseTime">Time</Label>
                  <Input id="expenseTime" type="time" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="approvedBy">Approved By</Label>
                <Input id="approvedBy" placeholder="Enter approver name" />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExpenseDialog(false)}>Cancel</Button>
            <Button 
              className="bg-[#0A66C2] hover:bg-[#0052A3]"
              onClick={handleAddExpense}
            >
              Add Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
