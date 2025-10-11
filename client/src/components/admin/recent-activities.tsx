import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Eye, MessageSquare } from "lucide-react"

export function RecentActivities() {
  const activities = [
    {
      id: 1,
      type: "user_action",
      description: "User @beauty_queen_vn đã hoàn thành campaign",
      time: "5 phút trước",
      icon: User,
      status: "success"
    },
    {
      id: 2,
      type: "content",
      description: "Bài viết mới được đăng trong campaign Maybelline",
      time: "12 phút trước", 
      icon: Eye,
      status: "info"
    },
    {
      id: 3,
      type: "message",
      description: "Tin nhắn mới từ advertiser Brand ABC",
      time: "18 phút trước",
      icon: MessageSquare,
      status: "warning"
    },
    {
      id: 4,
      type: "user_action", 
      description: "KOC mới đăng ký: @fashionista_hcm",
      time: "25 phút trước",
      icon: User,
      status: "success"
    },
    {
      id: 5,
      type: "content",
      description: "Campaign La Roche Posay đạt mốc 100K view",
      time: "1 giờ trước",
      icon: Eye,
      status: "success"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Hoạt động gần đây
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-1.5 rounded-full bg-gray-100">
                <activity.icon className="h-3 w-3 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 leading-relaxed">{activity.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{activity.time}</span>
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}