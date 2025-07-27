import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Calculator,
  Send,
  Filter
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Sample data
const quotations = [
  { id: "QT001", client: "TechCorp Solutions", service: "SEO Package", amount: 85000, gst: 15300, total: 100300, status: "pending", date: "2024-01-15" },
  { id: "QT002", client: "Fashion Hub", service: "Social Media Marketing", amount: 65000, gst: 11700, total: 76700, status: "approved", date: "2024-01-14" },
  { id: "QT003", client: "Local Restaurant", service: "PPC Campaign", amount: 45000, gst: 8100, total: 53100, status: "rejected", date: "2024-01-13" },
  { id: "QT004", client: "E-commerce Store", service: "Content Marketing", amount: 75000, gst: 13500, total: 88500, status: "pending", date: "2024-01-12" },
  { id: "QT005", client: "Healthcare Clinic", service: "Complete Digital Package", amount: 120000, gst: 21600, total: 141600, status: "approved", date: "2024-01-11" },
]

const services = [
  { name: "SEO Package", basePrice: 50000, gstRate: 18 },
  { name: "Social Media Marketing", basePrice: 40000, gstRate: 18 },
  { name: "PPC Campaign", basePrice: 30000, gstRate: 18 },
  { name: "Content Marketing", basePrice: 35000, gstRate: 18 },
  { name: "Complete Digital Package", basePrice: 100000, gstRate: 18 },
  { name: "Website Development", basePrice: 80000, gstRate: 18 },
]

export default function Quotations() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  // Form state
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [description, setDescription] = useState("")
  const [calculatedGST, setCalculatedGST] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const calculateGST = (amount: number, gstRate: number = 18) => {
    const gst = (amount * gstRate) / 100
    const total = amount + gst
    setCalculatedGST(gst)
    setTotalAmount(total)
  }

  const handleServiceChange = (serviceName: string) => {
    setSelectedService(serviceName)
    const service = services.find(s => s.name === serviceName)
    if (service) {
      setCustomAmount(service.basePrice.toString())
      calculateGST(service.basePrice, service.gstRate)
    }
  }

  const handleAmountChange = (amount: string) => {
    setCustomAmount(amount)
    const numAmount = parseFloat(amount) || 0
    calculateGST(numAmount)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement quotation creation
    console.log({
      clientName,
      clientEmail,
      clientPhone,
      selectedService,
      customAmount,
      description,
      calculatedGST,
      totalAmount
    })
    setShowForm(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "approved":
        return <Badge variant="default">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredQuotations = quotations.filter(q => {
    const matchesSearch = q.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || q.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
          <p className="text-muted-foreground">
            Create and manage client quotations with automatic GST calculation
          </p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button variant="gradient" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              New Quotation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Quotation</DialogTitle>
              <DialogDescription>
                Fill in the client details and service information to generate a quotation
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Client Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Enter client name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@company.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Phone Number</Label>
                  <Input
                    id="clientPhone"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>

              {/* Service Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Service Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="service">Service Package</Label>
                  <Select value={selectedService} onValueChange={handleServiceChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service package" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.name} value={service.name}>
                          {service.name} - ₹{service.basePrice.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Custom Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder="Enter custom amount"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Service Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the services included in this quotation"
                    rows={3}
                  />
                </div>
              </div>

              {/* Calculation Summary */}
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Base Amount:</span>
                    <span className="font-medium">₹{parseFloat(customAmount || "0").toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span className="font-medium">₹{calculatedGST.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between col-span-2 text-lg font-bold border-t pt-2">
                    <span>Total Amount:</span>
                    <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gradient">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Quotation
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Quotations Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-large">
          <CardHeader>
            <CardTitle>Recent Quotations</CardTitle>
            <CardDescription>
              Manage and track all client quotations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quotation ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total (incl. GST)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotations.map((quotation) => (
                  <TableRow key={quotation.id}>
                    <TableCell className="font-medium">{quotation.id}</TableCell>
                    <TableCell>{quotation.client}</TableCell>
                    <TableCell>{quotation.service}</TableCell>
                    <TableCell>₹{quotation.amount.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">₹{quotation.total.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(quotation.status)}</TableCell>
                    <TableCell>{new Date(quotation.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
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