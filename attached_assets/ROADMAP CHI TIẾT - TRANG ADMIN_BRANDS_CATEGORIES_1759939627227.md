# ROADMAP CHI TIẾT - TRANG ADMIN/BRANDS/CATEGORIES

**Tác giả:** AIK  
**Ngày:** 08/10/2025  
**Dành cho:** Replit AI Agent  
**Mục đích:** Hướng dẫn từng bước để hoàn thiện trang Categories

---

## 📊 TỔNG QUAN HIỆN TRẠNG

### ✅ ĐÃ CÓ VÀ HOẠT ĐỘNG TỐT

Trang Categories đã có **nền tảng vững chắc** với các chức năng cốt lõi:

**CRUD Operations (100% hoàn thành):**
- ✅ **Create:** Modal tạo danh mục với form đầy đủ fields
- ✅ **Read:** Hiển thị danh sách categories với table đẹp
- ✅ **Update:** Modal chỉnh sửa với data pre-filled
- ✅ **Delete:** Modal confirm trước khi xóa

**UI/UX Components:**
- ✅ Statistics cards với 4 loại (MAIN, PRODUCT, SERVICE, TOTAL)
- ✅ Search box với placeholder rõ ràng
- ✅ Filter dropdown theo type
- ✅ Pagination với Previous/Next và số trang
- ✅ Action buttons (Edit màu đỏ, Delete màu xanh lá)
- ✅ Responsive layout (cần test thêm)

**Data Management:**
- ✅ Hỗ trợ hierarchy (Parent-Child categories)
- ✅ Multiple types (MAIN, PRODUCT, SERVICE)
- ✅ Icon system (hiện tại dùng icon number)
- ✅ Slug system cho SEO-friendly URLs

### ⚠️ CẦN CẢI THIỆN

**UX Issues (Ưu tiên CAO):**
- ❌ Thiếu toast notifications (success/error)
- ❌ Thiếu loading states (spinner/skeleton)
- ❌ Empty state chưa đẹp khi search không có kết quả

**Missing Features (Ưu tiên TRUNG BÌNH):**
- ❌ Sort functionality (click column header để sort)
- ❌ Bulk actions (select multiple, delete multiple)
- ❌ Export với options (CSV/JSON/Excel)
- ❌ Icon picker thay vì icon number
- ❌ Parent dropdown thay vì text input
- ❌ Validation realtime
- ❌ Auto-generate slug từ tên

**Advanced Features (Ưu tiên THẤP):**
- ❌ Tree view cho hierarchy
- ❌ Drag & drop để reorder
- ❌ Duplicate category
- ❌ Status toggle (Active/Inactive)
- ❌ Created/Updated info
- ❌ Breadcrumb navigation

---

## 🎯 ROADMAP 3 GIAI ĐOẠN

### GIAI ĐOẠN 1: CẢI THIỆN UX (1-2 ngày) ⚡

**Mục tiêu:** Làm cho trang "cảm thấy hoàn chỉnh" với feedback tốt

#### Task 1.1: Thêm Toast Notifications

**Thời gian:** 2-3 giờ  
**Độ khó:** ⭐⭐☆☆☆

**Bước thực hiện:**

1. **Cài đặt thư viện**
```bash
npm install sonner
```

2. **Thêm Toaster vào root layout**
```tsx
// app/layout.tsx
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

3. **Thêm toast vào các actions**
```tsx
// Sau khi create thành công
toast.success('Tạo danh mục thành công!', {
  description: `Danh mục ${data.name} đã được tạo`
})

// Sau khi update thành công
toast.success('Cập nhật danh mục thành công!')

// Sau khi delete thành công
toast.success('Xóa danh mục thành công!')

// Khi có lỗi
toast.error('Có lỗi xảy ra', {
  description: error.message
})
```

**Test:**
- [ ] Create category → Thấy toast success
- [ ] Update category → Thấy toast success
- [ ] Delete category → Thấy toast success
- [ ] Submit form lỗi → Thấy toast error

---

#### Task 1.2: Thêm Loading States

**Thời gian:** 3-4 giờ  
**Độ khó:** ⭐⭐⭐☆☆

**Bước thực hiện:**

1. **Thêm loading state cho form**
```tsx
const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  
  try {
    // API call
    await createCategory(formData)
    toast.success('Tạo danh mục thành công!')
  } catch (error) {
    toast.error(error.message)
  } finally {
    setIsLoading(false)
  }
}

// Button
<button disabled={isLoading}>
  {isLoading && <Spinner />}
  {isLoading ? 'Đang tạo...' : 'Tạo danh mục'}
</button>
```

2. **Thêm skeleton cho table**
```tsx
{isLoading ? (
  <TableSkeleton rows={10} />
) : (
  <CategoriesTable data={categories} />
)}
```

**Test:**
- [ ] Submit form → Thấy spinner và text "Đang tạo..."
- [ ] Button bị disabled khi loading
- [ ] Page load → Thấy skeleton
- [ ] Delete → Thấy loading state

---

#### Task 1.3: Cải thiện Empty State

**Thời gian:** 1-2 giờ  
**Độ khó:** ⭐⭐☆☆☆

**Bước thực hiện:**

1. **Empty state khi search không có kết quả**
```tsx
{categories.length === 0 && searchQuery && (
  <div className="empty-state text-center py-12">
    <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-4 text-lg font-medium">
      Không tìm thấy kết quả
    </h3>
    <p className="mt-2 text-sm text-gray-500">
      Không có danh mục nào khớp với "{searchQuery}"
    </p>
    <button onClick={clearSearch} className="mt-4">
      Xóa tìm kiếm
    </button>
  </div>
)}
```

2. **Empty state khi chưa có data**
```tsx
{categories.length === 0 && !searchQuery && (
  <div className="empty-state text-center py-12">
    <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-4 text-lg font-medium">
      Chưa có danh mục nào
    </h3>
    <p className="mt-2 text-sm text-gray-500">
      Bắt đầu bằng cách tạo danh mục đầu tiên
    </p>
    <button onClick={openCreateModal} className="mt-4">
      Tạo danh mục
    </button>
  </div>
)}
```

**Test:**
- [ ] Search không có kết quả → Thấy empty state đẹp
- [ ] Click "Xóa tìm kiếm" → Search được clear
- [ ] Xóa hết categories → Thấy empty state với nút "Tạo danh mục"

---

### GIAI ĐOẠN 2: THÊM TÍNH NĂNG THIẾT YẾU (2-3 ngày) 🚀

**Mục tiêu:** Thêm các tính năng quan trọng để trang trở nên powerful

#### Task 2.1: Cải thiện Icon Picker

**Thời gian:** 3-4 giờ  
**Độ khó:** ⭐⭐⭐☆☆

**Lựa chọn 1: Emoji Picker**

```bash
npm install emoji-picker-react
```

```tsx
import EmojiPicker from 'emoji-picker-react'

const [showEmojiPicker, setShowEmojiPicker] = useState(false)
const [selectedEmoji, setSelectedEmoji] = useState('')

<div className="relative">
  <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
    {selectedEmoji || 'Chọn icon'}
  </button>
  
  {showEmojiPicker && (
    <div className="absolute z-10">
      <EmojiPicker onEmojiClick={(emoji) => {
        setSelectedEmoji(emoji.emoji)
        setShowEmojiPicker(false)
      }} />
    </div>
  )}
</div>
```

**Lựa chọn 2: Icon Library (Lucide React)**

```bash
npm install lucide-react
```

```tsx
import * as Icons from 'lucide-react'

const iconList = ['Package', 'Coffee', 'Sparkles', 'MapPin', ...]

<div className="grid grid-cols-5 gap-2">
  {iconList.map(iconName => {
    const Icon = Icons[iconName]
    return (
      <button onClick={() => setSelectedIcon(iconName)}>
        <Icon className="w-6 h-6" />
      </button>
    )
  })}
</div>
```

**Test:**
- [ ] Click icon picker → Modal/dropdown mở
- [ ] Chọn icon → Icon được set vào form
- [ ] Submit form → Icon được lưu đúng

---

#### Task 2.2: Cải thiện Parent ID Field

**Thời gian:** 2-3 giờ  
**Độ khó:** ⭐⭐☆☆☆

**Bước thực hiện:**

1. **Đổi từ text input sang dropdown**
```tsx
<select
  value={formData.parent_id || ''}
  onChange={(e) => setFormData({ 
    ...formData, 
    parent_id: e.target.value || null 
  })}
>
  <option value="">- Không có -</option>
  
  {mainCategories.map(cat => (
    <option key={cat.id} value={cat.id}>
      {cat.id} - {cat.name}
    </option>
  ))}
</select>
```

2. **Logic filter categories**
```tsx
// Chỉ hiển thị MAIN categories
const mainCategories = allCategories.filter(cat => cat.type === 'MAIN')

// Nếu đang edit, loại bỏ chính nó và children của nó
const availableParents = mainCategories.filter(cat => {
  if (mode === 'edit') {
    return cat.id !== initialData.id && cat.parent_id !== initialData.id
  }
  return true
})
```

**Test:**
- [ ] Dropdown hiển thị đúng danh sách MAIN categories
- [ ] Chọn parent → Lưu đúng
- [ ] Khi edit, không thấy chính category đó trong dropdown

---

#### Task 2.3: Thêm Validation Realtime

**Thời gian:** 3-4 giờ  
**Độ khó:** ⭐⭐⭐☆☆

**Bước thực hiện:**

1. **Validate slug format**
```tsx
const validateSlug = (slug) => {
  const slugRegex = /^[a-z0-9_-]+$/
  return slugRegex.test(slug)
}

useEffect(() => {
  const newErrors = {}
  
  if (formData.slug && !validateSlug(formData.slug)) {
    newErrors.slug = 'Slug chỉ được chứa chữ thường, số, gạch dưới và gạch ngang'
  }
  
  if (formData.name && formData.name.length < 3) {
    newErrors.name = 'Tên danh mục phải có ít nhất 3 ký tự'
  }
  
  setErrors(newErrors)
}, [formData])
```

2. **Auto-generate slug**
```tsx
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

const handleNameChange = (e) => {
  const name = e.target.value
  setFormData({
    ...formData,
    name,
    slug: generateSlug(name)
  })
}
```

3. **Hiển thị errors**
```tsx
<input
  value={formData.slug}
  onChange={handleSlugChange}
  className={errors.slug ? 'border-red-500' : ''}
