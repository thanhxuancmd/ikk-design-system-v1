"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, DollarSign, TrendingUp } from "lucide-react"

const advancePaymentData = {
  available: 2450000,
  used: 1500000,
  limit: 5000000,
  interestRate: 1.2,
  minAmount: 500000,
}

const advanceHistory = [
  {
    id: 1,
    amount: 1000000,
    requestDate: "2024-01-05",
    status: "active",
    dueDate: "2024-02-18",
    interest: 12000,
  },
  {
    id: 2,
    amount: 500000,
    requestDate: "2023-12-10",
    status: "repaid",
    dueDate: "2024-01-18",
    interest: 6000,
  },
]

export function AdvancePayment() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">Đang vay</Badge>
      case "repaid":
        return <Badge className="bg-green-100 text-green-800">Đã trả</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Không xác định</Badge>
    }
  }

  const usagePercentage = (advancePaymentData.used / advancePaymentData.limit) * 100

  return (
    <div className="space-y-6">
      {/* Advance Payment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khả năng tạm ứng</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(advancePaymentData.available)}
            </div>
            <p className="text-xs text-muted-foreground">Có thể tạm ứng ngay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang vay</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(advancePaymentData.used)}
            </div>
            <p className="text-xs text-muted-foreground">
              {usagePercentage.toFixed(1)}% hạn mức đã sử dụng
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lãi suất</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {advancePaymentData.interestRate}%
            </div>
            <p className="text-xs text-muted-foreground">Phí tạm ứng hàng tháng</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Hạn mức tạm ứng</CardTitle>
          <CardDescription>
            Bạn đã sử dụng {formatCurrency(advancePaymentData.used)} / {formatCurrency(advancePaymentData.limit)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={usagePercentage} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Đã sử dụng: {usagePercentage.toFixed(1)}%</span>
            <span>Còn lại: {formatCurrency(advancePaymentData.limit - advancePaymentData.used)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Request New Advance */}
      <Card>
        <CardHeader>
          <CardTitle>Yêu cầu tạm ứng mới</CardTitle>
          <CardDescription>
            Tối thiểu {formatCurrency(advancePaymentData.minAmount)} - Tối đa {formatCurrency(advancePaymentData.available)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Lưu ý quan trọng</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Số tiền tạm ứng sẽ được khấu trừ tự động trong kỳ thanh toán tiếp theo.
                Phí tạm ứng {advancePaymentData.interestRate}%/tháng sẽ được tính từ ngày giải ngân.
              </p>
            </div>
            <Button className="w-full" disabled={advancePaymentData.available < advancePaymentData.minAmount}>
              Yêu cầu tạm ứng
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advance History */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử tạm ứng</CardTitle>
          <CardDescription>Các khoản tạm ứng đã yêu cầu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {advanceHistory.map((advance) => (
              <div key={advance.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{formatCurrency(advance.amount)}</h4>
                  <p className="text-sm text-gray-600">
                    Yêu cầu: {advance.requestDate} • Đến hạn: {advance.dueDate}
                  </p>
                  <p className="text-xs text-gray-500">Phí: {formatCurrency(advance.interest)}</p>
                </div>
                <div className="text-right">
                  {getStatusBadge(advance.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}