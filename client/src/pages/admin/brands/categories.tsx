import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Folder,
  Search,
  Pencil,
  Trash,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Download,
  Sparkles,
  Smartphone,
  ShoppingBag,
  MapPin,
  Grid2x2,
  Heart,
  Trophy,
  Video,
  Utensils,
  Coffee,
  Plane,
  Gamepad2,
  GraduationCap,
  DollarSign,
  Wand2,
  Baby,
  Home,
  Pill,
  Sofa,
  Flower2,
  Package,
  FolderOpen,
  Grid3x3,
  SearchX,
  X,
  Table,
  List,
  LucideIcon
} from "lucide-react"
import IKKAdminLayout from "@/components/ikk-admin-layout"
import { categories as initialCategories, type Category } from "@shared/categories"

const iconMap: Record<string, LucideIcon> = {
  'Package': Package,
  'Sparkles': Sparkles,
  'Smartphone': Smartphone,
  'ShoppingBag': ShoppingBag,
  'MapPin': MapPin,
  'Grid2x2': Grid2x2,
  'Heart': Heart,
  'Trophy': Trophy,
  'Video': Video,
  'Coffee': Coffee,
  'Plane': Plane,
  'Gamepad2': Gamepad2,
  'GraduationCap': GraduationCap,
  'DollarSign': DollarSign,
  'Wand2': Wand2,
  'Baby': Baby,
  'Pill': Pill,
  'Sofa': Sofa,
  'Flower2': Flower2,
  'Utensils': Utensils,
  'Home': Home,
  'FolderOpen': FolderOpen,
  'Grid3x3': Grid3x3,
  'Folder': Folder
}

interface IconPickerProps {
  value: string
  onChange: (iconName: string) => void
}

