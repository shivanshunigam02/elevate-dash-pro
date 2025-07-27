import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  icon: React.ReactNode
  color?: "blue" | "green" | "purple" | "orange"
  index?: number
}

const colorClasses = {
  blue: "from-blue-500/20 to-blue-600/20 border-blue-500/20",
  green: "from-green-500/20 to-green-600/20 border-green-500/20",
  purple: "from-purple-500/20 to-purple-600/20 border-purple-500/20",
  orange: "from-orange-500/20 to-orange-600/20 border-orange-500/20",
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon,
  color = "blue",
  index = 0
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <Card className={cn(
        "relative overflow-hidden border shadow-soft hover:shadow-medium transition-all duration-300",
        "bg-gradient-to-br",
        colorClasses[color]
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="p-2 rounded-lg bg-card/80 backdrop-blur-sm">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground mb-1">
            {value}
          </div>
          <div className="flex items-center text-xs">
            {changeType === "increase" ? (
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span
              className={cn(
                "font-medium",
                changeType === "increase" ? "text-green-600" : "text-red-600"
              )}
            >
              {change}
            </span>
            <span className="text-muted-foreground ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}