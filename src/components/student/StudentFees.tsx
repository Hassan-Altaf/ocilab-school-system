import { useState } from 'react';
import { DollarSign, CreditCard, Download, Clock, CheckCircle, AlertCircle, Receipt } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { Progress } from '../ui/progress';

interface FeeRecord {
  id: number;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  paidAmount?: number;
  paidDate?: string;
  paymentMethod?: string;
  transactionId?: string;
}

const mockFees: FeeRecord[] = [
  {
    id: 1,
    title: 'Tuition Fee - Term 3',
    description: 'Regular tuition fee for Term 3 2024',
    amount: 50000,
    dueDate: '2024-11-15',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Library Fee',
    description: 'Annual library membership and books',
    amount: 2000,
    dueDate: '2024-11-10',
    status: 'pending'
  },
  {
    id: 3,
    title: 'Lab Fee',
    description: 'Science laboratory equipment and materials',
    amount: 3500,
    dueDate: '2024-11-20',
    status: 'pending'
  },
  {
    id: 4,
    title: 'Tuition Fee - Term 2',
    description: 'Regular tuition fee for Term 2 2024',
    amount: 50000,
    dueDate: '2024-08-15',
    status: 'paid',
    paidAmount: 50000,
    paidDate: '2024-08-10',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN123456789'
  },
  {
    id: 5,
    title: 'Sports Fee',
    description: 'Annual sports and athletics fee',
    amount: 5000,
    dueDate: '2024-09-01',
    status: 'paid',
    paidAmount: 5000,
    paidDate: '2024-08-28',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN987654321'
  },
];

export function StudentFees() {
  const [fees, setFees] = useState<FeeRecord[]>(mockFees);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const pendingFees = fees.filter(f => f.status === 'pending' || f.status === 'overdue');
  const paidFees = fees.filter(f => f.status === 'paid');

  const stats = {
    totalPending: pendingFees.reduce((sum, f) => sum + f.amount, 0),
    totalPaid: paidFees.reduce((sum, f) => sum + (f.paidAmount || 0), 0),
    pendingCount: pendingFees.length,
    paidCount: paidFees.length,
  };

  const handlePayment = () => {
    if (!paymentAmount || !paymentMethod) {
      toast.error('Please fill all payment details');
      return;
    }

    if (selectedFee) {
      const amount = parseFloat(paymentAmount);
      if (amount > selectedFee.amount) {
        toast.error('Payment amount cannot exceed fee amount');
        return;
      }

      setFees(prev => prev.map(f => 
        f.id === selectedFee.id 
          ? { 
              ...f, 
              status: amount >= f.amount ? 'paid' as const : 'partial' as const,
              paidAmount: amount,
              paidDate: new Date().toISOString().split('T')[0],
              paymentMethod,
              transactionId: `TXN${Date.now()}`
            }
          : f
      ));
      setIsPaymentDialogOpen(false);
      setPaymentAmount('');
      setPaymentMethod('');
      setSelectedFee(null);
      toast.success('Payment processed successfully!', {
        description: 'Your payment has been recorded.'
      });
    }
  };

  const getStatusColor = (status: FeeRecord['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/20 dark:text-orange-400';
      case 'overdue': return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-400';
      case 'partial': return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const getStatusIcon = (status: FeeRecord['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'partial': return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Fee Management</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and pay your school fees
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 dark:text-red-300 mb-1">Total Pending</p>
              <p className="text-3xl text-red-900 dark:text-red-100">PKR {stats.totalPending.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 dark:text-green-300 mb-1">Total Paid</p>
              <p className="text-3xl text-green-900 dark:text-green-100">PKR {stats.totalPaid.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Items</p>
              <p className="text-3xl text-gray-900 dark:text-white">{stats.pendingCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Paid Items</p>
              <p className="text-3xl text-gray-900 dark:text-white">{stats.paidCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Receipt className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Pending Fees */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl text-gray-900 dark:text-white">Pending Fees</h2>
        </div>
        <div className="p-6">
          {pendingFees.length > 0 ? (
            <div className="space-y-4">
              {pendingFees.map((fee) => {
                const daysUntilDue = Math.ceil((new Date(fee.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <Card key={fee.id} className="p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg text-gray-900 dark:text-white mb-1">{fee.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{fee.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline" className={getStatusColor(fee.status)}>
                              {getStatusIcon(fee.status)}
                              <span className="ml-1">{fee.status.toUpperCase()}</span>
                            </Badge>
                            <span className={`text-gray-600 dark:text-gray-400 ${daysUntilDue <= 7 ? 'text-red-600 dark:text-red-400' : ''}`}>
                              Due: {new Date(fee.dueDate).toLocaleDateString()}
                              {daysUntilDue >= 0 && daysUntilDue <= 30 && (
                                <span className="ml-1">({daysUntilDue} days left)</span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl text-gray-900 dark:text-white mb-1">
                          PKR {fee.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 pl-16">
                      <Dialog open={isPaymentDialogOpen && selectedFee?.id === fee.id} onOpenChange={(open) => {
                        setIsPaymentDialogOpen(open);
                        if (open) {
                          setSelectedFee(fee);
                          setPaymentAmount(fee.amount.toString());
                        } else {
                          setSelectedFee(null);
                          setPaymentAmount('');
                          setPaymentMethod('');
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Process Payment</DialogTitle>
                            <DialogDescription>
                              Select your payment method and complete the transaction securely.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                              <h4 className="text-sm text-gray-900 dark:text-white mb-2">{fee.title}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{fee.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Amount:</span>
                                <span className="text-lg text-gray-900 dark:text-white">PKR {fee.amount.toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="amount">Payment Amount</Label>
                              <Input
                                id="amount"
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="h-11"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="method">Payment Method</Label>
                              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                  <SelectItem value="credit_card">Credit Card</SelectItem>
                                  <SelectItem value="debit_card">Debit Card</SelectItem>
                                  <SelectItem value="cash">Cash</SelectItem>
                                  <SelectItem value="jazzcash">JazzCash</SelectItem>
                                  <SelectItem value="easypaisa">Easypaisa</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                💡 You will receive a payment confirmation via email and SMS once the transaction is processed.
                              </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                              <Button onClick={handlePayment} className="flex-1 bg-blue-600 hover:bg-blue-700">
                                <CreditCard className="w-4 h-4 mr-2" />
                                Process Payment
                              </Button>
                              <Button onClick={() => setIsPaymentDialogOpen(false)} variant="outline" className="flex-1">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download Invoice
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No pending fees</p>
            </div>
          )}
        </div>
      </Card>

      {/* Payment History */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl text-gray-900 dark:text-white">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Fee Title
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Amount
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Payment Date
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Method
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paidFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{fee.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{fee.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900 dark:text-white">PKR {(fee.paidAmount || 0).toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {fee.paidDate && new Date(fee.paidDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{fee.paymentMethod}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{fee.transactionId}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant="outline" className={getStatusColor(fee.status)}>
                      {getStatusIcon(fee.status)}
                      <span className="ml-1">PAID</span>
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
