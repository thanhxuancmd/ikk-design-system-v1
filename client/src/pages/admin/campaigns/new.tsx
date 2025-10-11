"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import IKKAdminLayout from "@/components/ikk-admin-layout"
import {
  HiOutlineCursorArrowRays as HiCursorArrowRays,
  HiOutlineUsers as HiUsers,
  HiOutlineCurrencyDollar as HiCurrencyDollar,
  HiOutlineCalendarDays as HiCalendar,
  HiOutlineVideoCamera as HiVideoCamera,
  HiOutlineStar as HiStar,
  HiOutlineMapPin as HiMapPin,
  HiOutlineClock as HiClock,
  HiOutlineCog6Tooth as HiCog6Tooth,
  HiOutlineCheckCircle as HiCheckCircle,
  HiOutlineXMark as HiXMark,
  HiOutlineDocumentCheck as HiDocumentCheck,
  HiOutlinePaperAirplane as HiPaperAirplane,
  HiOutlineSparkles as HiSparkles
} from "react-icons/hi2"
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa"

export default function NewCampaignPage() {
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    description: "",
    category: "",
    brand: "",
    campaignType: "",
    
    // Target Audience
    targetGender: "",
    targetAgeMin: "",
    targetAgeMax: "",
    targetLocation: [] as string[],
    targetFollowers: "",
    platforms: [] as string[],
    
    // Content Requirements
    contentType: "",
    contentRequirements: "",
    hashtags: [] as string[],
    duration: "",
    postingSchedule: "",
    
    // Budget & Rewards
    budget: "",
    rewardType: "",
    rewardAmount: "",
    kocLimit: "",
    productSamples: false,
    
    // Timeline
    startDate: "",
    endDate: "",
    applicationDeadline: "",
    contentDeadline: "",
    
    // Additional Settings
    autoApprove: false,
    requireApproval: true,
    isUrgent: false,
    isPrivate: false
  })

  const sections = [
    {
      id: "basic",
      title: "Thông tin cơ bản",
      icon: HiCursorArrowRays,
      color: "bg-[#ff0086]",
      fields: ["title", "description", "category", "brand", "campaignType"]
    },
    {
      id: "target",
      title: "Đối tượng mục tiêu",
      icon: HiUsers,
      color: "bg-blue-500",
      fields: ["targetGender", "targetAgeMin", "targetAgeMax", "targetFollowers", "platforms", "targetLocation"]
    },
    {
      id: "content",
      title: "Yêu cầu nội dung",
      icon: HiVideoCamera,
      color: "bg-purple-500",
      fields: ["contentType", "contentRequirements", "hashtags", "postingSchedule"]
    },
    {
      id: "budget",
      title: "Ngân sách & Thưởng",
      icon: HiCurrencyDollar,
      color: "bg-green-500",
      fields: ["budget", "rewardType", "rewardAmount", "kocLimit"]
    },
    {
      id: "timeline",
      title: "Thời gian",
      icon: HiCalendar,
      color: "bg-orange-500",
      fields: ["startDate", "endDate", "applicationDeadline", "contentDeadline"]
    },
    {
      id: "settings",
      title: "Cài đặt",
      icon: HiCog6Tooth,
      color: "bg-gray-500",
      fields: ["autoApprove", "requireApproval", "isUrgent", "isPrivate"]
    }
  ]

  const categories = [
    "Làm đẹp",
    "Thời trang", 
    "Đồ ăn, thức uống",
    "Công nghệ",
    "Sức khỏe",
    "Du lịch",
    "Giáo dục",
    "Giải trí"
  ]

  const campaignTypes = [
    "Review sản phẩm",
    "Unboxing",
    "Tutorial/Hướng dẫn",
    "Check-in địa điểm",
    "Styling/Outfit",
    "Livestream",
    "Challenge",
    "Story/Post thường"
  ]

  const platforms = [
    { id: "tiktok", name: "TikTok", icon: FaTiktok, color: "text-black" },
    { id: "instagram", name: "Instagram", icon: FaInstagram, color: "text-pink-500" },
    { id: "youtube", name: "YouTube", icon: FaYoutube, color: "text-red-500" },
    { id: "facebook", name: "Facebook", icon: FaFacebookF, color: "text-blue-600" }
  ]

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-mark section as completed when fields are filled
    const section = sections.find(s => s.fields.includes(field))
    if (section && !completedSections.includes(section.id)) {
      const sectionFields = section.fields
      const filledFields = sectionFields.filter(f => {
        const fieldValue = field === f ? value : formData[f as keyof typeof formData]
        return Array.isArray(fieldValue) ? fieldValue.length > 0 : Boolean(fieldValue)
      })
      
      if (filledFields.length >= Math.ceil(sectionFields.length * 0.5)) {
        setCompletedSections(prev => [...prev, section.id])
      }
    }
  }

  const handleArrayChange = (field: 'targetLocation' | 'platforms' | 'hashtags', value: string, checked: boolean) => {
    const newValue = checked 
      ? [...formData[field], value]
      : formData[field].filter(item => item !== value)
    
    handleInputChange(field, newValue)
  }

  const getSectionProgress = () => {
    return (completedSections.length / sections.length) * 100
  }

  return (
    <IKKAdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tạo chiến dịch mới</h1>
              <p className="text-muted-foreground">Thiết lập và cấu hình chiến dịch marketing mới cho thương hiệu</p>
              <Badge className="bg-[#ff0086] text-white text-xs w-fit mt-2">
                {Math.round(getSectionProgress())}% hoàn thành
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="bg-white border-gray-200 hover:bg-gray-50 text-sm" data-testid="button-save-draft">
                <HiDocumentCheck className="w-4 h-4 mr-2" />
                Lưu nháp
              </Button>
              <Button className="bg-gradient-to-r from-[#ff0086] to-pink-600 text-white hover:shadow-lg transition-all duration-200" data-testid="button-publish-campaign">
                <HiPaperAirplane className="w-4 h-4 mr-2" />
                Xuất bản
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Mobile Progress Bar */}
            <div className="lg:hidden mb-6">
              <Card className="rounded-xl border shadow-sm bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900">Tiến trình</h3>
                    <span className="text-xs text-gray-500">{Math.round(getSectionProgress())}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#ff0086] to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getSectionProgress()}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {sections.map((section, index) => {
                      const SectionIcon = section.icon
                      const isCompleted = completedSections.includes(section.id)
                      
                      return (
                        <div key={section.id} className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 ${
                            isCompleted ? section.color : "bg-gray-100"
                          }`}>
                            <SectionIcon className={`w-3 h-3 ${isCompleted ? "text-white" : "text-gray-400"}`} />
                          </div>
                          <div className={`text-xs font-medium truncate ${isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                            {section.title}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Left Sidebar - Progress (Desktop Only) */}
            <div className="hidden lg:block xl:col-span-1">
              <div className="sticky top-24">
                <Card className="rounded-xl border shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <HiCheckCircle className="w-5 h-5 text-[#ff0086]" />
                      Tiến trình
                    </CardTitle>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#ff0086] to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getSectionProgress()}%` }}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {sections.map((section, index) => {
                      const SectionIcon = section.icon
                      const isCompleted = completedSections.includes(section.id)
                      
                      return (
                        <div key={section.id} className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            isCompleted ? section.color : "bg-gray-100"
                          }`}>
                            <SectionIcon className={`w-4 h-4 ${isCompleted ? "text-white" : "text-gray-400"}`} />
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm font-medium ${isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                              {section.title}
                            </div>
                            {isCompleted && (
                              <HiCheckCircle className="w-4 h-4 text-green-500 float-right" />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6 lg:space-y-8">
              {/* Basic Information */}
              <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                <CardHeader className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <HiCursorArrowRays className="w-5 h-5 text-[#ff0086]" />
                    Thông tin cơ bản
                  </CardTitle>
                  <CardDescription>Chi tiết chiến dịch và thương hiệu</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <Label htmlFor="title">Tiêu đề chiến dịch *</Label>
                    <Input
                      id="title"
                      placeholder="VD: Review son môi Maybelline SuperStay Matte Ink"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="mt-1 border-gray-200 focus:border-[#ff0086]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Mô tả chi tiết *</Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả chi tiết về sản phẩm, yêu cầu review, điểm nổi bật cần nhấn mạnh..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="mt-1 min-h-[100px] border-gray-200 focus:border-[#ff0086]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label>Danh mục *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="mt-1 border-gray-200">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="brand">Thương hiệu *</Label>
                      <Input
                        id="brand"
                        placeholder="Tên thương hiệu"
                        value={formData.brand}
                        onChange={(e) => handleInputChange("brand", e.target.value)}
                        className="mt-1 border-gray-200 focus:border-[#ff0086]"
                      />
                    </div>

                    <div>
                      <Label>Loại chiến dịch *</Label>
                      <Select value={formData.campaignType} onValueChange={(value) => handleInputChange("campaignType", value)}>
                        <SelectTrigger className="mt-1 border-gray-200">
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                        <SelectContent>
                          {campaignTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Target Audience */}
              <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <HiUsers className="w-5 h-5 text-blue-500" />
                    Đối tượng mục tiêu
                  </CardTitle>
                  <CardDescription>Xác định KOC phù hợp cho chiến dịch</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label>Giới tính</Label>
                      <Select value={formData.targetGender} onValueChange={(value) => handleInputChange("targetGender", value)}>
                        <SelectTrigger className="mt-1 border-gray-200">
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả</SelectItem>
                          <SelectItem value="male">Nam</SelectItem>
                          <SelectItem value="female">Nữ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="ageMin">Tuổi từ</Label>
                      <Input
                        id="ageMin"
                        type="number"
                        placeholder="18"
                        value={formData.targetAgeMin}
                        onChange={(e) => handleInputChange("targetAgeMin", e.target.value)}
                        className="mt-1 border-gray-200 focus:border-[#ff0086]"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ageMax">Đến tuổi</Label>
                      <Input
                        id="ageMax"
                        type="number"
                        placeholder="35"
                        value={formData.targetAgeMax}
                        onChange={(e) => handleInputChange("targetAgeMax", e.target.value)}
                        className="mt-1 border-gray-200 focus:border-[#ff0086]"
                      />
                    </div>
                    
                    <div>
                      <Label>Followers tối thiểu</Label>
                      <Select value={formData.targetFollowers} onValueChange={(value) => handleInputChange("targetFollowers", value)}>
                        <SelectTrigger className="mt-1 border-gray-200">
                          <SelectValue placeholder="Chọn yêu cầu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Bất kỳ</SelectItem>
                          <SelectItem value="1k">1K+</SelectItem>
                          <SelectItem value="5k">5K+</SelectItem>
                          <SelectItem value="10k">10K+</SelectItem>
                          <SelectItem value="50k">50K+</SelectItem>
                          <SelectItem value="100k">100K+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">Nền tảng mục tiêu</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {platforms.map(platform => {
                        const IconComponent = platform.icon
                        return (
                          <div key={platform.id} className="flex items-center space-x-3 p-3 border rounded-xl hover:border-[#ff0086] transition-colors">
                            <Checkbox
                              id={platform.id}
                              checked={formData.platforms.includes(platform.id)}
                              onCheckedChange={(checked) => handleArrayChange("platforms", platform.id, checked as boolean)}
                            />
                            <div className="flex items-center space-x-2">
                              <IconComponent className={`w-4 h-4 ${platform.color}`} />
                              <Label htmlFor={platform.id} className="text-sm cursor-pointer">{platform.name}</Label>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">Địa điểm</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {["Toàn quốc", "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Hải Phòng"].map(location => (
                        <div key={location} className="flex items-center space-x-2 p-2 border rounded-lg hover:border-[#ff0086] transition-colors">
                          <Checkbox
                            id={location}
                            checked={formData.targetLocation.includes(location)}
                            onCheckedChange={(checked) => handleArrayChange("targetLocation", location, checked as boolean)}
                          />
                          <Label htmlFor={location} className="text-sm cursor-pointer">{location}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Requirements */}
              <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                <CardHeader className="bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <HiVideoCamera className="w-5 h-5 text-purple-500" />
                    Yêu cầu nội dung
                  </CardTitle>
                  <CardDescription>Định dạng và nội dung mong muốn</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Định dạng nội dung</Label>
                      <Select value={formData.contentType} onValueChange={(value) => handleInputChange("contentType", value)}>
                        <SelectTrigger className="mt-1 border-gray-200">
                          <SelectValue placeholder="Chọn định dạng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video (15s-60s)</SelectItem>
                          <SelectItem value="photo">Hình ảnh</SelectItem>
                          <SelectItem value="story">Story</SelectItem>
                          <SelectItem value="post">Post thường</SelectItem>
                          <SelectItem value="livestream">Livestream</SelectItem>
                          <SelectItem value="reel">Reel/Short</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Thời gian đăng bài</Label>
                      <Select value={formData.postingSchedule} onValueChange={(value) => handleInputChange("postingSchedule", value)}>
                        <SelectTrigger className="mt-1 border-gray-200">
                          <SelectValue placeholder="Chọn thời gian" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flexible">Linh hoạt</SelectItem>
                          <SelectItem value="peak">Giờ vàng (19:00-22:00)</SelectItem>
                          <SelectItem value="morning">Buổi sáng (6:00-10:00)</SelectItem>
                          <SelectItem value="afternoon">Buổi trưa (12:00-14:00)</SelectItem>
                          <SelectItem value="evening">Buổi tối (18:00-21:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contentRequirements">Chi tiết yêu cầu *</Label>
                    <Textarea
                      id="contentRequirements"
                      placeholder="VD: - Quay video unboxing sản phẩm&#10;- Thể hiện rõ màu sắc và chất lượng&#10;- Chia sẻ cảm nhận thực tế&#10;- Thời lượng 30-60 giây"
                      value={formData.contentRequirements}
                      onChange={(e) => handleInputChange("contentRequirements", e.target.value)}
                      className="mt-1 min-h-[120px] border-gray-200 focus:border-[#ff0086]"
                    />
                  </div>

                  <div>
                    <Label>Hashtag yêu cầu</Label>
                    <Input
                      placeholder="#MaybellineVietnam #SuperStayMatteInk"
                      className="mt-1 border-gray-200 focus:border-[#ff0086]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          const newTag = e.currentTarget.value.trim()
                          if (!formData.hashtags.includes(newTag)) {
                            handleInputChange("hashtags", [...formData.hashtags, newTag])
                          }
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.hashtags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200">
                          {tag}
                          <HiXMark 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => handleInputChange("hashtags", formData.hashtags.filter((_, i) => i !== index))}
                          />
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Nhấn Enter để thêm hashtag</p>
                  </div>
                </CardContent>
              </Card>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Budget */}
                <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2">
                      <HiCurrencyDollar className="w-5 h-5 text-green-500" />
                      Ngân sách & Thưởng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <Label htmlFor="budget">Tổng ngân sách (VNĐ) *</Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="1000000"
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        className="mt-1 border-gray-200 focus:border-[#ff0086]"
                      />
                    </div>

                    <div>
                      <Label>Loại thưởng</Label>
                      <Select value={formData.rewardType} onValueChange={(value) => handleInputChange("rewardType", value)}>
                        <SelectTrigger className="mt-1 border-gray-200">
                          <SelectValue placeholder="Chọn loại thưởng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Tiền mặt</SelectItem>
                          <SelectItem value="product">Sản phẩm</SelectItem>
                          <SelectItem value="voucher">Voucher</SelectItem>
                          <SelectItem value="combo">Tiền + Sản phẩm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="rewardAmount">Thưởng/KOC (VNĐ)</Label>
                        <Input
                          id="rewardAmount"
                          type="number"
                          placeholder="200000"
                          value={formData.rewardAmount}
                          onChange={(e) => handleInputChange("rewardAmount", e.target.value)}
                          className="mt-1 border-gray-200 focus:border-[#ff0086]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="kocLimit">Số KOC tối đa</Label>
                        <Input
                          id="kocLimit"
                          type="number"
                          placeholder="50"
                          value={formData.kocLimit}
                          onChange={(e) => handleInputChange("kocLimit", e.target.value)}
                          className="mt-1 border-gray-200 focus:border-[#ff0086]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="productSamples"
                        checked={formData.productSamples}
                        onCheckedChange={(checked) => handleInputChange("productSamples", checked)}
                      />
                      <Label htmlFor="productSamples">Kèm theo sản phẩm mẫu</Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                  <CardHeader className="bg-gradient-to-r from-orange-500/5 to-orange-600/5 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2">
                      <HiCalendar className="w-5 h-5 text-orange-500" />
                      Thời gian
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="startDate">Ngày bắt đầu *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange("startDate", e.target.value)}
                          className="mt-1 border-gray-200 focus:border-[#ff0086]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="endDate">Ngày kết thúc *</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => handleInputChange("endDate", e.target.value)}
                          className="mt-1 border-gray-200 focus:border-[#ff0086]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="applicationDeadline">Hạn đăng ký *</Label>
                        <Input
                          id="applicationDeadline"
                          type="date"
                          value={formData.applicationDeadline}
                          onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                          className="mt-1 border-gray-200 focus:border-[#ff0086]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="contentDeadline">Hạn nộp nội dung *</Label>
                        <Input
                          id="contentDeadline"
                          type="date"
                          value={formData.contentDeadline}
                          onChange={(e) => handleInputChange("contentDeadline", e.target.value)}
                          className="mt-1 border-gray-200 focus:border-[#ff0086]"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="isUrgent" className="text-sm">Chiến dịch gấp</Label>
                        <Switch
                          id="isUrgent"
                          checked={formData.isUrgent}
                          onCheckedChange={(checked) => handleInputChange("isUrgent", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="requireApproval" className="text-sm">Phê duyệt nội dung</Label>
                        <Switch
                          id="requireApproval"
                          checked={formData.requireApproval}
                          onCheckedChange={(checked) => handleInputChange("requireApproval", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Final Actions */}
              <Card className="rounded-xl border shadow-xl bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 border-[#ff0086]/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Sẵn sàng xuất bản?</h3>
                      <p className="text-sm text-gray-600">Kiểm tra lại thông tin và xuất bản chiến dịch của bạn</p>
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" className="bg-white hover:bg-gray-50">
                        <HiDocumentCheck className="w-4 h-4 mr-2" />
                        Lưu nháp
                      </Button>
                      <Button className="bg-gradient-to-r from-[#ff0086] to-pink-600 text-white hover:shadow-lg transition-all duration-200">
                        <HiSparkles className="w-4 h-4 mr-2" />
                        Xuất bản chiến dịch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      </div>
    </IKKAdminLayout>
  )
}