"use client"

import { useState } from "react"
import { ArrowLeft, Upload, CheckCircle, AlertCircle, User, Phone, Mail, Calendar, MapPin, Home, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Link } from "wouter"

const calculateDaysLeft = (deadline: string) => {
  return Math.max(
    0,
    Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  )
}

export default function CampaignApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    // Shipping address fields
    province: "",
    streetAddress: "",
    postalCode: "",
    // Social media
    tiktokUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    followers: "",
    experience: "",
    portfolio: "",
    // Content categories and interests
    contentCategories: [],
    interests: [],
    skinType: "",
    // Agreement checkboxes from report
    deadlineAgreement: false,
    noDeleteAgreement: false,
    usageRightsAgreement: false,
    termsAgreement: false
  })
  const { toast } = useToast()

  const campaign = {
    id: "static-1",
    merchant: "Maybelline Vietnam", 
    title: "Review son môi Maybelline SuperStay Matte Ink",
    reward: "800",
    category: "Làm đẹp",
    image: "/red-maybelline-lipstick.png",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
  }

  const daysLeft = calculateDaysLeft(campaign.deadline)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all required agreement checkboxes
    const requiredAgreements = [
      { field: 'deadlineAgreement', name: 'đồng ý deadline' },
      { field: 'noDeleteAgreement', name: 'không xóa bài' },
      { field: 'usageRightsAgreement', name: 'quyền sử dụng nội dung' },
      { field: 'termsAgreement', name: 'điều khoản tổng quát' }
    ]
    
    const missingAgreements = requiredAgreements.filter(agreement => !formData[agreement.field])
    
    if (missingAgreements.length > 0) {
      toast({
        title: "Thiếu thông tin",
        description: `Bạn cần đồng ý với: ${missingAgreements.map(a => a.name).join(', ')}`,
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Ứng tuyển thành công!",
        description: "Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ",
      })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/campaigns/${campaign.id}`}>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại chi tiết
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Ứng tuyển chiến dịch</CardTitle>
                <p className="text-gray-600">Điền thông tin để ứng tuyển tham gia chiến dịch</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#ff0086]" />
                      Thông tin cá nhân
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Họ và tên *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Nhập họ và tên"
                          required
                          data-testid="input-full-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="0901234567"
                          required
                          data-testid="input-phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Ngày sinh *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                          required
                          data-testid="input-date-birth"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gender">Giới tính *</Label>
                      <Select onValueChange={(value) => handleInputChange("gender", value)} value={formData.gender}>
                        <SelectTrigger data-testid="select-gender">
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Nữ</SelectItem>
                          <SelectItem value="male">Nam</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Shipping Address Section */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Home className="w-5 h-5 text-[#ff0086]" />
                      Địa chỉ giao hàng
                    </h4>
                    
                    <div>
                      <Label htmlFor="province">Tỉnh/Thành phố *</Label>
                      <Select onValueChange={(value) => handleInputChange("province", value)} value={formData.province}>
                        <SelectTrigger data-testid="select-province">
                          <SelectValue placeholder="Chọn tỉnh/thành" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                          <SelectItem value="danang">Đà Nẵng</SelectItem>
                          <SelectItem value="haiphong">Hải Phòng</SelectItem>
                          <SelectItem value="cantho">Cần Thơ</SelectItem>
                          <SelectItem value="other">Tỉnh khác...</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="streetAddress">Địa chỉ chi tiết *</Label>
                      <Input
                        id="streetAddress"
                        value={formData.streetAddress}
                        onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
                        required
                        data-testid="input-street-address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Mã bưu điện *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        placeholder="Mã bưu điện"
                        required
                        data-testid="input-postal-code"
                      />
                    </div>
                  </div>

                  {/* Content Categories */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#ff0086]" />
                      Lĩnh vực nội dung
                    </h3>
                    
                    <div>
                      <Label>Lĩnh vực chuyên môn *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {["Lifestyle", "Fashion", "Beauty", "Food", "Travel", "Technology"].map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`category-${category}`}
                              checked={formData.contentCategories.includes(category)}
                              onCheckedChange={(checked) => {
                                const categories = checked 
                                  ? [...formData.contentCategories, category]
                                  : formData.contentCategories.filter(c => c !== category)
                                handleInputChange("contentCategories", categories)
                              }}
                              data-testid={`checkbox-category-${category.toLowerCase()}`}
                            />
                            <Label htmlFor={`category-${category}`} className="text-sm">{category}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="skinType">Loại da (nếu liên quan)</Label>
                      <Select onValueChange={(value) => handleInputChange("skinType", value)} value={formData.skinType}>
                        <SelectTrigger data-testid="select-skin-type">
                          <SelectValue placeholder="Chọn loại da" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Da thường</SelectItem>
                          <SelectItem value="dry">Da khô</SelectItem>
                          <SelectItem value="oily">Da dầu</SelectItem>
                          <SelectItem value="combination">Da hỗn hợp</SelectItem>
                          <SelectItem value="sensitive">Da nhạy cảm</SelectItem>
                          <SelectItem value="acne-prone">Da dễ mụn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Thông tin mạng xã hội</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="tiktokUrl">TikTok Profile URL</Label>
                        <Input
                          id="tiktokUrl"
                          value={formData.tiktokUrl}
                          onChange={(e) => handleInputChange("tiktokUrl", e.target.value)}
                          placeholder="https://www.tiktok.com/@username"
                          data-testid="input-tiktok"
                        />
                      </div>
                      <div>
                        <Label htmlFor="instagramUrl">Instagram Profile URL</Label>
                        <Input
                          id="instagramUrl"
                          value={formData.instagramUrl}
                          onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
                          placeholder="https://www.instagram.com/username"
                          data-testid="input-instagram"
                        />
                      </div>
                      <div>
                        <Label htmlFor="facebookUrl">Facebook Profile URL</Label>
                        <Input
                          id="facebookUrl"
                          value={formData.facebookUrl}
                          onChange={(e) => handleInputChange("facebookUrl", e.target.value)}
                          placeholder="https://www.facebook.com/username"
                          data-testid="input-facebook"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Kinh nghiệm</h3>
                    
                    <div>
                      <Label htmlFor="followers">Số lượng followers</Label>
                      <Input
                        id="followers"
                        value={formData.followers}
                        onChange={(e) => handleInputChange("followers", e.target.value)}
                        placeholder="VD: 10K, 50K, 100K..."
                        data-testid="input-followers"
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience">Kinh nghiệm review sản phẩm</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        placeholder="Mô tả kinh nghiệm review sản phẩm của bạn..."
                        rows={3}
                        data-testid="textarea-experience"
                      />
                    </div>

                    <div>
                      <Label htmlFor="portfolio">Link portfolio/video mẫu</Label>
                      <Input
                        id="portfolio"
                        value={formData.portfolio}
                        onChange={(e) => handleInputChange("portfolio", e.target.value)}
                        placeholder="Link đến video hoặc bài viết mẫu..."
                        data-testid="input-portfolio"
                      />
                    </div>
                  </div>

                  {/* Agreement Checkboxes - From Report Requirements */}
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#ff0086]" />
                      Cam kết và đồng ý
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="deadlineAgreement"
                          checked={formData.deadlineAgreement}
                          onCheckedChange={(checked) => handleInputChange("deadlineAgreement", checked as boolean)}
                          data-testid="checkbox-deadline-agreement"
                        />
                        <Label htmlFor="deadlineAgreement" className="text-sm leading-relaxed">
                          Tôi cam kết gửi bài đúng deadline và hoàn thành chiến dịch theo yêu cầu *
                        </Label>
                      </div>

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="noDeleteAgreement"
                          checked={formData.noDeleteAgreement}
                          onCheckedChange={(checked) => handleInputChange("noDeleteAgreement", checked as boolean)}
                          data-testid="checkbox-no-delete-agreement"
                        />
                        <Label htmlFor="noDeleteAgreement" className="text-sm leading-relaxed">
                          Tôi cam kết không xóa hoặc đặt riêng tư bài viết trong vòng 30 ngày sau khi đăng *
                        </Label>
                      </div>

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="usageRightsAgreement"
                          checked={formData.usageRightsAgreement}
                          onCheckedChange={(checked) => handleInputChange("usageRightsAgreement", checked as boolean)}
                          data-testid="checkbox-usage-rights-agreement"
                        />
                        <Label htmlFor="usageRightsAgreement" className="text-sm leading-relaxed">
                          Tôi đồng ý cho thương hiệu sử dụng nội dung của tôi để quảng bá trên các kênh truyền thông *
                        </Label>
                      </div>

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="termsAgreement"
                          checked={formData.termsAgreement}
                          onCheckedChange={(checked) => handleInputChange("termsAgreement", checked as boolean)}
                          data-testid="checkbox-terms-agreement"
                        />
                        <Label htmlFor="termsAgreement" className="text-sm leading-relaxed">
                          Tôi đồng ý với <Link href="/terms" className="text-[#ff0086] hover:underline">điều khoản tổng quát</Link> của nền tảng *
                        </Label>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white"
                      disabled={isSubmitting}
                      data-testid="button-submit-application"
                    >
                      {isSubmitting ? "Đang gửi..." : "Gửi đơn ứng tuyển"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Summary */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-3">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{campaign.title}</h3>
                  <p className="text-sm text-gray-600">{campaign.merchant}</p>
                  <Badge className="mt-2 bg-pink-100 text-pink-600 border-0">{campaign.category}</Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá trị sản phẩm:</span>
                    <span className="font-bold text-[#ff0086]">982.000đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời hạn:</span>
                    <span className="font-medium">Còn {daysLeft} ngày</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Khu vực:</span>
                    <span className="font-medium">Toàn quốc</span>
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