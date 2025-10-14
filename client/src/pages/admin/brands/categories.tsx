import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  IoAddOutline,
  IoFolderOutline,
  IoSearchOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoChevronUpOutline,
  IoChevronDownOutline,
  IoDownloadOutline,
  IoSparklesOutline,
  IoPhonePortraitOutline,
  IoBagOutline,
  IoLocationOutline,
  IoGridOutline,
  IoHeartOutline,
  IoTrophyOutline,
  IoVideocamOutline,
  IoCafeOutline,
  IoAirplaneOutline,
  IoExtensionPuzzleOutline,
  IoSchoolOutline,
  IoCashOutline,
  IoPersonOutline,
  IoFlaskOutline,
  IoHomeOutline,
  IoStarOutline,
  IoCubeOutline,
  IoFolderOpenOutline,
  IoLayersOutline,
  IoCloseOutline,
  IoListOutline
} from "react-icons/io5"
import { 
  AppleMetricCard, 
  AppleInput, 
  AppleSelect, 
  AppleButton, 
  AppleCard, 
  AppleBadge, 
  AppleTextarea, 
  ApplePopover, 
  AppleModal, 
  AppleDialog, 
  AppleDropdown 
} from "@/components/apple"
import IKKAdminLayout from "@/components/ikk-admin-layout"
import { categories as initialCategories, type Category } from "@shared/categories"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Package': IoCubeOutline,
  'Sparkles': IoSparklesOutline,
  'Smartphone': IoPhonePortraitOutline,
  'ShoppingBag': IoBagOutline,
  'MapPin': IoLocationOutline,
  'Grid2x2': IoGridOutline,
  'Heart': IoHeartOutline,
  'Trophy': IoTrophyOutline,
  'Video': IoVideocamOutline,
  'Coffee': IoCafeOutline,
  'Plane': IoAirplaneOutline,
  'Gamepad2': IoExtensionPuzzleOutline,
  'GraduationCap': IoSchoolOutline,
  'DollarSign': IoCashOutline,
  'Wand2': IoSparklesOutline,
  'Baby': IoPersonOutline,
  'Pill': IoFlaskOutline,
  'Sofa': IoHomeOutline,
  'Flower2': IoStarOutline,
  'Utensils': IoCafeOutline,
  'Home': IoHomeOutline,
  'FolderOpen': IoFolderOpenOutline,
  'Grid3x3': IoLayersOutline,
  'Folder': IoFolderOutline
}

interface IconPickerProps {
  value: string
  onChange: (iconName: string) => void
}

function IconPicker({ value, onChange }: IconPickerProps) {
  const iconNames = Object.keys(iconMap)
  const SelectedIcon = value ? iconMap[value] : null

  return (
    <ApplePopover
      trigger={
        <AppleButton 
          variant="secondary" 
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
        </AppleButton>
      }
      showCloseButton={true}
    >
      <div className="space-y-2 w-80" data-testid="popover-icon-picker">
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
    </ApplePopover>
  )
}

