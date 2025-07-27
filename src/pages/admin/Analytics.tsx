import { useState } from "react"
import { motion } from "framer-motion"
import {
  Download,
  FileDown,
  Filter,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Globe,
  DollarSign
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Extended sample data
const campaignPerformance = [
  { month: "Jan", seo: 4500, ppc: 3200, social: 2800, content: 1900 },
  { month: "Feb", seo: 5200, ppc: 3800, social: 3200, content: 2300 },
  { month: "Mar", seo: 4800, ppc: 3500, social: 2900, content: 2100 },
  { month: "Apr", seo: 6100, ppc: 4200, social: 3600, content: 2800 },
  { month: "May", seo: 5500, ppc: 3900, social: 3300, content: 2500 },
  { month: "Jun", seo: 6700, ppc: 4500, social: 3800, content: 3100 },
]

const clientAcquisition = [
  { source: "Organic Search", value: 35, clients: 42, color: "#3b82f6" },
  { source: "Social Media", value: 25, clients: 30, color: "#8b5cf6" },
  { source: "Referrals", value: 20, clients: 24, color: "#10b981" },
  { source: "Paid Ads", value: 15, clients: 18, color: "#f59e0b" },
  { source: "Direct", value: 5, clients: 6, color: "#ef4444" },
]

const conversionTrends = [
  { week: "W1", leads: 120, conversions: 24, rate: 20 },
  { week: "W2", leads: 140, conversions: 32, rate: 22.8 },
  { week: "W3", leads: 110, conversions: 25, rate: 22.7 },
  { week: "W4", leads: 160, conversions: 42, rate: 26.3 },
  { week: "W5", leads: 145, conversions: 38, rate: 26.2 },
  { week: "W6", leads: 180, conversions: 50, rate: 27.8 },
]

const topPerformingCampaigns = [
  { name: "SEO for E-commerce", revenue: 45000, roi: 320, status: "active" },
  { name: "Social Media Package", revenue: 32000, roi: 280, status: "active" },
  { name: "PPC Campaign - Tech", revenue: 28000, roi: 245, status: "paused" },
  { name: "Content Marketing Pro", revenue: 22000, roi: 195, status: "active" },
  { name: "Local SEO Boost", revenue: 18000, roi: 165, status: "completed" },
]

export default function Analytics() {
  const [dateRange, setDateRange] = useState("6months")
  const [campaignType, setCampaignType] = useState("all")

  const exportData = (format: "csv" | "pdf") => {
    // TODO: Implement export functionality
    console.log(`Exporting data as ${format}`)
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Report</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your digital marketing performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <CalendarDays className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={campaignType} onValueChange={setCampaignType}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="seo">SEO Only</SelectItem>
              <SelectItem value="ppc">PPC Only</SelectItem>
              <SelectItem value="social">Social Media</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportData("csv")}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="gradient" onClick={() => exportData("pdf")}>
            <FileDown className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">287%</div>
              <p className="text-xs text-muted-foreground">+23% from last period</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="shadow-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">24.7%</div>
              <p className="text-xs text-muted-foreground">+2.3% from last period</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="shadow-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Clients</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">120</div>
              <p className="text-xs text-muted-foreground">+15% from last period</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="shadow-medium">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Project Value</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">₹85,670</div>
              <p className="text-xs text-muted-foreground">+8.2% from last period</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Campaign Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-large">
            <CardHeader>
              <CardTitle>Campaign Performance by Service</CardTitle>
              <CardDescription>
                Revenue breakdown across different service categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={campaignPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="seo" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="ppc" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="social" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="content" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Client Acquisition Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="shadow-large">
            <CardHeader>
              <CardTitle>Client Acquisition</CardTitle>
              <CardDescription>Sources of new client acquisition</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={clientAcquisition}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {clientAcquisition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {clientAcquisition.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.source}</span>
                    </div>
                    <span className="font-medium">{item.clients} clients</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversion Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-large">
            <CardHeader>
              <CardTitle>Conversion Rate Trends</CardTitle>
              <CardDescription>Weekly lead conversion performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={conversionTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} axisLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar yAxisId="left" dataKey="leads" fill="#e5e7eb" />
                  <Bar yAxisId="left" dataKey="conversions" fill="#3b82f6" />
                  <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Performing Campaigns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="shadow-large">
            <CardHeader>
              <CardTitle>Top Campaigns</CardTitle>
              <CardDescription>Best performing campaigns by ROI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingCampaigns.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{campaign.name}</p>
                        <Badge
                          variant={
                            campaign.status === "active"
                              ? "default"
                              : campaign.status === "paused"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Revenue: ₹{campaign.revenue.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{campaign.roi}% ROI</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}