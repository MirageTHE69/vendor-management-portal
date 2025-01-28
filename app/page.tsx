import { MetricsCards } from "./components/metrics-cards"
import { CompanyStatusTable } from "./components/company-status-table"
import { TopCompanies } from "./components/top-companies"
import { RecentOrders } from "./components/recent-orders"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-medium">Vendor Dashboard</h1>
      </div>
      <MetricsCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CompanyStatusTable />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <TopCompanies />
          <RecentOrders />
        </div>
      </div>
    </div>
  )
}

