import { useState, useMemo } from 'react';
import { AppleTableEnhanced } from '@/components/apple/AppleTableEnhanced';
import { AppleButton } from '@/components/apple/AppleButton';
import { AppleDialog } from '@/components/apple/AppleDialog';
import { AppleInput } from '@/components/apple/AppleInput';
import { AppleSelect } from '@/components/apple/AppleSelect';
import { AppleSearchBar } from '@/components/apple/AppleSearchBar';
import { AppleFilterPanel } from '@/components/apple/AppleFilterPanel';
import { AppleBadge } from '@/components/apple/AppleBadge';
import { AppleSectionHeader } from '@/components/apple/AppleSectionHeader';
import { AppleToast } from '@/components/apple/AppleToast';
import { BulkActionToolbar } from '@/components/apple/BulkActionToolbar';
import { EmptyState } from '@/components/apple/EmptyState';
import { IoAdd, IoTrash, IoPencil, IoFilter } from 'react-icons/io5';

interface Category {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  brand: string;
  createdAt: string;
  updatedAt: string;
}

// Sample data
const sampleCategories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    status: 'active',
    brand: 'TechBrand',
    createdAt: '2025-01-15',
    updatedAt: '2025-10-10',
  },
  {
    id: 2,
    name: 'Clothing',
    description: 'Fashion and apparel',
    status: 'active',
    brand: 'FashionCo',
    createdAt: '2025-02-20',
    updatedAt: '2025-09-25',
  },
  {
    id: 3,
    name: 'Home & Garden',
    description: 'Home improvement and garden supplies',
    status: 'inactive',
    brand: 'HomePlus',
    createdAt: '2025-03-10',
    updatedAt: '2025-08-15',
  },
  {
    id: 4,
    name: 'Sports',
    description: 'Sports equipment and gear',
    status: 'active',
    brand: 'SportsPro',
    createdAt: '2025-04-05',
    updatedAt: '2025-10-01',
  },
  {
    id: 5,
    name: 'Books',
    description: 'Books and educational materials',
    status: 'active',
    brand: 'BookWorld',
    createdAt: '2025-05-12',
    updatedAt: '2025-09-18',
  },
];

