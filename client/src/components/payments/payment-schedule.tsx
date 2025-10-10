"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, DollarSign } from "lucide-react"

const paymentSchedule = [
  {
    id: 1,
    month: "Tháng 1/2024",
    amount: 3800000,
    status: "pending",
    paymentDate: "2024-02-18",
    daysLeft: 5,
  },
  {
    id: 2,
    month: "Tháng 12/2023",
    amount: 3890000,
    status: "paid",
    paymentDate: "2024-01-18",
    daysLeft: 0,
  },
  {
    id: 3,
    month: "Tháng 11/2023",
    amount: 3200000,
    status: "paid",
    paymentDate: "2023-12-18",
    daysLeft: 0,
  },
  {
    id: 4,
    month: "Tháng 10/2023",
    amount: 4100000,
    status: "paid",
    paymentDate: "2023-11-18",
    daysLeft: 0,
  },
]

export function PaymentSchedule() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800">Chờ thanh toán</Badge>
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Đã thanh toán</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Không xác định</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch thanh toán</CardTitle>
        <CardDescription>Lịch trình thanh toán hoa hồng hàng tháng</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentSchedule.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{payment.month}</h4>
                  <p className="text-sm text-gray-600">{formatCurrency(payment.amount)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{payment.paymentDate}</span>
                    {payment.daysLeft > 0 && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-orange-400" />
                        <span className="text-xs text-orange-600">Còn {payment.daysLeft} ngày</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(payment.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}