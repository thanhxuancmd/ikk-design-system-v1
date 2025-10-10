"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye } from "lucide-react"

const paymentHistory = [
  {
    id: 1,
    month: "Tháng 12/2023",
    amount: 3890000,
    tax: 389000,
    netAmount: 3501000,
    paymentDate: "2024-01-18",
    method: "Chuyển khoản",
    status: "completed",
    reference: "PAY202401180001",
  },
  {
    id: 2,
    month: "Tháng 11/2023",
    amount: 3200000,
    tax: 320000,
    netAmount: 2880000,
    paymentDate: "2023-12-18",
    method: "Chuyển khoản",
    status: "completed",
    reference: "PAY202312180001",
  },
  {
    id: 3,
    month: "Tháng 10/2023",
    amount: 4100000,
    tax: 410000,
    netAmount: 3690000,
    paymentDate: "2023-11-18",
    method: "Chuyển khoản",
    status: "completed",
    reference: "PAY202311180001",
  },
  {
    id: 4,
    month: "Tháng 9/2023",
    amount: 2850000,
    tax: 285000,
    netAmount: 2565000,
    paymentDate: "2023-10-18",
    method: "Chuyển khoản",
    status: "completed",
    reference: "PAY202310180001",
  },
  {
    id: 5,
    month: "Tháng 8/2023",
    amount: 3750000,
    tax: 375000,
    netAmount: 3375000,
    paymentDate: "2023-09-18",
    method: "Chuyển khoản",
    status: "completed",
    reference: "PAY202309180001",
  },
]

export function PaymentHistory() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800">Đang xử lý</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Thất bại</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Không xác định</Badge>
    }
  }

  const totalReceived = paymentHistory.reduce((sum, payment) => sum + payment.netAmount, 0)
  const totalTax = paymentHistory.reduce((sum, payment) => sum + payment.tax, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đã nhận</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalReceived)}</div>
            <p className="text-xs text-muted-foreground">Sau thuế TNCN</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng thuế TNCN</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalTax)}</div>
            <p className="text-xs text-muted-foreground">Đã khấu trừ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Số lần thanh toán</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{paymentHistory.length}</div>
            <p className="text-xs text-muted-foreground">Giao dịch thành công</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lịch sử nhận tiền</CardTitle>
              <CardDescription>Chi tiết các kỳ thanh toán đã thực hiện</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Xuất Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kỳ thanh toán</TableHead>
                <TableHead className="text-right">Hoa hồng</TableHead>
                <TableHead className="text-right">Thuế TNCN</TableHead>
                <TableHead className="text-right">Thực nhận</TableHead>
                <TableHead>Ngày thanh toán</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.month}</TableCell>
                  <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                  <TableCell className="text-right text-orange-600">{formatCurrency(payment.tax)}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    {formatCurrency(payment.netAmount)}
                  </TableCell>
                  <TableCell>{payment.paymentDate}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}