const getCategoryIcon = (name: string, slug: string, iconName?: string) => {
  const iconClass = "w-5 h-5"
  
  if (iconName && iconMap[iconName]) {
    const IconComponent = iconMap[iconName]
    return <IconComponent className={`${iconClass} text-gray-600`} />
  }
  
  if (name.includes('Làm đẹp') || slug.includes('beauty')) {
    return <IoSparklesOutline className={`${iconClass} text-pink-600`} />
  }
  if (name.includes('Công nghệ') || slug.includes('tech')) {
    return <IoPhonePortraitOutline className={`${iconClass} text-blue-600`} />
  }
  if (name.includes('Ẩm thực') || name.includes('Đồ ăn') || name.includes('thức uống') || slug.includes('food') || slug.includes('beverage')) {
    return <IoBagOutline className={`${iconClass} text-orange-600`} />
  }
  if (name.includes('Du lịch') || slug.includes('travel')) {
    return <IoLocationOutline className={`${iconClass} text-green-600`} />
  }
  if (name.includes('Thời trang') || slug.includes('fashion')) {
    return <IoGridOutline className={`${iconClass} text-rose-600`} />
  }
  if (name.includes('Lối sống') || name.includes('Lifestyle') || slug.includes('lifestyle')) {
    return <IoHeartOutline className={`${iconClass} text-purple-600`} />
  }
  if (name.includes('Thể thao')) {
    return <IoTrophyOutline className={`${iconClass} text-red-600`} />
  }
  if (name.includes('Giải trí') || slug.includes('entertainment')) {
    return <IoVideocamOutline className={`${iconClass} text-yellow-600`} />
  }
  if (name.includes('Nhà hàng') || name.includes('cà phê') || slug.includes('restaurants')) {
    return <IoCafeOutline className={`${iconClass} text-amber-600`} />
  }
  if (name.includes('Game') || slug.includes('game')) {
    return <IoExtensionPuzzleOutline className={`${iconClass} text-indigo-600`} />
  }
  if (name.includes('Giáo dục') || slug.includes('education')) {
    return <IoSchoolOutline className={`${iconClass} text-teal-600`} />
  }
  if (name.includes('Tài chính') || slug.includes('finance')) {
    return <IoCashOutline className={`${iconClass} text-emerald-600`} />
  }
  if (name.includes('Phong thuỷ') || slug.includes('feng_shui')) {
    return <IoSparklesOutline className={`${iconClass} text-violet-600`} />
  }
  if (name.includes('Mẹ và bé') || slug.includes('mom_baby')) {
    return <IoPersonOutline className={`${iconClass} text-pink-500`} />
  }
  if (name.includes('Mỹ phẩm') || slug.includes('cosmetics')) {
    return <IoSparklesOutline className={`${iconClass} text-pink-500`} />
  }
  if (name.includes('Dược phẩm') || slug.includes('pharma')) {
    return <IoFlaskOutline className={`${iconClass} text-red-500`} />
  }
  if (name.includes('Nội thất') || slug.includes('furniture')) {
    return <IoHomeOutline className={`${iconClass} text-brown-600`} />
  }
  if (name.includes('Thú cưng') || slug.includes('pet')) {
    return <IoStarOutline className={`${iconClass} text-orange-500`} />
  }
  
  return <IoCubeOutline className={`${iconClass} text-gray-600`} />
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
    case 'MAIN': return <IoLayersOutline className="w-5 h-5 text-white" />
    case 'PRODUCT': return <IoCubeOutline className="w-5 h-5 text-white" />
    case 'SERVICE': return <IoFolderOpenOutline className="w-5 h-5 text-white" />
    default: return <IoFolderOutline className="w-5 h-5 text-white" />
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
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.category_id)}
                onChange={(e) => handleSelectCategory(category.category_id, e.target.checked)}
                className="w-5 h-5 rounded border-2 border-gray-300 text-[#ff0086] focus:ring-[#ff0086] focus:ring-offset-1"
                data-testid={`checkbox-select-${category.category_id}`}
              />
            </div>
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
                    <IoChevronDownOutline className="w-4 h-4" />
                  ) : (
                    <IoChevronForwardOutline className="w-4 h-4" />
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
            <AppleBadge className={getTypeColor(category.type)}>{category.type}</AppleBadge>
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
              <AppleButton 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0 hover:bg-[#ff0086]/10 hover:text-[#ff0086]"
                onClick={() => openEditDialog(category)}
                data-testid={`button-edit-${category.category_id}`}
              >
                <IoCreateOutline className="w-4 h-4" />
              </AppleButton>
              <AppleButton 
                variant="destructive" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => openDeleteDialog(category.category_id)}
                data-testid={`button-delete-${category.category_id}`}
              >
                <IoTrashOutline className="w-4 h-4" />
              </AppleButton>
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
        {/* Header - Apple HIG Standard */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="heading-categories">
              Quản lý danh mục
            </h1>
            <p className="text-gray-600 mt-2">
              Quản lý danh mục thương hiệu và sản phẩm
            </p>
          </div>
          <div className="flex gap-3">
            <AppleDropdown
              trigger={
                <AppleButton variant="secondary" className="gap-2" data-testid="button-export">
                  <IoDownloadOutline className="w-4 h-4" />
                  Xuất dữ liệu
                  <IoChevronDownOutline className="w-4 h-4" />
                </AppleButton>
              }
              items={[
                {
                  label: 'Xuất CSV',
                  icon: <IoDownloadOutline className="w-4 h-4" />,
                  onClick: () => handleExport('csv'),
                },
                {
                  label: 'Xuất JSON',
                  icon: <IoDownloadOutline className="w-4 h-4" />,
                  onClick: () => handleExport('json'),
                }
              ]}
              align="end"
            />
            <AppleButton 
              variant="primary"
              className="gap-2" 
              onClick={() => setIsCreateDialogOpen(true)}
              data-testid="button-create"
            >
              <IoAddOutline className="w-4 h-4" />
              Tạo danh mục
            </AppleButton>
          </div>
        </div>

        <AppleCard variant="outlined" className="">
          <AppleCard.Body>
            {/* Bulk Actions Bar */}
            {selectedCategories.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-900">
                    Đã chọn {selectedCategories.length} danh mục
                  </span>
                  <AppleButton
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategories([])}
                    className="text-blue-600 hover:text-blue-800"
                    data-testid="button-clear-selection"
                  >
                    Bỏ chọn
                  </AppleButton>
                </div>
                <div className="flex items-center gap-2">
                  <AppleButton
                    variant="secondary"
                    size="sm"
                    onClick={handleBulkExport}
                    className="gap-2"
                    data-testid="button-bulk-export"
                  >
                    <IoDownloadOutline className="w-4 h-4" />
                    Xuất đã chọn
                  </AppleButton>
                  <AppleButton
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="gap-2"
                    data-testid="button-bulk-delete"
                  >
                    <IoTrashOutline className="w-4 h-4" />
                    Xóa đã chọn
                  </AppleButton>
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <AppleMetricCard
                title="Danh mục chính"
                value={mainCategories.length}
                icon={<IoLayersOutline className="w-5 h-5" />}
                trend="neutral"
                valueTestId="stat-main"
              />

              <AppleMetricCard
                title="Danh mục sản phẩm"
                value={productCategories.length}
                icon={<IoCubeOutline className="w-5 h-5" />}
                trend="neutral"
                valueTestId="stat-product"
              />

              <AppleMetricCard
                title="Danh mục dịch vụ"
                value={serviceCategories.length}
                icon={<IoFolderOpenOutline className="w-5 h-5" />}
                trend="neutral"
                valueTestId="stat-service"
              />

              <AppleMetricCard
                title="Tổng danh mục"
                value={categories.length}
                icon={<IoFolderOutline className="w-5 h-5" />}
                trend="neutral"
                valueTestId="stat-total"
              />
            </div>

            {/* Search and Filter */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                  <AppleButton
                    variant="outline"
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
                    <IoCloseOutline className="w-4 h-4 mr-2" />
                    Đặt lại bộ lọc
                  </AppleButton>
                )}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600 mr-2">Chế độ xem:</span>
              <AppleButton
                variant={viewMode === 'table' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('table')}
                data-testid="button-view-table"
              >
                <IoGridOutline className="w-4 h-4 mr-2" />
                Bảng
              </AppleButton>
              <AppleButton
                variant={viewMode === 'tree' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('tree')}
                data-testid="button-view-tree"
              >
                <IoListOutline className="w-4 h-4 mr-2" />
                Cây
              </AppleButton>
            </div>

            {/* Expand/Collapse Buttons for Tree View */}
            {viewMode === 'tree' && (
              <div className="mb-4 flex gap-2">
                <AppleButton
                  variant="secondary"
                  size="sm"
                  onClick={expandAll}
                  data-testid="button-expand-all"
                >
                  Mở rộng tất cả
                </AppleButton>
                <AppleButton
                  variant="secondary"
                  size="sm"
                  onClick={collapseAll}
                  data-testid="button-collapse-all"
                >
                  Thu gọn tất cả
                </AppleButton>
              </div>
            )}

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-categories">
                  <thead className="bg-purple-600 border-b border-purple-700">
                    <tr>
                      <th className="px-6 py-3 w-12">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-white text-white focus:ring-white focus:ring-offset-1 bg-purple-700"
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
                              <IoChevronUpOutline className="w-4 h-4" /> : 
                              <IoChevronDownOutline className="w-4 h-4" />
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
                              <IoChevronUpOutline className="w-4 h-4" /> : 
                              <IoChevronDownOutline className="w-4 h-4" />
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
                              <IoChevronUpOutline className="w-4 h-4" /> : 
                              <IoChevronDownOutline className="w-4 h-4" />
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
                              <IoChevronUpOutline className="w-4 h-4" /> : 
                              <IoChevronDownOutline className="w-4 h-4" />
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
                              <IoChevronUpOutline className="w-4 h-4" /> : 
                              <IoChevronDownOutline className="w-4 h-4" />
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
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(item.category_id)}
                              onChange={(e) => handleSelectCategory(item.category_id, e.target.checked)}
                              className="w-5 h-5 rounded border-2 border-gray-300 text-[#ff0086] focus:ring-[#ff0086] focus:ring-offset-1"
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
                            <AppleBadge className={getTypeColor(item.type)}>{item.type}</AppleBadge>
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
                              <AppleButton 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-[#ff0086]/10 hover:text-[#ff0086]"
                                onClick={() => openEditDialog(item)}
                                data-testid={`button-edit-${item.category_id}`}
                              >
                                <IoCreateOutline className="w-4 h-4" />
                              </AppleButton>
                              <AppleButton 
                                variant="destructive" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => openDeleteDialog(item.category_id)}
                                data-testid={`button-delete-${item.category_id}`}
                              >
                                <IoTrashOutline className="w-4 h-4" />
                              </AppleButton>
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
                  <IoSearchOutline className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Không tìm thấy kết quả
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Không có danh mục nào khớp với "{searchTerm}"
                  </p>
                  <AppleButton 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedType('all')
                      setSelectedParentFilter('all')
                    }}
                    variant="secondary"
                    className="mt-4"
                    data-testid="button-clear-search"
                  >
                    Xóa tìm kiếm
                  </AppleButton>
                </div>
              )}

              {/* Empty State - No Data */}
              {paginatedCategories.length === 0 && !searchTerm && (
                <div className="text-center py-12" data-testid="empty-data-state">
                  <IoFolderOpenOutline className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    Chưa có danh mục nào
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Bắt đầu bằng cách tạo danh mục đầu tiên
                  </p>
                  <AppleButton 
                    onClick={() => setIsCreateDialogOpen(true)}
                    variant="primary"
                    className="mt-4"
                    data-testid="button-create-first"
                  >
                    <IoAddOutline className="w-4 h-4 mr-2" />
                    Tạo danh mục
                  </AppleButton>
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
                    <AppleButton 
                      variant="secondary" 
                      size="sm" 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      data-testid="button-prev"
                    >
                      <IoChevronBackOutline className="w-4 h-4" />
                    </AppleButton>
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
                        <AppleButton
                          key={pageNum}
                          variant={currentPage === pageNum ? 'primary' : 'secondary'}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          data-testid={`button-page-${pageNum}`}
                        >
                          {pageNum}
                        </AppleButton>
                      )
                    })}
                    <AppleButton 
                      variant="secondary" 
                      size="sm" 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      data-testid="button-next"
                    >
                      <IoChevronForwardOutline className="w-4 h-4" />
                    </AppleButton>
                  </div>
                </div>
              )}
            </div>
          </AppleCard.Body>
        </AppleCard>

        {/* Create Dialog */}
        <AppleModal
          open={isCreateDialogOpen}
          onClose={() => {
            setIsCreateDialogOpen(false)
            resetForm()
          }}
          title="Tạo danh mục mới"
          size="lg"
          footer={
            <div className="flex gap-2 justify-end" data-testid="dialog-create">
              <AppleButton variant="secondary" onClick={() => {
                setIsCreateDialogOpen(false)
                resetForm()
              }} data-testid="button-cancel-create">
                Hủy
              </AppleButton>
              <AppleButton 
                variant="primary"
                onClick={handleCreate}
                disabled={isCreating || !!slugError}
                data-testid="button-save-create"
              >
                {isCreating ? "Đang tạo..." : "Tạo danh mục"}
              </AppleButton>
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <AppleInput
              label="Category ID *"
              name="category_id"
              placeholder="VD: CAT001, P001, S001"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            />
            <AppleInput
              label="Tên danh mục *"
              name="name"
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
            />
            <AppleInput
              label="Slug *"
              name="slug"
              placeholder="VD: beauty, food_beverage"
              value={formData.slug}
              onChange={(e) => {
                const newSlug = e.target.value
                setFormData({ ...formData, slug: newSlug })
                
                const validation = validateSlug(newSlug)
                setSlugError(validation.isValid ? '' : validation.error || '')
              }}
              error={slugError}
              helperText="Tự động tạo từ tên danh mục. Chỉ dùng chữ thường, số, _ và -"
            />
            <AppleSelect
              label="Type *"
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              options={[
                { value: 'MAIN', label: 'MAIN' },
                { value: 'PRODUCT', label: 'PRODUCT' },
                { value: 'SERVICE', label: 'SERVICE' }
              ]}
            />
            <AppleSelect
              label="Danh mục cha"
              name="parent"
              value={formData.parent_id || 'none'}
              onChange={(e) => setFormData({ 
                ...formData, 
                parent_id: e.target.value === 'none' ? '' : e.target.value 
              })}
              options={[
                { value: 'none', label: '- Không có -' },
                ...categories.map(cat => ({
                  value: cat.category_id,
                  label: `${cat.category_id} - ${cat.name}`
                }))
              ]}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Icon *</label>
              <IconPicker
                value={formData.icon_number}
                onChange={(iconName) => setFormData({ ...formData, icon_number: iconName })}
              />
            </div>
            <div className="col-span-2">
              <AppleTextarea
                label="Description *"
                name="create-desc"
                placeholder="Mô tả chi tiết danh mục..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                data-testid="textarea-create-desc"
              />
            </div>
          </div>
        </AppleModal>

        {/* Edit Dialog */}
        <AppleModal
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
            resetForm()
          }}
          title="Chỉnh sửa danh mục"
          size="lg"
          footer={
            <div className="flex gap-2 justify-end" data-testid="dialog-edit">
              <AppleButton variant="secondary" onClick={() => {
                setIsEditDialogOpen(false)
                resetForm()
              }} data-testid="button-cancel-edit">
                Hủy
              </AppleButton>
              <AppleButton 
                variant="primary"
                onClick={handleEdit}
                disabled={isUpdating || !!slugError}
                data-testid="button-save-edit"
              >
                {isUpdating ? "Đang cập nhật..." : "Lưu thay đổi"}
              </AppleButton>
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <AppleInput
              label="Category ID *"
              name="category_id"
              value={formData.category_id}
              disabled
            />
            <AppleInput
              label="Tên danh mục *"
              name="name"
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
            />
            <AppleInput
              label="Slug *"
              name="slug"
              value={formData.slug}
              onChange={(e) => {
                const newSlug = e.target.value
                setFormData({ ...formData, slug: newSlug })
                
                const validation = validateSlug(newSlug)
                setSlugError(validation.isValid ? '' : validation.error || '')
              }}
              error={slugError}
              helperText="Tự động tạo từ tên danh mục. Chỉ dùng chữ thường, số, _ và -"
            />
            <AppleSelect
              label="Type *"
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              options={[
                { value: 'MAIN', label: 'MAIN' },
                { value: 'PRODUCT', label: 'PRODUCT' },
                { value: 'SERVICE', label: 'SERVICE' }
              ]}
            />
            <AppleSelect
              label="Danh mục cha"
              name="parent"
              value={formData.parent_id || 'none'}
              onChange={(e) => setFormData({ 
                ...formData, 
                parent_id: e.target.value === 'none' ? '' : e.target.value 
              })}
              options={[
                { value: 'none', label: '- Không có -' },
                ...getAvailableParents(formData.category_id).map(cat => ({
                  value: cat.category_id,
                  label: `${cat.category_id} - ${cat.name}`
                }))
              ]}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Icon</label>
              <IconPicker
                value={formData.icon_number}
                onChange={(iconName) => setFormData({ ...formData, icon_number: iconName })}
              />
            </div>
            <div className="col-span-2">
              <AppleTextarea
                label="Description *"
                name="edit-desc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                data-testid="textarea-edit-desc"
              />
            </div>
          </div>
        </AppleModal>

        {/* Delete Dialog */}
        <AppleDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          title="Xác nhận xóa danh mục"
          variant="destructive"
        >
          <div data-testid="dialog-delete">
            <p className="text-sm text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa danh mục <strong className="text-gray-900">{categoryToDelete}</strong>? 
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3 justify-end">
              <AppleButton 
                variant="secondary" 
                onClick={() => setIsDeleteDialogOpen(false)}
                data-testid="button-cancel-delete"
              >
                Hủy
              </AppleButton>
              <AppleButton 
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                data-testid="button-confirm-delete"
              >
                {isDeleting ? "Đang xóa..." : "Xóa danh mục"}
              </AppleButton>
            </div>
          </div>
        </AppleDialog>

        {/* Bulk Delete Dialog */}
        <AppleDialog
          open={isBulkDeleteDialogOpen}
          onClose={() => setIsBulkDeleteDialogOpen(false)}
          title="Xác nhận xóa nhiều danh mục"
          variant="destructive"
        >
          <div data-testid="dialog-bulk-delete">
            <p className="text-sm text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa {selectedCategories.length} danh mục đã chọn? 
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3 justify-end">
              <AppleButton 
                variant="secondary" 
                onClick={() => setIsBulkDeleteDialogOpen(false)}
                data-testid="button-cancel-bulk-delete"
              >
                Hủy
              </AppleButton>
              <AppleButton 
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault()
                  confirmBulkDelete()
                }}
                disabled={isDeleting}
                data-testid="button-confirm-bulk-delete"
              >
                {isDeleting ? "Đang xóa..." : `Xóa ${selectedCategories.length} danh mục`}
              </AppleButton>
            </div>
          </div>
        </AppleDialog>
      </div>
    </IKKAdminLayout>
  )
}
