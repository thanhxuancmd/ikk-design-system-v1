import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  HiOutlineDocumentText as HiDocumentText,
  HiOutlineClock as HiClock,
  HiOutlineCheckCircle as HiCheckCircle,
  HiOutlineExclamationTriangle as HiExclamationTriangle,
} from "react-icons/hi2"
import IKKAdminLayout from "@/components/ikk-admin-layout"
import { ContentModerationQueue, type ModerationItem, type ModerationStatus, type ContentType } from "@/components/apple"

interface ContentItem {
  id: string
  title: string
  creator: string
  type: "post" | "video" | "image" | "story"
  status: "pending" | "approved" | "rejected"
  submittedDate: string
  campaign: string
  thumbnail?: string
  views?: number
  engagement?: string
  reason?: string
}

export default function AdminContentPage() {
  const [statusFilter, setStatusFilter] = useState<ModerationStatus | "all">("all")

  const contentItems: ContentItem[] = [
    {
      id: "content-1",
      title: "Review son môi Maybelline SuperStay Matte Ink - Màu 35 Chic",
      creator: "Minh Anh (@minhanh.beauty)",
      type: "video",
      status: "pending",
      submittedDate: "2025-01-15T10:30:00Z",
      campaign: "Maybelline Winter Collection",
      thumbnail: "/thumbnails/review-son-moi.jpg",
      views: 1250,
      engagement: "12.5%"
    },
    {
      id: "content-2", 
      title: "Unboxing và thử nghiệm sản phẩm CHIN-SU",
      creator: "Thu Hà (@cooking.withha)",
      type: "post",
      status: "approved",
      submittedDate: "2025-01-14T14:20:00Z",
      campaign: "CHIN-SU TikTok Challenge",
      views: 2800,
      engagement: "18.2%"
    },
    {
      id: "content-3",
      title: "Trải nghiệm ứng dụng TPBank eBank",
      creator: "Đức Minh (@tech.reviewer)",
      type: "video", 
      status: "approved",
      submittedDate: "2025-01-13T09:15:00Z",
      campaign: "TPBank Digital Banking",
      views: 890,
      engagement: "8.7%"
    },
    {
      id: "content-4",
      title: "Check-in tại Highlands Coffee với menu mới",
      creator: "Lan Hương (@foodie.lanhuong)",
      type: "story",
      status: "rejected", 
      submittedDate: "2025-01-12T16:45:00Z",
      campaign: "Highlands Winter Menu",
      reason: "Không tuân thủ hướng dẫn thương hiệu"
    },
    {
      id: "content-5",
      title: "OOTD với trang phục từ Zara Collection",
      creator: "Phương Linh (@fashion.phuonglinh)",
      type: "image",
      status: "pending",
      submittedDate: "2025-01-15T11:20:00Z", 
      campaign: "Zara Spring Fashion",
      views: 650,
      engagement: "15.3%"
    },
    {
      id: "content-6",
      title: "Grab ride experience và ưu đãi mới",
      creator: "Hoàng Anh (@hoanganh.travels)",
      type: "post",
      status: "pending",
      submittedDate: "2025-01-15T08:30:00Z",
      campaign: "Grab Promo Campaign",
      views: 420,
      engagement: "9.1%"
    }
  ]

  const stats = useMemo(() => {
    const total = contentItems.length
    const pending = contentItems.filter(item => item.status === "pending").length
    const approved = contentItems.filter(item => item.status === "approved").length
    const rejected = contentItems.filter(item => item.status === "rejected").length
    
    return { total, pending, approved, rejected }
  }, [contentItems])

  const mapContentType = (type: ContentItem['type']): ContentType => {
    switch (type) {
      case "video":
        return "stream"
      case "post":
        return "post"
      case "image":
        return "post"
      case "story":
        return "post"
      default:
        return "post"
    }
  }

  const moderationItems: ModerationItem[] = useMemo(() => {
    let filtered = contentItems

    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter)
    }

    return filtered.map(item => ({
      id: item.id,
      type: mapContentType(item.type),
      content: item.title,
      preview: item.thumbnail,
      user: {
        id: item.id,
        name: item.creator,
        avatar: undefined
      },
      timestamp: item.submittedDate,
      status: item.status,
      reason: item.reason
    }))
  }, [contentItems, statusFilter])

  const handleApprove = (id: string) => {
    console.log('Approved:', id)
  }

  const handleReject = (id: string, reason?: string) => {
    console.log('Rejected:', id, 'Reason:', reason)
  }

  return (
    <IKKAdminLayout>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="page-title">
              Quản lý nội dung
            </h1>
            <p className="text-muted-foreground" data-testid="page-description">
              Kiểm duyệt và quản lý nội dung từ KOC và Affiliate
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-content">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiDocumentText className="h-5 w-5 mr-2 text-gray-400" />
                Tổng nội dung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900" data-testid="text-total-count">
                {stats.total}
              </div>
              <p className="text-xs text-gray-500 mt-1">Tất cả nội dung</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-pending-content">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiClock className="h-5 w-5 mr-2 text-yellow-500" />
                Đang chờ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600" data-testid="text-pending-count">
                {stats.pending}
              </div>
              <p className="text-xs text-gray-500 mt-1">Chờ kiểm duyệt</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-approved-content">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiCheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Đã duyệt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600" data-testid="text-approved-count">
                {stats.approved}
              </div>
              <p className="text-xs text-gray-500 mt-1">Nội dung hợp lệ</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-rejected-content">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiExclamationTriangle className="h-5 w-5 mr-2 text-red-500" />
                Từ chối
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600" data-testid="text-rejected-count">
                {stats.rejected}
              </div>
              <p className="text-xs text-gray-500 mt-1">Vi phạm quy định</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Moderation Queue */}
        <ContentModerationQueue
          items={moderationItems}
          onApprove={handleApprove}
          onReject={handleReject}
          onFilterChange={(filter) => setStatusFilter(filter)}
          currentFilter={statusFilter}
        />
      </div>
    </IKKAdminLayout>
  )
}