/>
{errors.slug && (
  <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
)}
```

**Test:**
- [ ] Nhập tên → Slug tự động generate
- [ ] Nhập slug không hợp lệ → Hiển thị error
- [ ] Có error → Button submit bị disabled
- [ ] Fix error → Button submit enabled lại

---

#### Task 2.4: Thêm Sort Functionality

**Thời gian:** 2-3 giờ  
**Độ khó:** ⭐⭐⭐☆☆

**Bước thực hiện:**

1. **State management**
```tsx
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
```

2. **Sort logic**
```tsx
const sortedCategories = [...categories].sort((a, b) => {
  let aVal = a[sortBy]
  let bVal = b[sortBy]
  
  if (aVal === null) return 1
  if (bVal === null) return -1
  
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
```

3. **UI**
```tsx
<th 
  onClick={() => handleSort('category_id')}
  className="cursor-pointer hover:bg-gray-100"
>
  CATEGORY ID
  {sortBy === 'category_id' && (
    sortOrder === 'asc' ? ' ↑' : ' ↓'
  )}
</th>
```

**Test:**
- [ ] Click column header → Data được sort
- [ ] Click lại → Sort order đảo ngược
- [ ] Icon arrow hiển thị đúng
- [ ] Sort với filter hoạt động

---

#### Task 2.5: Thêm Export Function

**Thời gian:** 2-3 giờ  
**Độ khó:** ⭐⭐☆☆☆

**Bước thực hiện:**

1. **Export to CSV**
```tsx
const exportToCSV = (data, filename) => {
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(h => `"${String(row[h]).replace(/"/g, '""')}"`).join(',')
    )
  ]
  
  const csvString = csvRows.join('\n')
  const blob = new Blob([csvString], { type: 'text/csv' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}
```

2. **Export to JSON**
```tsx
const exportToJSON = (data, filename) => {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}
```

3. **UI với dropdown**
```tsx
<div className="relative">
  <button onClick={() => setShowExportMenu(!showExportMenu)}>
    Xuất dữ liệu ▼
  </button>
  
  {showExportMenu && (
    <div className="absolute z-10 bg-white border rounded shadow">
      <button onClick={() => handleExport('csv')}>
        Xuất CSV
      </button>
      <button onClick={() => handleExport('json')}>
        Xuất JSON
      </button>
    </div>
  )}
</div>
```

**Test:**
- [ ] Click "Xuất dữ liệu" → Dropdown mở
- [ ] Click "Xuất CSV" → File CSV download
- [ ] Click "Xuất JSON" → File JSON download
- [ ] File chứa đúng data

---

### GIAI ĐOẠN 3: TÍNH NĂNG NÂNG CAO (3-5 ngày) 🔥

**Mục tiêu:** Làm cho trang trở nên professional và powerful

#### Task 3.1: Thêm Bulk Actions

**Thời gian:** 4-5 giờ  
**Độ khó:** ⭐⭐⭐⭐☆

**Bước thực hiện:**

1. **State management**
```tsx
const [selectedIds, setSelectedIds] = useState([])

const handleSelectAll = (checked) => {
  if (checked) {
    setSelectedIds(categories.map(c => c.id))
  } else {
    setSelectedIds([])
  }
}

const handleSelect = (id, checked) => {
  if (checked) {
    setSelectedIds([...selectedIds, id])
  } else {
    setSelectedIds(selectedIds.filter(i => i !== id))
  }
}
```

2. **UI**
```tsx
<thead>
  <tr>
    <th>
      <input
        type="checkbox"
        checked={selectedIds.length === categories.length}
        onChange={(e) => handleSelectAll(e.target.checked)}
      />
    </th>
    {/* Other headers */}
  </tr>
</thead>

<tbody>
  {categories.map(cat => (
    <tr key={cat.id}>
      <td>
        <input
          type="checkbox"
          checked={selectedIds.includes(cat.id)}
          onChange={(e) => handleSelect(cat.id, e.target.checked)}
        />
      </td>
      {/* Other cells */}
    </tr>
  ))}
</tbody>
```

3. **Bulk actions**
```tsx
const handleBulkDelete = async () => {
  if (!confirm(`Xóa ${selectedIds.length} danh mục?`)) return
  
  try {
    await Promise.all(
      selectedIds.map(id => deleteCategory(id))
    )
    toast.success(`Đã xóa ${selectedIds.length} danh mục`)
    setSelectedIds([])
    refreshData()
  } catch (error) {
    toast.error('Có lỗi xảy ra')
  }
}

<button 
  onClick={handleBulkDelete}
  disabled={selectedIds.length === 0}
>
  Xóa đã chọn ({selectedIds.length})
</button>
```

**Test:**
- [ ] Click checkbox → Category được select
- [ ] Click "Select All" → Tất cả được select
- [ ] Click "Xóa đã chọn" → Confirm modal hiện
- [ ] Confirm → Tất cả categories được xóa

---

#### Task 3.2: Thêm Tree View

**Thời gian:** 5-6 giờ  
**Độ khó:** ⭐⭐⭐⭐⭐

**Bước thực hiện:**

1. **Build tree structure**
```tsx
const buildTree = (categories) => {
  const tree = []
  const map = {}
  
  // Create map
  categories.forEach(cat => {
    map[cat.id] = { ...cat, children: [] }
  })
  
  // Build tree
  categories.forEach(cat => {
    if (cat.parent_id) {
      map[cat.parent_id]?.children.push(map[cat.id])
    } else {
      tree.push(map[cat.id])
    }
  })
  
  return tree
}
```

2. **Recursive component**
```tsx
const TreeNode = ({ node, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  
  return (
    <div>
      <div style={{ paddingLeft: `${level * 20}px` }}>
        {node.children.length > 0 && (
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '▼' : '▶'}
          </button>
        )}
        
        <span>{node.name}</span>
      </div>
      
      {isExpanded && node.children.map(child => (
        <TreeNode key={child.id} node={child} level={level + 1} />
      ))}
    </div>
  )
}
```

3. **Toggle view**
```tsx
const [viewMode, setViewMode] = useState('table') // 'table' or 'tree'

<div className="flex gap-2">
  <button 
    onClick={() => setViewMode('table')}
    className={viewMode === 'table' ? 'active' : ''}
  >
    Table View
  </button>
  <button 
    onClick={() => setViewMode('tree')}
    className={viewMode === 'tree' ? 'active' : ''}
  >
    Tree View
  </button>
</div>

{viewMode === 'table' ? (
  <CategoriesTable />
) : (
  <TreeView tree={buildTree(categories)} />
)}
```

**Test:**
- [ ] Click "Tree View" → Hiển thị dạng cây
- [ ] Click expand/collapse → Node mở/đóng
- [ ] Indent đúng theo level
- [ ] Click "Table View" → Quay lại table

---

#### Task 3.3: Thêm Status Toggle

**Thời gian:** 2-3 giờ  
**Độ khó:** ⭐⭐⭐☆☆

**Bước thực hiện:**

1. **Thêm column Status**
```tsx
<td>
  <Toggle
    checked={category.status === 'active'}
    onChange={() => handleToggleStatus(category.id)}
  />
  <Badge color={category.status === 'active' ? 'green' : 'gray'}>
    {category.status === 'active' ? 'Active' : 'Inactive'}
  </Badge>
</td>
```

2. **API call**
```tsx
const handleToggleStatus = async (id) => {
  const category = categories.find(c => c.id === id)
  const newStatus = category.status === 'active' ? 'inactive' : 'active'
  
  try {
    await updateCategory(id, { status: newStatus })
    toast.success(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} danh mục`)
    refreshData()
  } catch (error) {
    toast.error('Có lỗi xảy ra')
  }
}
```

**Test:**
- [ ] Click toggle → Status thay đổi
- [ ] Badge color thay đổi theo status
- [ ] Toast notification hiển thị
- [ ] Data được update trong database

---

#### Task 3.4: Thêm Duplicate Function

**Thời gian:** 2-3 giờ  
**Độ khó:** ⭐⭐⭐☆☆

**Bước thực hiện:**

1. **Thêm nút Duplicate**
```tsx
<button 
  onClick={() => handleDuplicate(category)}
  title="Sao chép"
>
  <CopyIcon />
</button>
```

2. **Logic duplicate**
```tsx
const handleDuplicate = async (category) => {
  const newCategory = {
    ...category,
    id: undefined, // Let backend generate new ID
    category_id: `${category.category_id}_copy`,
    name: `${category.name} (Copy)`,
    slug: `${category.slug}_copy`
  }
  
  try {
    await createCategory(newCategory)
    toast.success('Đã sao chép danh mục')
    refreshData()
  } catch (error) {
    toast.error('Có lỗi xảy ra')
  }
}
```

**Test:**
- [ ] Click nút Duplicate → Category được sao chép
- [ ] ID mới được generate
- [ ] Tên có suffix "(Copy)"
- [ ] Slug có suffix "_copy"

---

## 📋 CHECKLIST TỔNG HỢP

### Giai đoạn 1: UX Improvements

- [ ] Toast notifications (Create/Update/Delete)
- [ ] Loading states (Form submit, Page load)
- [ ] Empty states (No results, No data)
- [ ] Skeleton loading

### Giai đoạn 2: Essential Features

- [ ] Icon picker (Emoji hoặc Icon library)
- [ ] Parent dropdown (thay text input)
- [ ] Validation realtime
- [ ] Auto-generate slug
- [ ] Sort functionality
- [ ] Export function (CSV/JSON)

### Giai đoạn 3: Advanced Features

- [ ] Bulk actions (Select all, Delete multiple)
- [ ] Tree view
- [ ] Status toggle
- [ ] Duplicate function
- [ ] Created/Updated info
- [ ] Breadcrumb navigation

---

## 🎯 ƯU TIÊN ĐỀ XUẤT

**Tuần 1:**
1. Toast notifications (MUST)
2. Loading states (MUST)
3. Empty states (SHOULD)
4. Icon picker (SHOULD)
5. Parent dropdown (SHOULD)

**Tuần 2:**
6. Validation realtime (SHOULD)
7. Sort functionality (NICE TO HAVE)
8. Export function (NICE TO HAVE)

**Tuần 3:**
9. Bulk actions (NICE TO HAVE)
10. Status toggle (NICE TO HAVE)
11. Tree view (OPTIONAL)
12. Duplicate function (OPTIONAL)

---

## 💡 TIPS & BEST PRACTICES

### Code Organization

**Tách components:**
```
components/
  categories/
    CategoriesPage.tsx          # Main page
    CategoriesTable.tsx         # Table component
    CategoryForm.tsx            # Create/Edit form
    DeleteCategoryModal.tsx     # Delete confirmation
    CategoryFilters.tsx         # Search + Filter
    CategoryStats.tsx           # Statistics cards
    EmptyState.tsx              # Empty states
    TableSkeleton.tsx           # Loading skeleton
```

### State Management

**Sử dụng custom hooks:**
```tsx
// hooks/useCategories.ts
export function useCategories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const data = await api.getCategories()
      setCategories(data)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }
  
  return { categories, isLoading, error, fetchCategories }
}
```

### API Calls

**Centralize API calls:**
```tsx
// lib/api/categories.ts
export const categoriesApi = {
  getAll: () => fetch('/api/admin/categories').then(r => r.json()),
  getById: (id) => fetch(`/api/admin/categories/${id}`).then(r => r.json()),
  create: (data) => fetch('/api/admin/categories', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetch(`/api/admin/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => fetch(`/api/admin/categories/${id}`, {
    method: 'DELETE'
  })
}
```

### Error Handling

**Consistent error handling:**
```tsx
try {
  await categoriesApi.create(data)
  toast.success('Tạo danh mục thành công!')
  onClose()
  refreshData()
} catch (error) {
  if (error.status === 400) {
    toast.error('Dữ liệu không hợp lệ', {
      description: error.message
    })
  } else if (error.status === 409) {
    toast.error('Category ID hoặc Slug đã tồn tại')
  } else {
    toast.error('Có lỗi xảy ra', {
      description: 'Vui lòng thử lại sau'
    })
  }
}
```

### Performance

**Optimize rendering:**
```tsx
// Memoize expensive calculations
const sortedCategories = useMemo(() => {
  return [...categories].sort((a, b) => {
    // Sort logic
  })
}, [categories, sortBy, sortOrder])

// Debounce search
const debouncedSearch = useDebouncedCallback(
  (query) => setSearchQuery(query),
  300
)
```

---

## 🚨 COMMON PITFALLS

### 1. Không handle loading states
❌ **Sai:**
```tsx
const handleSubmit = async () => {
  await createCategory(data)
  // User không biết gì đang xảy ra
}
```

✅ **Đúng:**
```tsx
const handleSubmit = async () => {
  setIsLoading(true)
  try {
    await createCategory(data)
    toast.success('Thành công!')
  } finally {
    setIsLoading(false)
  }
}
```

### 2. Không validate input
❌ **Sai:**
```tsx
<input value={slug} onChange={e => setSlug(e.target.value)} />
// User có thể nhập "Slug Không Hợp Lệ!!!"
```

✅ **Đúng:**
```tsx
const handleSlugChange = (e) => {
  const value = e.target.value
  if (validateSlug(value)) {
    setSlug(value)
    setError(null)
  } else {
    setError('Slug không hợp lệ')
  }
}
```

### 3. Không refresh data sau mutation
❌ **Sai:**
```tsx
await createCategory(data)
// Table vẫn hiển thị data cũ
```

✅ **Đúng:**
```tsx
await createCategory(data)
refreshData() // hoặc fetchCategories()
```

### 4. Không handle errors
❌ **Sai:**
```tsx
await createCategory(data)
// Nếu có lỗi, user không biết
```

✅ **Đúng:**
```tsx
try {
  await createCategory(data)
  toast.success('Thành công!')
} catch (error) {
  toast.error(error.message)
}
```

---

## 📚 TÀI LIỆU THAM KHẢO

### Libraries

- **Toast:** [Sonner](https://sonner.emilkowal.ski/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Emoji:** [Emoji Picker React](https://www.npmjs.com/package/emoji-picker-react)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Validation:** [Zod](https://zod.dev/)

### Design Patterns

- **CRUD Operations:** [CRUD Best Practices](https://www.patterns.dev/posts/crud-pattern)
- **Table Design:** [Table UI Patterns](https://www.nngroup.com/articles/table-design/)
- **Empty States:** [Empty State Design](https://www.nngroup.com/articles/empty-state/)

---

**Roadmap này được AIK chuẩn bị để Replit Agent có thể follow từng bước! 🚀**

**Good luck và hãy code thật tốt! 💪**
