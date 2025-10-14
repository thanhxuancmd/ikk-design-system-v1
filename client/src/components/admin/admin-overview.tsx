import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  IoTrendingUpOutline, 
  IoPeopleOutline, 
  IoEyeOutline, 
  IoHeartOutline 
} from "react-icons/io5"

export function AdminOverview() {
  const kocMetrics = [
    {
      title: "Total Reach",
      value: "2.9M",
      change: "+15% so với tuần trước",
      icon: IoEyeOutline,
      gradient: "from-pink-500 to-pink-600",
      bgGradient: "from-pink-500/10 to-pink-600/10",
    },
    {
      title: "Total Engagement",
      value: "119K",
      change: "+8% so với tuần trước",
      icon: IoHeartOutline,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/10",
    },
    {
      title: "KOC tham gia",
      value: "1,247",
      change: "+12% so với tuần trước",
      icon: IoPeopleOutline,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/10",
    },
    {
      title: "Engagement Rate",
      value: "4.16%",
      change: "+0.3% so với tuần trước",
      icon: IoTrendingUpOutline,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-500/10 to-green-600/10",
    },
  ]

  const topCampaigns = [
    {
      name: "Review son môi Maybelline",
      reach: "156K",
      engagement: "6.5K",
      participants: "89",
      status: "Đang chạy",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      name: "Trải nghiệm foundation FitMe",
      reach: "98K",
      engagement: "4.1K",
      participants: "45",
      status: "Tuyển KOC",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      name: "Check-in cửa hàng Maybelline",
      reach: "67K",
      engagement: "2.8K",
      participants: "32",
      status: "Hoàn thành",
      statusColor: "bg-gray-100 text-gray-800",
    },
  ]

  const platformData = [
    { name: "TikTok", percentage: 45, color: "bg-pink-500" },
    { name: "Instagram", percentage: 30, color: "bg-pink-400" },
    { name: "Facebook", percentage: 15, color: "bg-blue-500" },
    { name: "YouTube", percentage: 10, color: "bg-red-500" },
  ]

  return (
    <div className="space-y-6">
      {/* KOC Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kocMetrics.map((metric, index) => {
          const IconComponent = metric.icon
          return (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className={`rounded-2xl p-4 bg-gradient-to-br ${metric.bgGradient} mb-4`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center mb-3`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                    <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
                    <p className="text-xs text-green-600 font-medium">{metric.change}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Top Campaigns & Platform Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCampaigns.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{campaign.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{campaign.reach} reach</span>
                      <span>{campaign.engagement} engagement</span>
                      <span>{campaign.participants} KOCs</span>
                    </div>
                  </div>
                  <Badge className={`${campaign.statusColor} border-0`}>
                    {campaign.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformData.map((platform, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-900">{platform.name}</span>
                    <span className="text-gray-600">{platform.percentage}%</span>
                  </div>
                  <Progress value={platform.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}