function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false)
  const iconNames = Object.keys(iconMap)
  const SelectedIcon = value ? iconMap[value] : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start border-gray-300 hover:border-[#ff0086] focus:border-[#ff0086] focus:ring-[#ff0086]/20"
          data-testid="button-icon-picker-trigger"
        >
          {SelectedIcon ? (
            <div className="flex items-center gap-2">
              <SelectedIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">{value}</span>
            </div>
          ) : (
            <span className="text-gray-400">Chọn icon...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" data-testid="popover-icon-picker">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">Chọn icon cho danh mục</p>
          <div className="grid grid-cols-6 gap-2">
            {iconNames.map(iconName => {
              const IconComponent = iconMap[iconName]
              const isSelected = value === iconName
              return (
                <button
                  key={iconName}
                  onClick={() => {
                    onChange(iconName)
                    setOpen(false)
                  }}
                  className={`p-2 hover:bg-pink-50 rounded-lg border-2 transition-all ${
                    isSelected 
                      ? 'border-[#ff0086] bg-pink-50' 
                      : 'border-transparent hover:border-pink-300'
                  }`}
                  title={iconName}
                  data-testid={`icon-option-${iconName}`}
                >
                  <IconComponent className={`w-6 h-6 ${isSelected ? 'text-[#ff0086]' : 'text-gray-600'}`} />
                </button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const getCategoryIcon = (name: string, slug: string, iconName?: string) => {
  const iconClass = "w-5 h-5"
  
  if (iconName && iconMap[iconName]) {
    const IconComponent = iconMap[iconName]
    return <IconComponent className={`${iconClass} text-gray-600`} />
  }
  
  if (name.includes('Làm đẹp') || slug.includes('beauty')) {
    return <Sparkles className={`${iconClass} text-pink-600`} />
  }
  if (name.includes('Công nghệ') || slug.includes('tech')) {
    return <Smartphone className={`${iconClass} text-blue-600`} />
  }
  if (name.includes('Ẩm thực') || name.includes('Đồ ăn') || name.includes('thức uống') || slug.includes('food') || slug.includes('beverage')) {
    return <ShoppingBag className={`${iconClass} text-orange-600`} />
  }
  if (name.includes('Du lịch') || slug.includes('travel')) {
    return <MapPin className={`${iconClass} text-green-600`} />
  }
  if (name.includes('Thời trang') || slug.includes('fashion')) {
    return <Grid2x2 className={`${iconClass} text-rose-600`} />
  }
  if (name.includes('Lối sống') || name.includes('Lifestyle') || slug.includes('lifestyle')) {
    return <Heart className={`${iconClass} text-purple-600`} />
  }
  if (name.includes('Thể thao')) {
    return <Trophy className={`${iconClass} text-red-600`} />
  }
  if (name.includes('Giải trí') || slug.includes('entertainment')) {
    return <Video className={`${iconClass} text-yellow-600`} />
  }
  if (name.includes('Nhà hàng') || name.includes('cà phê') || slug.includes('restaurants')) {
    return <Coffee className={`${iconClass} text-amber-600`} />
  }
  if (name.includes('Game') || slug.includes('game')) {
    return <Gamepad2 className={`${iconClass} text-indigo-600`} />
  }
  if (name.includes('Giáo dục') || slug.includes('education')) {
    return <GraduationCap className={`${iconClass} text-teal-600`} />
  }
  if (name.includes('Tài chính') || slug.includes('finance')) {
    return <DollarSign className={`${iconClass} text-emerald-600`} />
  }
  if (name.includes('Phong thuỷ') || slug.includes('feng_shui')) {
    return <Wand2 className={`${iconClass} text-violet-600`} />
  }
  if (name.includes('Mẹ và bé') || slug.includes('mom_baby')) {
    return <Baby className={`${iconClass} text-pink-500`} />
  }
  if (name.includes('Mỹ phẩm') || slug.includes('cosmetics')) {
    return <Sparkles className={`${iconClass} text-pink-500`} />
  }
  if (name.includes('Dược phẩm') || slug.includes('pharma')) {
    return <Pill className={`${iconClass} text-red-500`} />
  }
  if (name.includes('Nội thất') || slug.includes('furniture')) {
    return <Sofa className={`${iconClass} text-brown-600`} />
  }
  if (name.includes('Thú cưng') || slug.includes('pet')) {
    return <Flower2 className={`${iconClass} text-orange-500`} />
  }
  
  return <Package className={`${iconClass} text-gray-600`} />
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'MAIN': return 'bg-purple-100 text-purple-700'
    case 'PRODUCT': return 'bg-blue-100 text-blue-700'
    case 'SERVICE': return 'bg-green-100 text-green-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'MAIN': return <Grid3x3 className="w-5 h-5 text-white" />
    case 'PRODUCT': return <Package className="w-5 h-5 text-white" />
    case 'SERVICE': return <FolderOpen className="w-5 h-5 text-white" />
    default: return <Folder className="w-5 h-5 text-white" />
  }
}

const ITEMS_PER_PAGE = 10

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_')
}

const validateSlug = (slug: string): { isValid: boolean; error?: string } => {
  if (!slug) {
    return { isValid: false, error: "Slug không được để trống" }
  }
  
  if (slug.length < 2) {
    return { isValid: false, error: "Slug phải có ít nhất 2 ký tự" }
  }
  
  const slugRegex = /^[a-z0-9_-]+$/
  if (!slugRegex.test(slug)) {
    return { 
      isValid: false, 
      error: "Slug chỉ được chứa chữ thường, số, gạch dưới (_) và gạch ngang (-)" 
    }
  }
  
  return { isValid: true }
}

export default function AdminCategoriesPage() {
  const { toast } = useToast()
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedParentFilter, setSelectedParentFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<string>('category_id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)
  
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const [formData, setFormData] = useState<Category>({
    category_id: '',
    name: '',
    slug: '',
    type: 'MAIN',
    parent_id: '',
    icon_number: '',
    description: ''
  })
  
  const [categoryToDelete, setCategoryToDelete] = useState<string>('')
  const [slugError, setSlugError] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'table' | 'tree'>('table')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  useEffect(() => {
    setSortBy('category_id')
    setSortOrder('asc')
    setCurrentPage(1)
  }, [selectedType, selectedParentFilter, searchTerm])

  useEffect(() => {
    setSelectedCategories([])
  }, [currentPage])

  const filteredCategories = categories.filter(cat => {
    const matchesType = selectedType === 'all' || cat.type === selectedType
    
    const matchesSearch = searchTerm === '' || 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.category_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesParent = (() => {
      if (selectedParentFilter === 'all') return true
      if (selectedParentFilter === 'has_parent') return !!cat.parent_id
      if (selectedParentFilter === 'no_parent') return !cat.parent_id
      // Specific parent selected
      return cat.parent_id === selectedParentFilter
    })()
    
    return matchesType && matchesSearch && matchesParent
  })

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    let aVal = a[sortBy as keyof Category]
    let bVal = b[sortBy as keyof Category]
    
    if (aVal === null || aVal === undefined) return 1
    if (bVal === null || bVal === undefined) return -1
    
    const aStr = String(aVal).toLowerCase()
    const bStr = String(bVal).toLowerCase()
    
    if (sortOrder === 'asc') {
      return aStr > bStr ? 1 : -1
    } else {
      return aStr < bStr ? 1 : -1
    }
  })

  const totalPages = Math.ceil(sortedCategories.length / ITEMS_PER_PAGE)
  const paginatedCategories = sortedCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const mainCategories = categories.filter(c => c.type === 'MAIN')
  const productCategories = categories.filter(c => c.type === 'PRODUCT')
  const serviceCategories = categories.filter(c => c.type === 'SERVICE')
  
  // Get categories that actually have children (regardless of type)
  const categoriesWithChildren = categories.filter(cat => {
    return categories.some(c => c.parent_id === cat.category_id)
  })

  const handleCreate = () => {
    if (!formData.category_id || !formData.name || !formData.slug || !formData.description) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive"
      })
      return
    }
    setIsCreating(true)
    
    setTimeout(() => {
      setCategories(prev => [...prev, formData])
      toast({
        title: "Thành công",
        description: `Danh mục ${formData.name} đã được tạo`
      })
      setIsCreateDialogOpen(false)
      setIsCreating(false)
      resetForm()
    }, 500)
  }

  const handleEdit = () => {
    if (!formData.category_id || !formData.name || !formData.slug || !formData.description) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive"
      })
      return
    }
    setIsUpdating(true)
    
    setTimeout(() => {
      setCategories(prev => prev.map(cat => 
        cat.category_id === formData.category_id ? formData : cat
      ))
      toast({
        title: "Thành công",
        description: `Danh mục ${formData.name} đã được cập nhật`
      })
      setIsEditDialogOpen(false)
      setIsUpdating(false)
      resetForm()
    }, 500)
  }

  const handleDelete = () => {
    const categoryToDeleteName = categories.find(cat => cat.category_id === categoryToDelete)?.name || ''
    setIsDeleting(true)
    
    setTimeout(() => {
      setCategories(prev => prev.filter(cat => cat.category_id !== categoryToDelete))
      toast({
        title: "Thành công",
        description: `Danh mục ${categoryToDeleteName} đã được xóa`
      })
      setIsDeleteDialogOpen(false)
      setIsDeleting(false)
      setCategoryToDelete('')
    }, 500)
  }

  const openEditDialog = (category: Category) => {
    setFormData(category)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setIsDeleteDialogOpen(true)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCategories(paginatedCategories.map(cat => cat.category_id))
    } else {
      setSelectedCategories([])
    }
  }

  const handleSelectCategory = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId])
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId))
    }
  }

  const isAllSelected = paginatedCategories.length > 0 && 
    selectedCategories.length === paginatedCategories.length

  const handleBulkExport = () => {
    const selectedData = categories.filter(cat => 
      selectedCategories.includes(cat.category_id)
    )
    
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `categories_selected_${timestamp}.csv`
    
    exportToCSV(selectedData, filename)
    
    toast({
      title: "Thành công",
      description: `Đã xuất ${selectedData.length} danh mục đã chọn`
    })
    
    setSelectedCategories([])
  }

  const handleBulkDelete = () => {
    setIsBulkDeleteDialogOpen(true)
  }

  const confirmBulkDelete = () => {
    setIsDeleting(true)
    
    setTimeout(() => {
      setCategories(prev => 
        prev.filter(cat => !selectedCategories.includes(cat.category_id))
      )
      
      toast({
        title: "Thành công",
        description: `Đã xóa ${selectedCategories.length} danh mục`
      })
      
      setSelectedCategories([])
      setIsBulkDeleteDialogOpen(false)
      setIsDeleting(false)
    }, 500)
  }

  const resetForm = () => {
    setFormData({
      category_id: '',
      name: '',
      slug: '',
      type: 'MAIN',
      parent_id: '',
      icon_number: '',
      description: ''
    })
    setSlugError('')
  }

  const getAvailableParents = (currentCategoryId: string) => {
    if (!currentCategoryId) return categories
    
    const childrenIds = new Set<string>()
    const findChildren = (parentId: string) => {
      categories.forEach(cat => {
        if (cat.parent_id === parentId && !childrenIds.has(cat.category_id)) {
          childrenIds.add(cat.category_id)
          findChildren(cat.category_id)
        }
      })
    }
    
    findChildren(currentCategoryId)
    childrenIds.add(currentCategoryId)
    
    return categories.filter(cat => !childrenIds.has(cat.category_id))
  }

  const exportToCSV = (data: Category[], filename: string) => {
    const headers = ['Category ID', 'Tên danh mục', 'Slug', 'Type', 'Parent ID', 'Icon', 'Mô tả']
    
    const csvRows = [
      headers.join(','),
      ...data.map(cat => [
        cat.category_id,
        `"${cat.name.replace(/"/g, '""')}"`,
        cat.slug,
        cat.type,
        cat.parent_id || '',
        cat.icon_number || '',
        `"${cat.description.replace(/"/g, '""')}"`
      ].join(','))
    ]
    
    const csvString = csvRows.join('\n')
    
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToJSON = (data: Category[], filename: string) => {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExport = (format: 'csv' | 'json') => {
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `categories_${timestamp}.${format}`
    
    const dataToExport = sortedCategories
    
    if (format === 'csv') {
      exportToCSV(dataToExport, filename)
      toast({
        title: "Thành công",
        description: `Đã xuất ${dataToExport.length} danh mục sang CSV`
      })
    } else {
      exportToJSON(dataToExport, filename)
      toast({
        title: "Thành công",
        description: `Đã xuất ${dataToExport.length} danh mục sang JSON`
      })
    }
  }

  const buildTree = (categories: Category[]) => {
    // Get root categories (no parent)
    const roots = categories.filter(cat => !cat.parent_id)
    
    // If no roots exist (due to filtering), treat all filtered categories as temporary roots
    if (roots.length === 0 && categories.length > 0) {
      return categories.map(cat => ({
        ...cat,
        children: [] // Filtered children shown as roots have no children in tree
      }))
    }
    
    // Function to get children recursively
    const getChildren = (parentId: string): Category[] => {
      return categories.filter(cat => cat.parent_id === parentId)
    }
    
    // Build tree structure with roots and their children
    return roots.map(root => ({
      ...root,
      children: getChildren(root.category_id)
    }))
  }

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const expandAll = () => {
    const allParents = sortedCategories
      .filter(cat => sortedCategories.some(c => c.parent_id === cat.category_id))
      .map(cat => cat.category_id)
    setExpandedCategories(allParents)
  }

  const collapseAll = () => {
    setExpandedCategories([])
  }

  const treeData = buildTree(sortedCategories)

  const TreeRow = ({ 
    category, 
    level = 0,
    hasChildren = false 
  }: { 
    category: Category & { children?: Category[] }
    level?: number
    hasChildren?: boolean
  }) => {
    const isExpanded = expandedCategories.includes(category.category_id)
    const children = category.children || []
    
    return (
      <>
        <tr className="border-b hover:bg-gray-50">
          <td className="px-6 py-4 w-12">
            <Checkbox
              checked={selectedCategories.includes(category.category_id)}
              onCheckedChange={(checked) => handleSelectCategory(category.category_id, checked as boolean)}
              data-testid={`checkbox-select-${category.category_id}`}
            />
          </td>
          <td className="px-6 py-4" style={{ paddingLeft: `${24 + (level * 32)}px` }}>
            <div className="flex items-center gap-2">
              {hasChildren && (
                <button
                  onClick={() => toggleExpand(category.category_id)}
                  className="hover:bg-gray-200 rounded p-1"
                  data-testid={`button-toggle-${category.category_id}`}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
              {!hasChildren && <div className="w-6" />}
              <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                {getCategoryIcon(category.name, category.slug, category.icon_number)}
              </div>
              <span className="font-medium text-gray-900">{category.name}</span>
            </div>
          </td>
          <td className="px-6 py-4">
            <code className="text-xs font-mono font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
              {category.category_id}
            </code>
          </td>
          <td className="px-6 py-4">
            <code className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {category.slug}
            </code>
          </td>
          <td className="px-6 py-4">
            <Badge className={getTypeColor(category.type)}>{category.type}</Badge>
          </td>
          <td className="px-6 py-4" data-testid={`text-parent-${category.category_id}`}>
            {category.parent_id ? (
              <>
                <span className="text-sm text-gray-900 font-mono">{category.parent_id}</span>
                <span className="text-xs text-gray-400 ml-1">
                  ({categories.find(c => c.category_id === category.parent_id)?.name || 'N/A'})
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400">-</span>
            )}
          </td>
          <td className="px-6 py-4 max-w-xs">
            <p className="text-sm text-gray-600 truncate" title={category.description}>
              {category.description}
            </p>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center justify-end gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 hover:bg-[#ff0086]/10 hover:text-[#ff0086]"
                onClick={() => openEditDialog(category)}
                data-testid={`button-edit-${category.category_id}`}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => openDeleteDialog(category.category_id)}
                data-testid={`button-delete-${category.category_id}`}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </td>
        </tr>
        {isExpanded && children.map(child => (
          <TreeRow
            key={child.category_id}
            category={child}
            level={level + 1}
            hasChildren={false}
          />
        ))}
      </>
    )
  }

  return (
    <IKKAdminLayout>
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <Card className="shadow-sm border border-gray-100">
          {/* Header with Gradient */}
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff0086] to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1" data-testid="heading-categories">
                    Quản lý danh mục
                  </h2>
                  <p className="text-sm text-gray-600">
                    Quản lý danh mục thương hiệu và sản phẩm
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2" data-testid="button-export">
                      <Download className="w-4 h-4" />
                      Xuất dữ liệu
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => handleExport('csv')}
                      className="cursor-pointer"
                      data-testid="export-csv"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Xuất CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleExport('json')}
                      className="cursor-pointer"
                      data-testid="export-json"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Xuất JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  className="bg-[#ff0086] hover:bg-[#e6007a] text-white gap-2" 
                  onClick={() => setIsCreateDialogOpen(true)}
                  data-testid="button-create"
                >
                  <Plus className="w-4 h-4" />
                  Tạo danh mục
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Bulk Actions Bar */}
            {selectedCategories.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-900">
                    Đã chọn {selectedCategories.length} danh mục
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategories([])}
                    className="text-blue-600 hover:text-blue-800"
                    data-testid="button-clear-selection"
                  >
                    Bỏ chọn
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkExport}
                    className="gap-2"
                    data-testid="button-bulk-export"
                  >
                    <Download className="w-4 h-4" />
                    Xuất đã chọn
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="gap-2"
                    data-testid="button-bulk-delete"
                  >
                    <Trash className="w-4 h-4" />
                    Xóa đã chọn
                  </Button>
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    {getTypeIcon('MAIN')}
                  </div>
                  <Badge className="bg-purple-500 text-white hover:bg-purple-500">MAIN</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-main">
                  {mainCategories.length}
                </p>
                <p className="text-sm text-gray-600">Danh mục chính</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    {getTypeIcon('PRODUCT')}
                  </div>
                  <Badge className="bg-blue-500 text-white hover:bg-blue-500">PRODUCT</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-product">
                  {productCategories.length}
                </p>
                <p className="text-sm text-gray-600">Danh mục sản phẩm</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    {getTypeIcon('SERVICE')}
                  </div>
                  <Badge className="bg-green-500 text-white hover:bg-green-500">SERVICE</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-service">
                  {serviceCategories.length}
                </p>
                <p className="text-sm text-gray-600">Danh mục dịch vụ</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border border-pink-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-[#ff0086] rounded-lg flex items-center justify-center">
                    <Folder className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-[#ff0086] text-white hover:bg-[#ff0086]">TOTAL</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-total">
                  {categories.length}
                </p>
                <p className="text-sm text-gray-600">Tổng danh mục</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo ID, tên, slug, mô tả..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                      data-testid="input-search"
                    />
                  </div>
                  
                  <Select value={selectedType} onValueChange={(value) => {
                    setSelectedType(value)
                    setCurrentPage(1)
                  }}>
                    <SelectTrigger className="w-full md:w-48 bg-white" data-testid="select-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả loại</SelectItem>
                      <SelectItem value="MAIN">MAIN</SelectItem>
                      <SelectItem value="PRODUCT">PRODUCT</SelectItem>
                      <SelectItem value="SERVICE">SERVICE</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select 
                    value={selectedParentFilter} 
                    onValueChange={(value) => {
                      setSelectedParentFilter(value)
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className="w-full md:w-[280px] bg-white border-gray-200" data-testid="select-parent-filter">
                      <SelectValue placeholder="Lọc theo danh mục cha..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="has_parent">Có danh mục cha</SelectItem>
                      <SelectItem value="no_parent">Không có danh mục cha</SelectItem>
                      
                      {categoriesWithChildren.length > 0 && (
                        <>
                          <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 border-t mt-1">
                            Danh mục cha cụ thể:
                          </div>
                          {categoriesWithChildren.map(cat => (
                            <SelectItem key={cat.category_id} value={cat.category_id}>
                              {cat.category_id} - {cat.name}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {(selectedType !== 'all' || selectedParentFilter !== 'all' || searchTerm !== '') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedType('all')
                      setSelectedParentFilter('all')
                      setSearchTerm('')
                      setCurrentPage(1)
                    }}
                    className="text-gray-600 hover:text-gray-900 self-start"
                    data-testid="button-reset-filters"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Đặt lại bộ lọc
                  </Button>
                )}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600 mr-2">Chế độ xem:</span>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                className={viewMode === 'table' ? 'bg-[#ff0086] hover:bg-[#e6007a]' : ''}
                data-testid="button-view-table"
              >
                <Table className="w-4 h-4 mr-2" />
                Bảng
              </Button>
              <Button
                variant={viewMode === 'tree' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('tree')}
                className={viewMode === 'tree' ? 'bg-[#ff0086] hover:bg-[#e6007a]' : ''}
                data-testid="button-view-tree"
              >
                <List className="w-4 h-4 mr-2" />
                Cây
              </Button>
            </div>

            {/* Expand/Collapse Buttons for Tree View */}
            {viewMode === 'tree' && (
              <div className="mb-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={expandAll}
                  data-testid="button-expand-all"
                >
                  Mở rộng tất cả
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={collapseAll}
                  data-testid="button-collapse-all"
                >
                  Thu gọn tất cả
                </Button>
              </div>
            )}

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-categories">
                  <thead className="bg-purple-600 border-b border-purple-700">
                    <tr>
                      <th className="px-6 py-3 w-12">
                        <Checkbox
                          checked={isAllSelected}
                          onCheckedChange={handleSelectAll}
                          className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
                          data-testid="checkbox-select-all"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Icon</th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-purple-700 transition-colors"
                        onClick={() => handleSort('category_id')}
                        data-testid="header-category-id"
                      >
                        <div className="flex items-center gap-2">
                          CATEGORY ID
                          {sortBy === 'category_id' && (
                            sortOrder === 'asc' ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-purple-700 transition-colors"
                        onClick={() => handleSort('name')}
                        data-testid="header-name"
                      >
                        <div className="flex items-center gap-2">
                          TÊN DANH MỤC
                          {sortBy === 'name' && (
                            sortOrder === 'asc' ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-purple-700 transition-colors"
                        onClick={() => handleSort('slug')}
                        data-testid="header-slug"
                      >
                        <div className="flex items-center gap-2">
                          SLUG
                          {sortBy === 'slug' && (
                            sortOrder === 'asc' ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-purple-700 transition-colors"
                        onClick={() => handleSort('type')}
                        data-testid="header-type"
                      >
                        <div className="flex items-center gap-2">
                          TYPE
                          {sortBy === 'type' && (
                            sortOrder === 'asc' ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-purple-700 transition-colors"
                        onClick={() => handleSort('parent_id')}
                        data-testid="header-parent-id"
                      >
                        <div className="flex items-center gap-2">
                          PARENT ID
                          {sortBy === 'parent_id' && (
                            sortOrder === 'asc' ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Mô tả</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {viewMode === 'tree' ? (
                      treeData.map(category => (
                        <TreeRow
                          key={category.category_id}
                          category={category}
                          level={0}
                          hasChildren={category.children && category.children.length > 0}
                        />
                      ))
                    ) : (
                      paginatedCategories.map((item) => (
                        <tr key={item.category_id} className="hover:bg-gray-50 transition-colors" data-testid={`row-${item.category_id}`}>
                          <td className="px-6 py-4 w-12">
                            <Checkbox
                              checked={selectedCategories.includes(item.category_id)}
                              onCheckedChange={(checked) => handleSelectCategory(item.category_id, checked as boolean)}
                              data-testid={`checkbox-select-${item.category_id}`}
                            />
                          </td>
                          <td className="px-6 py-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                              {getCategoryIcon(item.name, item.slug, item.icon_number)}
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <code className="text-xs font-mono font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                              {item.category_id}
                            </code>
                          </td>
                          <td className="px-6 py-3">
                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                          </td>
                          <td className="px-6 py-3">
                            <code className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              {item.slug}
                            </code>
                          </td>
                          <td className="px-6 py-3">
                            <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                          </td>
                          <td className="px-6 py-3" data-testid={`text-parent-${item.category_id}`}>
                            {item.parent_id ? (
                              <>
                                <span className="text-sm text-gray-900 font-mono">{item.parent_id}</span>
                                <span className="text-xs text-gray-400 ml-1">
                                  ({categories.find(c => c.category_id === item.parent_id)?.name || 'N/A'})
                                </span>
                              </>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-3 max-w-xs">
                            <p className="text-sm text-gray-600 truncate" title={item.description}>
                              {item.description}
                            </p>
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-[#ff0086]/10 hover:text-[#ff0086]"
                                onClick={() => openEditDialog(item)}
                                data-testid={`button-edit-${item.category_id}`}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => openDeleteDialog(item.category_id)}
                                data-testid={`button-delete-${item.category_id}`}
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Empty State - Search No Results */}
              {paginatedCategories.length === 0 && searchTerm && (
                <div className="text-center py-12" data-testid="empty-search-state">
                  <SearchX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Không tìm thấy kết quả
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Không có danh mục nào khớp với "{searchTerm}"
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedType('all')
                      setSelectedParentFilter('all')
                    }}
                    variant="outline"
                    className="mt-4"
                    data-testid="button-clear-search"
                  >
                    Xóa tìm kiếm
                  </Button>
                </div>
              )}

              {/* Empty State - No Data */}
              {paginatedCategories.length === 0 && !searchTerm && (
                <div className="text-center py-12" data-testid="empty-data-state">
                  <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Chưa có danh mục nào
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Bắt đầu bằng cách tạo danh mục đầu tiên
                  </p>
                  <Button 
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="mt-4 bg-[#ff0086] hover:bg-[#e6007a] text-white"
                    data-testid="button-create-first"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo danh mục
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {viewMode === 'table' && totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                  <div className="text-sm text-gray-600">
                    Hiển thị {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, sortedCategories.length)} trong tổng {sortedCategories.length} kết quả
                    {(selectedType !== 'all' || selectedParentFilter !== 'all' || searchTerm !== '') && (
                      <span className="ml-2 text-blue-600">
                        (đã lọc)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      data-testid="button-prev"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant="outline"
                          size="sm"
                          className={currentPage === pageNum ? 'bg-[#ff0086] text-white border-[#ff0086] hover:bg-[#e6007a]' : ''}
                          onClick={() => setCurrentPage(pageNum)}
                          data-testid={`button-page-${pageNum}`}
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      data-testid="button-next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Create Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-create">
            <DialogHeader className="border-b border-gray-200 pb-4">
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ff0086] to-purple-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                Tạo danh mục mới
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-id" className="text-sm font-semibold">Category ID *</Label>
                <Input
                  id="create-id"
                  placeholder="VD: CAT001, P001, S001"
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="border-gray-300 focus:border-[#ff0086] focus:ring-[#ff0086]/20"
                  data-testid="input-create-id"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-name" className="text-sm font-semibold">Tên danh mục *</Label>
                <Input
                  id="create-name"
                  placeholder="VD: Làm đẹp"
                  value={formData.name}
                  onChange={(e) => {
                    const newName = e.target.value
                    const newSlug = generateSlug(newName)
                    setFormData({ 
                      ...formData, 
                      name: newName,
                      slug: newSlug
                    })
                    
                    const validation = validateSlug(newSlug)
                    setSlugError(validation.isValid ? '' : validation.error || '')
                  }}
                  className="border-gray-300 focus:border-[#ff0086] focus:ring-[#ff0086]/20"
                  data-testid="input-create-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-slug" className="text-sm font-semibold">Slug *</Label>
                <Input
                  id="create-slug"
                  placeholder="VD: beauty, food_beverage"
                  value={formData.slug}
                  onChange={(e) => {
                    const newSlug = e.target.value
                    setFormData({ ...formData, slug: newSlug })
                    
                    const validation = validateSlug(newSlug)
                    setSlugError(validation.isValid ? '' : validation.error || '')
                  }}
                  className={`border-gray-300 focus:border-[#ff0086] focus:ring-[#ff0086]/20 ${
                    slugError ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  data-testid="input-create-slug"
                />
                {slugError && (
                  <p className="text-sm text-red-500" data-testid="error-slug">
                    {slugError}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Tự động tạo từ tên danh mục. Chỉ dùng chữ thường, số, _ và -
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-type" className="text-sm font-semibold">Type *</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="border-gray-300" data-testid="select-create-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MAIN">MAIN</SelectItem>
                    <SelectItem value="PRODUCT">PRODUCT</SelectItem>
                    <SelectItem value="SERVICE">SERVICE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-parent" className="text-sm font-semibold">Danh mục cha</Label>
                <Select 
                  value={formData.parent_id || 'none'} 
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    parent_id: value === 'none' ? '' : value 
                  })}
                >
                  <SelectTrigger className="border-gray-300" data-testid="select-create-parent">
                    <SelectValue placeholder="Chọn danh mục cha..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">- Không có -</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.category_id} value={cat.category_id}>
                        {cat.category_id} - {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-icon" className="text-sm font-semibold">Icon *</Label>
                <IconPicker
                  value={formData.icon_number}
                  onChange={(iconName) => setFormData({ ...formData, icon_number: iconName })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="create-desc" className="text-sm font-semibold">Description *</Label>
                <Textarea
                  id="create-desc"
                  placeholder="Mô tả chi tiết danh mục..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="border-gray-300 focus:border-[#ff0086] focus:ring-[#ff0086]/20"
                  data-testid="textarea-create-desc"
                />
              </div>
            </div>
            <DialogFooter className="border-t border-gray-200 pt-4">
              <Button variant="outline" onClick={() => {
                setIsCreateDialogOpen(false)
                resetForm()
              }} data-testid="button-cancel-create">
                Hủy
              </Button>
              <Button 
                className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
                onClick={handleCreate}
                disabled={isCreating || !!slugError}
                data-testid="button-save-create"
              >
                {isCreating ? "Đang tạo..." : "Tạo danh mục"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-edit">
            <DialogHeader className="border-b border-gray-200 pb-4">
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ff0086] to-purple-600 rounded-lg flex items-center justify-center">
                  <Pencil className="w-4 h-4 text-white" />
                </div>
                Chỉnh sửa danh mục
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-id" className="text-sm font-semibold">Category ID *</Label>
                <Input
                  id="edit-id"
                  value={formData.category_id}
                  disabled
                  className="bg-gray-50 border-gray-300"
                  data-testid="input-edit-id"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-sm font-semibold">Tên danh mục *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => {
                    const newName = e.target.value
                    const newSlug = generateSlug(newName)
                    setFormData({ 
                      ...formData, 
                      name: newName,
                      slug: newSlug
                    })
                    
                    const validation = validateSlug(newSlug)
                    setSlugError(validation.isValid ? '' : validation.error || '')
                  }}
                  className="border-gray-300 focus:border-[#ff0086] focus:ring-[#ff0086]/20"
                  data-testid="input-edit-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug" className="text-sm font-semibold">Slug *</Label>
                <Input
                  id="edit-slug"
                  value={formData.slug}
                  onChange={(e) => {
                    const newSlug = e.target.value
                    setFormData({ ...formData, slug: newSlug })
                    
                    const validation = validateSlug(newSlug)
                    setSlugError(validation.isValid ? '' : validation.error || '')
                  }}
                  className={`border-gray-300 focus:border-[#ff0086] focus:ring-[#ff0086]/20 ${
                    slugError ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  data-testid="input-edit-slug"
                />
                {slugError && (
                  <p className="text-sm text-red-500" data-testid="error-slug">
                    {slugError}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Tự động tạo từ tên danh mục. Chỉ dùng chữ thường, số, _ và -
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type" className="text-sm font-semibold">Type *</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="border-gray-300" data-testid="select-edit-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MAIN">MAIN</SelectItem>
                    <SelectItem value="PRODUCT">PRODUCT</SelectItem>
                    <SelectItem value="SERVICE">SERVICE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-parent" className="text-sm font-semibold">Danh mục cha</Label>
                <Select 
                  value={formData.parent_id || 'none'} 
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    parent_id: value === 'none' ? '' : value 
                  })}
                >
                  <SelectTrigger className="border-gray-300" data-testid="select-edit-parent">
                    <SelectValue placeholder="Chọn danh mục cha..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">- Không có -</SelectItem>
                    {getAvailableParents(formData.category_id).map(cat => (
                      <SelectItem key={cat.category_id} value={cat.category_id}>
                        {cat.category_id} - {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-icon" className="text-sm font-semibold">Icon</Label>
                <IconPicker
                  value={formData.icon_number}
                  onChange={(iconName) => setFormData({ ...formData, icon_number: iconName })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-desc" className="text-sm font-semibold">Description *</Label>
                <Textarea
                  id="edit-desc"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="border-gray-300 focus:border-[#ff0086] focus:ring-[#ff0086]/20"
                  data-testid="textarea-edit-desc"
                />
              </div>
            </div>
            <DialogFooter className="border-t border-gray-200 pt-4">
              <Button variant="outline" onClick={() => {
                setIsEditDialogOpen(false)
                resetForm()
              }} data-testid="button-cancel-edit">
                Hủy
              </Button>
              <Button 
                className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
                onClick={handleEdit}
                disabled={isUpdating || !!slugError}
                data-testid="button-save-edit"
              >
                {isUpdating ? "Đang cập nhật..." : "Lưu thay đổi"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent data-testid="dialog-delete">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold">Xác nhận xóa danh mục</AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                Bạn có chắc chắn muốn xóa danh mục <strong className="text-gray-900">{categoryToDelete}</strong>? 
                Hành động này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-cancel-delete">Hủy</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDelete}
                disabled={isDeleting}
                data-testid="button-confirm-delete"
              >
                {isDeleting ? "Đang xóa..." : "Xóa danh mục"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Bulk Delete Dialog */}
        <AlertDialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
          <AlertDialogContent data-testid="dialog-bulk-delete">
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa nhiều danh mục</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa {selectedCategories.length} danh mục đã chọn? 
                Hành động này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-cancel-bulk-delete">
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault()
                  confirmBulkDelete()
                }}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
                data-testid="button-confirm-bulk-delete"
              >
                {isDeleting ? "Đang xóa..." : `Xóa ${selectedCategories.length} danh mục`}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </IKKAdminLayout>
  )
}
