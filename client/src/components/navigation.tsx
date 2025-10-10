import { Link, useLocation } from "wouter"
import { Home, Settings, Shield, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"

// Super Header - Navigation component for easy reference
const Navigation = () => {
  const [location] = useLocation()

  const navItems = [
    {
      href: "/admin",
      label: "Admin",
      icon: Shield,
    },
    {
      href: "/home",
      label: "IKK Home",
      icon: Home,
    },
    {
      href: "/dashboard",
      label: "Dashboard KOC",
      icon: Settings,
    },
    {
      href: "/brand-dashboard",
      label: "Dashboard Brands",
      icon: Settings,
    },
    {
      href: "/design-system",
      label: "Design System",
      icon: Palette,
    },
  ]

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/admin">
            <span className="mr-6 flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-to-r from-blue-600 to-cyan-600" />
              <span className="hidden font-bold sm:inline-block">IKK Affiliate</span>
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  location === item.href ||
                  (item.href === "/home" && location === "/home") ||
                  (item.href === "/dashboard" && location.startsWith("/dashboard")) ||
                  (item.href === "/brand-dashboard" && location.startsWith("/brand-dashboard")) ||
                  (item.href === "/admin" && location.startsWith("/admin")) ||
                  (item.href === "/design-system" && location.startsWith("/design-system"))

                return (
                  <Button key={item.href} variant={isActive ? "default" : "ghost"} size="sm" asChild>
                    <Link href={item.href}>
                      <span className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline-block">{item.label}</span>
                      </span>
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation