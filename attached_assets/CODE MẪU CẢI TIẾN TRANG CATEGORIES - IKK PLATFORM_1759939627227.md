# CODE MẪU CẢI TIẾN TRANG CATEGORIES - IKK PLATFORM

**Tác giả:** AIK  
**Ngày:** 08/10/2025  
**Mục đích:** Cung cấp code mẫu để Replit Agent implement các cải tiến

---

## 1. THÊM TOAST NOTIFICATIONS

### Cài đặt thư viện

```bash
npm install sonner
# hoặc
npm install react-hot-toast
```

### Code mẫu với Sonner

```tsx
// app/layout.tsx hoặc root layout
import { Toaster } from 'sonner'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
```

```tsx
// components/CategoryForm.tsx
import { toast } from 'sonner'

const handleCreateCategory = async (data) => {
  try {
    const response = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (response.ok) {
      toast.success('Tạo danh mục thành công!', {
        description: `Danh mục ${data.name} đã được tạo`
      })
      onClose()
      refreshData()
    } else {
      const error = await response.json()
      toast.error('Tạo danh mục thất bại', {
        description: error.message
      })
    }
  } catch (error) {
    toast.error('Có lỗi xảy ra', {
      description: 'Vui lòng thử lại sau'
    })
  }
}

const handleUpdateCategory = async (id, data) => {
  try {
    const response = await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (response.ok) {
      toast.success('Cập nhật danh mục thành công!', {
        description: `Danh mục ${data.name} đã được cập nhật`
      })
      onClose()
      refreshData()
    } else {
      const error = await response.json()
      toast.error('Cập nhật danh mục thất bại', {
        description: error.message
      })
    }
  } catch (error) {
    toast.error('Có lỗi xảy ra', {
      description: 'Vui lòng thử lại sau'
    })
  }
}

const handleDeleteCategory = async (id, name) => {
  try {
    const response = await fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE'
    })
    
    if (response.ok) {
      toast.success('Xóa danh mục thành công!', {
        description: `Danh mục ${name} đã được xóa`
      })
      onClose()
      refreshData()
    } else {
      const error = await response.json()
      toast.error('Xóa danh mục thất bại', {
        description: error.message
      })
    }
  } catch (error) {
    toast.error('Có lỗi xảy ra', {
      description: 'Vui lòng thử lại sau'
    })
  }
}
```

---

## 2. THÊM LOADING STATES

### Code mẫu với useState

```tsx
// components/CategoryForm.tsx
import { useState } from 'react'

export function CategoryForm({ mode, initialData, onClose, refreshData }) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialData || {})
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const url = mode === 'create' 
        ? '/api/admin/categories'
        : `/api/admin/categories/${initialData.id}`
      
      const method = mode === 'create' ? 'POST' : 'PUT'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        toast.success(
          mode === 'create' 
            ? 'Tạo danh mục thành công!' 
            : 'Cập nhật danh mục thành công!'
        )
        onClose()
        refreshData()
      } else {
        const error = await response.json()
        toast.error(error.message)
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      
      <div className="flex gap-2">
        <button 
          type="button" 
          onClick={onClose}
          disabled={isLoading}
        >
          Hủy
        </button>
        
        <button 
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" cy="12" r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {mode === 'create' ? 'Tạo danh mục' : 'Lưu thay đổi'}
        </button>
      </div>
    </form>
  )
}
```

### Loading State cho Delete Modal

```tsx
// components/DeleteCategoryModal.tsx
import { useState } from 'react'

export function DeleteCategoryModal({ category, onClose, refreshData }) {
  const [isDeleting, setIsDeleting] = useState(false)
  
  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        toast.success('Xóa danh mục thành công!')
        onClose()
        refreshData()
      } else {
        const error = await response.json()
        toast.error(error.message)
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra')
    } finally {
      setIsDeleting(false)
    }
  }
  
  return (
    <div className="modal">
      <h2>Xác nhận xóa danh mục</h2>
      <p>
        Bạn có chắc chắn muốn xóa danh mục <strong>{category.id}</strong>? 
        Hành động này không thể hoàn tác.
      </p>
      
      <div className="flex gap-2">
        <button 
          onClick={onClose}
          disabled={isDeleting}
        >
          Hủy
        </button>
        
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 text-white flex items-center gap-2"
        >
          {isDeleting && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              {/* Spinner SVG */}
            </svg>
          )}
          {isDeleting ? 'Đang xóa...' : 'Xóa danh mục'}
        </button>
      </div>
    </div>
  )
}
```

