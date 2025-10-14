"use client"

import React, { useState } from "react"
import { 
  IoGridOutline,
  IoNavigateOutline,
  IoSettingsOutline,
  IoHelpCircleOutline,
  IoShieldCheckmarkOutline,
  IoBusinessOutline,
  IoNotificationsOutline,
  IoWalletOutline,
  IoBookOutline,
  IoPeopleOutline,
  IoTrendingUpOutline,
  IoEyeOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoChevronDownOutline
} from "react-icons/io5"
import { Link, useLocation } from "wouter"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AppleNotificationCenter, type Notification } from "@/components/apple/AppleNotificationCenter"

const adminMenuItems = [
  {
    title: "Dashboard Admin",
    href: "/admin",
    icon: IoGridOutline,
  },
  {
    title: "Quản lý Chiến dịch",
    href: "/admin/campaigns",
    icon: IoNavigateOutline,
    submenu: [
      { title: "Thêm chiến dịch", href: "/admin/campaigns/new", slug: "new" },
      { title: "Quản lý chiến dịch TikTok", href: "/admin/campaigns/tiktok", slug: "tiktok" },
    ],
  },
  {
    title: "Quản lý Thương hiệu",
    href: "/admin/brands",
    icon: IoBusinessOutline,
    submenu: [
      { title: "Quản lý danh mục", href: "/admin/brands/categories", slug: "categories" },
    ],
  },
  {
    title: "Quản lý KOC",
    href: "/admin/koc",
    icon: IoPeopleOutline,
    submenu: [
      { title: "Dashboard KOC", href: "/admin/koc", slug: "dashboard" },
      { title: "Hệ thống Xếp hạng KOC", href: "/admin/koc/ranking", slug: "ranking" },
    ],
  },
  {
    title: "Quản lý nội dung",
    href: "/admin/content",
    icon: IoEyeOutline,
    submenu: [
      { title: "Nội dung Facebook", href: "/admin/content/facebook", slug: "facebook" },
      { title: "Nội dung TikTok", href: "/admin/content/tiktok", slug: "tiktok" },
      { title: "Nội dung Instagram", href: "/admin/content/instagram", slug: "instagram" }
    ],
  },
  {
    title: "Analytics & Báo cáo",
    href: "/admin/analytics",
    icon: IoTrendingUpOutline,
  },
  {
    title: "Quản lý Tài chính & Thanh toán",
    href: "/admin/financial",
    icon: IoWalletOutline,
  },
  {
    title: "Quản lý Người dùng",
    href: "/admin/users",
    icon: IoPeopleOutline,
    submenu: [
      { title: "Quản lý Quyền", href: "/admin/users/permissions", slug: "permissions" },
    ],
  },
  {
    title: "Cài đặt Hệ thống",
    href: "/admin/settings",
    icon: IoSettingsOutline,
  },
]

