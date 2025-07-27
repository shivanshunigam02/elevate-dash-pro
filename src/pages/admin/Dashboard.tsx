import { motion } from "framer-motion"
import {
  FileText,
  DollarSign,
  CreditCard,
  BarChart3,
  Users,
  Globe,
  CalendarDays,
  Bell
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
  ResponsiveContainer
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/admin/metric-card"

// Sample data
const revenueData = [
  { month: "Jan", revenue: 45000, clients: 12 },
  { month: "Feb", revenue: 52000, clients: 18 },
  { month: "Mar", revenue: 48000, clients: 15 },
  { month: "Apr", revenue: 61000, clients: 22 },
  { month: "May", revenue: 55000, clients: 19 },
  { month: "Jun", revenue: 67000, clients: 25 },
]

const serviceDistribution = [
  { name: "SEO Services", value: 35, color: "#3b82f6" },
  { name: "Social Media", value: 25, color: "#8b5cf6" },
  { name: "PPC Advertising", value: 20, color: "#10b981" },
  { name: "Content Marketing", value: 15, color: "#f59e0b" },
  { name: "Others", value: 5, color: "#ef4444" },
]

const trafficData = [
  { day: "Mon", visitors: 1200 },
  { day: "Tue", visitors: 1400 },
  { day: "Wed", visitors: 1100 },
  { day: "Thu", visitors: 1600 },
  { day: "Fri", visitors: 1800 },
  { day: "Sat", visitors: 900 },
  { day: "Sun", visitors: 800 },
]

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your digital marketing business.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <CalendarDays className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="gradient">
            Generate Report
          </Button>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Quotations"
          value="142"
          change="+12.5%"
          changeType="increase"
          icon={<FileText className="h-4 w-4 text-blue-600" />}
          color="blue"
          index={0}
        />
        <MetricCard
          title="Revenue Generated"
          value="₹4,67,890"
          change="+18.2%"
          changeType="increase"
          icon={<DollarSign className="h-4 w-4 text-green-600" />}
          color="green"
          index={1}
        />
        <MetricCard
          title="Payments Processed"
          value="₹3,45,670"
          change="+8.1%"
          changeType="increase"
          icon={<CreditCard className="h-4 w-4 text-purple-600" />}
          color="purple"
          index={2}
        />
        <MetricCard
          title="Active Clients"
          value="89"
          change="-2.4%"
          changeType="decrease"
          icon={<Users className="h-4 w-4 text-orange-600" />}
          color="orange"
          index={3}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Revenue Overview
              </CardTitle>
              <CardDescription>
                Monthly revenue and client acquisition trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                  />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="url(#colorRevenue)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Service Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Service Distribution</CardTitle>
              <CardDescription>
                Breakdown of services by revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {serviceDistribution.map((entry, index) => (
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
                {serviceDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="ml-auto font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Website Traffic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-3"
        >
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Website Traffic
              </CardTitle>
              <CardDescription>
                Daily website visitors for the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                  />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}