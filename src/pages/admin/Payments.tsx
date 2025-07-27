import { useState } from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Sample data
const transactions = [
  {
    id: "TXN001",
    invoiceId: "INV001",
    client: "TechCorp Solutions",
    amount: 99450,
    method: "Razorpay",
    status: "completed",
    date: "2024-01-16",
    transactionId: "rzp_1234567890",
    fee: 1989
  },
  {
    id: "TXN002",
    invoiceId: "INV003",
    client: "Healthcare Clinic",
    amount: 140400,
    method: "Bank Transfer",
    status: "pending",
    date: "2024-01-15",
    transactionId: "BT_9876543210",
    fee: 0
  },
  {
    id: "TXN003",
    invoiceId: "INV002",
    client: "Fashion Hub",
    amount: 76050,
    method: "Stripe",
    status: "failed",
    date: "2024-01-14",
    transactionId: "stripe_abcdef123",
    fee: 2280
  },
  {
    id: "TXN004",
    invoiceId: "INV004",
    client: "E-commerce Store",
    amount: 88500,
    method: "PayPal",
    status: "completed",
    date: "2024-01-13",
    transactionId: "pp_xyz789456",
    fee: 2655
  },
  {
    id: "TXN005",
    invoiceId: "INV005",
    client: "Startup Tech",
    amount: 65000,
    method: "UPI",
    status: "completed",
    date: "2024-01-12",
    transactionId: "upi_123456789",
    fee: 0
  }
]

const paymentMethods = [
  { name: "Razorpay", status: "active", fee: "2%", transactions: 45, volume: 2450000 },
  { name: "Stripe", status: "active", fee: "3%", transactions: 32, volume: 1890000 },
  { name: "PayPal", status: "active", fee: "3.5%", transactions: 28, volume: 1560000 },
  { name: "Bank Transfer", status: "active", fee: "0%", transactions: 15, volume: 890000 },
  { name: "UPI", status: "active", fee: "0%", transactions: 67, volume: 3240000 },
]

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [dateRange, setDateRange] = useState("30days")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getMethodBadge = (method: string) => {
    const colors: { [key: string]: string } = {
      "Razorpay": "bg-blue-500",
      "Stripe": "bg-purple-500",
      "PayPal": "bg-yellow-500",
      "Bank Transfer": "bg-green-500",
      "UPI": "bg-orange-500"
    }
    return (
      <Badge className={colors[method] || "bg-gray-500"}>
        {method}
      </Badge>
    )
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesMethod = methodFilter === "all" || transaction.method === methodFilter
    return matchesSearch && matchesStatus && matchesMethod
  })

  const totalVolume = paymentMethods.reduce((sum, method) => sum + method.volume, 0)
  const completedTransactions = transactions.filter(t => t.status === "completed").length
  const totalTransactions = transactions.length
  const successRate = (completedTransactions / totalTransactions) * 100

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Gateway</h1>
          <p className="text-muted-foreground">
            Monitor payment transactions and gateway performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Payment Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalVolume.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="shadow-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{successRate.toFixed(1)}%</div>
              <Progress value={successRate} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="shadow-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{totalTransactions}</div>
              <p className="text-xs text-muted-foreground">{completedTransactions} completed</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="shadow-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing Fees</CardTitle>
              <CreditCard className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                ₹{transactions.reduce((sum, t) => sum + t.fee, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total fees paid</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payment Methods Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="shadow-large">
          <CardHeader>
            <CardTitle>Payment Gateway Status</CardTitle>
            <CardDescription>
              Overview of enabled payment methods and their performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {paymentMethods.map((method, index) => (
                <div key={method.name} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{method.name}</h3>
                    <Badge variant={method.status === "active" ? "default" : "secondary"}>
                      {method.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Fee:</span>
                      <span>{method.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transactions:</span>
                      <span>{method.transactions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volume:</span>
                      <span>₹{method.volume.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4 flex-wrap"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger className="w-40">
            <CreditCard className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="Razorpay">Razorpay</SelectItem>
            <SelectItem value="Stripe">Stripe</SelectItem>
            <SelectItem value="PayPal">PayPal</SelectItem>
            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
            <SelectItem value="UPI">UPI</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="shadow-large">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Monitor all payment transactions across different gateways
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Gateway ID</TableHead>
                  <TableHead>Fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.invoiceId}</TableCell>
                    <TableCell>{transaction.client}</TableCell>
                    <TableCell className="font-semibold">₹{transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>{getMethodBadge(transaction.method)}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-mono text-xs">{transaction.transactionId}</TableCell>
                    <TableCell>₹{transaction.fee.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}