// Enhanced AdminNavigationSample component based on NavigationSample
const AdminNavigationSample = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [location] = useLocation()


  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          data-testid="admin-nav-overlay"
        />
      )}
      
      {/* Enhanced Sidebar */}
      <div className={`
        bg-white border border-gray-200 rounded-xl shadow-sm z-50 overflow-hidden transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 fixed left-0 top-0 h-screen w-72' : '-translate-x-full fixed left-0 top-0 h-screen w-72'}
        lg:translate-x-0 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:rounded-none lg:border-r lg:border-l-0 lg:border-t-0 lg:border-b-0
      `} data-testid="admin-navigation-sample">
        <div className="p-4 lg:p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div className="flex items-center gap-3" data-testid="admin-nav-logo">
              <div className="w-8 h-8 bg-gradient-to-r from-[#ff0086] to-pink-500 rounded-lg flex items-center justify-center">
                <IoShieldCheckmarkOutline className="text-white h-4 w-4" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm lg:text-base">IKK Admin</div>
                <div className="text-xs text-gray-500">Admin Portal</div>
              </div>
            </div>
            
            {/* Close button for mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onClose}
              data-testid="admin-nav-close"
            >
              <IoCloseOutline className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2" data-testid="admin-nav-menu">
            {adminMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location === item.href
              const hasSubmenu = Boolean(item.submenu && item.submenu.length > 0)
              const isParentActive = item.submenu && item.submenu.some(sub => location === sub.href)
              
              const itemContent = (
                <div
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    isActive || isParentActive
                      ? "bg-pink-50 text-[#ff0086]" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  data-testid={`admin-nav-item-${item.href.split('/').pop()}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.title}
                </div>
              )
              
              return (
                <div key={item.href}>
                  <Link href={item.href}>
                    {itemContent}
                  </Link>
                  
                  {hasSubmenu && (
                    <div className="ml-6 mt-1 space-y-1" data-testid={`admin-nav-submenu-${item.href.split('/').pop()}`}>
                      {item.submenu!.map((subItem) => {
                        const subItemId = `${item.href}-${subItem.href}`
                        const isSubActive = location === subItem.href
                        const subItemSlug = subItem.slug || subItem.href.split('/').pop()
                        
                        return (
                          <Link key={subItem.href} href={subItem.href}>
                            <div
                              onClick={onClose}
                              className={cn(
                                "block px-3 py-1 text-xs rounded-md transition-colors cursor-pointer",
                                isSubActive
                                  ? "text-[#ff0086] bg-pink-50 font-medium"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                              )}
                              data-testid={`admin-nav-subitem-${item.href.split('/').pop()}-${subItemSlug}`}
                            >
                              {subItem.title}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}


// Mock notification data for admin
const mockAdminNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'info',
    title: 'KOC mới đăng ký',
    message: 'Nguyễn Văn A đã đăng ký làm KOC',
    timestamp: new Date(Date.now() - 300000),
    isRead: false
  },
  {
    id: 'notif-2',
    type: 'success',
    title: 'Chiến dịch hoàn thành',
    message: 'Chiến dịch "Ưu đãi mùa hè" đã hoàn thành',
    timestamp: new Date(Date.now() - 3600000),
    isRead: false
  },
  {
    id: 'notif-3',
    type: 'warning',
    title: 'KOC cần xác minh',
    message: '5 KOC đang chờ xác minh hồ sơ',
    timestamp: new Date(Date.now() - 7200000),
    isRead: true
  },
  {
    id: 'notif-4',
    type: 'error',
    title: 'Thanh toán thất bại',
    message: 'Thanh toán cho chiến dịch #1234 thất bại',
    timestamp: new Date(Date.now() - 86400000),
    isRead: true
  },
  {
    id: 'notif-5',
    type: 'info',
    title: 'Thương hiệu mới',
    message: 'Công ty ABC đã đăng ký tài khoản thương hiệu',
    timestamp: new Date(Date.now() - 172800000),
    isRead: false
  }
];

interface IKKAdminLayoutProps {
  children: React.ReactNode
}

export default function IKKAdminLayout({ children }: IKKAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockAdminNotifications)

  // IKK usage (Vietnamese) - demonstrates i18n prop usage
  const handleMarkAsRead = (notificationId: string | number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <AdminNavigationSample 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            data-testid="button-mobile-menu"
          >
            <IoMenuOutline className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-[#ff0086] to-pink-500 rounded-md flex items-center justify-center">
              <IoShieldCheckmarkOutline className="text-white h-3 w-3" />
            </div>
            <span className="font-semibold text-gray-900 text-sm">IKK Admin</span>
          </div>
          
          {/* Notification Center - Mobile */}
          <AppleNotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            labels={{
              title: "Thông báo",
              allTab: "Tất cả",
              unreadTab: "Chưa đọc",
              readTab: "Đã đọc",
              markAsRead: "Đánh dấu đã đọc",
              markAllAsRead: "Đánh dấu tất cả đã đọc",
              clearAll: "Xóa tất cả",
              noNotifications: "Không có thông báo",
              noUnreadNotifications: "Không có thông báo chưa đọc"
            }}
          />
          {/* External dev would use:
            <AppleNotificationCenter
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              labels={{
                title: "Notifications",
                allTab: "All",
                unreadTab: "Unread",
                readTab: "Read",
                markAsRead: "Mark as read",
                markAllAsRead: "Mark all as read",
                clearAll: "Clear all",
                noNotifications: "No notifications",
                noUnreadNotifications: "No unread notifications"
              }}
            />
          */}
        </div>

        {/* Desktop Header with Notification Center */}
        <div className="hidden lg:flex items-center justify-end p-4 bg-white border-b border-gray-200">
          <AppleNotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            labels={{
              title: "Thông báo",
              allTab: "Tất cả",
              unreadTab: "Chưa đọc",
              readTab: "Đã đọc",
              markAsRead: "Đánh dấu đã đọc",
              markAllAsRead: "Đánh dấu tất cả đã đọc",
              clearAll: "Xóa tất cả",
              noNotifications: "Không có thông báo",
              noUnreadNotifications: "Không có thông báo chưa đọc"
            }}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}