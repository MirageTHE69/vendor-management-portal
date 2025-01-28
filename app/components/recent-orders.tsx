import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const recentOrders = [
  {
    id: "ORD-001",
    company: "TechCorp Solutions",
    date: "2024-01-25",
    status: "Completed",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: "ORD-002",
    company: "DataSys Inc",
    date: "2024-01-24",
    status: "In Progress",
    statusColor: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "ORD-003",
    company: "CloudNet Services",
    date: "2024-01-23",
    status: "Pending",
    statusColor: "bg-gray-100 text-gray-600",
  },
]

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{order.company}</p>
                <p className="text-sm text-gray-600">{order.id}</p>
              </div>
              <div className="text-right">
                <span className={`rounded-full px-2 py-1 text-xs ${order.statusColor}`}>{order.status}</span>
                <p className="mt-1 text-xs text-gray-600">{order.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

