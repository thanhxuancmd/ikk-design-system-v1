import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import {
  HiOutlineFunnel as HiFunnel,
  HiOutlineCheck as HiCheck,
  HiOutlineEye as HiEye,
  HiOutlineXMark as HiXMark,
  HiOutlineMagnifyingGlass as HiMagnifyingGlass,
  HiOutlineEllipsisHorizontal as HiEllipsisHorizontal,
  HiOutlineDocumentText as HiDocumentText,
  HiOutlinePhoto as HiPhoto,
  HiOutlineVideoCamera as HiVideoCamera,
  HiOutlineChatBubbleLeft as HiChatBubbleLeft,
  HiOutlineUsers as HiUsers,
  HiOutlineArrowTrendingUp as HiArrowTrendingUp,
  HiOutlineClock as HiClock,
  HiOutlineCheckCircle as HiCheckCircle,
  HiOutlineExclamationTriangle as HiExclamationTriangle,
  HiOutlinePlayCircle as HiPlayCircle,
  HiOutlineDocumentCheck as HiDocumentCheck,
  HiOutlineFlag as HiFlag,
  HiOutlineCalendarDays as HiCalendarDays
} from "react-icons/hi2"
import IKKAdminLayout from "@/components/ikk-admin-layout"

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

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return { text: "Đã duyệt", color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-50" }
    case "pending":
      return { text: "Đang chờ", color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-50" }
    case "rejected":
      return { text: "Từ chối", color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50" }
    default:
      return { text: "Không xác định", color: "bg-gray-400", textColor: "text-gray-600", bgColor: "bg-gray-50" }
  }
}

const getContentTypeIcon = (type: string) => {
  switch (type) {
    case "post":
      return <HiDocumentText className="h-4 w-4" />
    case "video":
      return <HiVideoCamera className="h-4 w-4" />
    case "image":
      return <HiPhoto className="h-4 w-4" />
    case "story":
      return <HiChatBubbleLeft className="h-4 w-4" />
    default:
      return <HiDocumentText className="h-4 w-4" />
  }
}

const getContentTypeName = (type: string) => {
  switch (type) {
    case "post":
      return "Bài viết"
    case "video":
      return "Video"
    case "image":
      return "Hình ảnh"
    case "story":
      return "Story"
    default:
      return "Không xác định"
  }
}

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedContent, setSelectedContent] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

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

  const filteredContent = useMemo(() => {
    let filtered = contentItems

    // Filter by active tab
    if (activeTab !== "all") {
      filtered = filtered.filter(item => item.type === activeTab)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.campaign.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter)
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter(item => item.type === typeFilter)
    }

    return filtered
  }, [contentItems, activeTab, searchQuery, statusFilter, typeFilter])

  const handleSelectAll = () => {
    if (selectedContent.length === filteredContent.length) {
      setSelectedContent([])
    } else {
      setSelectedContent(filteredContent.map(item => item.id))
    }
  }

  const handleSelectContent = (contentId: string) => {
    setSelectedContent(prev =>
      prev.includes(contentId)
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    )
  }

  const handleBulkApprove = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSelectedContent([])
    setIsLoading(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              data-testid="button-filter"
            >
              <HiFunnel className="h-5 w-5 mr-2" />
              Bộ lọc
            </Button>
            <Button
              className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors"
              data-testid="button-bulk-approve"
              disabled={selectedContent.length === 0 || isLoading}
              onClick={handleBulkApprove}
            >
              <HiCheck className="h-5 w-5 mr-2" />
              {isLoading ? "Đang xử lý..." : "Phê duyệt hàng loạt"}
            </Button>
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

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <HiMagnifyingGlass className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm nội dung, creator, hoặc chiến dịch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-content"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48" data-testid="select-status-filter">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="pending">Đang chờ</SelectItem>
              <SelectItem value="approved">Đã duyệt</SelectItem>
              <SelectItem value="rejected">Từ chối</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48" data-testid="select-type-filter">
              <SelectValue placeholder="Loại nội dung" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="post">Bài viết</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="image">Hình ảnh</SelectItem>
              <SelectItem value="story">Story</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5" data-testid="tabs-content-types">
            <TabsTrigger value="all" data-testid="tab-all">
              <HiDocumentCheck className="h-4 w-4 mr-2" />
              Tất cả ({contentItems.length})
            </TabsTrigger>
            <TabsTrigger value="post" data-testid="tab-posts">
              <HiDocumentText className="h-4 w-4 mr-2" />
              Bài viết ({contentItems.filter(item => item.type === "post").length})
            </TabsTrigger>
            <TabsTrigger value="video" data-testid="tab-videos">
              <HiVideoCamera className="h-4 w-4 mr-2" />
              Video ({contentItems.filter(item => item.type === "video").length})
            </TabsTrigger>
            <TabsTrigger value="image" data-testid="tab-images">
              <HiPhoto className="h-4 w-4 mr-2" />
              Hình ảnh ({contentItems.filter(item => item.type === "image").length})
            </TabsTrigger>
            <TabsTrigger value="story" data-testid="tab-stories">
              <HiChatBubbleLeft className="h-4 w-4 mr-2" />
              Story ({contentItems.filter(item => item.type === "story").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {/* Content Table */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedContent.length === filteredContent.length && filteredContent.length > 0}
                        onCheckedChange={handleSelectAll}
                        data-testid="checkbox-select-all"
                      />
                    </TableHead>
                    <TableHead>Nội dung</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Chiến dịch</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày gửi</TableHead>
                    <TableHead>Tương tác</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContent.map((item) => {
                    const statusBadge = getStatusBadge(item.status)
                    const isSelected = selectedContent.includes(item.id)

                    return (
                      <TableRow key={item.id} data-testid={`row-content-${item.id}`}>
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleSelectContent(item.id)}
                            data-testid={`checkbox-content-${item.id}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="font-medium text-gray-900 truncate" data-testid={`text-title-${item.id}`}>
                              {item.title}
                            </div>
                            {item.reason && (
                              <div className="text-sm text-red-600 mt-1" data-testid={`text-reason-${item.id}`}>
                                Lý do: {item.reason}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getContentTypeIcon(item.type)}
                            <span className="ml-2 text-sm text-gray-600" data-testid={`text-type-${item.id}`}>
                              {getContentTypeName(item.type)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900" data-testid={`text-creator-${item.id}`}>
                            {item.creator}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600" data-testid={`text-campaign-${item.id}`}>
                            {item.campaign}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${statusBadge.bgColor} ${statusBadge.textColor} border-0`}
                            data-testid={`badge-status-${item.id}`}
                          >
                            {statusBadge.text}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-500" data-testid={`text-date-${item.id}`}>
                            {formatDate(item.submittedDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.views && item.engagement && (
                            <div className="text-sm text-gray-600" data-testid={`text-engagement-${item.id}`}>
                              <div>{item.views.toLocaleString()} views</div>
                              <div>{item.engagement} engagement</div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" data-testid={`button-actions-${item.id}`}>
                                <HiEllipsisHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem data-testid={`action-view-${item.id}`}>
                                <HiEye className="h-4 w-4 mr-2" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              {item.status === "pending" && (
                                <>
                                  <DropdownMenuItem data-testid={`action-approve-${item.id}`}>
                                    <HiCheck className="h-4 w-4 mr-2" />
                                    Phê duyệt
                                  </DropdownMenuItem>
                                  <DropdownMenuItem data-testid={`action-reject-${item.id}`}>
                                    <HiXMark className="h-4 w-4 mr-2" />
                                    Từ chối
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem data-testid={`action-flag-${item.id}`}>
                                <HiFlag className="h-4 w-4 mr-2" />
                                Báo cáo vi phạm
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {filteredContent.length === 0 && (
                <div className="text-center py-12" data-testid="empty-state">
                  <HiDocumentText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Không có nội dung</h3>
                  <p className="text-gray-500">
                    {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                      ? "Không tìm thấy nội dung phù hợp với bộ lọc hiện tại"
                      : "Chưa có nội dung nào được gửi lên"}
                  </p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </IKKAdminLayout>
  )
}