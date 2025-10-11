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
  HiOutlineVideoCamera as HiVideoCamera,
  HiOutlinePlay as HiPlay,
  HiOutlineSignal as HiSignal,
  HiOutlineHashtag as HiHashtag,
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
  HiOutlineBookmark as HiBookmark,
  HiOutlineStar as HiStar
} from "react-icons/hi2"
import IKKAdminLayout from "@/components/ikk-admin-layout"

interface TikTokContentItem {
  id: string;
  tiktokVideoId: string;
  title: string;
  creator: string;
  tikTokAccount: string;
  type: "video" | "short" | "live" | "challenge";
  status: "pending" | "approved" | "rejected" | "synced" | "trending";
  publishedDate: string;
  engagement: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  hashtags: string[];
  duration: number;
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
    case "trending":
      return { text: "Trending", color: "bg-purple-500", textColor: "text-purple-700", bgColor: "bg-purple-50" }
    default:
      return { text: "Không xác định", color: "bg-gray-400", textColor: "text-gray-600", bgColor: "bg-gray-50" }
  }
}

const getContentTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return <HiVideoCamera className="h-4 w-4" />
    case "short":
      return <HiPlay className="h-4 w-4" />
    case "live":
      return <HiSignal className="h-4 w-4" />
    case "challenge":
      return <HiHashtag className="h-4 w-4" />
    default:
      return <HiVideoCamera className="h-4 w-4" />
  }
}

const getContentTypeName = (type: string) => {
  switch (type) {
    case "video":
      return "Videos"
    case "short":
      return "Shorts"
    case "live":
      return "Live Streams"
    case "challenge":
      return "Challenges"
    default:
      return "Không xác định"
  }
}

