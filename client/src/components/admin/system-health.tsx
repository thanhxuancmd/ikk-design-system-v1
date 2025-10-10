import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, Server, Wifi, CheckCircle, AlertTriangle } from "lucide-react"

export function SystemHealth() {
  const healthMetrics = [
    {
      name: "API Server",
      status: "healthy",
      uptime: "99.9%",
      icon: Server,
      color: "text-green-500"
    },
    {
      name: "Database",
      status: "healthy", 
      uptime: "99.8%",
      icon: Database,
      color: "text-green-500"
    },
    {
      name: "CDN",
      status: "warning",
      uptime: "98.5%",
      icon: Wifi,
      color: "text-yellow-500"
    },
    {
      name: "Background Jobs",
      status: "healthy",
      uptime: "99.7%",
      icon: Activity,
      color: "text-green-500"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <div>
                  <p className="font-medium text-gray-900">{metric.name}</p>
                  <p className="text-sm text-gray-600">Uptime: {metric.uptime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(metric.status)}
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status === "healthy" ? "Tốt" : 
                   metric.status === "warning" ? "Cảnh báo" : "Lỗi"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-800">Hệ thống hoạt động ổn định</span>
          </div>
          <p className="text-xs text-green-600 mt-1">Tất cả dịch vụ đang hoạt động bình thường</p>
        </div>
      </CardContent>
    </Card>
  )
}