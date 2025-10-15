import { ReactNode } from 'react';
import { IoChevronUpOutline, IoChevronDownOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';
import { AppleCheckbox } from './AppleCheckbox';
import { AppleSkeleton } from './AppleSkeleton';
import { ApplePagination } from './ApplePagination';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

interface AppleTableEnhancedProps<T> {
  columns: Column<T>[];
  data: T[];
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  striped?: boolean;
  hoverable?: boolean;
  // New props for enhanced features
  selectable?: boolean;
  selectedRows?: Set<number>;
  onSelectionChange?: (selectedRows: Set<number>) => void;
  loading?: boolean;
  // Pagination props
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    pageSize?: number;
    totalItems?: number;
  };
}

export function AppleTableEnhanced<T extends Record<string, any>>({
  columns,
  data,
  sortBy,
  sortDirection = 'asc',
  onSort,
  onRowClick,
  emptyMessage = 'No data available',
  striped = false,
  hoverable = true,
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  loading = false,
  pagination,
}: AppleTableEnhancedProps<T>) {
  const handleSort = (key: string, sortable?: boolean) => {
    if (sortable && onSort) {
      onSort(key);
    }
  };

  const getCellValue = (row: T, column: Column<T>) => {
    if (column.render) {
      return column.render(row);
    }
    return row[column.key];
  };

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    
    if (selectedRows.size === data.length) {
      // Deselect all
      onSelectionChange(new Set());
    } else {
      // Select all
      const allIndexes = new Set(data.map((_, index) => index));
      onSelectionChange(allIndexes);
    }
  };

  const handleSelectRow = (index: number) => {
    if (!onSelectionChange) return;
    
    const newSelection = new Set(selectedRows);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    onSelectionChange(newSelection);
  };

  const isAllSelected = selectable && selectedRows.size === data.length && data.length > 0;
  const isSomeSelected = selectable && selectedRows.size > 0 && selectedRows.size < data.length;

  // Loading state
  if (loading) {
    return (
      <div className="w-full space-y-2">
        <AppleSkeleton height="40px" />
        <AppleSkeleton height="60px" />
        <AppleSkeleton height="60px" />
        <AppleSkeleton height="60px" />
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="w-full p-8 text-center text-gray-500 border border-gray-200 rounded-lg">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className={`w-full overflow-x-auto ${designTokens.borderRadius.md}`}>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {selectable && (
                <th className="px-4 py-3 w-12 border-b border-gray-200">
                  <AppleCheckbox
                    label=""
                    checked={isAllSelected}
                    indeterminate={isSomeSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  data-testid={`table-header-${column.key}`}
                  style={{ width: column.width }}
                  className={`
                    px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200
                    ${column.sortable ? 'cursor-pointer select-none hover:bg-gray-200' : ''}
                    ${designTokens.transitions.base}
                  `}
                  onClick={() => handleSort(column.key, column.sortable)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sortBy === column.key && (
                      <span className="text-gray-600">
                        {sortDirection === 'asc' ? (
                          <IoChevronUpOutline className="w-4 h-4" />
                        ) : (
                          <IoChevronDownOutline className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                data-testid={`table-row-${rowIndex}`}
                className={`
                  ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'}
                  ${hoverable ? 'hover:bg-gray-100' : ''}
                  ${selectedRows.has(rowIndex) ? 'bg-blue-50' : ''}
                  ${designTokens.transitions.base}
                `}
              >
                {selectable && (
                  <td className="px-4 py-3 border-b border-gray-200">
                    <AppleCheckbox
                      label=""
                      checked={selectedRows.has(rowIndex)}
                      onChange={() => handleSelectRow(rowIndex)}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    data-testid={`table-cell-${column.key}-${rowIndex}`}
                    className={`
                      px-4 py-3 text-sm text-gray-900 border-b border-gray-200
                      ${onRowClick ? 'cursor-pointer' : ''}
                    `}
                    onClick={() => onRowClick?.(row)}
                  >
                    {getCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {pagination.totalItems && (
              <span>
                Showing {((pagination.currentPage - 1) * (pagination.pageSize || 10)) + 1} to{' '}
                {Math.min(pagination.currentPage * (pagination.pageSize || 10), pagination.totalItems)} of{' '}
                {pagination.totalItems} items
              </span>
            )}
          </div>
          <ApplePagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
}