export default function AdminBrandsCategories() {
  const [categories, setCategories] = useState<Category[]>(sampleCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  // Dialog states
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
    brand: '',
  });
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const pageSize = 10;

  // Filter configuration
  const filterGroups = [
    {
      id: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    },
    {
      id: 'brand',
      label: 'Brand',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Brands' },
        { value: 'TechBrand', label: 'TechBrand' },
        { value: 'FashionCo', label: 'FashionCo' },
        { value: 'HomePlus', label: 'HomePlus' },
        { value: 'SportsPro', label: 'SportsPro' },
        { value: 'BookWorld', label: 'BookWorld' },
      ],
    },
  ];

  // Filter and search logic
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      // Search filter
      const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = !filterValues.status || filterValues.status === 'all' || category.status === filterValues.status;
      
      // Brand filter
      const matchesBrand = !filterValues.brand || filterValues.brand === 'all' || category.brand === filterValues.brand;
      
      return matchesSearch && matchesStatus && matchesBrand;
    });
  }, [categories, searchQuery, filterValues]);

  // Sort logic
  const sortedCategories = useMemo(() => {
    const sorted = [...filteredCategories].sort((a, b) => {
      const aValue = a[sortBy as keyof Category];
      const bValue = b[sortBy as keyof Category];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredCategories, sortBy, sortDirection]);

  // Pagination logic
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedCategories.slice(startIndex, startIndex + pageSize);
  }, [sortedCategories, currentPage]);

  const totalPages = Math.ceil(sortedCategories.length / pageSize);

  // Table columns
  const columns = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '80px',
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'description',
      header: 'Description',
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row: Category) => (
        <AppleBadge variant={row.status === 'active' ? 'success' : 'default'}>
          {row.status}
        </AppleBadge>
      ),
    },
    {
      key: 'brand',
      header: 'Brand',
      sortable: true,
    },
    {
      key: 'updatedAt',
      header: 'Last Updated',
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: Category) => (
        <div className="flex gap-2">
          <AppleButton
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
          >
            <IoPencil className="w-4 h-4" />
          </AppleButton>
          <AppleButton
            size="sm"
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
          >
            <IoTrash className="w-4 h-4" />
          </AppleButton>
        </div>
      ),
    },
  ];

  // Handlers
  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  const handleAdd = () => {
    setFormData({ name: '', description: '', status: 'active', brand: '' });
    setShowAddDialog(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
      brand: category.brand,
    });
    setShowEditDialog(true);
  };

  const handleDelete = (category: Category) => {
    setEditingCategory(category);
    setShowDeleteDialog(true);
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteDialog(true);
  };

  const confirmAdd = () => {
    const newCategory: Category = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setCategories([...categories, newCategory]);
    setShowAddDialog(false);
    setToast({ message: 'Category added successfully', type: 'success' });
  };

  const confirmEdit = () => {
    if (!editingCategory) return;
    
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...cat, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
        : cat
    ));
    setShowEditDialog(false);
    setEditingCategory(null);
    setToast({ message: 'Category updated successfully', type: 'success' });
  };

  const confirmDelete = () => {
    if (!editingCategory) return;
    
    setCategories(categories.filter(cat => cat.id !== editingCategory.id));
    setShowDeleteDialog(false);
    setEditingCategory(null);
    setToast({ message: 'Category deleted successfully', type: 'success' });
  };

  const confirmBulkDelete = () => {
    const selectedIndexes = Array.from(selectedRows);
    const selectedIds = selectedIndexes.map(index => paginatedCategories[index].id);
    setCategories(categories.filter(cat => !selectedIds.includes(cat.id)));
    setSelectedRows(new Set());
    setShowBulkDeleteDialog(false);
    setToast({ message: `${selectedIds.length} categories deleted successfully`, type: 'success' });
  };

  const bulkActions = [
    {
      id: 'delete',
      label: 'Delete Selected',
      icon: <IoTrash />,
      variant: 'danger' as const,
      onClick: handleBulkDelete,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <AppleSectionHeader
          title="Brand Categories Management"
          description="Manage product categories for all brands"
        />

        {/* Actions Bar */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 flex gap-4">
            <div className="flex-1 max-w-md">
              <AppleSearchBar
                placeholder="Search categories..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            <AppleButton
              variant="secondary"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <IoFilter className="w-4 h-4 mr-2" />
              Filters
            </AppleButton>
          </div>
          <AppleButton onClick={handleAdd}>
            <IoAdd className="w-5 h-5 mr-2" />
            Add Category
          </AppleButton>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <AppleFilterPanel
            filters={filterGroups}
            values={filterValues}
            onChange={setFilterValues}
            onApply={() => setShowFilterPanel(false)}
            onReset={() => {
              setFilterValues({});
              setShowFilterPanel(false);
            }}
          />
        )}

        {/* Bulk Actions Toolbar */}
        {selectedRows.size > 0 && (
          <BulkActionToolbar
            selectedCount={selectedRows.size}
            actions={bulkActions}
            onClearSelection={() => setSelectedRows(new Set())}
          />
        )}

        {/* Table */}
        <AppleTableEnhanced
          columns={columns}
          data={paginatedCategories}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          striped
          hoverable
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            pageSize,
            totalItems: sortedCategories.length,
          }}
        />

        {/* Add Dialog */}
        <AppleDialog
          open={showAddDialog}
          onClose={() => setShowAddDialog(false)}
          title="Add New Category"
          confirmText="Add"
          cancelText="Cancel"
          onConfirm={confirmAdd}
          onCancel={() => setShowAddDialog(false)}
        >
          <div className="space-y-4">
            <AppleInput
              label="Category Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category name"
            />
            <AppleInput
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
            />
            <AppleSelect
              label="Status"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value as 'active' | 'inactive' })}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
            <AppleInput
              label="Brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="Enter brand name"
            />
          </div>
        </AppleDialog>

        {/* Edit Dialog */}
        <AppleDialog
          open={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          title="Edit Category"
          confirmText="Save"
          cancelText="Cancel"
          onConfirm={confirmEdit}
          onCancel={() => setShowEditDialog(false)}
        >
          <div className="space-y-4">
            <AppleInput
              label="Category Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category name"
            />
            <AppleInput
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
            />
            <AppleSelect
              label="Status"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value as 'active' | 'inactive' })}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
            <AppleInput
              label="Brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="Enter brand name"
            />
          </div>
        </AppleDialog>

        {/* Delete Dialog */}
        <AppleDialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          title="Delete Category"
          description={`Are you sure you want to delete "${editingCategory?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />

        {/* Bulk Delete Dialog */}
        <AppleDialog
          open={showBulkDeleteDialog}
          onClose={() => setShowBulkDeleteDialog(false)}
          title="Delete Multiple Categories"
          description={`Are you sure you want to delete ${selectedRows.size} categories? This action cannot be undone.`}
          confirmText="Delete All"
          cancelText="Cancel"
          variant="danger"
          onConfirm={confirmBulkDelete}
          onCancel={() => setShowBulkDeleteDialog(false)}
        />

        {/* Toast */}
        {toast && (
          <AppleToast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}

