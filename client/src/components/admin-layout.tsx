import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard,
  Target,
  Settings,
  HelpCircle,
  Shield,
  Building2,
  Bell,
  Wallet,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Users,
  TrendingUp,
  Eye
} from "lucide-react"
import { Link, useLocation } from "wouter"
import { cn } from "@/lib/utils"

const adminMenuItems = [
  {
    title: "Dashboard Admin",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý Chiến dịch",
    href: "/admin/campaigns",
    icon: Target,
  },
  {
    title: "Quản lý Thương hiệu",
    href: "/admin/brands",
    icon: Building2,
  },
  {
    title: "Quản lý KOC",
    href: "/admin/koc",
    icon: Users,
  },
  {
    title: "Analytics & Báo cáo",
    href: "/admin/analytics",
    icon: TrendingUp,
  },
  {
    title: "Quản lý Tài chính & Thanh toán",
    href: "/admin/financial",
    icon: Wallet,
  },
  {
    title: "Thông báo & Liên lạc",
    href: "/admin/communications",
    icon: Bell,
  },
  {
    title: "Quản lý Người dùng",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Quản lý Nội dung",
    href: "/admin/content",
    icon: Eye,
  },
  {
    title: "Cài đặt Hệ thống",
    href: "/admin/settings",
    icon: Settings,
  },
]

function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [location] = useLocation()

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      <div className={cn(
        "fixed lg:relative w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#ff0086] to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="text-white h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-gray-900">IKK Admin</span>
                <div className="text-xs text-gray-500">Complete Platform</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onClose}
              data-testid="button-close-sidebar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="space-y-1">
            {adminMenuItems.map((item) => {
              const isActive = location === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-pink-50 text-[#ff0086] border-r-2 border-[#ff0086]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                  )}
                  data-testid={`link-admin-${item.href.replace("/", "")}`}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 overflow-auto">
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            data-testid="button-open-sidebar"
          >
            <Menu className="h-4 w-4 mr-2" />
            Menu
          </Button>
        </div>
        
        <div className="container mx-auto p-4 lg:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}