import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const topCompanies = [
  { name: "TechCorp Solutions", employees: 45, completion: 95 },
  { name: "DataSys Inc", employees: 32, completion: 88 },
  { name: "CloudNet Services", employees: 28, completion: 85 },
]

export function TopCompanies() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCompanies.map((company) => (
            <div key={company.name} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                {company.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{company.name}</p>
                  <span className="text-sm text-gray-600">{company.completion}%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-gray-900" style={{ width: `${company.completion}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

