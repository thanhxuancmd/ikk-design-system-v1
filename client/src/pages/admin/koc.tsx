import { useState } from 'react'
import { 
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
import { useToast } from "@/hooks/use-toast"
import {
  AppleSearchBar,
  AppleDialog,
  AppleModal,
  AppleInput,
  AppleSelect,
  AppleBadge,
  AppleListDetailShell,
  AppleAvatar,
  AppleButton,
  AppleTable,
  StatsCard,
  RankingBadge
} from "@/components/apple"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
  stats?: {
    campaigns: number
    campaignsTrend: number
    revenue: number
    revenueTrend: number
    conversionRate: number
    conversionTrend: number
  }
  recentCampaigns?: Array<{
    id: string
    name: string
    status: string
    revenue: number
    startDate: string
  }>
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

function getLevelBadgeVariant(level: string): 'info' | 'warning' | 'default' {
  switch (level) {
    case 'Diamond':
      return 'info'
    case 'Gold':
      return 'warning'
    default:
      return 'default'
  }
}

function getRankingTier(level: string): 'Nano' | 'Micro' | 'Macro' | 'Celebrity' {
  switch (level) {
    case 'Celebrity':
      return 'Celebrity'
    case 'Macro':
      return 'Macro'
    case 'Micro':
      return 'Micro'
    default:
      return 'Nano'
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

// Mock data generator for stats and campaigns
function generateMockStats(koc: KOCProfile) {
  return {
    campaigns: koc.completedCampaigns || Math.floor(Math.random() * 50) + 10,
    campaignsTrend: Math.random() > 0.5 ? Math.random() * 20 : -Math.random() * 10,
    revenue: Math.floor(Math.random() * 100000000) + 10000000,
    revenueTrend: Math.random() > 0.5 ? Math.random() * 15 : -Math.random() * 8,
    conversionRate: Math.random() * 5 + 1,
    conversionTrend: Math.random() > 0.5 ? Math.random() * 2 : -Math.random() * 1.5
  }
}

function generateMockCampaigns(kocId: string) {
  return [
    {
      id: `${kocId}-c1`,
      name: 'Chiến dịch Mùa Hè 2024',
      status: 'Hoàn thành',
      revenue: 25000000,
      startDate: '2024-06-01'
    },
    {
      id: `${kocId}-c2`,
      name: 'Flash Sale Cuối Tuần',
      status: 'Đang chạy',
      revenue: 18500000,
      startDate: '2024-07-15'
    },
    {
      id: `${kocId}-c3`,
      name: 'Back to School',
      status: 'Hoàn thành',
      revenue: 32000000,
      startDate: '2024-08-01'
    }
  ]
}

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
  const [searchValue, setSearchValue] = useState('')
  const [selectedKocId, setSelectedKocId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedKoc, setSelectedKoc] = useState<KOCProfile | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [kocToDelete, setKocToDelete] = useState<KOCProfile | null>(null)
  
  const { data: kocData, isLoading } = useQuery<KOCProfilesResponse>({
    queryKey: ['/api/koc-profiles']
  })

  // Enrich KOC profiles with mock stats and campaigns
  const enrichedKocs = (kocData?.profiles || []).map(koc => ({
    ...koc,
    stats: generateMockStats(koc),
    recentCampaigns: generateMockCampaigns(koc.id)
  }))

  // Filter KOCs based on search
  const filteredKocs = enrichedKocs.filter(koc => 
    koc.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    koc.username.toLowerCase().includes(searchValue.toLowerCase()) ||
    koc.email.toLowerCase().includes(searchValue.toLowerCase())
  )

  // Get selected KOC
  const selectedKocData = filteredKocs.find(koc => koc.id === selectedKocId) || null

  // Campaign table columns
  const campaignColumns = [
    {
      key: 'name',
      header: 'Tên chiến dịch',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (campaign: any) => (
        <AppleBadge variant={campaign.status === 'Hoàn thành' ? 'success' : 'info'}>
          {campaign.status}
        </AppleBadge>
      ),
    },
    {
      key: 'revenue',
      header: 'Doanh số',
      render: (campaign: any) => (
        <span>{campaign.revenue.toLocaleString('vi-VN')} ₫</span>
      ),
    },
    {
      key: 'startDate',
      header: 'Ngày bắt đầu',
    },
  ]

  return (
    <IKKAdminLayout>
      <section className="h-[calc(100vh-200px)] max-w-7xl mx-auto px-4" data-testid="section-koc-management">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900" data-testid="heading-koc-management">
            Quản lý KOC
          </h2>
          <Button 
            className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
            onClick={() => setIsCreateDialogOpen(true)}
            data-testid="button-create-koc"
          >
            <HiPlus className="w-5 h-5 mr-2" />
            Thêm mới KOC
          </Button>
        </div>

        {/* IKK usage (Vietnamese) - demonstrates i18n prop usage */}
        <AppleListDetailShell
          items={filteredKocs}
          selectedId={selectedKocId || undefined}
          onSelect={(koc) => setSelectedKocId(koc.id)}
          renderListItem={(koc, isSelected) => (
            <div className="p-3 space-y-2">
              <div className="flex items-start gap-3">
                <AppleAvatar 
                  src={koc.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${koc.username}`}
                  name={koc.name}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 truncate" data-testid={`text-name-${koc.id}`}>
                      {koc.name}
                    </span>
                    {koc.isVerified && (
                      <HiCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" data-testid={`icon-verified-${koc.id}`} />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate" data-testid={`text-username-${koc.id}`}>
                    @{koc.username}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatFollowers(getTotalFollowers(koc.followers))} người theo dõi
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <RankingBadge 
                  rank={Math.floor(Math.random() * 100) + 1}
                  level={getRankingTier(koc.level)}
                  size="sm"
                  tierLabels={{
                    nanoLabel: 'Nano',
                    microLabel: 'Micro', 
                    macroLabel: 'Macro',
                    celebrityLabel: 'Celebrity'
                  }}
                />
                <AppleBadge variant={koc.isVerified ? 'success' : 'default'} size="sm">
                  {koc.isVerified ? 'Đã xác minh' : 'Chưa xác minh'}
                </AppleBadge>
              </div>
            </div>
          )}
          renderDetail={(koc) => koc ? (
            <div className="p-6 space-y-6 h-full overflow-y-auto">
              {/* KOC Header */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
                <AppleAvatar 
                  src={koc.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${koc.username}`}
                  name={koc.name}
                  size="lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{koc.name}</h2>
                  <p className="text-gray-600 mt-1">{koc.email}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <RankingBadge 
                      rank={Math.floor(Math.random() * 100) + 1}
                      level={getRankingTier(koc.level)}
                      tierLabels={{
                        nanoLabel: 'Nano',
                        microLabel: 'Micro',
                        macroLabel: 'Macro',
                        celebrityLabel: 'Celebrity'
                      }}
                    />
                    <AppleBadge variant="info">
                      {formatFollowers(getTotalFollowers(koc.followers))} người theo dõi
                    </AppleBadge>
                    {koc.categories.length > 0 && (
                      <AppleBadge variant="default">
                        {koc.categories[0]}
                        {koc.categories.length > 1 && ` +${koc.categories.length - 1}`}
                      </AppleBadge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <AppleButton 
                    variant="outline"
                    onClick={() => {
                      setSelectedKoc(koc)
                      setIsEditDialogOpen(true)
                    }}
                    data-testid={`button-edit-koc-detail-${koc.userId}`}
                  >
                    Chỉnh sửa
                  </AppleButton>
                  <AppleButton
                    onClick={() => {
                      setKocToDelete(koc)
                      setIsDeleteDialogOpen(true)
                    }}
                    data-testid={`button-delete-koc-detail-${koc.userId}`}
                  >
                    Xóa
                  </AppleButton>
                </div>
              </div>

              {/* Stats Cards */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê hiệu suất</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatsCard
                    id={`campaigns-${koc.id}`}
                    title="Tổng chiến dịch"
                    value={koc.stats?.campaigns || 0}
                    change={koc.stats?.campaignsTrend}
                    changeType={koc.stats && koc.stats.campaignsTrend > 0 ? 'increase' : 'decrease'}
                    changeLabels={{
                      increaseLabel: 'tăng',
                      decreaseLabel: 'giảm'
                    }}
                  />
                  <StatsCard
                    id={`revenue-${koc.id}`}
                    title="Doanh số"
                    value={`${((koc.stats?.revenue || 0) / 1000000).toFixed(1)}M ₫`}
                    change={koc.stats?.revenueTrend}
                    changeType={koc.stats && koc.stats.revenueTrend > 0 ? 'increase' : 'decrease'}
                    changeLabels={{
                      increaseLabel: 'tăng',
                      decreaseLabel: 'giảm'
                    }}
                  />
                  <StatsCard
                    id={`conversion-${koc.id}`}
                    title="Tỷ lệ chuyển đổi"
                    value={`${(koc.stats?.conversionRate || 0).toFixed(1)}%`}
                    change={koc.stats?.conversionTrend}
                    changeType={koc.stats && koc.stats.conversionTrend > 0 ? 'increase' : 'decrease'}
                    changeLabels={{
                      increaseLabel: 'tăng',
                      decreaseLabel: 'giảm'
                    }}
                  />
                </div>
              </div>

              {/* Recent Campaigns Table */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chiến dịch gần đây</h3>
                <AppleTable
                  data={koc.recentCampaigns || []}
                  columns={campaignColumns}
                  emptyMessage="Chưa có chiến dịch nào"
                  striped
                  hoverable
                />
              </div>

              {/* Social Media Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mạng xã hội</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(koc.followers).map(([platform, count]) => {
                    if (!count) return null
                    const platformInfo = getPlatformIcon(platform)
                    return (
                      <div 
                        key={platform}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <span className={platformInfo.color}>{platformInfo.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900 capitalize">{platform}</p>
                          <p className="text-sm text-gray-600">{formatFollowers(count)} người theo dõi</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin chi tiết</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Địa điểm</p>
                    <p className="text-sm font-medium text-gray-900">{koc.location || 'Chưa cập nhật'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đánh giá</p>
                    <div className="flex items-center gap-1">
                      <HiStar className="w-4 h-4 text-yellow-500" />
                      <p className="text-sm font-medium text-gray-900">{koc.rating || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cấp độ</p>
                    <AppleBadge variant={getLevelBadgeVariant(koc.level)}>
                      {koc.level || 'Chưa xác định'}
                    </AppleBadge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tổng điểm</p>
                    <p className="text-sm font-medium text-gray-900">{koc.totalPoints?.toLocaleString('vi-VN') || '0'}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Chọn một KOC để xem chi tiết
            </div>
          )}
          searchable
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          splitRatio={30}
          isLoading={isLoading}
          labels={{
            searchPlaceholder: "Tìm kiếm KOC...",
            noItemsText: "Không có KOC nào",
            noSelectionText: "Chọn một KOC để xem chi tiết",
            backButton: "Quay lại",
            closeButton: "Đóng"
          }}
          listAriaLabel="Danh sách KOC"
          detailAriaLabel="Chi tiết KOC"
        />
        {/* External dev would use:
          <AppleListDetailShell
            items={kocs}
            selectedId={selectedKocId}
            onSelect={(koc) => setSelectedKocId(koc.id)}
            renderListItem={...}
            renderDetail={...}
            searchable
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            labels={{
              searchPlaceholder: "Search KOCs...",
              noItemsText: "No KOCs found",
              noSelectionText: "Select a KOC to view details",
              backButton: "Back",
              closeButton: "Close"
            }}
          />
        */}
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

  const userOptions = usersData?.users.map(user => ({
    value: user.id,
    label: `${user.name} (@${user.username})`
  })) || []

  const ratingOptions = ['5.0', '4.5', '4.0', '3.5', '3.0', '2.5', '2.0', '1.5', '1.0', '0.5', '0.0'].map(r => ({
    value: r,
    label: r
  }))

  const levelOptions = ['Nano', 'Micro', 'Macro', 'Celebrity', 'Diamond', 'Gold', 'Silver', 'Bronze'].map(l => ({
    value: l,
    label: l
  }))

  return (
    <AppleModal
      open={open}
      onClose={() => handleOpenChange(false)}
      title="Thêm KOC Mới"
      size="xl"
      footer={
        <div className="flex gap-3 justify-end">
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
            form="create-koc-form"
            className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
            disabled={createMutation.isPending}
            data-testid="button-submit-create-koc"
          >
            {createMutation.isPending ? "Đang xử lý..." : "Thêm KOC"}
          </Button>
        </div>
      }
    >
      <div data-testid="dialog-create-koc">
        <Form {...form}>
          <form id="create-koc-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* User Selection Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Chọn người dùng</h3>
              <FormField
                control={form.control}
                name="userId"
                render={({ field, fieldState }) => (
                  <AppleSelect
                    {...field}
                    label="Người dùng *"
                    options={[
                      { value: '', label: isLoadingUsers ? 'Đang tải...' : 'Chọn người dùng' },
                      ...userOptions
                    ]}
                    error={fieldState.error?.message}
                    data-testid="select-user"
                    disabled={isLoadingUsers || userOptions.length === 0}
                  />
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
                  render={({ field, fieldState }) => (
                    <AppleInput
                      {...field}
                      label="Facebook"
                      type="number"
                      min="0"
                      placeholder="0"
                      error={fieldState.error?.message}
                      data-testid="input-facebook-followers"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagramFollowers"
                  render={({ field, fieldState }) => (
                    <AppleInput
                      {...field}
                      label="Instagram"
                      type="number"
                      min="0"
                      placeholder="0"
                      error={fieldState.error?.message}
                      data-testid="input-instagram-followers"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="tiktokFollowers"
                  render={({ field, fieldState }) => (
                    <AppleInput
                      {...field}
                      label="TikTok"
                      type="number"
                      min="0"
                      placeholder="0"
                      error={fieldState.error?.message}
                      data-testid="input-tiktok-followers"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtubeFollowers"
                  render={({ field, fieldState }) => (
                    <AppleInput
                      {...field}
                      label="YouTube"
                      type="number"
                      min="0"
                      placeholder="0"
                      error={fieldState.error?.message}
                      data-testid="input-youtube-followers"
                    />
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
                render={({ field, fieldState }) => (
                  <AppleInput
                    {...field}
                    value={field.value || ''}
                    label="Địa điểm"
                    placeholder="Nhập địa điểm"
                    error={fieldState.error?.message}
                    data-testid="input-location"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field, fieldState }) => (
                  <AppleSelect
                    {...field}
                    value={field.value || ''}
                    label="Đánh giá"
                    options={[
                      { value: '', label: 'Chọn đánh giá' },
                      ...ratingOptions
                    ]}
                    error={fieldState.error?.message}
                    data-testid="select-rating"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field, fieldState }) => (
                  <AppleSelect
                    {...field}
                    value={field.value || ''}
                    label="Cấp độ"
                    options={[
                      { value: '', label: 'Chọn cấp độ' },
                      ...levelOptions
                    ]}
                    error={fieldState.error?.message}
                    data-testid="select-level"
                  />
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

          </form>
        </Form>
      </div>
    </AppleModal>
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

  const userOptions = usersData?.users.map(user => ({
    value: user.id,
    label: `${user.name} (@${user.username})`
  })) || []

  const ratingOptions = ['5.0', '4.5', '4.0', '3.5', '3.0', '2.5', '2.0', '1.5', '1.0', '0.5', '0.0'].map(r => ({
    value: r,
    label: r
  }))

  const levelOptions = ['Nano', 'Micro', 'Macro', 'Celebrity', 'Diamond', 'Gold', 'Silver', 'Bronze'].map(l => ({
    value: l,
    label: l
  }))

  return (
    <AppleModal
      open={open}
      onClose={() => handleOpenChange(false)}
      title="Chỉnh sửa KOC"
      size="xl"
      footer={
        <div className="flex gap-3 justify-end">
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
            form="edit-koc-form"
            className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
            disabled={updateMutation.isPending}
            data-testid="button-submit-edit-koc"
          >
            {updateMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </div>
      }
    >
      <div data-testid="dialog-edit-koc">
        <Form {...form}>
          <form id="edit-koc-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* User Selection Section - Disabled/Read-only */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Người dùng</h3>
              <FormField
                control={form.control}
                name="userId"
                render={({ field, fieldState }) => (
                  <AppleSelect
                    {...field}
                    label="Người dùng *"
                    options={[
                      { value: '', label: isLoadingUsers ? 'Đang tải...' : 'Chọn người dùng' },
                      ...userOptions
                    ]}
                    error={fieldState.error?.message}
                    data-testid="select-user-edit"
                    disabled={true}
                  />
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
                  render={({ field, fieldState }) => (
                    <AppleInput
                      {...field}
                      label="Facebook"
                      type="number"
                      min="0"
                      placeholder="0"
                      error={fieldState.error?.message}
                      data-testid="input-facebook-followers-edit"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagramFollowers"
                  render={({ field, fieldState }) => (
                    <AppleInput
                      {...field}
                      label="Instagram"
                      type="number"
                      min="0"
                      placeholder="0"
                      error={fieldState.error?.message}
                      data-testid="input-instagram-followers-edit"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="tiktokFollowers"
                  render={({ field, fieldState }) => (
                    <AppleInput
                      {...field}
                      label="TikTok"
                      type="number"
                      min="0"
                      placeholder="0"
                      error={fieldState.error?.message}
                      data-testid="input-tiktok-followers-edit"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtubeFollowers"
                  render={({ field, fieldState }) => (
                    <AppleInput
                      {...field}
                      label="YouTube"
                      type="number"
                      min="0"
                      placeholder="0"
                      error={fieldState.error?.message}
                      data-testid="input-youtube-followers-edit"
                    />
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
                render={({ field, fieldState }) => (
                  <AppleInput
                    {...field}
                    value={field.value || ''}
                    label="Địa điểm"
                    placeholder="Nhập địa điểm"
                    error={fieldState.error?.message}
                    data-testid="input-location-edit"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field, fieldState }) => (
                  <AppleSelect
                    {...field}
                    value={field.value || ''}
                    label="Đánh giá"
                    options={[
                      { value: '', label: 'Chọn đánh giá' },
                      ...ratingOptions
                    ]}
                    error={fieldState.error?.message}
                    data-testid="select-rating-edit"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field, fieldState }) => (
                  <AppleSelect
                    {...field}
                    value={field.value || ''}
                    label="Cấp độ"
                    options={[
                      { value: '', label: 'Chọn cấp độ' },
                      ...levelOptions
                    ]}
                    error={fieldState.error?.message}
                    data-testid="select-level-edit"
                  />
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

          </form>
        </Form>
      </div>
    </AppleModal>
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

  const handleDelete = () => {
    deleteMutation.mutate(kocToDelete.userId)
  }

  return (
    <AppleDialog
      open={open}
      onClose={() => onOpenChange(false)}
      title="Xác nhận xóa KOC"
      variant="danger"
      confirmText="Xóa"
      cancelText="Hủy"
      onConfirm={handleDelete}
      onCancel={() => onOpenChange(false)}
      data-testid="dialog-delete-koc"
    >
      <p className="text-sm text-gray-600">
        Bạn có chắc chắn muốn xóa KOC <strong>{kocToDelete.name}</strong> (@{kocToDelete.username}) khỏi hệ thống?
        Hành động này không thể hoàn tác.
      </p>
    </AppleDialog>
  )
}
