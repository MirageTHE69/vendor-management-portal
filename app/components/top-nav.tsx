import { Bell, Settings, User } from "lucide-react"
import Link from "next/link"

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Vendors", href: "/vendors" },
  { name: "Current Work", href: "/current-work" },
  { name: "Employees", href: "/employees" },
  { name: "Orders", href: "/orders" },
  { name: "Reports", href: "/reports" },
  { name: "Calendar", href: "/calendar" },
]

export function TopNav() {
  return (
    <nav className="border-b bg-white/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-semibold">
            <span className="rounded-full bg-gray-200 px-4 py-2 urbanist-700">VendorHub</span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm ${
                  item.active ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Settings className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}