---

## 3. THÊM EMPTY STATE

### Code mẫu

```tsx
// components/CategoriesTable.tsx
export function CategoriesTable({ categories, isLoading, searchQuery }) {
  if (isLoading) {
    return <TableSkeleton />
  }
  
  if (categories.length === 0 && searchQuery) {
    return (
      <div className="empty-state text-center py-12">
        <svg 
          className="mx-auto h-12 w-12 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Không tìm thấy kết quả
        </h3>
        
        <p className="mt-2 text-sm text-gray-500">
          Không có danh mục nào khớp với từ khóa "{searchQuery}"
        </p>
        
        <button 
          onClick={clearSearch}
          className="mt-4 text-sm text-blue-600 hover:text-blue-500"
        >
          Xóa tìm kiếm
        </button>
      </div>
    )
  }
  
  if (categories.length === 0) {
    return (
      <div className="empty-state text-center py-12">
        <svg 
          className="mx-auto h-12 w-12 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" 
          />
        </svg>
        
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Chưa có danh mục nào
        </h3>
        
        <p className="mt-2 text-sm text-gray-500">
          Bắt đầu bằng cách tạo danh mục đầu tiên
        </p>
        
        <button 
          onClick={openCreateModal}
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg"
        >
          Tạo danh mục
        </button>
      </div>
    )
  }
  
  return (
    <table>
      {/* Table content */}
    </table>
  )
}
```

---

## 4. THÊM TABLE SKELETON

### Code mẫu

```tsx
// components/TableSkeleton.tsx
export function TableSkeleton({ rows = 10 }) {
  return (
    <div className="animate-pulse">
      <table className="w-full">
        <thead>
          <tr>
            <th className="h-12 bg-gray-200"></th>
            <th className="h-12 bg-gray-200"></th>
            <th className="h-12 bg-gray-200"></th>
            <th className="h-12 bg-gray-200"></th>
            <th className="h-12 bg-gray-200"></th>
            <th className="h-12 bg-gray-200"></th>
            <th className="h-12 bg-gray-200"></th>
            <th className="h-12 bg-gray-200"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              <td className="p-4">
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td className="p-4">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded w-8"></div>
              </td>
              <td className="p-4">
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

---

## 5. CẢI THIỆN ICON PICKER

### Code mẫu với Emoji Picker

```bash
npm install emoji-picker-react
```

```tsx
// components/CategoryForm.tsx
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'