export default function AdminContentTikTokPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedContent, setSelectedContent] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [tikTokAccountFilter, setTikTokAccountFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const tiktokContent: TikTokContentItem[] = [
    {
      id: "tiktok-content-1",
      tiktokVideoId: "7180123456789012345",
      title: "Makeup transformation với son lì L'Oreal Paris #transformation #makeup",
      creator: "Beauty Guru Lan (@beautyguru.lan)",
      tikTokAccount: "@beautyguru.lan",
      type: "video",
      status: "trending",
      publishedDate: "2025-01-15T14:30:00Z",
      campaign: "L'Oreal Paris Lipstick Campaign",
      thumbnail: "/tiktok-thumbnails/makeup-transformation.jpg",
      duration: 45,
      hashtags: ["#transformation", "#makeup", "#lorealparís", "#beauty"],
      engagement: {
        views: 125000,
        likes: 8500,
        comments: 234,
        shares: 156,
        saves: 890
      }
    },
    {
      id: "tiktok-content-2",
      tiktokVideoId: "7180234567890123456",
      title: "Nấu ăn cùng CHIN-SU - Món gà rim mắm #recipe #cooking #chinsu",
      creator: "Chef Minh (@chef.minh.pro)",
      tikTokAccount: "@chef.minh.pro",
      type: "video",
      status: "approved",
      publishedDate: "2025-01-14T16:20:00Z",
      campaign: "CHIN-SU Cooking Challenge",
      duration: 60,
      hashtags: ["#recipe", "#cooking", "#chinsu", "#food"],
      engagement: {
        views: 89000,
        likes: 5600,
        comments: 178,
        shares: 89,
        saves: 456
      }
    },
    {
      id: "tiktok-content-3",
      tiktokVideoId: "7180345678901234567",
      title: "TPBank eBank review - Giao dịch siêu tốc #fintech #banking",
      creator: "Tech Reviewer Nam (@tech.nam)",
      tikTokAccount: "@tech.nam",
      type: "short",
      status: "synced",
      publishedDate: "2025-01-13T11:15:00Z",
      campaign: "TPBank Digital Banking",
      duration: 15,
      hashtags: ["#fintech", "#banking", "#tpbank", "#review"],
      engagement: {
        views: 45000,
        likes: 2300,
        comments: 89,
        shares: 34,
        saves: 167
      }
    },
    {
      id: "tiktok-content-4",
      tiktokVideoId: "7180456789012345678",
      title: "Highlands Coffee challenge - Thử toàn bộ menu mới #coffee #highlands",
      creator: "Foodie Hằng (@foodie.hang)",
      tikTokAccount: "@foodie.hang",
      type: "challenge",
      status: "pending",
      publishedDate: "2025-01-15T09:45:00Z",
      campaign: "Highlands Winter Menu Challenge",
      duration: 30,
      hashtags: ["#coffee", "#highlands", "#challenge", "#foodie"],
      engagement: {
        views: 67000,
        likes: 3400,
        comments: 125,
        shares: 67,
        saves: 234
      }
    },
    {
      id: "tiktok-content-5",
      tiktokVideoId: "7180567890123456789",
      title: "OOTD Zara haul - Mix&match outfits #fashion #zara #ootd",
      creator: "Fashion Linh (@fashion.linh)",
      tikTokAccount: "@fashion.linh",
      type: "video",
      status: "pending",
      publishedDate: "2025-01-15T13:20:00Z",
      campaign: "Zara Spring Fashion Campaign",
      duration: 55,
      hashtags: ["#fashion", "#zara", "#ootd", "#style"],
      engagement: {
        views: 156000,
        likes: 12000,
        comments: 456,
        shares: 234,
        saves: 1200
      }
    },
    {
      id: "tiktok-content-6",
      tiktokVideoId: "7180678901234567890",
      title: "Grab ride experience live stream #grab #livereview",
      creator: "Travel Blogger Đức (@travel.duc)",
      tikTokAccount: "@travel.duc",
      type: "live",
      status: "rejected",
      publishedDate: "2025-01-14T18:30:00Z",
      campaign: "Grab Live Experience Campaign",
      duration: 120,
      hashtags: ["#grab", "#livereview", "#travel", "#experience"],
      engagement: {
        views: 23000,
        likes: 890,
        comments: 67,
        shares: 23,
        saves: 45
      }
    }
  ]

  const stats = useMemo(() => {
    const total = tiktokContent.length
    const videos = tiktokContent.filter(item => item.type === "video").length
    const shorts = tiktokContent.filter(item => item.type === "short").length
    const lives = tiktokContent.filter(item => item.type === "live").length
    const challenges = tiktokContent.filter(item => item.type === "challenge").length
    const pending = tiktokContent.filter(item => item.status === "pending").length
    const approved = tiktokContent.filter(item => item.status === "approved").length
    const synced = tiktokContent.filter(item => item.status === "synced").length
    const rejected = tiktokContent.filter(item => item.status === "rejected").length
    const trending = tiktokContent.filter(item => item.status === "trending").length
    
    return { total, videos, shorts, lives, challenges, pending, approved, synced, rejected, trending }
  }, [tiktokContent])

  const filteredContent = useMemo(() => {
    let filtered = tiktokContent

    // Filter by active tab
    if (activeTab !== "all") {
      filtered = filtered.filter(item => item.type === activeTab)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tikTokAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
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

    // Filter by TikTok account
    if (tikTokAccountFilter !== "all") {
      filtered = filtered.filter(item => item.tikTokAccount === tikTokAccountFilter)
    }

    return filtered
  }, [tiktokContent, activeTab, searchQuery, statusFilter, typeFilter, tikTokAccountFilter])

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

  const handleSyncTikTok = async () => {
    setIsSyncing(true)
    // Simulate TikTok sync API call
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

  const formatDuration = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`
    } else {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  return (
    <IKKAdminLayout>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="page-title">
              Quản lý nội dung TikTok
            </h1>
            <p className="text-muted-foreground" data-testid="page-description">
              Quản lý và kiểm duyệt nội dung TikTok từ các KOC và Affiliate
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
              data-testid="button-sync-tiktok"
              disabled={isSyncing}
              onClick={handleSyncTikTok}
            >
              <HiArrowPath className={`h-5 w-5 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? "Đang đồng bộ..." : "Đồng bộ TikTok"}
            </Button>
          </div>
        </div>

        {/* TikTok Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <p className="text-xs text-gray-500 mt-1">Video TikTok</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-shorts">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiPlay className="h-5 w-5 mr-2 text-blue-500" />
                Tổng Shorts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900" data-testid="text-shorts-count">
                {stats.shorts}
              </div>
              <p className="text-xs text-gray-500 mt-1">TikTok Shorts</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-lives">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiSignal className="h-5 w-5 mr-2 text-green-500" />
                Tổng Live Streams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900" data-testid="text-lives-count">
                {stats.lives}
              </div>
              <p className="text-xs text-gray-500 mt-1">Live Streams</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-challenges">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <HiHashtag className="h-5 w-5 mr-2 text-purple-500" />
                Tổng Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900" data-testid="text-challenges-count">
                {stats.challenges}
              </div>
              <p className="text-xs text-gray-500 mt-1">TikTok Challenges</p>
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
                  placeholder="Tìm kiếm theo tiêu đề, KOC, tài khoản TikTok, hashtag..."
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
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter} data-testid="select-type-filter">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="short">Shorts</SelectItem>
                    <SelectItem value="live">Live Streams</SelectItem>
                    <SelectItem value="challenge">Challenges</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tikTokAccountFilter} onValueChange={setTikTokAccountFilter} data-testid="select-account-filter">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tài khoản TikTok" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả tài khoản</SelectItem>
                    <SelectItem value="@beautyguru.lan">@beautyguru.lan</SelectItem>
                    <SelectItem value="@chef.minh.pro">@chef.minh.pro</SelectItem>
                    <SelectItem value="@tech.nam">@tech.nam</SelectItem>
                    <SelectItem value="@foodie.hang">@foodie.hang</SelectItem>
                    <SelectItem value="@fashion.linh">@fashion.linh</SelectItem>
                    <SelectItem value="@travel.duc">@travel.duc</SelectItem>
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
            <TabsTrigger value="video" data-testid="tab-videos">
              Videos ({stats.videos})
            </TabsTrigger>
            <TabsTrigger value="short" data-testid="tab-shorts">
              Shorts ({stats.shorts})
            </TabsTrigger>
            <TabsTrigger value="live" data-testid="tab-lives">
              Live Streams ({stats.lives})
            </TabsTrigger>
            <TabsTrigger value="challenge" data-testid="tab-challenges">
              Challenges ({stats.challenges})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Danh sách nội dung TikTok
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
                        <TableHead>Tài khoản TikTok</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Tương tác</TableHead>
                        <TableHead>Thời lượng</TableHead>
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
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {item.hashtags.slice(0, 3).map((hashtag, index) => (
                                    <span key={index} className="text-xs text-purple-600 bg-purple-50 px-1 py-0.5 rounded">
                                      {hashtag}
                                    </span>
                                  ))}
                                  {item.hashtags.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                      +{item.hashtags.length - 3}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500" data-testid={`text-tiktok-video-id-${item.id}`}>
                                  ID: {item.tiktokVideoId}
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
                              <div className="text-sm text-gray-900" data-testid={`text-tiktok-account-${item.id}`}>
                                {item.tikTokAccount}
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
                                  <HiEye className="h-3 w-3 text-gray-500" />
                                  <span className="font-medium">{formatViews(item.engagement.views)}</span>
                                </div>
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
                                <div className="flex items-center space-x-1">
                                  <HiBookmark className="h-3 w-3 text-yellow-500" />
                                  <span>{item.engagement.saves}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-600" data-testid={`text-duration-${item.id}`}>
                                {formatDuration(item.duration)}
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
                                  {(item.status === "approved" || item.status === "synced") && (
                                    <DropdownMenuItem data-testid={`action-promote-trending-${item.id}`}>
                                      <HiStar className="mr-2 h-4 w-4" />
                                      Đẩy lên Trending
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem data-testid={`action-tiktok-view-${item.id}`}>
                                    <HiGlobeAmericas className="mr-2 h-4 w-4" />
                                    Xem trên TikTok
                                  </DropdownMenuItem>
                                  <DropdownMenuItem data-testid={`action-hashtag-analysis-${item.id}`}>
                                    <HiHashtag className="mr-2 h-4 w-4" />
                                    Phân tích Hashtag
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