import { useState } from "react"
import { Link, useLocation } from "wouter"
import { 
  IoHomeOutline, 
  IoSettingsOutline, 
  IoShieldCheckmarkOutline, 
  IoBrushOutline, 
  IoBusinessOutline, 
  IoAddOutline, 
  IoRemoveOutline,
  IoSparklesOutline
} from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const QuickNavigation = () => {
  const [location] = useLocation()
  const [isExpanded, setIsExpanded] = useState(false)

  const navItems = [
    {
      href: "/admin",
      label: "Admin",
      icon: IoShieldCheckmarkOutline,
    },
    {
      href: "/home", 
      label: "IKK Home",
      icon: IoHomeOutline,
    },
    {
      href: "/dashboard",
      label: "Dashboard KOC",
      icon: IoSettingsOutline,
    },
    {
      href: "/brand-dashboard",
      label: "Dashboard Brands", 
      icon: IoBusinessOutline,
    },
    {
      href: "/design-system",
      label: "Design System",
      icon: IoBrushOutline,
    },
    {
      href: "/apple-hig",
      label: "Apple HIG",
      icon: IoSparklesOutline,
    },
  ]

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-1 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-2 shadow-xl">
        {/* Toggle Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-gradient-to-r hover:from-[#ff0086] hover:to-pink-600 hover:text-white transition-all"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <IoRemoveOutline className="h-4 w-4" /> : <IoAddOutline className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="mr-2">
            <p>{isExpanded ? "Thu gọn" : "Mở rộng"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Navigation Items - Only show when expanded */}
        {isExpanded && navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            location === item.href ||
            (item.href === "/home" && location === "/home") ||
            (item.href === "/dashboard" && location.startsWith("/dashboard")) ||
            (item.href === "/brand-dashboard" && location.startsWith("/brand-dashboard")) ||
            (item.href === "/admin" && location.startsWith("/admin")) ||
            (item.href === "/design-system" && location.startsWith("/design-system")) ||
            (item.href === "/apple-hig" && location.startsWith("/apple-hig"))

          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="icon"
                  className={`w-8 h-8 ${
                    isActive 
                      ? "bg-gradient-to-r from-[#ff0086] to-pink-600 text-white hover:shadow-lg"
                      : "hover:bg-gray-100"
                  }`}
                  asChild
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="mr-2">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

export default QuickNavigation