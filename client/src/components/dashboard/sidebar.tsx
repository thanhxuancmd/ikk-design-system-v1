"use client"

import { Link, useLocation } from "wouter"
import { LayoutDashboard, Target, Wrench, BarChart3, CreditCard, HelpCircle, FileText, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Tổng quan",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Chiến dịch",
    href: "/dashboard/campaigns",
    icon: Target,
    submenu: [
      { title: "Tất cả chiến dịch", href: "/dashboard/campaigns" },
      { title: "Chiến dịch đã tham gia", href: "/dashboard/campaigns/joined" },
      { title: "Săn thưởng chiến dịch", href: "/dashboard/campaigns/rewards" },
    ],
  },
  {
    title: "Báo cáo",
    href: "/dashboard/reports",
    icon: BarChart3,
    submenu: [
      { title: "Báo cáo đơn hàng", href: "/dashboard/reports/orders" },
      { title: "Click - Traffic", href: "/dashboard/reports/traffic" },
      { title: "Báo cáo chiến dịch", href: "/dashboard/reports/campaigns" },
      { title: "Báo cáo UTM", href: "/dashboard/reports/utm" },
    ],
  },
  {
    title: "Tool",
    href: "/dashboard/tools",
    icon: Wrench,
    submenu: [
      { title: "Product Link", href: "/dashboard/tools/product-link" },
      { title: "Deep Link", href: "/dashboard/tools/deep-link" },
      { title: "Convert Link", href: "/dashboard/tools/convert-link" },
      { title: "Product Feeds", href: "/dashboard/tools/feeds" },
      { title: "Coupon & Deal", href: "/dashboard/tools/coupons" },
    ],
  },
  {
    title: "Thanh toán",
    href: "/dashboard/payments",
    icon: CreditCard,
    submenu: [
      { title: "Doanh thu - Đối soát", href: "/dashboard/payments/revenue" },
      { title: "Thanh toán", href: "/dashboard/payments/schedule" },
      { title: "Tạm ứng", href: "/dashboard/payments/advance" },
      { title: "Lịch sử nhận tiền", href: "/dashboard/payments/history" },
    ],
  },
  {
    title: "Trợ giúp",
    href: "/dashboard/help",
    icon: HelpCircle,
    submenu: [
      { title: "Hướng dẫn sử dụng", href: "/dashboard/help/guide" },
      { title: "FAQ", href: "/dashboard/help/faq" },
      { title: "Báo mất đơn hàng", href: "/dashboard/help/missing-order" },
    ],
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: Gift,
  },
  {
    title: "Vi Phạm",
    href: "/dashboard/violations",
    icon: FileText,
  },
]

export function Sidebar() {
  const [location] = useLocation()

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-30 overflow-y-auto">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-[#ff0086] to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">I</span>
          </div>
          <div>
            <div className="font-bold text-gray-900">IKK Affiliate</div>
            <div className="text-xs text-gray-500">KOC Platform</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location === item.href || (item.submenu && item.submenu.some(sub => location === sub.href))
            
            return (
              <div key={item.href}>
                <Link href={item.href}>
                  <div className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    isActive 
                      ? "bg-pink-50 text-[#ff0086]" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}>
                    <Icon className="w-4 h-4" />
                    {item.title}
                  </div>
                </Link>
                
                {item.submenu && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link key={subItem.href} href={subItem.href}>
                        <div className={cn(
                          "block px-3 py-1 text-xs rounded-md transition-colors cursor-pointer",
                          location === subItem.href
                            ? "text-[#ff0086] bg-pink-50 font-medium"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}>
                          {subItem.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}