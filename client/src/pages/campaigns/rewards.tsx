"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Gift,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Star,
  Award,
  Coins
} from "lucide-react"

export default function CampaignsRewardsPage() {
  const rewards = [
    {
      id: "reward-1",
      campaignId: "static-1",
      campaignTitle: "Review son môi Maybelline SuperStay Matte Ink",
      merchant: "Maybelline Vietnam",
      amount: "800.000đ",
      status: "pending",
      completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      expectedPayment: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      type: "campaign_completion"
    },
    {
      id: "reward-2",
      campaignId: "static-2",
      campaignTitle: "Tặng 1.400.000đ khi mua sản phẩm và review trên TikTok",
      merchant: "NƯỚC MẮM CHIN-SU",
      amount: "1.400.000đ",
      status: "paid",
      completedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      paidDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      type: "campaign_completion"
    },
    {
      id: "reward-3",
      campaignId: "static-3", 
      campaignTitle: "Tặng 800.000đ và 02 sản phẩm Bảo Xuân Gold",
      merchant: "Bảo Xuân",
      amount: "800.000đ",
      status: "in_review",
      completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      type: "campaign_completion"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return { text: "Đã thanh toán", color: "bg-green-500" }
      case "pending":
        return { text: "Chờ thanh toán", color: "bg-yellow-500" }
      case "in_review":
        return { text: "Đang xem xét", color: "bg-blue-500" }
      case "rejected":
        return { text: "Từ chối", color: "bg-red-500" }
      default:
        return { text: "Không rõ", color: "bg-gray-500" }
    }
  }

  const totalEarned = rewards.filter(r => r.status === "paid").reduce((sum, r) => {
    return sum + parseFloat(r.amount.replace(/[^\d]/g, ""))
  }, 0)

  const pendingAmount = rewards.filter(r => r.status === "pending").reduce((sum, r) => {
    return sum + parseFloat(r.amount.replace(/[^\d]/g, ""))
  }, 0)

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
                <h1 className="text-2xl font-bold text-gray-900">Phần thưởng</h1>
                <Badge className="bg-[#ff0086] text-white">{rewards.length} giao dịch</Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <div className="p-6 bg-white border-b">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{totalEarned.toLocaleString()}đ</div>
                    <div className="text-sm text-gray-600">Đã nhận</div>
                  </div>
                  <div className="p-3 bg-green-500 rounded-full">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{pendingAmount.toLocaleString()}đ</div>
                    <div className="text-sm text-gray-600">Chờ thanh toán</div>
                  </div>
                  <div className="p-3 bg-yellow-500 rounded-full">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{rewards.length}</div>
                    <div className="text-sm text-gray-600">Chiến dịch hoàn thành</div>
                  </div>
                  <div className="p-3 bg-purple-500 rounded-full">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">4.9★</div>
                    <div className="text-sm text-gray-600">Rating trung bình</div>
                  </div>
                  <div className="p-3 bg-blue-500 rounded-full">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="bg-white border rounded-xl">
                <TabsTrigger value="all" data-testid="tab-all-rewards">Tất cả</TabsTrigger>
                <TabsTrigger value="paid" data-testid="tab-paid-rewards">Đã thanh toán</TabsTrigger>
                <TabsTrigger value="pending" data-testid="tab-pending-rewards">Chờ thanh toán</TabsTrigger>
                <TabsTrigger value="in_review" data-testid="tab-review-rewards">Đang xem xét</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {rewards.map((reward) => {
                  const statusBadge = getStatusBadge(reward.status)
                  
                  return (
                    <Card key={reward.id} className="border-0 shadow-sm" data-testid={`reward-card-${reward.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{reward.merchant.charAt(0)}</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900">{reward.merchant}</h3>
                                <p className="text-sm text-gray-600">{reward.campaignTitle}</p>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span>Hoàn thành: {new Date(reward.completedDate).toLocaleDateString('vi-VN')}</span>
                              </div>
                              {reward.expectedPayment && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span>Dự kiến: {new Date(reward.expectedPayment).toLocaleDateString('vi-VN')}</span>
                                </div>
                              )}
                              {reward.paidDate && (
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>Đã trả: {new Date(reward.paidDate).toLocaleDateString('vi-VN')}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#ff0086] mb-2">{reward.amount}</div>
                            <Badge className={`${statusBadge.color} text-white border-0`}>
                              {statusBadge.text}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              <TabsContent value="paid" className="space-y-4">
                {rewards.filter(r => r.status === "paid").map((reward) => {
                  const statusBadge = getStatusBadge(reward.status)
                  
                  return (
                    <Card key={reward.id} className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{reward.merchant.charAt(0)}</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900">{reward.merchant}</h3>
                                <p className="text-sm text-gray-600">{reward.campaignTitle}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Đã thanh toán: {new Date(reward.paidDate!).toLocaleDateString('vi-VN')}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#ff0086] mb-2">{reward.amount}</div>
                            <Badge className={`${statusBadge.color} text-white border-0`}>
                              {statusBadge.text}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {rewards.filter(r => r.status === "pending").map((reward) => {
                  const statusBadge = getStatusBadge(reward.status)
                  
                  return (
                    <Card key={reward.id} className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{reward.merchant.charAt(0)}</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900">{reward.merchant}</h3>
                                <p className="text-sm text-gray-600">{reward.campaignTitle}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-yellow-500" />
                              <span>Dự kiến thanh toán: {new Date(reward.expectedPayment!).toLocaleDateString('vi-VN')}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#ff0086] mb-2">{reward.amount}</div>
                            <Badge className={`${statusBadge.color} text-white border-0`}>
                              {statusBadge.text}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              <TabsContent value="in_review" className="space-y-4">
                {rewards.filter(r => r.status === "in_review").map((reward) => {
                  const statusBadge = getStatusBadge(reward.status)
                  
                  return (
                    <Card key={reward.id} className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{reward.merchant.charAt(0)}</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900">{reward.merchant}</h3>
                                <p className="text-sm text-gray-600">{reward.campaignTitle}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                              <AlertCircle className="w-4 h-4 text-blue-500" />
                              <span>Nội dung đang được xem xét chất lượng</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#ff0086] mb-2">{reward.amount}</div>
                            <Badge className={`${statusBadge.color} text-white border-0`}>
                              {statusBadge.text}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}