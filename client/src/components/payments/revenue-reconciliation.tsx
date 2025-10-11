"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Download } from "lucide-react"

const revenueData = [
  {
    month: "2024-01",
    generated: 5680000,
    pending: 1200000,
    approved: 3800000,
    rejected: 680000,
    processing: 0,
  },
  {
    month: "2023-12",
    generated: 4320000,
    pending: 0,
    approved: 3890000,
    rejected: 430000,
    processing: 0,
  },
  {
    month: "2023-11",
    generated: 3950000,
    pending: 0,
    approved: 3200000,
    rejected: 750000,
    processing: 0,
  },
  {
    month: "2023-10",
    generated: 4680000,
    pending: 0,
    approved: 4100000,
    rejected: 580000,
    processing: 0,
  },
]

export function RevenueReconciliation() {
  const [selectedYear, setSelectedYear] = useState("2024")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const getMonthName = (monthStr: string) => {
    const [year, month] = monthStr.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    return date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Doanh thu - Đối soát</CardTitle>
            <CardDescription>Theo dõi hoa hồng phát sinh và trạng thái duyệt theo tháng</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Xuất Excel
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tháng</TableHead>
              <TableHead className="text-right">Phát sinh</TableHead>
              <TableHead className="text-right">Chờ duyệt</TableHead>
              <TableHead className="text-right">Đã duyệt</TableHead>
              <TableHead className="text-right">Từ chối</TableHead>
              <TableHead className="text-right">Đang xử lý</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenueData
              .filter((item) => item.month.startsWith(selectedYear))
              .map((item) => (
                <TableRow key={item.month}>
                  <TableCell className="font-medium">{getMonthName(item.month)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(item.generated)}</TableCell>
                  <TableCell className="text-right text-orange-600">{formatCurrency(item.pending)}</TableCell>
                  <TableCell className="text-right text-green-600">{formatCurrency(item.approved)}</TableCell>
                  <TableCell className="text-right text-red-600">{formatCurrency(item.rejected)}</TableCell>
                  <TableCell className="text-right text-blue-600">{formatCurrency(item.processing)}</TableCell>
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
  )
}