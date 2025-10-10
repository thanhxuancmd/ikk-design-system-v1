import { useState } from 'react'
import { 
  HiMagnifyingGlass,
  HiChevronDown,
  HiSquares2X2,
  HiListBullet,
  HiChatBubbleLeftRight,
  HiStar,
  HiSparkles,
  HiCheckCircle,
  HiShoppingBag,
  HiVideoCamera,
  HiShare,
  HiPlus,
  HiPencilSquare,
  HiTrash
} from "react-icons/hi2"
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa'
import { useQuery, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { apiRequest, queryClient } from "@/lib/queryClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import IKKAdminLayout from "@/components/ikk-admin-layout"
import { insertKocProfileSchema } from "@shared/schema"

interface KOCProfile {
  id: string
  userId: string
  name: string
  username: string
  avatar: string
  email: string
  followers: {
    facebook?: number
    instagram?: number
    tiktok?: number
    youtube?: number
  }
  categories: string[]
  location: string
  rating: string
  completedCampaigns: number
  totalPoints: number
  level: string
  isVerified: boolean
}

interface KOCProfilesResponse {
  profiles: KOCProfile[]
}

function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

function getTotalFollowers(followers: KOCProfile['followers']): number {
  return Object.values(followers).reduce((sum, count) => sum + (count || 0), 0)
}

function getPlatformIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return { icon: <FaInstagram className="w-3 h-3" />, color: 'text-pink-500' }
    case 'tiktok':
      return { icon: <FaTiktok className="w-3 h-3" />, color: 'text-gray-900' }
    case 'facebook':
      return { icon: <FaFacebookF className="w-3 h-3" />, color: 'text-blue-600' }
    case 'youtube':
      return { icon: <FaYoutube className="w-3 h-3" />, color: 'text-red-600' }
    default:
      return { icon: <HiShare className="w-3 h-3" />, color: 'text-gray-600' }
  }
}

