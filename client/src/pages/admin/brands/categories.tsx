import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AppleTableEnhanced } from '@/components/apple/AppleTableEnhanced';
import { Category, insertCategorySchema } from '@shared/schema';
import { AppleButton } from '@/components/apple/AppleButton';
import { AppleDialog } from '@/components/apple/AppleDialog';
import { AppleInput } from '@/components/apple/AppleInput';
import { AppleSelect } from '@/components/apple/AppleSelect';
import { AppleSearchBar } from '@/components/apple/AppleSearchBar';
import { AppleFilterPanel } from '@/components/apple/AppleFilterPanel';
import { AppleBadge } from '@/components/apple/AppleBadge';
import { AppleSectionHeader } from '@/components/apple/AppleSectionHeader';
import { AppleAlert } from '@/components/apple/AppleAlert';
import { AppleInlineError } from '@/components/apple/AppleInlineError';
import { BulkActionToolbar } from '@/components/apple/BulkActionToolbar';
import { EmptyState } from '@/components/apple/EmptyState';
import { IoAdd, IoTrash, IoPencil, IoFilter } from 'react-icons/io5';

const categorySchema = insertCategorySchema.extend({
  name: z.string().min(1, 'Tên danh mục là bắt buộc').min(3, 'Tên danh mục phải có ít nhất 3 ký tự').max(50, 'Tên danh mục không được vượt quá 50 ký tự'),
  description: z.string().min(1, 'Mô tả là bắt buộc').min(10, 'Mô tả phải có ít nhất 10 ký tự').max(200, 'Mô tả không được vượt quá 200 ký tự'),
  type: z.enum(['MAIN', 'PRODUCT', 'SERVICE'], { required_error: 'Loại danh mục là bắt buộc' }),
  parentId: z.string().nullable().optional(),
  iconNumber: z.string().nullable().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function AdminBrandsCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'warning'; }>({ show: false, message: '', type: 'success' });

  const addForm = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      type: "MAIN",
      parentId: null,
      iconNumber: null,
    },
  });

  const editForm = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const filteredCategories = useMemo(() => {
    let filtered = [...categories];

    if (searchQuery) {
      filtered = filtered.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterValues.type) {
      filtered = filtered.filter((cat) => cat.type === filterValues.type);
    }
    if (filterValues.parentId) {
      filtered = filtered.filter((cat) => cat.parentId === filterValues.parentId);
    }

    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof Category];
      const bValue = b[sortBy as keyof Category];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

    return filtered;
  }, [categories, searchQuery, filterValues, sortBy, sortDirection]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddCategory = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCategory: Category = await response.json();
      setCategories((prev) => [newCategory, ...prev]);
      setShowAddDialog(false);
      addForm.reset();
      showToast("Thêm danh mục thành công!", "success");
    } catch (error: any) {
      showToast(`Lỗi khi thêm danh mục: ${error.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCategory = async (data: CategoryFormData) => {
    if (!editingCategory) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedCategory: Category = await response.json();
      setCategories((prev) =>
        prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
      );
      setShowEditDialog(false);
      setEditingCategory(null);
      editForm.reset();
      showToast("Cập nhật danh mục thành công!", "success");
    } catch (error: any) {
      showToast(`Lỗi khi cập nhật danh mục: ${error.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deletingCategoryId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/categories/${deletingCategoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCategories((prev) => prev.filter((cat) => cat.id !== deletingCategoryId));
      setShowDeleteDialog(false);
      setDeletingCategoryId(null);
      showToast("Xóa danh mục thành công!", "success");
    } catch (error: any) {
      showToast(`Lỗi khi xóa danh mục: ${error.message}`, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      const deletePromises = Array.from(selectedRows).map((id) =>
        fetch(`/api/categories/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to delete category ${id}`);
          }
          return id;
        })
      );

      const deletedIds = await Promise.all(deletePromises);
      setCategories((prev) => prev.filter((cat) => !deletedIds.includes(cat.id)));
      setSelectedRows(new Set());
      setShowBulkDeleteDialog(false);
      showToast(`${deletedIds.length} danh mục đã được xóa thành công!`, "success");
    } catch (error: any) {
      showToast(`Lỗi khi xóa hàng loạt: ${error.message}`, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    editForm.reset({
      name: category.name,
      description: category.description,
      type: category.type,
      parentId: category.parentId || null,
      iconNumber: category.iconNumber || null,
    });
    setShowEditDialog(true);
  };

  const openDeleteDialog = (categoryId: string) => {
    setDeletingCategoryId(categoryId);
    setShowDeleteDialog(true);
  };

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Tên', sortable: true },
    { key: 'description', label: 'Mô tả', sortable: false },
    { key: 'type', label: 'Loại', sortable: true },
    { key: 'parentId', label: 'Danh mục cha', sortable: true },
    { key: 'iconNumber', label: 'Số icon', sortable: true },
    { key: 'updatedAt', label: 'Cập nhật lần cuối', sortable: true },
    { key: 'actions', label: 'Hành động', sortable: false },
  ];

  const renderCell = (item: Category, columnKey: string) => {
    switch (columnKey) {
      case 'type':
        return (
          <AppleBadge variant={item.type === 'MAIN' ? 'info' : (item.type === 'PRODUCT' ? 'success' : 'secondary')}>
            {item.type}
          </AppleBadge>
        );
      case 'actions':
        return (
          <div className="flex gap-2">
            <AppleButton
              size="sm"
              variant="secondary"
              onClick={() => openEditDialog(item)}
              icon={<IoPencil />}
            >
              Sửa
            </AppleButton>
            <AppleButton
              size="sm"
              variant="danger"
              onClick={() => openDeleteDialog(item.id)}
              icon={<IoTrash />}
            >
              Xóa
            </AppleButton>
          </div>
        );
      default:
        if (columnKey === 'parentId') {
          const parentCategory = categories.find(c => c.id === item.parentId);
          return parentCategory ? parentCategory.name : item.parentId;
        }
        return item[columnKey as keyof Category] as React.ReactNode;
    }
  };

  const filterOptions = [
    {
      key: 'type',
      label: 'Loại',
      type: 'select' as const,
      options: [
        { value: '', label: 'Tất cả' },
        { value: 'MAIN', label: 'Chính' },
        { value: 'PRODUCT', label: 'Sản phẩm' },
        { value: 'SERVICE', label: 'Dịch vụ' },
      ],
    },
    {
      key: 'parentId',
      label: 'Danh mục cha',
      type: 'select' as const,
      options: [
        { value: '', label: 'Tất cả' },
        ...categories.filter(c => c.type === 'MAIN').map((c) => ({
          value: c.id,
          label: c.name,
        })),
      ],
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AppleSectionHeader
        title="Danh mục"
        description="Quản lý các danh mục sản phẩm và dịch vụ của bạn."
        actions={
          <AppleButton onClick={() => setShowAddDialog(true)} icon={<IoAdd />}>
            Thêm danh mục mới
          </AppleButton>
        }
      />

      {toast.show && (
        <AppleAlert
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
          className="mb-4"
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <AppleSearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm danh mục..."
        />
        <AppleButton
          variant="secondary"
          onClick={() => setShowFilterPanel(!showFilterPanel)}
          icon={<IoFilter />}
        >
          Bộ lọc
        </AppleButton>
      </div>

      <AppleFilterPanel
        show={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filterOptions={filterOptions}
        onApplyFilters={setFilterValues}
        onClearFilters={() => setFilterValues({})}
      />

      {selectedRows.size > 0 && (
        <BulkActionToolbar
          selectedCount={selectedRows.size}
          onClearSelection={() => setSelectedRows(new Set())}
          onBulkDelete={() => setShowBulkDeleteDialog(true)}
        />
      )}

      {isLoading ? (
        <p>Đang tải danh mục...</p>
      ) : error ? (
        <AppleAlert type="error" message={`Lỗi: ${error}`} />
      ) : categories.length === 0 && !searchQuery ? (
        <EmptyState
          title="Không có danh mục nào"
          description="Bắt đầu bằng cách thêm một danh mục mới."
          buttonText="Thêm danh mục"
          onButtonClick={() => setShowAddDialog(true)}
        />
      ) : (
        <AppleTableEnhanced
          columns={columns}
          data={paginatedCategories}
          renderCell={renderCell}
          selectedRows={selectedRows}
          onRowSelect={setSelectedRows}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={(key) => {
            if (key === sortBy) {
              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
            } else {
              setSortBy(key);
              setSortDirection('asc');
            }
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          emptyState={
            <EmptyState
              title="Không tìm thấy kết quả"
              description="Không tìm thấy danh mục nào phù hợp với tìm kiếm của bạn."
            />
          }
        />
      )}

      <AppleDialog
        isOpen={showAddDialog}
        onClose={() => {
          setShowAddDialog(false);
          addForm.reset();
        }}
        title="Thêm danh mục mới"
      >
        <form onSubmit={addForm.handleSubmit(handleAddCategory)} className="space-y-4">
          <div>
            <AppleInput
              label="Tên danh mục"
              placeholder="Nhập tên danh mục"
              {...addForm.register("name")}
              error={!!addForm.formState.errors.name}
            />
            <AppleInlineError
              message={addForm.formState.errors.name?.message}
              show={!!addForm.formState.errors.name}
            />
          </div>

          <div>
            <AppleInput
              label="Mô tả"
              placeholder="Nhập mô tả danh mục"
              {...addForm.register("description")}
              error={!!addForm.formState.errors.description}
            />
            <AppleInlineError
              message={addForm.formState.errors.description?.message}
              show={!!addForm.formState.errors.description}
            />
          </div>

          <div>
            <AppleSelect
              label="Loại"
              {...addForm.register("type")}
              error={!!addForm.formState.errors.type}
            >
              <option value="MAIN">MAIN</option>
              <option value="PRODUCT">PRODUCT</option>
              <option value="SERVICE">SERVICE</option>
            </AppleSelect>
            <AppleInlineError
              message={addForm.formState.errors.type?.message}
              show={!!addForm.formState.errors.type}
            />
          </div>

          <div>
            <AppleSelect
              label="Danh mục cha"
              {...addForm.register("parentId")}
              error={!!addForm.formState.errors.parentId}
            >
              <option value="">Không có</option>
              {categories.filter(c => c.type === 'MAIN').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </AppleSelect>
            <AppleInlineError
              message={addForm.formState.errors.parentId?.message}
              show={!!addForm.formState.errors.parentId}
            />
          </div>

          <div>
            <AppleInput
              label="Số icon"
              placeholder="Nhập số icon"
              {...addForm.register("iconNumber")}
              error={!!addForm.formState.errors.iconNumber}
            />
            <AppleInlineError
              message={addForm.formState.errors.iconNumber?.message}
              show={!!addForm.formState.errors.iconNumber}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <AppleButton
              type="button"
              variant="secondary"
              onClick={() => {
                setShowAddDialog(false);
                addForm.reset();
              }}
              disabled={isSubmitting}
            >
              Hủy
            </AppleButton>
            <AppleButton type="submit" disabled={isSubmitting} loading={isSubmitting}>
              Thêm danh mục
            </AppleButton>
          </div>
        </form>
      </AppleDialog>

      <AppleDialog
        isOpen={showEditDialog}
        onClose={() => {
          setShowEditDialog(false);
          setEditingCategory(null);
          editForm.reset();
        }}
        title="Sửa danh mục"
      >
        <form onSubmit={editForm.handleSubmit(handleEditCategory)} className="space-y-4">
          <div>
            <AppleInput
              label="Tên danh mục"
              placeholder="Nhập tên danh mục"
              {...editForm.register("name")}
              error={!!editForm.formState.errors.name}
            />
            <AppleInlineError
              message={editForm.formState.errors.name?.message}
              show={!!editForm.formState.errors.name}
            />
          </div>

          <div>
            <AppleInput
              label="Mô tả"
              placeholder="Nhập mô tả danh mục"
              {...editForm.register("description")}
              error={!!editForm.formState.errors.description}
            />
            <AppleInlineError
              message={editForm.formState.errors.description?.message}
              show={!!editForm.formState.errors.description}
            />
          </div>

          <div>
            <AppleSelect
              label="Loại"
              {...editForm.register("type")}
              error={!!editForm.formState.errors.type}
            >
              <option value="MAIN">MAIN</option>
              <option value="PRODUCT">PRODUCT</option>
              <option value="SERVICE">SERVICE</option>
            </AppleSelect>
            <AppleInlineError
              message={editForm.formState.errors.type?.message}
              show={!!editForm.formState.errors.type}
            />
          </div>

          <div>
            <AppleSelect
              label="Danh mục cha"
              {...editForm.register("parentId")}
              error={!!editForm.formState.errors.parentId}
            >
              <option value="">Không có</option>
              {categories.filter(c => c.type === 'MAIN').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </AppleSelect>
            <AppleInlineError
              message={editForm.formState.errors.parentId?.message}
              show={!!editForm.formState.errors.parentId}
            />
          </div>

          <div>
            <AppleInput
              label="Số icon"
              placeholder="Nhập số icon"
              {...editForm.register("iconNumber")}
              error={!!editForm.formState.errors.iconNumber}
            />
            <AppleInlineError
              message={editForm.formState.errors.iconNumber?.message}
              show={!!editForm.formState.errors.iconNumber}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <AppleButton
              type="button"
              variant="secondary"
              onClick={() => {
                setShowEditDialog(false);
                setEditingCategory(null);
                editForm.reset();
              }}
              disabled={isSubmitting}
            >
              Hủy
            </AppleButton>
            <AppleButton type="submit" disabled={isSubmitting} loading={isSubmitting}>
              Lưu thay đổi
            </AppleButton>
          </div>
        </form>
      </AppleDialog>

      <AppleDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Xóa danh mục"
        footer={
          <div className="flex justify-end gap-3">
            <AppleButton
              variant="secondary"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Hủy
            </AppleButton>
            <AppleButton variant="danger" onClick={handleDeleteCategory} disabled={isDeleting} loading={isDeleting}>
              Xóa
            </AppleButton>
          </div>
        }
      >
        <p>Bạn có chắc chắn muốn xóa danh mục này không? Hành động này không thể hoàn tác.</p>
      </AppleDialog>

      <AppleDialog
        isOpen={showBulkDeleteDialog}
        onClose={() => setShowBulkDeleteDialog(false)}
        title="Xóa các danh mục đã chọn"
        footer={
          <div className="flex justify-end gap-3">
            <AppleButton
              variant="secondary"
              onClick={() => setShowBulkDeleteDialog(false)}
              disabled={isDeleting}
            >
              Hủy
            </AppleButton>
            <AppleButton variant="danger" onClick={handleBulkDelete} disabled={isDeleting} loading={isDeleting}>
              Xóa các mục đã chọn
            </AppleButton>
          </div>
        }
      >
        <p>Bạn có chắc chắn muốn xóa {selectedRows.size} danh mục đã chọn không? Hành động này không thể hoàn tác.</p>
      </AppleDialog>
    </div>
  );
}