export function CategoryForm() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState('')
  
  const handleEmojiClick = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji)
    setFormData({ ...formData, icon: emojiObject.emoji })
    setShowEmojiPicker(false)
  }
  
  return (
    <form>
      {/* Other fields */}
      
      <div>
        <label>Icon</label>
        
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="flex items-center gap-2 border rounded px-4 py-2"
          >
            {selectedEmoji ? (
              <span className="text-2xl">{selectedEmoji}</span>
            ) : (
              <span className="text-gray-400">Chọn icon</span>
            )}
          </button>
          
          {showEmojiPicker && (
            <div className="absolute z-10 mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      
      {/* Other fields */}
    </form>
  )
}
```

### Hoặc dùng Icon Library

```bash
npm install lucide-react
```

```tsx
// components/IconPicker.tsx
import * as Icons from 'lucide-react'
import { useState } from 'react'

const iconList = [
  'Package', 'Coffee', 'Sparkles', 'MapPin', 'Video',
  'ShoppingBag', 'Heart', 'Smartphone', 'Briefcase', 'Megaphone'
]

export function IconPicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleSelect = (iconName) => {
    onChange(iconName)
    setIsOpen(false)
  }
  
  const SelectedIcon = value ? Icons[value] : null
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border rounded px-4 py-2"
      >
        {SelectedIcon ? (
          <SelectedIcon className="w-5 h-5" />
        ) : (
          <span className="text-gray-400">Chọn icon</span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border rounded shadow-lg p-4 grid grid-cols-5 gap-2">
          {iconList.map((iconName) => {
            const Icon = Icons[iconName]
            return (
              <button
                key={iconName}
                type="button"
                onClick={() => handleSelect(iconName)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Icon className="w-6 h-6" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

---

## 6. CẢI THIỆN PARENT ID FIELD

### Code mẫu với Dropdown

```tsx
// components/CategoryForm.tsx
export function CategoryForm({ mode, initialData, allCategories }) {
  const [formData, setFormData] = useState(initialData || {})
  
  // Filter out current category and its children (to prevent circular reference)
  const availableParents = allCategories.filter(cat => {
    if (mode === 'edit') {
      return cat.id !== initialData.id && cat.parent_id !== initialData.id
    }
    return true
  })
  
  // Only show MAIN categories as parents
  const mainCategories = availableParents.filter(cat => cat.type === 'MAIN')
  
  return (
    <form>
      {/* Other fields */}
      
      <div>
        <label>Parent Category</label>
        
        <select
          value={formData.parent_id || ''}
          onChange={(e) => setFormData({ 
            ...formData, 
            parent_id: e.target.value || null 
          })}
          className="border rounded px-4 py-2 w-full"
        >
          <option value="">- Không có -</option>
          
          {mainCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.id} - {cat.name}
            </option>
          ))}
        </select>
        
        <p className="text-sm text-gray-500 mt-1">
          Chỉ có thể chọn danh mục MAIN làm parent
        </p>
      </div>
      
      {/* Other fields */}
    </form>
  )
}
```

---

## 7. THÊM VALIDATION REALTIME

### Code mẫu

```tsx
// components/CategoryForm.tsx
import { useState, useEffect } from 'react'

export function CategoryForm({ mode, initialData }) {
  const [formData, setFormData] = useState(initialData || {})
  const [errors, setErrors] = useState({})
  
  // Validate slug format
  const validateSlug = (slug) => {
    const slugRegex = /^[a-z0-9_-]+$/
    return slugRegex.test(slug)
  }
  
  // Auto-generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
  }
  
  // Validate on change
  useEffect(() => {
    const newErrors = {}
    
    if (formData.name && formData.name.length < 3) {
      newErrors.name = 'Tên danh mục phải có ít nhất 3 ký tự'
    }
    
    if (formData.slug && !validateSlug(formData.slug)) {
      newErrors.slug = 'Slug chỉ được chứa chữ thường, số, gạch dưới và gạch ngang'
    }
    
    if (formData.category_id && !/^[A-Z]+\d+$/.test(formData.category_id)) {
      newErrors.category_id = 'Category ID phải có format: CAT001, P001, S001'
    }
    
    setErrors(newErrors)
  }, [formData])
  
  const handleNameChange = (e) => {
    const name = e.target.value
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name) // Auto-generate slug
    })
  }
  
  return (
    <form>
      <div>
        <label>Tên danh mục *</label>
        <input
          value={formData.name || ''}
          onChange={handleNameChange}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      
      <div>
        <label>Slug *</label>
        <input
          value={formData.slug || ''}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className={errors.slug ? 'border-red-500' : ''}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Slug được tạo tự động từ tên danh mục
        </p>
      </div>
      
      <div>
        <label>Category ID *</label>
        <input
          value={formData.category_id || ''}
          onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          disabled={mode === 'edit'}
          className={errors.category_id ? 'border-red-500' : ''}
        />
        {errors.category_id && (
          <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>
        )}
      </div>
      
      {/* Other fields */}
      
      <button 
        type="submit"
        disabled={Object.keys(errors).length > 0}
      >
        {mode === 'create' ? 'Tạo danh mục' : 'Lưu thay đổi'}
      </button>
    </form>
  )
}
```

---

## 8. THÊM FILTER DROPDOWN

### Code mẫu

```tsx
// components/CategoriesPage.tsx
import { useState } from 'react'

export function CategoriesPage() {
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredCategories = categories.filter(cat => {
    // Filter by type
    if (filterType !== 'all' && cat.type !== filterType) {
      return false
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        cat.id.toLowerCase().includes(query) ||
        cat.name.toLowerCase().includes(query) ||
        cat.slug.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query)
      )
    }
    
    return true
  })
  
  return (
    <div>
      {/* Statistics cards */}
      
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo ID, tên, slug, mô tả..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border rounded px-4 py-2"
        />
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="all">Tất cả loại</option>
          <option value="MAIN">MAIN</option>
          <option value="PRODUCT">PRODUCT</option>
          <option value="SERVICE">SERVICE</option>
        </select>
      </div>
      
      <CategoriesTable categories={filteredCategories} />
    </div>
  )
}
```

---

## 9. THÊM SORT FUNCTIONALITY

### Code mẫu

```tsx
// components/CategoriesTable.tsx
import { useState } from 'react'

export function CategoriesTable({ categories }) {
  const [sortBy, setSortBy] = useState('category_id')
  const [sortOrder, setSortOrder] = useState('asc')
  
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }
  
  const sortedCategories = [...categories].sort((a, b) => {
    let aVal = a[sortBy]
    let bVal = b[sortBy]
    
    // Handle null values
    if (aVal === null) return 1
    if (bVal === null) return -1
    
    // String comparison
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
  
  const SortIcon = ({ column }) => {
    if (sortBy !== column) {
      return <span className="text-gray-400">⇅</span>
    }
    return sortOrder === 'asc' ? <span>↑</span> : <span>↓</span>
  }
  
  return (
    <table>
      <thead>
        <tr>
          <th>ICON</th>
          <th 
            onClick={() => handleSort('category_id')}
            className="cursor-pointer hover:bg-gray-100"
          >
            CATEGORY ID <SortIcon column="category_id" />
          </th>
          <th 
            onClick={() => handleSort('name')}
            className="cursor-pointer hover:bg-gray-100"
          >
            TÊN DANH MỤC <SortIcon column="name" />
          </th>
          <th 
            onClick={() => handleSort('slug')}
            className="cursor-pointer hover:bg-gray-100"
          >
            SLUG <SortIcon column="slug" />
          </th>
          <th 
            onClick={() => handleSort('type')}
            className="cursor-pointer hover:bg-gray-100"
          >
            TYPE <SortIcon column="type" />
          </th>
          <th>PARENT ID</th>
          <th>MÔ TẢ</th>
          <th>THAO TÁC</th>
        </tr>
      </thead>
      <tbody>
        {sortedCategories.map(category => (
          <tr key={category.id}>
            {/* Table rows */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

---

## 10. THÊM EXPORT FUNCTION

### Code mẫu

```tsx
// utils/export.ts
export function exportToCSV(data, filename) {
  // Convert data to CSV format
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        // Escape commas and quotes
        return `"${String(value).replace(/"/g, '""')}"`
      }).join(',')
    )
  ]
  
  const csvString = csvRows.join('\n')
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToJSON(data, filename) {
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
```

```tsx
// components/CategoriesPage.tsx
import { exportToCSV, exportToJSON } from '@/utils/export'

export function CategoriesPage() {
  const [showExportMenu, setShowExportMenu] = useState(false)
  
  const handleExport = (format) => {
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `categories_${timestamp}`
    
    if (format === 'csv') {
      exportToCSV(categories, `${filename}.csv`)
      toast.success('Đã xuất file CSV')
    } else if (format === 'json') {
      exportToJSON(categories, `${filename}.json`)
      toast.success('Đã xuất file JSON')
    }
    
    setShowExportMenu(false)
  }
  
  return (
    <div>
      <div className="relative">
        <button 
          onClick={() => setShowExportMenu(!showExportMenu)}
          className="border rounded px-4 py-2"
        >
          Xuất dữ liệu ▼
        </button>
        
        {showExportMenu && (
          <div className="absolute z-10 mt-2 bg-white border rounded shadow-lg">
            <button 
              onClick={() => handleExport('csv')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Xuất CSV
            </button>
            <button 
              onClick={() => handleExport('json')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Xuất JSON
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
```

---

**Code mẫu này được AIK chuẩn bị để hỗ trợ Replit Agent implement nhanh chóng! 🚀**
