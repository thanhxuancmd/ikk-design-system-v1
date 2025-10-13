import { useState, useMemo, useEffect } from 'react'
import { 
  HiChevronDown,
  HiSquares2X2,
  HiListBullet,
  HiCheckCircle,
  HiClock,
  HiEye,
  HiPencil,
  HiTrash,
  HiPlus
} from "react-icons/hi2"
import { Loader2 } from "lucide-react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { 
  AppleDialog,
  AppleInput, 
  AppleSelect,
  AppleTextarea,
  AppleSearchBar 
} from "@/components/apple"
import IKKAdminLayout from "@/components/ikk-admin-layout"
import type { Brand, InsertBrand } from "@shared/schema"
import { insertBrandSchema } from "@shared/schema"
import { apiRequest, queryClient } from "@/lib/queryClient"

interface BrandFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brand?: Brand | null
}

function BrandFormDialog({ open, onOpenChange, brand }: BrandFormDialogProps) {
  const { toast } = useToast()
  const isEdit = !!brand

  const form = useForm<InsertBrand>({
    resolver: zodResolver(insertBrandSchema),
    defaultValues: {
      brandId: '',
      name: '',
      logo: '',
      brandType: '',
      industry: '',
      description: '',
      category: '',
      totalCampaigns: 0,
      avgReward: 0,
      platforms: '',
      status: 'Active',
      website: '',
      contactEmail: '',
    },
  })

  // Reset form when brand changes or dialog opens
  useEffect(() => {
    if (open) {
      if (brand) {
        form.reset({
          brandId: brand.brandId || '',
          name: brand.name || '',
          logo: brand.logo || '',
          brandType: brand.brandType || '',
          industry: brand.industry || '',
          description: brand.description || '',
          category: brand.category || '',
          totalCampaigns: brand.totalCampaigns || 0,
          avgReward: brand.avgReward || 0,
          platforms: brand.platforms || '',
          status: brand.status || 'Active',
          website: brand.website || '',
          contactEmail: brand.contactEmail || '',
        })
      } else {
        form.reset({
          brandId: '',
          name: '',
          logo: '',
          brandType: '',
          industry: '',
          description: '',
          category: '',
          totalCampaigns: 0,
          avgReward: 0,
          platforms: '',
          status: 'Active',
          website: '',
          contactEmail: '',
        })
      }
    }
  }, [open, brand, form])

  const createMutation = useMutation({
    mutationFn: async (data: InsertBrand) => {
      const res = await apiRequest('POST', '/api/brands', data)
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/brands'] })
      toast({
        title: "Đã tạo thương hiệu thành công",
      })
      onOpenChange(false)
      form.reset()
    },
    onError: () => {
      toast({
        title: "Không thể tạo thương hiệu",
        variant: "destructive",
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: InsertBrand) => {
      const res = await apiRequest('PATCH', `/api/brands/${brand?.id}`, data)
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/brands'] })
      toast({
        title: "Đã cập nhật thương hiệu",
      })
      onOpenChange(false)
    },
    onError: () => {
      toast({
        title: "Không thể cập nhật thương hiệu",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (data: InsertBrand) => {
    if (isEdit) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  const brandTypeOptions = [
    { value: '', label: 'Chọn loại hình' },
    { value: 'Bank', label: 'Bank' },
    { value: 'Fintech', label: 'Fintech' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Securities', label: 'Securities' },
    { value: 'E-wallet', label: 'E-wallet' },
    { value: 'Investment', label: 'Investment' },
  ]

  const statusOptions = [
    { value: '', label: 'Chọn trạng thái' },
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
  ]

  return (
    <AppleDialog
      open={open}
      onClose={() => onOpenChange(false)}
      title={isEdit ? "Chỉnh sửa thương hiệu" : "Thêm mới thương hiệu"}
      size="lg"
    >
      <p className="text-sm text-gray-600 mb-4" data-testid="dialog-description-brand">
        {isEdit ? "Cập nhật thông tin thương hiệu" : "Điền thông tin để tạo thương hiệu mới"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-brand">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="brandId"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleInput
                    {...field}
                    value={field.value || ''}
                    label="Mã thương hiệu *"
                    placeholder="VD: BRAND001"
                    error={fieldState.error?.message}
                    data-testid="input-brand-id"
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleInput
                    {...field}
                    label="Tên thương hiệu *"
                    placeholder="Nhập tên thương hiệu"
                    error={fieldState.error?.message}
                    data-testid="input-brand-name"
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="brandType"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleSelect
                    {...field}
                    label="Loại hình *"
                    options={brandTypeOptions}
                    value={field.value || ''}
                    error={fieldState.error?.message}
                    data-testid="select-brand-type"
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleInput
                    {...field}
                    value={field.value || ''}
                    label="Ngành nghề *"
                    placeholder="VD: Tài chính"
                    error={fieldState.error?.message}
                    data-testid="input-industry"
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleInput
                    {...field}
                    value={field.value || ''}
                    label="Danh mục"
                    placeholder="Nhập danh mục"
                    error={fieldState.error?.message}
                    data-testid="input-category"
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleSelect
                    {...field}
                    label="Trạng thái"
                    options={statusOptions}
                    value={field.value || ''}
                    error={fieldState.error?.message}
                    data-testid="select-status"
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="totalCampaigns"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleInput
                    {...field}
                    type="number"
                    label="Số chiến dịch"
                    placeholder="0"
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    error={fieldState.error?.message}
                    data-testid="input-total-campaigns"
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="avgReward"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleInput
                    {...field}
                    type="number"
                    label="Phần thưởng TB"
                    placeholder="0"
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    error={fieldState.error?.message}
                    data-testid="input-avg-reward"
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="platforms"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleInput
                    {...field}
                    value={field.value || ''}
                    label="Nền tảng"
                    placeholder="VD: Facebook,Instagram"
                    error={fieldState.error?.message}
                    data-testid="input-platforms"
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleInput
                    {...field}
                    value={field.value || ''}
                    label="Website"
                    placeholder="https://example.com"
                    error={fieldState.error?.message}
                    data-testid="input-website"
                  />
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field, fieldState }) => (
                <FormControl>
                  <AppleInput
                    {...field}
                    value={field.value || ''}
                    type="email"
                    label="Email liên hệ"
                    placeholder="contact@example.com"
                    error={fieldState.error?.message}
                    data-testid="input-contact-email"
                  />
                </FormControl>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <FormControl>
                <AppleTextarea
                  {...field}
                  value={field.value || ''}
                  label="Mô tả"
                  placeholder="Nhập mô tả thương hiệu"
                  rows={3}
                  error={fieldState.error?.message}
                  data-testid="input-description"
                />
              </FormControl>
            )}
          />

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              data-testid="button-cancel-brand"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
              disabled={isPending}
              data-testid="button-submit-brand"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </form>
      </Form>
    </AppleDialog>
  )
}

interface ViewBrandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brand: Brand | null
}

function ViewBrandDialog({ open, onOpenChange, brand }: ViewBrandDialogProps) {
  if (!brand) return null

  return (
    <AppleDialog
      open={open}
      onClose={() => onOpenChange(false)}
      title="Chi tiết thương hiệu"
      size="lg"
    >
      <p className="text-sm text-gray-600 mb-4">Xem thông tin chi tiết của thương hiệu</p>
      <div className="space-y-4" data-testid="dialog-view-brand">
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff0086] to-purple-600 flex items-center justify-center text-white font-semibold text-2xl">
            {brand.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900" data-testid="text-brand-name">{brand.name}</h3>
            <p className="text-sm text-gray-500 font-mono" data-testid="text-brand-id">{brand.brandId || brand.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Loại hình</label>
            <p className="mt-1 text-sm text-gray-900" data-testid="text-brand-type">{brand.brandType || 'Chưa cập nhật'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Ngành nghề</label>
            <p className="mt-1 text-sm text-gray-900" data-testid="text-industry">{brand.industry || 'Chưa cập nhật'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Danh mục</label>
            <p className="mt-1 text-sm text-gray-900" data-testid="text-category">{brand.category || 'Chưa cập nhật'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Trạng thái</label>
            <div className="mt-1" data-testid="text-status">
              <Badge className={brand.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                {brand.status || 'Pending'}
              </Badge>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Số chiến dịch</label>
            <p className="mt-1 text-sm text-gray-900" data-testid="text-total-campaigns">{brand.totalCampaigns || 0}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Phần thưởng trung bình</label>
            <p className="mt-1 text-sm text-gray-900" data-testid="text-avg-reward">
              {brand.avgReward ? `${brand.avgReward.toLocaleString('vi-VN')}đ` : 'Chưa cập nhật'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Nền tảng</label>
            <p className="mt-1 text-sm text-gray-900" data-testid="text-platforms">{brand.platforms || 'Chưa cập nhật'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Website</label>
            <p className="mt-1 text-sm text-gray-900" data-testid="text-website">
              {brand.website ? (
                <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-[#ff0086] hover:underline">
                  {brand.website}
                </a>
              ) : 'Chưa cập nhật'}
            </p>
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700">Email liên hệ</label>
            <p className="mt-1 text-sm text-gray-900" data-testid="text-contact-email">{brand.contactEmail || 'Chưa cập nhật'}</p>
          </div>
        </div>

        {brand.description && (
          <div>
            <label className="text-sm font-medium text-gray-700">Mô tả</label>
            <p className="mt-1 text-sm text-gray-900" data-testid="text-description">{brand.description}</p>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-close-view"
          >
            Đóng
          </Button>
        </div>
      </div>
    </AppleDialog>
  )
}

interface DeleteBrandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brand: Brand | null
}

function DeleteBrandDialog({ open, onOpenChange, brand }: DeleteBrandDialogProps) {
  const { toast } = useToast()

  const deleteMutation = useMutation({
    mutationFn: async (brandId: string) => {
      await apiRequest('DELETE', `/api/brands/${brandId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/brands'] })
      toast({
        title: "Đã xóa thương hiệu",
      })
      onOpenChange(false)
    },
    onError: () => {
      toast({
        title: "Không thể xóa thương hiệu",
        variant: "destructive",
      })
    },
  })

  return (
    <AppleDialog
      open={open}
      onClose={() => onOpenChange(false)}
      title="Xác nhận xóa"
      variant="destructive"
    >
      <div data-testid="dialog-delete-brand">
        <p className="text-sm text-gray-700 mb-2" data-testid="dialog-description-delete">
          Bạn có chắc chắn muốn xóa thương hiệu <strong>{brand?.name}</strong>?
        </p>
        <p className="text-sm text-gray-600">Hành động này không thể hoàn tác.</p>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={deleteMutation.isPending}
            data-testid="button-cancel-delete"
          >
            Hủy
          </Button>
          <Button 
            variant="destructive"
            onClick={() => brand?.id && deleteMutation.mutate(brand.id)}
            disabled={deleteMutation.isPending}
            data-testid="button-confirm-delete"
          >
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa thương hiệu"}
          </Button>
        </div>
      </div>
    </AppleDialog>
  )
}

export default function AdminBrandsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedBrandTypes, setSelectedBrandTypes] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [sortBy, setSortBy] = useState<{ field: string; order: 'asc' | 'desc' } | null>(null)
  
  const [brandFormOpen, setBrandFormOpen] = useState(false)
  const [brandToEdit, setBrandToEdit] = useState<Brand | null>(null)
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null)
  const [brandToView, setBrandToView] = useState<Brand | null>(null)

  const { data: brandsData, isLoading } = useQuery<{ brands: Brand[] }>({
    queryKey: ['/api/brands']
  })

  const brands = brandsData?.brands || []

  const industries = useMemo(() => {
    const uniqueIndustries = new Set<string>()
    brands.forEach(brand => {
      if (brand.industry) uniqueIndustries.add(brand.industry)
    })
    return Array.from(uniqueIndustries).sort()
  }, [brands])

  const brandTypes = useMemo(() => {
    const uniqueTypes = new Set<string>()
    brands.forEach(brand => {
      if (brand.brandType) uniqueTypes.add(brand.brandType)
    })
    return Array.from(uniqueTypes).sort()
  }, [brands])

  const filteredBrands = useMemo(() => {
    let filtered = [...brands]

    if (searchTerm) {
      filtered = filtered.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(brand => brand.industry === selectedCategory)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(brand => {
        if (selectedStatus === 'Active') return brand.status === 'Active'
        if (selectedStatus === 'Pending') return brand.status !== 'Active'
        return true
      })
    }

    if (selectedBrandTypes.length > 0) {
      filtered = filtered.filter(brand => 
        brand.brandType && selectedBrandTypes.includes(brand.brandType)
      )
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        let aVal: any = a[sortBy.field as keyof Brand]
        let bVal: any = b[sortBy.field as keyof Brand]

        if (typeof aVal === 'string') aVal = aVal.toLowerCase()
        if (typeof bVal === 'string') bVal = bVal.toLowerCase()

        if (aVal < bVal) return sortBy.order === 'asc' ? -1 : 1
        if (aVal > bVal) return sortBy.order === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [brands, searchTerm, selectedCategory, selectedStatus, selectedBrandTypes, sortBy])

  const handleSort = (field: string) => {
    setSortBy(prev => {
      if (prev?.field === field) {
        return prev.order === 'asc' ? { field, order: 'desc' } : null
      }
      return { field, order: 'asc' }
    })
  }

  const handleReset = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedStatus('all')
    setSelectedBrandTypes([])
    setSortBy(null)
  }

  const toggleBrandType = (type: string) => {
    setSelectedBrandTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleViewBrand = (brand: Brand) => {
    setBrandToView(brand)
  }

  const handleEditBrand = (brand: Brand) => {
    setBrandToEdit(brand)
    setBrandFormOpen(true)
  }

  const handleDeleteBrand = (brand: Brand) => {
    setBrandToDelete(brand)
  }

  const handleCreateBrand = () => {
    setBrandToEdit(null)
    setBrandFormOpen(true)
  }

  return (
    <IKKAdminLayout>
      <section className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-brand-management">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900" data-testid="heading-brand-management">Thị trường Thương hiệu</h2>
            <Button 
              className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
              onClick={handleCreateBrand}
              data-testid="button-create-brand"
            >
              <HiPlus className="w-5 h-5 mr-2" />
              Thêm mới thương hiệu
            </Button>
          </div>
          
          <div className="mb-4">
            <AppleSearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onSearch={(query) => {
                console.log('Tìm kiếm:', query)
              }}
              placeholder="Tìm kiếm thương hiệu..."
              data-testid="input-search-brand"
            />
          </div>

          <div className="mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Ngành hàng</span>
              <Badge 
                className={`${selectedCategory === 'all' ? 'bg-[#ff0086] text-white hover:bg-[#e6007a]' : 'bg-white hover:bg-gray-50'} border-0 cursor-pointer`}
                data-testid="chip-category-all"
                onClick={() => setSelectedCategory('all')}
              >
                Tất cả
              </Badge>
              {industries.map((industry, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className={`${selectedCategory === industry ? 'bg-[#ff0086] text-white border-[#ff0086]' : 'bg-white hover:bg-gray-50'} cursor-pointer`}
                  data-testid={`chip-category-${idx}`}
                  onClick={() => setSelectedCategory(industry)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Trạng thái</span>
              <Badge 
                className={`${selectedStatus === 'all' ? 'bg-[#ff0086] text-white hover:bg-[#e6007a]' : 'bg-white hover:bg-gray-50'} border-0 cursor-pointer`}
                data-testid="chip-status-all"
                onClick={() => setSelectedStatus('all')}
              >
                Tất cả
              </Badge>
              {[
                { name: 'Hoạt động', value: 'Active', icon: <HiCheckCircle className="w-3 h-3" /> },
                { name: 'Chờ duyệt', value: 'Pending', icon: <HiClock className="w-3 h-3" /> },
              ].map((status, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className={`${selectedStatus === status.value ? 'bg-[#ff0086] text-white border-[#ff0086]' : 'bg-white hover:bg-gray-50'} cursor-pointer flex items-center gap-1`}
                  data-testid={`chip-status-${idx}`}
                  onClick={() => setSelectedStatus(status.value)}
                >
                  {status.icon}
                  {status.name}
                </Badge>
              ))}
            </div>
          </div>

          {brandTypes.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">Loại hình</span>
                {brandTypes.map((type, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className={`${selectedBrandTypes.includes(type) ? 'bg-[#ff0086] text-white border-[#ff0086]' : 'bg-white hover:bg-gray-50'} cursor-pointer flex items-center gap-1`}
                    data-testid={`toggle-brand-type-${idx}`}
                    onClick={() => toggleBrandType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <Button 
              className="bg-[#ff0086] hover:bg-[#e6007a] text-white" 
              data-testid="button-apply-filters"
              onClick={() => {
                toast({
                  title: "Đã áp dụng bộ lọc",
                  description: `Đang hiển thị ${filteredBrands.length} thương hiệu`,
                })
              }}
            >
              Áp dụng
            </Button>
            <Button 
              variant="outline" 
              data-testid="button-reset-filters"
              onClick={handleReset}
            >
              Đặt Lại
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900" data-testid="heading-brand-list">
            Danh sách Thương hiệu ({filteredBrands.length})
          </h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              data-testid="btn-view-grid"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gray-100' : ''}
            >
              <HiSquares2X2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              data-testid="btn-view-list"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-gray-100' : ''}
            >
              <HiListBullet className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <Card className="bg-white border-gray-100">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-brand">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-brand">Tên thương hiệu</th>
                      <th 
                        className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100" 
                        data-testid="col-type"
                        onClick={() => handleSort('brandType')}
                      >
                        Loại hình
                        <HiChevronDown className={`w-3 h-3 inline ml-1 transition-transform ${sortBy?.field === 'brandType' && sortBy?.order === 'desc' ? 'rotate-180' : ''}`} />
                      </th>
                      <th 
                        className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100" 
                        data-testid="col-industry"
                        onClick={() => handleSort('industry')}
                      >
                        Ngành nghề
                        <HiChevronDown className={`w-3 h-3 inline ml-1 transition-transform ${sortBy?.field === 'industry' && sortBy?.order === 'desc' ? 'rotate-180' : ''}`} />
                      </th>
                      <th 
                        className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100" 
                        data-testid="col-campaigns"
                        onClick={() => handleSort('totalCampaigns')}
                      >
                        Chiến dịch
                        <HiChevronDown className={`w-3 h-3 inline ml-1 transition-transform ${sortBy?.field === 'totalCampaigns' && sortBy?.order === 'desc' ? 'rotate-180' : ''}`} />
                      </th>
                      <th 
                        className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100" 
                        data-testid="col-reward"
                        onClick={() => handleSort('avgReward')}
                      >
                        Phần thưởng TB
                        <HiChevronDown className={`w-3 h-3 inline ml-1 transition-transform ${sortBy?.field === 'avgReward' && sortBy?.order === 'desc' ? 'rotate-180' : ''}`} />
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-platforms">Nền tảng</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-actions">Hoạt động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          Đang tải...
                        </td>
                      </tr>
                    ) : filteredBrands.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          Không tìm thấy thương hiệu nào
                        </td>
                      </tr>
                    ) : (
                      filteredBrands.map((brand) => (
                        <tr key={brand.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid={`row-brand-${brand.id}`}>
                          <td className="py-4 px-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff0086] to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-semibold">
                                {brand.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-900">{brand.name}</span>
                                </div>
                                <div className="text-xs text-gray-500 mb-1 font-mono">{brand.brandId || brand.id}</div>
                                <div className="flex items-center gap-1 mb-1">
                                  {brand.status === 'Active' ? (
                                    <HiCheckCircle className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <HiClock className="w-3 h-3 text-orange-500" />
                                  )}
                                  <span className="text-xs text-gray-500">
                                    {brand.status || 'Chờ duyệt'}
                                  </span>
                                </div>
                                {brand.category && (
                                  <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">
                                    {brand.category}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-900">{brand.brandType || '-'}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-900">{brand.industry || '-'}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-900">{brand.totalCampaigns || 0}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-900">
                              {brand.avgReward ? `${brand.avgReward.toLocaleString('vi-VN')}đ` : '-'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-wrap gap-1">
                              {brand.platforms?.split(',').map((platform, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs px-1 py-0 h-5">
                                  {platform.trim()}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8"
                                data-testid={`btn-view-${brand.id}`}
                                onClick={() => handleViewBrand(brand)}
                              >
                                <HiEye className="w-4 h-4 text-gray-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8"
                                data-testid={`btn-edit-${brand.id}`}
                                onClick={() => handleEditBrand(brand)}
                              >
                                <HiPencil className="w-4 h-4 text-gray-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8"
                                data-testid={`btn-delete-${brand.id}`}
                                onClick={() => handleDeleteBrand(brand)}
                              >
                                <HiTrash className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading ? (
              <div className="col-span-full py-8 text-center text-gray-500">
                Đang tải...
              </div>
            ) : filteredBrands.length === 0 ? (
              <div className="col-span-full py-8 text-center text-gray-500">
                Không tìm thấy thương hiệu nào
              </div>
            ) : (
              filteredBrands.map((brand) => (
                <Card key={brand.id} className="bg-white border-gray-100 hover:shadow-md transition-shadow" data-testid={`card-brand-${brand.id}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center mb-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff0086] to-purple-600 flex items-center justify-center text-white font-semibold text-xl mb-3">
                        {brand.name.charAt(0).toUpperCase()}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{brand.name}</h4>
                      <p className="text-xs text-gray-500 font-mono mb-2">{brand.brandId || brand.id}</p>
                      <Badge className="bg-gray-100 text-gray-700 border-0 text-xs mb-2">
                        {brand.industry || 'Chưa cập nhật'}
                      </Badge>
                      <div className="flex items-center gap-1 mb-2">
                        {brand.status === 'Active' ? (
                          <HiCheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <HiClock className="w-3 h-3 text-orange-500" />
                        )}
                        <span className="text-xs text-gray-500">
                          {brand.status || 'Chờ duyệt'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Chiến dịch:</span>
                        <span className="font-medium text-gray-900">{brand.totalCampaigns || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Phần thưởng TB:</span>
                        <span className="font-medium text-gray-900">
                          {brand.avgReward ? `${brand.avgReward.toLocaleString('vi-VN')}đ` : '-'}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Nền tảng:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {brand.platforms?.split(',').map((platform, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs px-1 py-0 h-5">
                              {platform.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        data-testid={`btn-view-grid-${brand.id}`}
                        onClick={() => handleViewBrand(brand)}
                      >
                        <HiEye className="w-4 h-4 mr-1" />
                        Xem
                      </Button>
                      <Button
                        className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white"
                        size="sm"
                        data-testid={`btn-edit-grid-${brand.id}`}
                        onClick={() => handleEditBrand(brand)}
                      >
                        <HiPencil className="w-4 h-4 mr-1" />
                        Sửa
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-8 w-8"
                        data-testid={`btn-delete-grid-${brand.id}`}
                        onClick={() => handleDeleteBrand(brand)}
                      >
                        <HiTrash className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </section>

      <ViewBrandDialog
        open={!!brandToView}
        onOpenChange={(open) => !open && setBrandToView(null)}
        brand={brandToView}
      />

      <BrandFormDialog
        open={brandFormOpen}
        onOpenChange={setBrandFormOpen}
        brand={brandToEdit}
      />

      <DeleteBrandDialog
        open={!!brandToDelete}
        onOpenChange={(open) => !open && setBrandToDelete(null)}
        brand={brandToDelete}
      />
    </IKKAdminLayout>
  )
}