function getLevelColor(level: string): string {
  switch (level) {
    case 'Diamond':
      return 'bg-blue-100 text-blue-800'
    case 'Gold':
      return 'bg-yellow-100 text-yellow-800'
    case 'Silver':
      return 'bg-gray-100 text-gray-800'
    case 'Bronze':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const AVAILABLE_CATEGORIES = [
  'Phụ Kiện Thời Trang',
  'Thời Trang Nữ',
  'Sắc Đẹp',
  'Văn Phòng Phẩm',
  'Mẹ & Bé',
  'Sở thích & Sưu tầm',
  'Túi Ví Nữ',
  'Điện Thoại & Phụ Kiện'
]

// Extend insertKocProfileSchema for UI-specific validation
const createKocFormSchema = insertKocProfileSchema.omit({
  followers: true,
}).extend({
  // User selection (required)
  userId: z.string().min(1, "Phải chọn người dùng"),
  
  // UI fields for individual follower inputs (will be transformed to followers JSON)
  facebookFollowers: z.coerce.number().min(0, "Không được âm").optional().default(0),
  instagramFollowers: z.coerce.number().min(0, "Không được âm").optional().default(0),
  tiktokFollowers: z.coerce.number().min(0, "Không được âm").optional().default(0),
  youtubeFollowers: z.coerce.number().min(0, "Không được âm").optional().default(0),
  
  // Override schema fields for better UI validation
  categories: z.array(z.string()).optional().default([]),
  location: z.string().nullable().optional(),
  rating: z.string().nullable().optional(),
  level: z.string().nullable().optional(),
  completedCampaigns: z.number().nullable().optional(),
  totalPoints: z.number().nullable().optional(),
  isVerified: z.boolean().nullable().optional().default(false),
})

type CreateKocFormData = z.infer<typeof createKocFormSchema>

interface User {
  id: string
  name: string
  username: string
  email: string
}

export default function AdminKOCPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedKoc, setSelectedKoc] = useState<KOCProfile | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [kocToDelete, setKocToDelete] = useState<KOCProfile | null>(null)
  const { data: kocData, isLoading } = useQuery<KOCProfilesResponse>({
    queryKey: ['/api/koc-profiles']
  })

  return (
    <IKKAdminLayout>
      <section className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-koc-management">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900" data-testid="heading-koc-management">Quản lý KOC</h2>
            <Button 
              className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
              onClick={() => setIsCreateDialogOpen(true)}
              data-testid="button-create-koc"
            >
              <HiPlus className="w-5 h-5 mr-2" />
              Thêm mới KOC
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên KOL"
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
              data-testid="input-search-kol"
            />
          </div>

          {/* Category Filters */}
          <div className="mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Ngành hàng</span>
              <Badge className="bg-[#ff0086] text-white hover:bg-[#e6007a] border-0 cursor-pointer" data-testid="chip-category-all">
                Tất cả
              </Badge>
              {AVAILABLE_CATEGORIES.map((category, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-white hover:bg-gray-50 cursor-pointer"
                  data-testid={`chip-category-${idx}`}
                >
                  {category}
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="text-gray-600" data-testid="button-expand-categories">
                Mở rộng
                <HiChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Platform Filters */}
          <div className="mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Mạng xã hội</span>
              <Badge className="bg-[#ff0086] text-white hover:bg-[#e6007a] border-0 cursor-pointer" data-testid="chip-platform-all">
                Tất cả
              </Badge>
              {[
                { name: 'Shopee Live', icon: <HiShoppingBag className="w-3 h-3" /> },
                { name: 'Shopee Video', icon: <HiVideoCamera className="w-3 h-3" /> },
                { name: 'Instagram', icon: <FaInstagram className="w-3 h-3" /> },
                { name: 'Tiktok', icon: <FaTiktok className="w-3 h-3" /> },
                { name: 'Facebook', icon: <FaFacebookF className="w-3 h-3" /> },
                { name: 'X(Twitter)', icon: <HiShare className="w-3 h-3" /> },
                { name: 'YouTube', icon: <FaYoutube className="w-3 h-3" /> }
              ].map((platform, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-white hover:bg-gray-50 cursor-pointer flex items-center gap-1"
                  data-testid={`chip-platform-${idx}`}
                >
                  {platform.icon}
                  {platform.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Cooperation Filters */}
          <div className="mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Hợp tác</span>
              <Badge
                variant="outline"
                className="bg-white hover:bg-gray-50 cursor-pointer flex items-center gap-1"
                data-testid="toggle-gold-kol"
              >
                <HiSparkles className="w-3 h-3 text-yellow-500" />
                KOL tích vàng
              </Badge>
              <Badge
                variant="outline"
                className="bg-white hover:bg-gray-50 cursor-pointer flex items-center gap-1"
                data-testid="toggle-good-sample"
              >
                <HiCheckCircle className="w-3 h-3 text-green-500" />
                Tỷ lệ hoàn thành Dự án sản phẩm mẫu miễn phí ở mức tốt
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-4">
            <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="button-apply-filters">
              Áp dụng
            </Button>
            <Button variant="outline" data-testid="button-reset-filters">
              Đặt Lại
            </Button>
            <Button variant="ghost" className="text-gray-600" data-testid="link-expand-filters">
              Mở Rộng Bộ Lọc
              <HiChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Table Header with View Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900" data-testid="heading-kol-list">Danh sách KOL</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" data-testid="btn-view-grid">
              <HiSquares2X2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" data-testid="btn-view-list">
              <HiListBullet className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* KOL Table */}
        <Card className="bg-white border-gray-100">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-kol">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-user">Tên tài khoản KOL</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-followers">
                      Người theo dõi
                      <HiChevronDown className="w-3 h-3 inline ml-1" />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-rating">
                      Đánh giá
                      <HiChevronDown className="w-3 h-3 inline ml-1" />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-campaigns">
                      Chiến dịch
                      <HiChevronDown className="w-3 h-3 inline ml-1" />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-level">
                      Cấp độ
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-actions">Hoạt động</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-500" data-testid="loading-state">
                        Đang tải...
                      </td>
                    </tr>
                  ) : !kocData?.profiles || kocData.profiles.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-500" data-testid="empty-state">
                        Chưa có KOC nào
                      </td>
                    </tr>
                  ) : (
                    kocData.profiles.map((koc) => {
                      const totalFollowers = getTotalFollowers(koc.followers)
                      const platforms = Object.keys(koc.followers).filter(
                        (key) => koc.followers[key as keyof typeof koc.followers]
                      )
                      
                      return (
                        <tr key={koc.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid={`row-kol-${koc.id}`}>
                          <td className="py-4 px-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                                <img 
                                  src={koc.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${koc.username}`} 
                                  alt={koc.name} 
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-900" data-testid={`text-name-${koc.id}`}>{koc.name}</span>
                                  {koc.isVerified && (
                                    <HiCheckCircle className="w-4 h-4 text-blue-500" data-testid={`icon-verified-${koc.id}`} />
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 mb-1" data-testid={`text-username-${koc.id}`}>@{koc.username}</div>
                                <div className="flex items-center gap-1 mb-1">
                                  {platforms.map((platform) => {
                                    const platformInfo = getPlatformIcon(platform)
                                    return (
                                      <span key={platform} className={platformInfo.color} data-testid={`icon-platform-${koc.id}-${platform}`}>
                                        {platformInfo.icon}
                                      </span>
                                    )
                                  })}
                                </div>
                                {koc.categories.length > 0 && (
                                  <Badge className="bg-gray-100 text-gray-700 border-0 text-xs" data-testid={`badge-category-${koc.id}`}>
                                    {koc.categories[0]}
                                    {koc.categories.length > 1 && ` +${koc.categories.length - 1}`}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-900" data-testid={`text-followers-${koc.id}`}>
                              {formatFollowers(totalFollowers)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              <HiStar className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-gray-900" data-testid={`text-rating-${koc.id}`}>
                                {koc.rating}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-900" data-testid={`text-campaigns-${koc.id}`}>
                              {koc.completedCampaigns}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={`${getLevelColor(koc.level)} border-0`} data-testid={`badge-level-${koc.id}`}>
                              {koc.level}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                className="bg-[#ff0086] hover:bg-[#e6007a] text-white w-full"
                                data-testid={`btn-collab-${koc.id}`}
                              >
                                Hợp tác
                              </Button>
                              <div className="flex items-center gap-2 justify-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-8 w-8"
                                  onClick={() => {
                                    setSelectedKoc(koc)
                                    setIsEditDialogOpen(true)
                                  }}
                                  data-testid={`button-edit-koc-${koc.userId}`}
                                >
                                  <HiPencilSquare className="w-4 h-4 text-gray-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-8 w-8"
                                  onClick={() => {
                                    setKocToDelete(koc)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                  data-testid={`button-delete-koc-${koc.userId}`}
                                >
                                  <HiTrash className="w-4 h-4 text-red-600 hover:text-red-700" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-8 w-8"
                                  data-testid={`btn-chat-${koc.id}`}
                                >
                                  <HiChatBubbleLeftRight className="w-4 h-4 text-gray-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-8 w-8"
                                  data-testid={`btn-fav-${koc.id}`}
                                >
                                  <HiStar className="w-4 h-4 text-gray-600" />
                                </Button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <CreateKocDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      {selectedKoc && (
        <EditKocDialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open)
            if (!open) setSelectedKoc(null)
          }}
          selectedKoc={selectedKoc}
        />
      )}

      {kocToDelete && (
        <DeleteKocDialog
          open={isDeleteDialogOpen}
          onOpenChange={(open) => {
            setIsDeleteDialogOpen(open)
            if (!open) setKocToDelete(null)
          }}
          kocToDelete={kocToDelete}
        />
      )}
    </IKKAdminLayout>
  )
}

interface CreateKocDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CreateKocDialog({ open, onOpenChange }: CreateKocDialogProps) {
  const { toast } = useToast()

  // Fetch users for the dropdown
  const { data: usersData, isLoading: isLoadingUsers } = useQuery<{ users: User[] }>({
    queryKey: ['/api/users']
  })

  const form = useForm<CreateKocFormData>({
    resolver: zodResolver(createKocFormSchema),
    defaultValues: {
      userId: '',
      facebookFollowers: 0,
      instagramFollowers: 0,
      tiktokFollowers: 0,
      youtubeFollowers: 0,
      categories: [],
      location: null,
      rating: null,
      level: null,
      completedCampaigns: null,
      totalPoints: null,
      isVerified: false,
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/koc-profiles', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/koc-profiles'] })
      toast({
        title: "Thành công",
        description: "KOC đã được thêm vào hệ thống"
      })
      onOpenChange(false)
      form.reset()
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể thêm KOC. Vui lòng thử lại.",
        variant: "destructive"
      })
    }
  })

  const onSubmit = (data: CreateKocFormData) => {
    const payload = {
      userId: data.userId,
      followers: {
        facebook: data.facebookFollowers || 0,
        instagram: data.instagramFollowers || 0,
        tiktok: data.tiktokFollowers || 0,
        youtube: data.youtubeFollowers || 0
      },
      categories: data.categories || [],
      location: data.location || null,
      rating: data.rating || null,
      completedCampaigns: data.completedCampaigns ?? null,
      totalPoints: data.totalPoints ?? null,
      level: data.level || null,
      isVerified: data.isVerified ?? null
    }
    createMutation.mutate(payload)
  }

  // Reset form when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset()
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="dialog-create-koc">
        <DialogHeader>
          <DialogTitle data-testid="dialog-title-koc">Thêm KOC Mới</DialogTitle>
          <DialogDescription>
            Điền thông tin để thêm KOC vào hệ thống
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* User Selection Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Chọn người dùng</h3>
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Người dùng <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-user">
                          <SelectValue placeholder="Chọn người dùng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingUsers ? (
                          <SelectItem value="loading" disabled>Đang tải...</SelectItem>
                        ) : usersData && usersData.users.length > 0 ? (
                          usersData.users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} (@{user.username})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>Không có người dùng</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Followers Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Số lượng người theo dõi</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="facebookFollowers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" placeholder="0" data-testid="input-facebook-followers" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagramFollowers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" placeholder="0" data-testid="input-instagram-followers" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tiktokFollowers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TikTok</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" placeholder="0" data-testid="input-tiktok-followers" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtubeFollowers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" placeholder="0" data-testid="input-youtube-followers" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Categories Section */}
            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <div className="grid grid-cols-2 gap-3">
                    {AVAILABLE_CATEGORIES.map((category) => (
                      <FormField
                        key={category}
                        control={form.control}
                        name="categories"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={category}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(category)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, category])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== category
                                          )
                                        )
                                  }}
                                  data-testid={`checkbox-category-${category}`}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {category}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other Information Section */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa điểm</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} placeholder="Nhập địa điểm" data-testid="input-location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đánh giá</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger data-testid="select-rating">
                          <SelectValue placeholder="Chọn đánh giá" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5.0">5.0</SelectItem>
                        <SelectItem value="4.5">4.5</SelectItem>
                        <SelectItem value="4.0">4.0</SelectItem>
                        <SelectItem value="3.5">3.5</SelectItem>
                        <SelectItem value="3.0">3.0</SelectItem>
                        <SelectItem value="2.5">2.5</SelectItem>
                        <SelectItem value="2.0">2.0</SelectItem>
                        <SelectItem value="1.5">1.5</SelectItem>
                        <SelectItem value="1.0">1.0</SelectItem>
                        <SelectItem value="0.5">0.5</SelectItem>
                        <SelectItem value="0.0">0.0</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cấp độ</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger data-testid="select-level">
                          <SelectValue placeholder="Chọn cấp độ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nano">Nano</SelectItem>
                        <SelectItem value="Micro">Micro</SelectItem>
                        <SelectItem value="Macro">Macro</SelectItem>
                        <SelectItem value="Celebrity">Celebrity</SelectItem>
                        <SelectItem value="Diamond">Diamond</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                        <SelectItem value="Bronze">Bronze</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-8">
                    <FormControl>
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-verified"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Đã xác minh
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={createMutation.isPending}
                data-testid="button-cancel"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
                disabled={createMutation.isPending}
                data-testid="button-submit-create-koc"
              >
                {createMutation.isPending ? "Đang xử lý..." : "Thêm KOC"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

interface EditKocDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedKoc: KOCProfile
}

function EditKocDialog({ open, onOpenChange, selectedKoc }: EditKocDialogProps) {
  const { toast } = useToast()

  // Fetch users for the dropdown (to display user info)
  const { data: usersData, isLoading: isLoadingUsers } = useQuery<{ users: User[] }>({
    queryKey: ['/api/users']
  })

  const form = useForm<CreateKocFormData>({
    resolver: zodResolver(createKocFormSchema),
    defaultValues: {
      userId: selectedKoc.userId,
      facebookFollowers: selectedKoc.followers?.facebook ?? 0,
      instagramFollowers: selectedKoc.followers?.instagram ?? 0,
      tiktokFollowers: selectedKoc.followers?.tiktok ?? 0,
      youtubeFollowers: selectedKoc.followers?.youtube ?? 0,
      categories: selectedKoc.categories || [],
      location: selectedKoc.location || '',
      rating: selectedKoc.rating || '5.0',
      level: selectedKoc.level || null,
      completedCampaigns: selectedKoc.completedCampaigns ?? null,
      totalPoints: selectedKoc.totalPoints ?? null,
      isVerified: selectedKoc.isVerified || false,
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ userId, data }: { userId: string, data: any }) => {
      return await apiRequest('PATCH', `/api/koc-profiles/user/${userId}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/koc-profiles'] })
      toast({
        title: "Thành công",
        description: "Thông tin KOC đã được cập nhật"
      })
      onOpenChange(false)
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể cập nhật KOC. Vui lòng thử lại.",
        variant: "destructive"
      })
    }
  })

  const onSubmit = (data: CreateKocFormData) => {
    const payload = {
      followers: {
        facebook: data.facebookFollowers || 0,
        instagram: data.instagramFollowers || 0,
        tiktok: data.tiktokFollowers || 0,
        youtube: data.youtubeFollowers || 0
      },
      categories: data.categories || [],
      location: data.location || null,
      rating: data.rating || null,
      completedCampaigns: data.completedCampaigns ?? null,
      totalPoints: data.totalPoints ?? null,
      level: data.level || null,
      isVerified: data.isVerified ?? null
    }
    updateMutation.mutate({ userId: selectedKoc.userId, data: payload })
  }

  // Reset form when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset()
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="dialog-edit-koc">
        <DialogHeader>
          <DialogTitle data-testid="dialog-title-edit-koc">Chỉnh sửa KOC</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin KOC
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* User Selection Section - Disabled/Read-only */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Người dùng</h3>
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Người dùng <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled>
                      <FormControl>
                        <SelectTrigger data-testid="select-user-edit" disabled>
                          <SelectValue placeholder="Chọn người dùng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingUsers ? (
                          <SelectItem value="loading" disabled>Đang tải...</SelectItem>
                        ) : usersData && usersData.users.length > 0 ? (
                          usersData.users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} (@{user.username})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>Không có người dùng</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Followers Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Số lượng người theo dõi</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="facebookFollowers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" placeholder="0" data-testid="input-facebook-followers-edit" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagramFollowers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" placeholder="0" data-testid="input-instagram-followers-edit" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tiktokFollowers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TikTok</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" placeholder="0" data-testid="input-tiktok-followers-edit" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtubeFollowers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="0" placeholder="0" data-testid="input-youtube-followers-edit" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Categories Section */}
            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <div className="grid grid-cols-2 gap-3">
                    {AVAILABLE_CATEGORIES.map((category) => (
                      <FormField
                        key={category}
                        control={form.control}
                        name="categories"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={category}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(category)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, category])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== category
                                          )
                                        )
                                  }}
                                  data-testid={`checkbox-category-edit-${category}`}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {category}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other Information Section */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa điểm</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} placeholder="Nhập địa điểm" data-testid="input-location-edit" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đánh giá</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger data-testid="select-rating-edit">
                          <SelectValue placeholder="Chọn đánh giá" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5.0">5.0</SelectItem>
                        <SelectItem value="4.5">4.5</SelectItem>
                        <SelectItem value="4.0">4.0</SelectItem>
                        <SelectItem value="3.5">3.5</SelectItem>
                        <SelectItem value="3.0">3.0</SelectItem>
                        <SelectItem value="2.5">2.5</SelectItem>
                        <SelectItem value="2.0">2.0</SelectItem>
                        <SelectItem value="1.5">1.5</SelectItem>
                        <SelectItem value="1.0">1.0</SelectItem>
                        <SelectItem value="0.5">0.5</SelectItem>
                        <SelectItem value="0.0">0.0</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cấp độ</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger data-testid="select-level-edit">
                          <SelectValue placeholder="Chọn cấp độ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nano">Nano</SelectItem>
                        <SelectItem value="Micro">Micro</SelectItem>
                        <SelectItem value="Macro">Macro</SelectItem>
                        <SelectItem value="Celebrity">Celebrity</SelectItem>
                        <SelectItem value="Diamond">Diamond</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                        <SelectItem value="Bronze">Bronze</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completedCampaigns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chiến dịch hoàn thành</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)} type="number" min="0" placeholder="0" data-testid="input-completed-campaigns-edit" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tổng điểm</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)} type="number" min="0" placeholder="0" data-testid="input-total-points-edit" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-8">
                    <FormControl>
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-verified-edit"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Đã xác minh
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={updateMutation.isPending}
                data-testid="button-cancel-edit"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
                disabled={updateMutation.isPending}
                data-testid="button-submit-edit-koc"
              >
                {updateMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

interface DeleteKocDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  kocToDelete: KOCProfile
}

function DeleteKocDialog({ open, onOpenChange, kocToDelete }: DeleteKocDialogProps) {
  const { toast } = useToast()

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      return await apiRequest('DELETE', `/api/koc-profiles/user/${userId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/koc-profiles'] })
      toast({
        title: "Thành công",
        description: "KOC đã được xóa khỏi hệ thống"
      })
      onOpenChange(false)
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể xóa KOC. Vui lòng thử lại.",
        variant: "destructive"
      })
    }
  })

  const handleDelete = (e?: React.MouseEvent) => {
    e?.preventDefault()
    if (kocToDelete) {
      deleteMutation.mutate(kocToDelete.userId)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent data-testid="dialog-delete-koc">
        <AlertDialogHeader>
          <AlertDialogTitle data-testid="dialog-title-delete-koc">Xác nhận xóa KOC</AlertDialogTitle>
          <AlertDialogDescription data-testid="dialog-description-delete-koc">
            Bạn có chắc chắn muốn xóa KOC <strong>{kocToDelete.name}</strong> (<strong>@{kocToDelete.username}</strong>)? Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="button-cancel-delete-koc">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
            data-testid="button-confirm-delete-koc"
          >
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
