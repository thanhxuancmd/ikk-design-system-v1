import { Sidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RevenueReconciliation } from "@/components/payments/revenue-reconciliation"
import { PaymentSchedule } from "@/components/payments/payment-schedule"
import { AdvancePayment } from "@/components/payments/advance-payment"
import { PaymentHistory } from "@/components/payments/payment-history"
import { DollarSign, Calendar, TrendingUp, History } from "lucide-react"

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
          <div className="px-6">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Thanh toán</h1>
                <Badge className="bg-[#ff0086] text-white">Revenue & Payment Management</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Xin chào, dev@ikk.vn</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Thanh toán</h1>
            <p className="text-muted-foreground">Quản lý doanh thu và thanh toán</p>
          </div>
        </div>

        {/* Payment Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chờ thanh toán</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,450,000₫</div>
              <p className="text-xs text-muted-foreground">Hoa hồng đã duyệt</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã thanh toán</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,680,000₫</div>
              <p className="text-xs text-muted-foreground">Tổng đã nhận</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kỳ thanh toán tiếp theo</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18/01</div>
              <p className="text-xs text-muted-foreground">Còn 5 ngày</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thuế TNCN</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245,000₫</div>
              <p className="text-xs text-muted-foreground">Đã khấu trừ tháng này</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Tabs */}
        <Tabs defaultValue="reconciliation" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reconciliation">Doanh thu - Đối soát</TabsTrigger>
            <TabsTrigger value="schedule">Thanh toán</TabsTrigger>
            <TabsTrigger value="advance">Tạm ứng</TabsTrigger>
            <TabsTrigger value="history">Lịch sử nhận tiền</TabsTrigger>
          </TabsList>

          <TabsContent value="reconciliation">
            <RevenueReconciliation />
          </TabsContent>

          <TabsContent value="schedule">
            <PaymentSchedule />
          </TabsContent>

          <TabsContent value="advance">
            <AdvancePayment />
          </TabsContent>

          <TabsContent value="history">
            <PaymentHistory />
          </TabsContent>
        </Tabs>
        </main>
      </div>
    </div>
  )
}