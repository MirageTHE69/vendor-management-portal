import { Building2, Users, ShoppingBag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function MetricsCards() {
  const metrics = [
    {
      label: "Partner Companies",
      value: "24",
      icon: Building2,
      trend: "+2 this month",
      trendUp: true,
    },
    {
      label: "Total Employees",
      value: "847",
      icon: Users,
      trend: "+18 this month",
      trendUp: true,
    },
    {
      label: "Active Orders",
      value: "156",
      icon: ShoppingBag,
      trend: "-3 this week",
      trendUp: false,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <metric.icon className="h-5 w-5 text-gray-600" />
              <span className={`text-sm ${metric.trendUp ? "text-green-600" : "text-red-600"}`}>{metric.trend}</span>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold">{metric.value}</span>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

