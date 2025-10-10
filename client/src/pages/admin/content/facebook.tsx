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
  HiOutlineArrowPath as HiArrowPath,
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
  HiOutlineCalendarDays as HiCalendarDays,
  HiOutlineHeart as HiHeart,
  HiOutlineShare as HiShare,
  HiOutlineChatBubbleLeftRight as HiChatBubbleLeftRight,
  HiOutlineGlobeAmericas as HiGlobeAmericas,
  HiOutlinePlay as HiPlay
} from "react-icons/hi2"
import IKKAdminLayout from "@/components/ikk-admin-layout"

interface FacebookContentItem {
  id: string;
  fbPostId: string;
  title: string;
  creator: string;
  fbPage: string;
  type: "post" | "video" | "story" | "reel";
  status: "pending" | "approved" | "rejected" | "synced";
  publishedDate: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  thumbnail?: string;
  campaign?: string;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return { text: "Đã duyệt", color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-50" }
    case "pending":
      return { text: "Đang chờ", color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-50" }
    case "rejected":
      return { text: "Từ chối", color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50" }
    case "synced":
      return { text: "Đã đồng bộ", color: "bg-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-50" }
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
    case "story":
      return <HiChatBubbleLeft className="h-4 w-4" />
    case "reel":
      return <HiPlay className="h-4 w-4" />
    default:
      return <HiDocumentText className="h-4 w-4" />
  }
}

const getContentTypeName = (type: string) => {
  switch (type) {
    case "post":
      return "Posts"
    case "video":
      return "Videos"
    case "story":
      return "Stories"
    case "reel":
      return "Reels"
    default:
      return "Không xác định"
  }
}

export default function AdminContentFacebookPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedContent, setSelectedContent] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [fbPageFilter, setFbPageFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const facebookContent: FacebookContentItem[] = [
    {
      id: "fb-content-1",
      fbPostId: "1234567890123456_987654321098765",
      title: "Review son môi Maybelline SuperStay Matte Ink - Màu 35 Chic",
      creator: "Minh Anh (@minhanh.beauty)",
      fbPage: "Minh Anh Beauty Tips",
      type: "video",
      status: "pending",
      publishedDate: "2025-01-15T10:30:00Z",
      campaign: "Maybelline Winter Collection",
      thumbnail: "/fb-thumbnails/review-son-moi.jpg",
      engagement: {
        likes: 1250,
        comments: 89,
        shares: 34
      }
    },
    {
      id: "fb-content-2", 
      title: "Unboxing và thử nghiệm sản phẩm CHIN-SU",
      fbPostId: "1234567890123456_876543210987654",
      creator: "Thu Hà (@cooking.withha)",
      fbPage: "Cooking With Hà",
      type: "post",
      status: "synced",
      publishedDate: "2025-01-14T14:20:00Z",
      campaign: "CHIN-SU TikTok Challenge",
      engagement: {
        likes: 2800,
        comments: 156,
        shares: 92
      }
    },
    {
      id: "fb-content-3",
      title: "Trải nghiệm ứng dụng TPBank eBank",
      fbPostId: "1234567890123456_765432109876543",
      creator: "Đức Minh (@tech.reviewer)",
      fbPage: "Tech Reviews Vietnam",
      type: "video", 
      status: "approved",
      publishedDate: "2025-01-13T09:15:00Z",
      campaign: "TPBank Digital Banking",
      engagement: {
        likes: 890,
        comments: 45,
        shares: 23
      }
    },
    {
      id: "fb-content-4",
      title: "Check-in tại Highlands Coffee với menu mới",
      fbPostId: "1234567890123456_654321098765432",
      creator: "Lan Hương (@foodie.lanhuong)",
      fbPage: "Foodie Lan Hương",
      type: "story",
      status: "rejected", 
      publishedDate: "2025-01-12T16:45:00Z",
      campaign: "Highlands Winter Menu",
      engagement: {
        likes: 420,
        comments: 12,
        shares: 8
      }
    },
    {
      id: "fb-content-5",
      title: "OOTD với trang phục từ Zara Collection",
      fbPostId: "1234567890123456_543210987654321",
      creator: "Phương Linh (@fashion.phuonglinh)",
      fbPage: "Fashion Phương Linh",
      type: "reel",
      status: "pending",
      publishedDate: "2025-01-15T11:20:00Z", 
      campaign: "Zara Spring Fashion",
      engagement: {
        likes: 1650,
        comments: 78,
        shares: 45
      }
    },
    {
      id: "fb-content-6",
      title: "Grab ride experience và ưu đãi mới",
      fbPostId: "1234567890123456_432109876543210",
      creator: "Hoàng Anh (@hoanganh.travels)",
      fbPage: "Hoàng Anh Travels",
      type: "post",
      status: "pending",
      publishedDate: "2025-01-15T08:30:00Z",
      campaign: "Grab Promo Campaign",
      engagement: {
        likes: 920,
        comments: 31,
        shares: 19
      }
    }
  ]

  const stats = useMemo(() => {
    const total = facebookContent.length
    const posts = facebookContent.filter(item => item.type === "post").length
    const videos = facebookContent.filter(item => item.type === "video").length
    const stories = facebookContent.filter(item => item.type === "story").length
    const reels = facebookContent.filter(item => item.type === "reel").length
    const pending = facebookContent.filter(item => item.status === "pending").length
    const approved = facebookContent.filter(item => item.status === "approved").length
    const synced = facebookContent.filter(item => item.status === "synced").length
    const rejected = facebookContent.filter(item => item.status === "rejected").length
    
    return { total, posts, videos, stories, reels, pending, approved, synced, rejected }
  }, [facebookContent])

  const filteredContent = useMemo(() => {
    let filtered = facebookContent

    // Filter by active tab
    if (activeTab !== "all") {
      filtered = filtered.filter(item => item.type === activeTab)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fbPage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.campaign && item.campaign.toLowerCase().includes(searchQuery.toLowerCase()))
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

    // Filter by Facebook page
    if (fbPageFilter !== "all") {
      filtered = filtered.filter(item => item.fbPage === fbPageFilter)
    }

    return filtered
  }, [facebookContent, activeTab, searchQuery, statusFilter, typeFilter, fbPageFilter])

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

  const handleSyncFacebook = async () => {
    setIsSyncing(true)
    // Simulate Facebook sync API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsSyncing(false)
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

  const formatEngagement = (engagement: { likes: number; comments: number; shares: number }) => {
    return `${engagement.likes + engagement.comments + engagement.shares} tương tác`
  }

  return (
    <IKKAdminLayout>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="page-title">
              Nội dung Facebook
            </h1>
            <p className="text-muted-foreground" data-testid="page-description">
              Quản lý và kiểm duyệt nội dung Facebook từ các KOC
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
              data-testid="button-sync-facebook"
              disabled={isSyncing}
              onClick={handleSyncFacebook}
            >
              <HiArrowPath className={`h-5 w-5 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? "Đang đồng bộ..." : "Đồng bộ Facebook"}
            </Button>
          </div>
        </div>

        {/* Facebook Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-posts">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiDocumentText className="h-5 w-5 mr-2 text-blue-500" />
                Tổng Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900" data-testid="text-posts-count">
                {stats.posts}
              </div>
              <p className="text-xs text-gray-500 mt-1">Bài viết Facebook</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-videos">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiVideoCamera className="h-5 w-5 mr-2 text-red-500" />
                Tổng Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900" data-testid="text-videos-count">
                {stats.videos}
              </div>
              <p className="text-xs text-gray-500 mt-1">Video Facebook</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-stories">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiChatBubbleLeft className="h-5 w-5 mr-2 text-purple-500" />
                Tổng Stories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900" data-testid="text-stories-count">
                {stats.stories}
              </div>
              <p className="text-xs text-gray-500 mt-1">Facebook Stories</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-reels">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiPlay className="h-5 w-5 mr-2 text-pink-500" />
                Tổng Reels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900" data-testid="text-reels-count">
                {stats.reels}
              </div>
              <p className="text-xs text-gray-500 mt-1">Facebook Reels</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Filters and Search */}
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo tiêu đề, KOC, trang Facebook..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter} data-testid="select-status-filter">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="pending">Đang chờ</SelectItem>
                    <SelectItem value="approved">Đã duyệt</SelectItem>
                    <SelectItem value="synced">Đã đồng bộ</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter} data-testid="select-type-filter">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    <SelectItem value="post">Posts</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="story">Stories</SelectItem>
                    <SelectItem value="reel">Reels</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={fbPageFilter} onValueChange={setFbPageFilter} data-testid="select-page-filter">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trang Facebook" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trang</SelectItem>
                    <SelectItem value="Minh Anh Beauty Tips">Minh Anh Beauty Tips</SelectItem>
                    <SelectItem value="Cooking With Hà">Cooking With Hà</SelectItem>
                    <SelectItem value="Tech Reviews Vietnam">Tech Reviews Vietnam</SelectItem>
                    <SelectItem value="Foodie Lan Hương">Foodie Lan Hương</SelectItem>
                    <SelectItem value="Fashion Phương Linh">Fashion Phương Linh</SelectItem>
                    <SelectItem value="Hoàng Anh Travels">Hoàng Anh Travels</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5" data-testid="tabs-list">
            <TabsTrigger value="all" data-testid="tab-all">
              Tất cả ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="post" data-testid="tab-posts">
              Posts ({stats.posts})
            </TabsTrigger>
            <TabsTrigger value="video" data-testid="tab-videos">
              Videos ({stats.videos})
            </TabsTrigger>
            <TabsTrigger value="story" data-testid="tab-stories">
              Stories ({stats.stories})
            </TabsTrigger>
            <TabsTrigger value="reel" data-testid="tab-reels">
              Reels ({stats.reels})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Danh sách nội dung Facebook
                  </CardTitle>
                  {selectedContent.length > 0 && (
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        Đã chọn {selectedContent.length} nội dung
                      </span>
                      <Button
                        size="sm"
                        className="bg-[#ff0086] hover:bg-[#e6007a]"
                        disabled={isLoading}
                        onClick={handleBulkApprove}
                        data-testid="button-bulk-approve"
                      >
                        <HiCheck className="h-4 w-4 mr-1" />
                        {isLoading ? "Đang xử lý..." : "Phê duyệt"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
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
                        <TableHead className="min-w-80">Nội dung</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead>Trang Facebook</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Tương tác</TableHead>
                        <TableHead>Ngày đăng</TableHead>
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
                              <div className="space-y-1">
                                <div className="font-medium text-gray-900 line-clamp-2" data-testid={`text-title-${item.id}`}>
                                  {item.title}
                                </div>
                                <div className="text-sm text-gray-600" data-testid={`text-creator-${item.id}`}>
                                  {item.creator}
                                </div>
                                {item.campaign && (
                                  <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block">
                                    {item.campaign}
                                  </div>
                                )}
                                <div className="text-xs text-gray-500" data-testid={`text-fb-post-id-${item.id}`}>
                                  ID: {item.fbPostId}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {getContentTypeIcon(item.type)}
                                <span className="text-sm" data-testid={`text-type-${item.id}`}>
                                  {getContentTypeName(item.type)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-900" data-testid={`text-fb-page-${item.id}`}>
                                {item.fbPage}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="secondary"
                                className={`${statusBadge.bgColor} ${statusBadge.textColor} border-0`}
                                data-testid={`badge-status-${item.id}`}
                              >
                                {statusBadge.text}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm space-y-1">
                                <div className="flex items-center space-x-1">
                                  <HiHeart className="h-3 w-3 text-red-500" />
                                  <span>{item.engagement.likes.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <HiChatBubbleLeftRight className="h-3 w-3 text-blue-500" />
                                  <span>{item.engagement.comments}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <HiShare className="h-3 w-3 text-green-500" />
                                  <span>{item.engagement.shares}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-600" data-testid={`text-date-${item.id}`}>
                                {formatDate(item.publishedDate)}
                              </div>
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
                                    <HiEye className="mr-2 h-4 w-4" />
                                    Xem chi tiết
                                  </DropdownMenuItem>
                                  {item.status === "pending" && (
                                    <>
                                      <DropdownMenuItem data-testid={`action-approve-${item.id}`}>
                                        <HiCheck className="mr-2 h-4 w-4" />
                                        Phê duyệt
                                      </DropdownMenuItem>
                                      <DropdownMenuItem data-testid={`action-reject-${item.id}`}>
                                        <HiXMark className="mr-2 h-4 w-4" />
                                        Từ chối
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {item.status === "approved" && (
                                    <DropdownMenuItem data-testid={`action-sync-${item.id}`}>
                                      <HiArrowPath className="mr-2 h-4 w-4" />
                                      Đồng bộ
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem data-testid={`action-facebook-view-${item.id}`}>
                                    <HiGlobeAmericas className="mr-2 h-4 w-4" />
                                    Xem trên Facebook
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                {filteredContent.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-500 text-sm" data-testid="text-no-results">
                      Không tìm thấy nội dung nào phù hợp với bộ lọc hiện tại.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </IKKAdminLayout>
  )
}