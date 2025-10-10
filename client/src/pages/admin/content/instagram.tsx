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
  HiOutlinePlay as HiPlay,
  HiOutlineBookmark as HiBookmark,
  HiOutlineHashtag as HiHashtag,
  HiOutlineMapPin as HiMapPin,
  HiOutlineSignal as HiSignal,
  HiOutlineStar,
  HiOutlineRocketLaunch as HiRocketLaunch
} from "react-icons/hi2"
import IKKAdminLayout from "@/components/ikk-admin-layout"

interface InstagramContentItem {
  id: string;
  instagramPostId: string;
  title: string;
  creator: string;
  instagramAccount: string;
  type: "post" | "story" | "reel" | "igtv";
  status: "pending" | "approved" | "rejected" | "synced" | "promoted";
  publishedDate: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    reach: number;
  };
  hashtags: string[];
  location?: string;
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
    case "promoted":
      return { text: "Được quảng bá", color: "bg-purple-500", textColor: "text-purple-700", bgColor: "bg-purple-50" }
    default:
      return { text: "Không xác định", color: "bg-gray-400", textColor: "text-gray-600", bgColor: "bg-gray-50" }
  }
}

const getContentTypeIcon = (type: string) => {
  switch (type) {
    case "post":
      return <HiPhoto className="h-4 w-4" />
    case "story":
      return <HiChatBubbleLeft className="h-4 w-4" />
    case "reel":
      return <HiPlay className="h-4 w-4" />
    case "igtv":
      return <HiVideoCamera className="h-4 w-4" />
    default:
      return <HiPhoto className="h-4 w-4" />
  }
}

const getContentTypeName = (type: string) => {
  switch (type) {
    case "post":
      return "Posts"
    case "story":
      return "Stories"
    case "reel":
      return "Reels"
    case "igtv":
      return "IGTV"
    default:
      return "Không xác định"
  }
}

