"use client"

import { useRoute } from "wouter"
import { ArrowLeft, Users, Clock, MapPin, Star, Calendar, Gift, CheckCircle, AlertCircle, FileText, Target, Smartphone, Eye, Award, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Link } from "wouter"

const PlatformIcon = ({ platform }: { platform: string }) => {
  const iconStyle = "w-5 h-5 rounded-md p-1 text-white"

  switch (platform) {
    case "tiktok":
      return (
        <div className={`${iconStyle} bg-black`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        </div>
      )
    case "facebook":
      return (
        <div className={`${iconStyle} bg-blue-600`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      )
    case "instagram":
      return (
        <div className={`${iconStyle} bg-gradient-to-br from-purple-600 to-pink-500`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
      )
    default:
      return null
  }
}

export default function CampaignDetailPage() {
  const [match, params] = useRoute("/campaigns/:id")
  
  if (!match) return <div>Campaign not found</div>

  // Mock campaign data - in real app would fetch from API based on params.id
  const campaign = {
    id: params.id,
    merchant: "Maybelline Vietnam",
    title: "Review son môi Maybelline SuperStay Matte Ink",
    reward: "800",
    category: "Làm đẹp",
    status: "recruiting",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    selectedKocs: Array(89).fill(null),
    kocNeeded: 100,
    image: "/red-maybelline-lipstick.png",
    description: "Chúng tôi đang tìm kiếm những KOC có kinh nghiệm trong lĩnh vực làm đẹp để review dòng son môi Maybelline SuperStay Matte Ink. Sản phẩm nổi tiếng với độ bền màu lên đến 16 giờ và công thức không gây khô môi.",
    requirements: [
      "Nữ, độ tuổi từ 18-35",
      "Có kinh nghiệm review mỹ phẩm",
      "Tối thiểu 5K followers trên TikTok hoặc Instagram", 
      "Có khả năng tạo content chất lượng cao",
      "Cam kết đăng bài đúng thời hạn"
    ],
    platforms: ["tiktok", "facebook", "instagram"],
    startDate: new Date().toISOString(),
    location: "Toàn quốc",
    // Timeline theo báo cáo
    timeline: {
      applicationStart: new Date().toISOString(),
      applicationEnd: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      selectionStart: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
      selectionEnd: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
      postingStart: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      postingEnd: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString(),
      evaluationStart: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
      evaluationEnd: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString()
    },
    // Thông tin sản phẩm chi tiết
    product: {
      name: "Combo sữa chống nắng ANESSA",
      value: 982000,
      currency: "VND",
      specifications: {
        "Thương hiệu": "ANESSA",
        "Loại sản phẩm": "Sữa chống nắng",
        "SPF": "50+",
        "PA": "++++",
        "Thể tích": "60ml",
        "Xuất xứ": "Nhật Bản"
      },
      images: ["/red-maybelline-lipstick.png"]
    },
    // Yêu cầu chi tiết theo báo cáo
    detailedRequirements: {
      demographics: {
        ageMin: 25,
        ageMax: 35,
        gender: ["Female"],
        location: ["Nationwide"]
      },
      profile: {
        contentCategories: ["Lifestyle", "Fashion", "Beauty"],
        interests: ["Skincare enthusiast", "Beauty reviewer"],
        skinType: ["Sensitive", "Acne-prone", "All skin types"],
        exclusions: ["Too many mass market reviews"],
        contentQuality: "Premium"
      }
    },
    // Yêu cầu nội dung
    contentRequirements: {
      contentType: ["Video Review", "Story"],
      platformSpecific: {
        "TikTok": "Public post với hashtag #ANESSA #chongnang",
        "Instagram": "Story và Post với tag @anessa_vietnam"
      },
      keywordsRequired: ["ANESSA", "chống nắng", "SPF50+"],
      contentRestrictions: ["Không so sánh với thương hiệu khác", "Không đề cập đến nhược điểm sản phẩm"],
      approvalRequired: true
    },
    // Điều khoản và thỏa thuận
    agreements: {
      deadlineAgreement: "Cam kết gửi bài đúng deadline",
      noDeleteAgreement: "Không xóa hoặc đặt riêng tư bài viết trong 30 ngày",
      usageRightsAgreement: "Đồng ý cho thương hiệu sử dụng content để quảng bá",
      termsAgreement: "Đồng ý với điều khoản tổng quát của nền tảng"
    }
  }

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
  )

  const progressPercentage = Math.round((campaign.selectedKocs.length / campaign.kocNeeded) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard/campaigns">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Header */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                    <img 
                      src={campaign.image || "/cosmetic-lipstick-beauty.png"} 
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{campaign.merchant?.charAt(0) || "M"}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{campaign.merchant}</h3>
                        <Badge className="text-xs bg-pink-100 text-pink-600 border-0">{campaign.category}</Badge>
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">{campaign.title}</h1>
                    <p className="text-gray-600 leading-relaxed">{campaign.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Details Tabs */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="w-5 h-5 text-[#ff0086]" />
                  Chi tiết chiến dịch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="requirements" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="requirements">Yêu cầu</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="product">Sản phẩm</TabsTrigger>
                    <TabsTrigger value="content">Nội dung</TabsTrigger>
                    <TabsTrigger value="terms">Điều khoản</TabsTrigger>
                  </TabsList>

                  <TabsContent value="requirements" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4 text-[#ff0086]" />
                          Yêu cầu cơ bản
                        </h4>
                        <div className="space-y-2">
                          {campaign.requirements.map((req, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-pink-600 font-bold text-xs">{index + 1}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{req}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#ff0086]" />
                          Thông tin nhân khẩu học
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Độ tuổi:</span>
                            <span className="ml-2 font-medium">{campaign.detailedRequirements.demographics.ageMin}-{campaign.detailedRequirements.demographics.ageMax} tuổi</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Giới tính:</span>
                            <span className="ml-2 font-medium">{campaign.detailedRequirements.demographics.gender.join(", ")}</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4 text-[#ff0086]" />
                          Yêu cầu chuyên môn
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Lĩnh vực:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {campaign.detailedRequirements.profile.contentCategories.map((cat, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{cat}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Sở thích:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {campaign.detailedRequirements.profile.interests.map((interest, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-pink-50 text-pink-600">{interest}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Chất lượng nội dung:</span>
                            <span className="ml-2 font-medium">{campaign.detailedRequirements.profile.contentQuality}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#ff0086]" />
                        Lịch trình chiến dịch
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-medium text-blue-900">Ứng tuyển</p>
                            <p className="text-sm text-blue-600">Thời gian đăng ký tham gia</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium">{new Date(campaign.timeline.applicationStart).toLocaleDateString('vi-VN')}</p>
                            <p className="text-gray-600">đến {new Date(campaign.timeline.applicationEnd).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <p className="font-medium text-yellow-900">Chọn lọc</p>
                            <p className="text-sm text-yellow-600">Duyệt và chọn KOC</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium">{new Date(campaign.timeline.selectionStart).toLocaleDateString('vi-VN')}</p>
                            <p className="text-gray-600">đến {new Date(campaign.timeline.selectionEnd).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-medium text-green-900">Đăng bài</p>
                            <p className="text-sm text-green-600">Thực hiện và đăng nội dung</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium">{new Date(campaign.timeline.postingStart).toLocaleDateString('vi-VN')}</p>
                            <p className="text-gray-600">đến {new Date(campaign.timeline.postingEnd).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div>
                            <p className="font-medium text-purple-900">Đánh giá</p>
                            <p className="text-sm text-purple-600">Kiểm tra và tính thưởng</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium">{new Date(campaign.timeline.evaluationStart).toLocaleDateString('vi-VN')}</p>
                            <p className="text-gray-600">đến {new Date(campaign.timeline.evaluationEnd).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="product" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Gift className="w-4 h-4 text-[#ff0086]" />
                        Thông tin sản phẩm
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Thông số kỹ thuật</h5>
                          <div className="space-y-2 text-sm">
                            {Object.entries(campaign.product.specifications).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600">{key}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Giá trị phần thưởng</h5>
                          <div className="text-center p-4 bg-pink-50 rounded-lg">
                            <div className="text-2xl font-bold text-[#ff0086]">{campaign.product.value.toLocaleString()}đ</div>
                            <p className="text-sm text-gray-600 mt-1">Giá trị sản phẩm nhận được</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#ff0086]" />
                        Yêu cầu nội dung
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Loại nội dung</h5>
                          <div className="flex flex-wrap gap-2">
                            {campaign.contentRequirements.contentType.map((type, idx) => (
                              <Badge key={idx} className="bg-blue-100 text-blue-700">{type}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Yêu cầu theo nền tảng</h5>
                          <div className="space-y-2">
                            {Object.entries(campaign.contentRequirements.platformSpecific).map(([platform, requirement]) => (
                              <div key={platform} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <PlatformIcon platform={platform.toLowerCase()} />
                                <div>
                                  <p className="font-medium text-sm">{platform}</p>
                                  <p className="text-sm text-gray-600">{requirement}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Từ khóa bắt buộc</h5>
                          <div className="flex flex-wrap gap-1">
                            {campaign.contentRequirements.keywordsRequired.map((keyword, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">#{keyword}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Hạn chế nội dung</h5>
                          <ul className="space-y-1 text-sm text-gray-700">
                            {campaign.contentRequirements.contentRestrictions.map((restriction, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                {restriction}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {campaign.contentRequirements.approvalRequired && (
                          <div className="p-3 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-yellow-800 flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              Nội dung cần được duyệt trước khi đăng
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="terms" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#ff0086]" />
                        Điều khoản và cam kết
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(campaign.agreements).map(([key, agreement]) => (
                          <div key={key} className="flex items-start gap-3 p-3 border rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{agreement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Campaign Stats */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Thông tin chiến dịch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ff0086] mb-1">{campaign.product.value.toLocaleString()}đ</div>
                  <p className="text-sm text-gray-600">Giá trị sản phẩm</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>KOC đã tham gia</span>
                    </div>
                    <span className="font-medium">{campaign.selectedKocs.length}/{campaign.kocNeeded}</span>
                  </div>
                  
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-gray-500 text-center">{progressPercentage}% đã đăng ký</p>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Còn {daysLeft} ngày</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{campaign.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Bắt đầu: {new Date(campaign.startDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Gift className="w-4 h-4 text-gray-500" />
                    <span>Kết thúc: {new Date(campaign.deadline).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white"
                    size="lg"
                    asChild
                    data-testid="button-apply-campaign"
                  >
                    <Link href={`/campaigns/${campaign.id}/apply`}>
                      Ứng tuyển ngay
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent"
                    data-testid="button-save-campaign"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Lưu chiến dịch
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-gray-600"
                    data-testid="button-share-campaign"
                  >
                    Chia sẻ với bạn bè
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Alert */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Thời hạn ứng tuyển</p>
                    <p className="text-sm text-gray-600">Còn {daysLeft} ngày để ứng tuyển</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}