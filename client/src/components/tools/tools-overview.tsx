"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link2, ArrowRight, Shuffle, Scissors, Search, BarChart3 } from "lucide-react"
import { Link as WouterLink } from "wouter"

const tools = [
  {
    id: "product-link",
    name: "Product Link",
    description: "Tạo link tracking cho sản phẩm cụ thể từ các merchant",
    icon: Link2,
    color: "bg-blue-500",
    href: "/tools/product-link",
  },
  {
    id: "deep-link",
    name: "Deep Link",
    description: "Tạo link tracking cho bất kỳ URL nào với UTM và SubID tùy chỉnh",
    icon: ArrowRight,
    color: "bg-green-500",
    href: "/tools/deep-link",
  },
  {
    id: "convert-link",
    name: "Convert Link",
    description: "Chuyển đổi hàng loạt URL thành tracking links (tối đa 50 links)",
    icon: Shuffle,
    color: "bg-purple-500",
    href: "/tools/convert-link",
  },
  {
    id: "short-link",
    name: "Short Link",
    description: "Rút gọn tracking links và quản lý domain tùy chỉnh",
    icon: Scissors,
    color: "bg-orange-500",
    href: "/tools/short-link",
  },
  {
    id: "product-feeds",
    name: "Product Feeds",
    description: "Tìm kiếm và tạo link cho sản phẩm từ TikTok Shop, Shopee, Tiki",
    icon: Search,
    color: "bg-teal-500",
    href: "/tools/product-feeds",
  },
  {
    id: "link-analytics",
    name: "Link Analytics",
    description: "Theo dõi hiệu suất và phân tích chi tiết các tracking links",
    icon: BarChart3,
    color: "bg-indigo-500",
    href: "/tools/analytics",
  },
]

export default function ToolsOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Công cụ tạo link</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Bộ công cụ hoàn chỉnh để tạo, quản lý và theo dõi các tracking links affiliate của bạn
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const IconComponent = tool.icon
          return (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{tool.name}</CardTitle>
                <CardDescription className="text-gray-600">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <WouterLink href={tool.href}>
                  <Button className="w-full group-hover:bg-blue-600 transition-colors">
                    Sử dụng công cụ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </WouterLink>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Links */}
      <Card>
        <CardHeader>
          <CardTitle>Links gần đây</CardTitle>
          <CardDescription>Các tracking links bạn đã tạo trong 7 ngày qua</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                id: 1,
                originalUrl: "https://shopee.vn/iphone-15-pro-max",
                trackingUrl: "https://go.ikk.vn/click/PUB123456/1",
                campaign: "Shopee Flash Sale",
                clicks: 45,
                conversions: 2,
                createdAt: "2024-12-07",
              },
              {
                id: 2,
                originalUrl: "https://tiki.vn/macbook-air-m3",
                trackingUrl: "https://go.ikk.vn/click/PUB123456/2",
                campaign: "Tiki Electronics",
                clicks: 23,
                conversions: 1,
                createdAt: "2024-12-06",
              },
              {
                id: 3,
                originalUrl: "https://lazada.vn/nike-air-force-1",
                trackingUrl: "https://go.ikk.vn/click/PUB123456/3",
                campaign: "Lazada Fashion",
                clicks: 12,
                conversions: 0,
                createdAt: "2024-12-05",
              },
            ].map((link) => (
              <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-blue-600 truncate max-w-xs">{link.trackingUrl}</span>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Link2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{link.originalUrl}</p>
                  <p className="text-xs text-gray-500">
                    {link.campaign} • {link.createdAt}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">{link.clicks} clicks</div>
                  <div className="text-gray-600">{link.conversions} conversions</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">Xem tất cả links</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}