export default function AdminContentInstagramPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedContent, setSelectedContent] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [accountFilter, setAccountFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const instagramContent: InstagramContentItem[] = [
    {
      id: "ig-content-1",
      instagramPostId: "CrYdKVjFzHe",
      title: "Review son thỏi Charlotte Tilbury Pillow Talk - Màu siêu hot trend",
      creator: "Linh Chi (@linhchi.beauty)",
      instagramAccount: "@linhchi.beauty",
      type: "post",
      status: "pending",
      publishedDate: "2025-01-15T14:30:00Z",
      campaign: "Charlotte Tilbury Valentine Collection",
      thumbnail: "/ig-thumbnails/charlotte-tilbury-review.jpg",
      hashtags: ["#CharlotteTilbury", "#PillowTalk", "#LipstickReview", "#BeautyReview"],
      location: "Hồ Chí Minh, Việt Nam",
      engagement: {
        likes: 2890,
        comments: 145,
        shares: 67,
        saves: 234,
        reach: 8456
      }
    },
    {
      id: "ig-content-2",
      instagramPostId: "CrZdKVjFzPq",
      title: "OOTD với áo sơ mi Uniqlo và quần jeans Zara - Mix đồ công sở chic",
      creator: "Minh Thu (@fashion.minhthu)",
      instagramAccount: "@fashion.minhthu",
      type: "reel",
      status: "promoted",
      publishedDate: "2025-01-14T11:15:00Z",
      campaign: "Uniqlo x Zara Fashion Mix",
      hashtags: ["#OOTD", "#Uniqlo", "#Zara", "#FashionStyle", "#OfficeLook"],
      location: "Landmark 81, Hồ Chí Minh",
      engagement: {
        likes: 4560,
        comments: 289,
        shares: 178,
        saves: 567,
        reach: 15230
      }
    },
    {
      id: "ig-content-3",
      instagramPostId: "CrAdKVjFzMn",
      title: "Trải nghiệm món bánh tráng nướng Đà Lạt tại Highlands Coffee",
      creator: "Hoàng Nam (@foodie.hoangnam)",
      instagramAccount: "@foodie.hoangnam",
      type: "story",
      status: "synced",
      publishedDate: "2025-01-13T16:45:00Z",
      campaign: "Highlands Coffee Đà Lạt Special",
      hashtags: ["#HighlandsCoffee", "#BanhTrangNuong", "#DaLatFood", "#Coffee"],
      location: "Highlands Coffee, Quận 1",
      engagement: {
        likes: 1456,
        comments: 78,
        shares: 34,
        saves: 89,
        reach: 4567
      }
    },
    {
      id: "ig-content-4",
      instagramPostId: "CrBdKVjFzOp",
      title: "Hướng dẫn trang điểm tự nhiên với sản phẩm Maybelline",
      creator: "Thúy Anh (@makeup.thuyanh)",
      instagramAccount: "@makeup.thuyanh",
      type: "igtv",
      status: "approved",
      publishedDate: "2025-01-12T09:20:00Z",
      campaign: "Maybelline Natural Beauty",
      hashtags: ["#Maybelline", "#MakeupTutorial", "#NaturalMakeup", "#BeautyTips"],
      location: "Beauty Studio, Hà Nội",
      engagement: {
        likes: 3245,
        comments: 198,
        shares: 123,
        saves: 445,
        reach: 9876
      }
    },
    {
      id: "ig-content-5",
      instagramPostId: "CrCdKVjFzQr",
      title: "Check-in tại Starbucks Reserve với menu holiday mới",
      creator: "Phúc An (@coffee.phucan)",
      instagramAccount: "@coffee.phucan", 
      type: "post",
      status: "rejected",
      publishedDate: "2025-01-15T08:10:00Z",
      campaign: "Starbucks Holiday Collection",
      hashtags: ["#Starbucks", "#StarbucksReserve", "#HolidayMenu", "#Coffee"],
      location: "Starbucks Reserve, District 1",
      engagement: {
        likes: 892,
        comments: 45,
        shares: 12,
        saves: 67,
        reach: 2345
      }
    },
    {
      id: "ig-content-6",
      instagramPostId: "CrDdKVjFzSt",
      title: "Unboxing và review smartwatch Apple Watch Series 9",
      creator: "Đức Thành (@tech.ducthanh)",
      instagramAccount: "@tech.ducthanh",
      type: "reel",
      status: "pending",
      publishedDate: "2025-01-15T12:30:00Z",
      campaign: "Apple Watch Series 9 Campaign",
      hashtags: ["#AppleWatch", "#TechReview", "#Smartwatch", "#Apple"],
      location: "Tech Store, Hồ Chí Minh",
      engagement: {
        likes: 2134,
        comments: 89,
        shares: 56,
        saves: 234,
        reach: 6789
      }
    }
  ]

  const stats = useMemo(() => {
    const total = instagramContent.length
    const posts = instagramContent.filter(item => item.type === "post").length
    const stories = instagramContent.filter(item => item.type === "story").length
    const reels = instagramContent.filter(item => item.type === "reel").length
    const igtv = instagramContent.filter(item => item.type === "igtv").length
    const pending = instagramContent.filter(item => item.status === "pending").length
    const approved = instagramContent.filter(item => item.status === "approved").length
    const synced = instagramContent.filter(item => item.status === "synced").length
    const rejected = instagramContent.filter(item => item.status === "rejected").length
    const promoted = instagramContent.filter(item => item.status === "promoted").length
    
    const totalEngagement = instagramContent.reduce((acc, item) => ({
      likes: acc.likes + item.engagement.likes,
      comments: acc.comments + item.engagement.comments,
      shares: acc.shares + item.engagement.shares,
      saves: acc.saves + item.engagement.saves,
      reach: acc.reach + item.engagement.reach
    }), { likes: 0, comments: 0, shares: 0, saves: 0, reach: 0 })
    
    return { total, posts, stories, reels, igtv, pending, approved, synced, rejected, promoted, totalEngagement }
  }, [instagramContent])

  const filteredContent = useMemo(() => {
    let filtered = instagramContent

    // Filter by active tab
    if (activeTab !== "all") {
      filtered = filtered.filter(item => item.type === activeTab)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.instagramAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.campaign && item.campaign.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()))
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

    // Filter by Instagram account
    if (accountFilter !== "all") {
      filtered = filtered.filter(item => item.instagramAccount === accountFilter)
    }

    return filtered
  }, [instagramContent, activeTab, searchQuery, statusFilter, typeFilter, accountFilter])

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

  const handleSyncInstagram = async () => {
    setIsSyncing(true)
    // Simulate Instagram sync API call
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

  const formatEngagement = (engagement: { likes: number; comments: number; shares: number; saves: number; reach: number }) => {
    const total = engagement.likes + engagement.comments + engagement.shares + engagement.saves
    return `${total.toLocaleString()} tương tác`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <IKKAdminLayout>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="page-title">
              Quản lý nội dung Instagram
            </h1>
            <p className="text-muted-foreground" data-testid="page-description">
              Quản lý và kiểm duyệt nội dung Instagram từ các KOC và Affiliate
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2" data-testid="button-filter">
              <HiFunnel className="h-5 w-5" />
              Bộ lọc
            </Button>
            <Button 
              className="flex items-center gap-2 bg-[#ff0086] hover:bg-[#e6007a]" 
              onClick={handleSyncInstagram}
              disabled={isSyncing}
              data-testid="button-sync-instagram"
            >
              <HiArrowPath className={`h-5 w-5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ Instagram'}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-content">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng nội dung</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <HiPhoto className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +{stats.pending} đang chờ
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-posts">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.posts}</p>
                </div>
                <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <HiPhoto className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-reels">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reels</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.reels}</p>
                </div>
                <div className="h-12 w-12 bg-pink-50 rounded-lg flex items-center justify-center">
                  <HiPlay className="h-6 w-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-reach">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng Reach</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalEngagement.reach)}</p>
                </div>
                <div className="h-12 w-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <HiSignal className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-likes">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <HiHeart className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Tổng Likes</p>
                  <p className="text-lg font-semibold">{formatNumber(stats.totalEngagement.likes)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-comments">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <HiChatBubbleLeftRight className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Tổng Comments</p>
                  <p className="text-lg font-semibold">{formatNumber(stats.totalEngagement.comments)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-shares">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <HiShare className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Tổng Shares</p>
                  <p className="text-lg font-semibold">{formatNumber(stats.totalEngagement.shares)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" data-testid="card-total-saves">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <HiBookmark className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Tổng Saves</p>
                  <p className="text-lg font-semibold">{formatNumber(stats.totalEngagement.saves)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Tìm kiếm theo tiêu đề, creator, hashtag, vị trí..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]" data-testid="select-status-filter">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="pending">Đang chờ</SelectItem>
                    <SelectItem value="approved">Đã duyệt</SelectItem>
                    <SelectItem value="synced">Đã đồng bộ</SelectItem>
                    <SelectItem value="promoted">Được quảng bá</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[120px]" data-testid="select-type-filter">
                    <SelectValue placeholder="Loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="post">Posts</SelectItem>
                    <SelectItem value="story">Stories</SelectItem>
                    <SelectItem value="reel">Reels</SelectItem>
                    <SelectItem value="igtv">IGTV</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={accountFilter} onValueChange={setAccountFilter}>
                  <SelectTrigger className="w-[160px]" data-testid="select-account-filter">
                    <SelectValue placeholder="Tài khoản" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả tài khoản</SelectItem>
                    <SelectItem value="@linhchi.beauty">@linhchi.beauty</SelectItem>
                    <SelectItem value="@fashion.minhthu">@fashion.minhthu</SelectItem>
                    <SelectItem value="@foodie.hoangnam">@foodie.hoangnam</SelectItem>
                    <SelectItem value="@makeup.thuyanh">@makeup.thuyanh</SelectItem>
                    <SelectItem value="@coffee.phucan">@coffee.phucan</SelectItem>
                    <SelectItem value="@tech.ducthanh">@tech.ducthanh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedContent.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">
                    Đã chọn {selectedContent.length} nội dung
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleBulkApprove}
                      disabled={isLoading}
                      data-testid="button-bulk-approve"
                    >
                      <HiCheck className="h-4 w-4 mr-1" />
                      {isLoading ? 'Đang xử lý...' : 'Duyệt tất cả'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedContent([])}
                      data-testid="button-clear-selection"
                    >
                      <HiXMark className="h-4 w-4 mr-1" />
                      Bỏ chọn
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="flex items-center gap-2" data-testid="tab-all">
              <HiGlobeAmericas className="h-4 w-4" />
              Tất cả ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="post" className="flex items-center gap-2" data-testid="tab-posts">
              <HiPhoto className="h-4 w-4" />
              Posts ({stats.posts})
            </TabsTrigger>
            <TabsTrigger value="story" className="flex items-center gap-2" data-testid="tab-stories">
              <HiChatBubbleLeft className="h-4 w-4" />
              Stories ({stats.stories})
            </TabsTrigger>
            <TabsTrigger value="reel" className="flex items-center gap-2" data-testid="tab-reels">
              <HiPlay className="h-4 w-4" />
              Reels ({stats.reels})
            </TabsTrigger>
            <TabsTrigger value="igtv" className="flex items-center gap-2" data-testid="tab-igtv">
              <HiVideoCamera className="h-4 w-4" />
              IGTV ({stats.igtv})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {activeTab === "all" ? "Tất cả nội dung Instagram" : `${getContentTypeName(activeTab)} Instagram`}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {filteredContent.length} kết quả
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-100">
                        <TableHead className="w-12 px-6">
                          <Checkbox
                            checked={selectedContent.length === filteredContent.length && filteredContent.length > 0}
                            onCheckedChange={handleSelectAll}
                            data-testid="checkbox-select-all"
                          />
                        </TableHead>
                        <TableHead className="min-w-[300px] px-6">Nội dung</TableHead>
                        <TableHead className="px-6">Creator</TableHead>
                        <TableHead className="px-6">Loại</TableHead>
                        <TableHead className="px-6">Trạng thái</TableHead>
                        <TableHead className="px-6">Engagement</TableHead>
                        <TableHead className="px-6">Hashtags</TableHead>
                        <TableHead className="px-6">Ngày đăng</TableHead>
                        <TableHead className="w-12 px-6"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <TableRow key={index}>
                            <TableCell className="px-6">
                              <Skeleton className="h-4 w-4" />
                            </TableCell>
                            <TableCell className="px-6">
                              <div className="flex items-center gap-3">
                                <Skeleton className="h-12 w-12 rounded-lg" />
                                <div className="space-y-2">
                                  <Skeleton className="h-4 w-48" />
                                  <Skeleton className="h-3 w-32" />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="px-6">
                              <Skeleton className="h-4 w-24" />
                            </TableCell>
                            <TableCell className="px-6">
                              <Skeleton className="h-6 w-16" />
                            </TableCell>
                            <TableCell className="px-6">
                              <Skeleton className="h-6 w-20" />
                            </TableCell>
                            <TableCell className="px-6">
                              <Skeleton className="h-4 w-32" />
                            </TableCell>
                            <TableCell className="px-6">
                              <Skeleton className="h-4 w-16" />
                            </TableCell>
                            <TableCell className="px-6">
                              <Skeleton className="h-4 w-24" />
                            </TableCell>
                            <TableCell className="px-6">
                              <Skeleton className="h-8 w-8" />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : filteredContent.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="h-32 text-center">
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <HiPhoto className="h-8 w-8 text-gray-400" />
                              <span className="text-gray-500">Không tìm thấy nội dung nào</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredContent.map((item) => {
                          const statusBadge = getStatusBadge(item.status)
                          return (
                            <TableRow key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50" data-testid={`row-content-${item.id}`}>
                              <TableCell className="px-6">
                                <Checkbox
                                  checked={selectedContent.includes(item.id)}
                                  onCheckedChange={() => handleSelectContent(item.id)}
                                  data-testid={`checkbox-content-${item.id}`}
                                />
                              </TableCell>
                              <TableCell className="px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    {getContentTypeIcon(item.type)}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900 mb-1 line-clamp-2">
                                      {item.title}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <span>{item.instagramAccount}</span>
                                      {item.location && (
                                        <>
                                          <span>•</span>
                                          <span className="flex items-center gap-1">
                                            <HiMapPin className="h-3 w-3" />
                                            {item.location}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                    {item.campaign && (
                                      <div className="mt-1">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                          {item.campaign}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="px-6">
                                <div>
                                  <p className="font-medium text-gray-900">{item.creator}</p>
                                  <p className="text-sm text-gray-500">{item.instagramAccount}</p>
                                </div>
                              </TableCell>
                              <TableCell className="px-6">
                                <div className="flex items-center gap-2">
                                  {getContentTypeIcon(item.type)}
                                  <span className="text-sm font-medium text-gray-700">
                                    {getContentTypeName(item.type)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="px-6">
                                <Badge 
                                  className={`${statusBadge.bgColor} ${statusBadge.textColor} border-0`}
                                  data-testid={`badge-status-${item.id}`}
                                >
                                  {statusBadge.text}
                                </Badge>
                              </TableCell>
                              <TableCell className="px-6">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className="flex items-center gap-1">
                                      <HiHeart className="h-3 w-3 text-red-500" />
                                      {formatNumber(item.engagement.likes)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <HiChatBubbleLeftRight className="h-3 w-3 text-blue-500" />
                                      {formatNumber(item.engagement.comments)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className="flex items-center gap-1">
                                      <HiBookmark className="h-3 w-3 text-purple-500" />
                                      {formatNumber(item.engagement.saves)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <HiSignal className="h-3 w-3 text-orange-500" />
                                      {formatNumber(item.engagement.reach)}
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="px-6">
                                <div className="flex flex-wrap gap-1">
                                  {item.hashtags.slice(0, 2).map((hashtag, index) => (
                                    <span 
                                      key={index}
                                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                                    >
                                      <HiHashtag className="h-3 w-3 mr-1" />
                                      {hashtag.replace('#', '')}
                                    </span>
                                  ))}
                                  {item.hashtags.length > 2 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                                      +{item.hashtags.length - 2}
                                    </span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="px-6">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <HiCalendarDays className="h-4 w-4" />
                                  {formatDate(item.publishedDate)}
                                </div>
                              </TableCell>
                              <TableCell className="px-6">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" data-testid={`dropdown-actions-${item.id}`}>
                                      <HiEllipsisHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <HiEye className="h-4 w-4 mr-2" />
                                      Xem chi tiết
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <HiCheck className="h-4 w-4 mr-2" />
                                      Phê duyệt
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <HiRocketLaunch className="h-4 w-4 mr-2" />
                                      Quảng bá
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      <HiXMark className="h-4 w-4 mr-2" />
                                      Từ chối
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </IKKAdminLayout>
  )
}