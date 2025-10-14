"use client"

import { useState } from "react"
import { AppleInput, AppleSelect, AppleButton } from "@/components/apple"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
        <div className="max-w-7xl mx-auto px-4 mb-12">
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
              <AppleButton variant="secondary" data-testid="button-save-draft">
                <HiDocumentCheck className="w-4 h-4 mr-2" />
                Lưu nháp
              </AppleButton>
              <AppleButton variant="primary" data-testid="button-publish-campaign">
                <HiPaperAirplane className="w-4 h-4 mr-2" />
                Xuất bản
              </AppleButton>
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
                  <AppleInput
                    label="Tiêu đề chiến dịch *"
                    name="title"
                    placeholder="VD: Review son môi Maybelline SuperStay Matte Ink"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                  
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
                    <AppleSelect
                      label="Danh mục *"
                      name="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      options={[
                        { value: "", label: "Chọn danh mục" },
                        ...categories.map(cat => ({ value: cat, label: cat }))
                      ]}
                    />

                    <AppleInput
                      label="Thương hiệu *"
                      name="brand"
                      placeholder="Tên thương hiệu"
                      value={formData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                    />

                    <AppleSelect
                      label="Loại chiến dịch *"
                      name="campaignType"
                      value={formData.campaignType}
                      onChange={(e) => handleInputChange("campaignType", e.target.value)}
                      options={[
                        { value: "", label: "Chọn loại" },
                        ...campaignTypes.map(type => ({ value: type, label: type }))
                      ]}
                    />
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
                    <AppleSelect
                      label="Giới tính"
                      name="targetGender"
                      value={formData.targetGender}
                      onChange={(e) => handleInputChange("targetGender", e.target.value)}
                      options={[
                        { value: "", label: "Chọn giới tính" },
                        { value: "all", label: "Tất cả" },
                        { value: "male", label: "Nam" },
                        { value: "female", label: "Nữ" }
                      ]}
                    />
                    
                    <AppleInput
                      label="Tuổi từ"
                      name="ageMin"
                      type="number"
                      placeholder="18"
                      value={formData.targetAgeMin}
                      onChange={(e) => handleInputChange("targetAgeMin", e.target.value)}
                    />
                    
                    <AppleInput
                      label="Đến tuổi"
                      name="ageMax"
                      type="number"
                      placeholder="35"
                      value={formData.targetAgeMax}
                      onChange={(e) => handleInputChange("targetAgeMax", e.target.value)}
                    />
                    
                    <AppleSelect
                      label="Followers tối thiểu"
                      name="targetFollowers"
                      value={formData.targetFollowers}
                      onChange={(e) => handleInputChange("targetFollowers", e.target.value)}
                      options={[
                        { value: "", label: "Chọn yêu cầu" },
                        { value: "any", label: "Bất kỳ" },
                        { value: "1k", label: "1K+" },
                        { value: "5k", label: "5K+" },
                        { value: "10k", label: "10K+" },
                        { value: "50k", label: "50K+" },
                        { value: "100k", label: "100K+" }
                      ]}
                    />
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
                    <AppleSelect
                      label="Định dạng nội dung"
                      name="contentType"
                      value={formData.contentType}
                      onChange={(e) => handleInputChange("contentType", e.target.value)}
                      options={[
                        { value: "", label: "Chọn định dạng" },
                        { value: "video", label: "Video (15s-60s)" },
                        { value: "photo", label: "Hình ảnh" },
                        { value: "story", label: "Story" },
                        { value: "post", label: "Post thường" },
                        { value: "livestream", label: "Livestream" },
                        { value: "reel", label: "Reel/Short" }
                      ]}
                    />

                    <AppleSelect
                      label="Thời gian đăng bài"
                      name="postingSchedule"
                      value={formData.postingSchedule}
                      onChange={(e) => handleInputChange("postingSchedule", e.target.value)}
                      options={[
                        { value: "", label: "Chọn thời gian" },
                        { value: "flexible", label: "Linh hoạt" },
                        { value: "peak", label: "Giờ vàng (19:00-22:00)" },
                        { value: "morning", label: "Buổi sáng (6:00-10:00)" },
                        { value: "afternoon", label: "Buổi trưa (12:00-14:00)" },
                        { value: "evening", label: "Buổi tối (18:00-21:00)" }
                      ]}
                    />
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
                    <AppleInput
                      label="Hashtag yêu cầu"
                      name="hashtags"
                      placeholder="#MaybellineVietnam #SuperStayMatteInk"
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
                    <AppleInput
                      label="Tổng ngân sách (VNĐ) *"
                      name="budget"
                      type="number"
                      placeholder="1000000"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                    />

                    <AppleSelect
                      label="Loại thưởng"
                      name="rewardType"
                      value={formData.rewardType}
                      onChange={(e) => handleInputChange("rewardType", e.target.value)}
                      options={[
                        { value: "", label: "Chọn loại thưởng" },
                        { value: "cash", label: "Tiền mặt" },
                        { value: "product", label: "Sản phẩm" },
                        { value: "voucher", label: "Voucher" },
                        { value: "combo", label: "Tiền + Sản phẩm" }
                      ]}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <AppleInput
                        label="Thưởng/KOC (VNĐ)"
                        name="rewardAmount"
                        type="number"
                        placeholder="200000"
                        value={formData.rewardAmount}
                        onChange={(e) => handleInputChange("rewardAmount", e.target.value)}
                      />
                      
                      <AppleInput
                        label="Số KOC tối đa"
                        name="kocLimit"
                        type="number"
                        placeholder="50"
                        value={formData.kocLimit}
                        onChange={(e) => handleInputChange("kocLimit", e.target.value)}
                      />
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
                      <AppleInput
                        label="Ngày bắt đầu *"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                      />
                      
                      <AppleInput
                        label="Ngày kết thúc *"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <AppleInput
                        label="Hạn đăng ký *"
                        name="applicationDeadline"
                        type="date"
                        value={formData.applicationDeadline}
                        onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                      />
                      
                      <AppleInput
                        label="Hạn nộp nội dung *"
                        name="contentDeadline"
                        type="date"
                        value={formData.contentDeadline}
                        onChange={(e) => handleInputChange("contentDeadline", e.target.value)}
                      />
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
                      <AppleButton variant="secondary">
                        <HiDocumentCheck className="w-4 h-4 mr-2" />
                        Lưu nháp
                      </AppleButton>
                      <AppleButton variant="primary">
                        <HiSparkles className="w-4 h-4 mr-2" />
                        Xuất bản chiến dịch
                      </AppleButton>
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