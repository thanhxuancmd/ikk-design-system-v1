import { ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

interface AppleTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  striped?: boolean;
  hoverable?: boolean;
}

export function AppleTable<T extends Record<string, any>>({
  columns,
  data,
  sortBy,
  sortDirection = 'asc',
  onSort,
  onRowClick,
  emptyMessage = 'No data available',
  striped = false,
  hoverable = false,
}: AppleTableProps<T>) {
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

  if (data.length === 0) {
    return (
      <div className="w-full p-8 text-center text-gray-500 border border-gray-200 rounded-lg">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto ${designTokens.borderRadius.md}`}>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
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
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
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
                ${onRowClick ? 'cursor-pointer' : ''}
                ${designTokens.transitions.base}
              `}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  data-testid={`table-cell-${column.key}-${rowIndex}`}
                  className="px-4 py-3 text-sm text-gray-900 border-b border-gray-200"
                >
                  {getCellValue(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
