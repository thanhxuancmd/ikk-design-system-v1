import { useState, useMemo, useEffect } from 'react'
import { 
  HiMagnifyingGlass,
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
import { Textarea } from "@/components/ui/textarea"
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-brand-form">
        <DialogHeader>
          <DialogTitle data-testid="dialog-title-brand">
            {isEdit ? "Chỉnh sửa thương hiệu" : "Thêm mới thương hiệu"}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? "Cập nhật thông tin thương hiệu" : "Điền thông tin để tạo thương hiệu mới"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã thương hiệu <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} placeholder="VD: BRAND001" data-testid="input-brand-id" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên thương hiệu <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nhập tên thương hiệu" data-testid="input-brand-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brandType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại hình <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger data-testid="select-brand-type">
                          <SelectValue placeholder="Chọn loại hình" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bank">Bank</SelectItem>
                        <SelectItem value="Fintech">Fintech</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Securities">Securities</SelectItem>
                        <SelectItem value="E-wallet">E-wallet</SelectItem>
                        <SelectItem value="Investment">Investment</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngành nghề <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} placeholder="VD: Tài chính" data-testid="input-industry" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} placeholder="Nhập danh mục" data-testid="input-category" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalCampaigns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số chiến dịch</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        placeholder="0"
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        data-testid="input-total-campaigns"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avgReward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phần thưởng TB</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        placeholder="0"
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        data-testid="input-avg-reward"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platforms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nền tảng</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} placeholder="VD: Facebook,Instagram" data-testid="input-platforms" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} placeholder="https://example.com" data-testid="input-website" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email liên hệ</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} type="email" placeholder="contact@example.com" data-testid="input-contact-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ''} placeholder="Nhập mô tả thương hiệu" rows={3} data-testid="input-description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
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
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-view-brand">
        <DialogHeader>
          <DialogTitle data-testid="dialog-title-view">Chi tiết thương hiệu</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của thương hiệu
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
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
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-close-view"
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent data-testid="dialog-delete-brand">
        <AlertDialogHeader>
          <AlertDialogTitle data-testid="dialog-title-delete">Xác nhận xóa</AlertDialogTitle>
          <AlertDialogDescription data-testid="dialog-description-delete">
            Bạn có chắc chắn muốn xóa thương hiệu <strong>{brand?.name}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="button-cancel-delete">Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => brand?.id && deleteMutation.mutate(brand.id)}
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteMutation.isPending}
            data-testid="button-confirm-delete"
          >
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
          
          <div className="relative mb-4">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên thương hiệu"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
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
