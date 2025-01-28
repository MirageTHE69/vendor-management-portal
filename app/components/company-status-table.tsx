import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const companies = [
  {
    name: "TechCorp Solutions",
    type: "IT Services",
    employees: 45,
    status: "Active",
    progress: "Working",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    name: "DataSys Inc",
    type: "Data Analytics",
    employees: 32,
    status: "Active",
    progress: "Screening",
    statusColor: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "CloudNet Services",
    type: "Cloud Solutions",
    employees: 28,
    status: "Active",
    progress: "Hiring",
    statusColor: "bg-blue-100 text-blue-600",
  },
  {
    name: "SecureIT Pro",
    type: "Cybersecurity",
    employees: 15,
    status: "Pending",
    progress: "Onboarding",
    statusColor: "bg-purple-100 text-purple-600",
  },
  {
    name: "DevOps Masters",
    type: "Development",
    employees: 38,
    status: "Active",
    progress: "Working",
    statusColor: "bg-green-100 text-green-600",
  },
]

export function CompanyStatusTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Company Status Overview</CardTitle>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search companies..." className="pl-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-12 px-4 text-left align-middle font-medium">Company</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Employees</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Progress</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.name} className="border-b">
                  <td className="p-4 align-middle font-medium">{company.name}</td>
                  <td className="p-4 align-middle">{company.type}</td>
                  <td className="p-4 align-middle">{company.employees}</td>
                  <td className="p-4 align-middle">
                    <Badge variant={company.status === "Active" ? "default" : "secondary"}>{company.status}</Badge>
                  </td>
                  <td className="p-4 align-middle">
                    <span className={`rounded-full px-2 py-1 text-xs ${company.statusColor}`}>{company.progress}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

