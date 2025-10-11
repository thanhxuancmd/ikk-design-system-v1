import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Users,
  BarChart3,
  TrendingUp,
  Settings,
  Shield,
  UserCheck,
  MessageSquare,
  CreditCard,
  FileText,
  Building2,
  Calendar,
  Activity,
  AlertTriangle,
  LogOut,
} from "lucide-react"
import { Link } from "wouter"

const sidebarItems = [
  { name: "Tổng quan", href: "/admin", icon: BarChart3 },
  { name: "Quản lý người dùng", href: "/admin/users", icon: Users },
  { name: "Quản lý KOC", href: "/admin/koc", icon: UserCheck },
  { name: "Quản lý thương hiệu", href: "/admin/brands", icon: Building2 },
  { name: "Chiến dịch", href: "/admin/campaigns", icon: TrendingUp },
  { name: "Thanh toán", href: "/admin/payments", icon: CreditCard },
  { name: "Báo cáo", href: "/admin/analytics", icon: FileText },
  { name: "Thông báo", href: "/admin/notifications", icon: MessageSquare },
  { name: "Bảo mật", href: "/admin/security", icon: Shield },
  { name: "Hệ thống", href: "/admin/system", icon: Settings },
]

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: "#ff0086" }}
          >
            IKK
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900">IKK Admin</h2>
            <p className="text-sm text-gray-500">Bảng điều khiển</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@ikk.vn</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <LogOut className="h-4 w-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </div>
  )
}