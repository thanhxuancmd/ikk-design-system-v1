import { useState, useEffect, useCallback, KeyboardEvent, ReactNode } from 'react';
import { IoChevronForwardOutline, IoChevronDownOutline, IoReloadOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';
import { AppleButton } from './AppleButton';
import { EmptyState } from './EmptyState';

export interface TreeNode<T = any> {
  id: string | number;
  data: T;
  children?: TreeNode<T>[];
  isExpandable?: boolean;
  isExpanded?: boolean;
  isLoading?: boolean;
}

export interface Column<T = any> {
  key: string;
  header: string;
  render: (node: TreeNode<T>, depth: number) => ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface AppleHierarchicalTableProps<T = any> {
  data: TreeNode<T>[];
  columns: Column<T>[];
  expandedIds?: Set<string | number>;
  onExpand?: (nodeId: string | number) => void;
  onCollapse?: (nodeId: string | number) => void;
  defaultExpanded?: boolean | number;
  onLoadChildren?: (node: TreeNode<T>) => Promise<TreeNode<T>[]>;
  selectable?: boolean;
  selectedIds?: Set<string | number>;
  onSelect?: (nodeId: string | number) => void;
  showExpandAll?: boolean;
  showIndentLines?: boolean;
  indentSize?: number;
  isLoading?: boolean;
  labels?: {
    expandAll?: string;
    collapseAll?: string;
    loading?: string;
    noData?: string;
    expandRow?: string;
    collapseRow?: string;
  };
  tableAriaLabel?: string;
  className?: string;
}

interface FlattenedRow<T> {
  node: TreeNode<T>;
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
}

const defaultLabels = {
  expandAll: 'Mở rộng tất cả',
  collapseAll: 'Thu gọn tất cả',
  loading: 'Đang tải...',
  noData: 'Không có dữ liệu',
  expandRow: 'Mở rộng',
  collapseRow: 'Thu gọn',
};

export function AppleHierarchicalTable<T = any>({
  data,
  columns,
  expandedIds: controlledExpandedIds,
  onExpand,
  onCollapse,
  defaultExpanded = false,
  onLoadChildren,
  selectable = false,
  selectedIds,
  onSelect,
  showExpandAll = false,
  showIndentLines = false,
  indentSize = 24,
  isLoading = false,
  labels: customLabels,
  tableAriaLabel = 'Hierarchical table',
  className = '',
}: AppleHierarchicalTableProps<T>) {
  const labels = { ...defaultLabels, ...customLabels };
  
  const [internalExpandedIds, setInternalExpandedIds] = useState<Set<string | number>>(new Set());
  const [loadingIds, setLoadingIds] = useState<Set<string | number>>(new Set());
  const [focusedRowIndex, setFocusedRowIndex] = useState<number>(-1);
  const [treeData, setTreeData] = useState<TreeNode<T>[]>(data);

  const isControlled = controlledExpandedIds !== undefined;
  const expandedIds = isControlled ? controlledExpandedIds : internalExpandedIds;

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  useEffect(() => {
    if (defaultExpanded !== false && !isControlled) {
      const getAllNodeIds = (nodes: TreeNode<T>[], currentDepth = 0): (string | number)[] => {
        const ids: (string | number)[] = [];
        for (const node of nodes) {
          const shouldExpand =
            defaultExpanded === true ||
            (typeof defaultExpanded === 'number' && currentDepth < defaultExpanded);
          
          if (shouldExpand && (node.children?.length || node.isExpandable)) {
            ids.push(node.id);
          }
          
          if (node.children) {
            ids.push(...getAllNodeIds(node.children, currentDepth + 1));
          }
        }
        return ids;
      };

      setInternalExpandedIds(new Set(getAllNodeIds(treeData)));
    }
  }, [defaultExpanded, isControlled, treeData]);

  const flattenTree = useCallback((nodes: TreeNode<T>[], depth = 0): FlattenedRow<T>[] => {
    const result: FlattenedRow<T>[] = [];

    for (const node of nodes) {
      const hasChildren = !!(node.children?.length || node.isExpandable);
      const isExpanded = expandedIds.has(node.id);

      result.push({
        node,
        depth,
        hasChildren,
        isExpanded,
      });

      if (isExpanded && node.children) {
        result.push(...flattenTree(node.children, depth + 1));
      }
    }

    return result;
  }, [expandedIds]);

  const flattenedRows = flattenTree(treeData);

  const updateNodeInTree = (
    nodes: TreeNode<T>[],
    nodeId: string | number,
    update: Partial<TreeNode<T>>
  ): TreeNode<T>[] => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, ...update };
      }
      if (node.children) {
        return { ...node, children: updateNodeInTree(node.children, nodeId, update) };
      }
      return node;
    });
  };

  const toggleExpand = useCallback(async (nodeId: string | number, node: TreeNode<T>) => {
    const isExpanded = expandedIds.has(nodeId);

    if (isExpanded) {
      if (isControlled) {
        onCollapse?.(nodeId);
      } else {
        setInternalExpandedIds(prev => {
          const next = new Set(prev);
          next.delete(nodeId);
          return next;
        });
        onCollapse?.(nodeId);
      }
    } else {
      if (onLoadChildren && !node.children && node.isExpandable) {
        setLoadingIds(prev => new Set(prev).add(nodeId));
        
        try {
          const children = await onLoadChildren(node);
          setTreeData(prev => updateNodeInTree(prev, nodeId, { children, isLoading: false }));
          
          if (isControlled) {
            onExpand?.(nodeId);
          } else {
            setInternalExpandedIds(prev => new Set(prev).add(nodeId));
            onExpand?.(nodeId);
          }
        } catch (error) {
          console.error('Failed to load children:', error);
        } finally {
          setLoadingIds(prev => {
            const next = new Set(prev);
            next.delete(nodeId);
            return next;
          });
        }
      } else {
        if (isControlled) {
          onExpand?.(nodeId);
        } else {
          setInternalExpandedIds(prev => new Set(prev).add(nodeId));
          onExpand?.(nodeId);
        }
      }
    }
  }, [expandedIds, isControlled, onExpand, onCollapse, onLoadChildren]);

  const expandAll = useCallback(() => {
    const getAllNodeIds = (nodes: TreeNode<T>[]): (string | number)[] => {
      const ids: (string | number)[] = [];
      for (const node of nodes) {
        if (node.children?.length || node.isExpandable) {
          ids.push(node.id);
        }
        if (node.children) {
          ids.push(...getAllNodeIds(node.children));
        }
      }
      return ids;
    };

    const allIds = getAllNodeIds(treeData);
    if (isControlled) {
      allIds.forEach(id => onExpand?.(id));
    } else {
      setInternalExpandedIds(new Set(allIds));
    }
  }, [treeData, isControlled, onExpand]);

  const collapseAll = useCallback(() => {
    if (isControlled) {
      Array.from(expandedIds).forEach(id => onCollapse?.(id));
    } else {
      setInternalExpandedIds(new Set());
    }
  }, [isControlled, expandedIds, onCollapse]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTableRowElement>, rowIndex: number, row: FlattenedRow<T>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (rowIndex < flattenedRows.length - 1) {
          setFocusedRowIndex(rowIndex + 1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (rowIndex > 0) {
          setFocusedRowIndex(rowIndex - 1);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (row.hasChildren && !row.isExpanded) {
          toggleExpand(row.node.id, row.node);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (row.hasChildren && row.isExpanded) {
          toggleExpand(row.node.id, row.node);
        }
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        if (row.hasChildren) {
          toggleExpand(row.node.id, row.node);
        }
        if (selectable && onSelect) {
          onSelect(row.node.id);
        }
        break;
    }
  }, [flattenedRows, toggleExpand, selectable, onSelect]);

  const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12" data-testid="hierarchical-table-loading">
        <IoReloadOutline className="w-8 h-8 animate-spin text-[var(--apple-primary)]" />
        <span className="ml-3 text-gray-600">{labels.loading}</span>
      </div>
    );
  }

  if (!treeData.length) {
    return <EmptyState variant="noData" description={labels.noData} />;
  }

  return (
    <div className={`w-full ${className}`} data-testid="hierarchical-table">
      {showExpandAll && (
        <div className="flex gap-2 mb-4" data-testid="expand-collapse-controls">
          <AppleButton
            variant="secondary"
            size="sm"
            onClick={expandAll}
            data-testid="button-expand-all"
          >
            {labels.expandAll}
          </AppleButton>
          <AppleButton
            variant="secondary"
            size="sm"
            onClick={collapseAll}
            data-testid="button-collapse-all"
          >
            {labels.collapseAll}
          </AppleButton>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-[var(--apple-border)]">
        <table
          className="w-full border-collapse"
          role="treegrid"
          aria-label={tableAriaLabel}
          data-testid="hierarchical-table-element"
        >
          <thead className="bg-[var(--apple-secondary)] sticky top-0 z-10">
            <tr role="row">
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  data-testid={`header-${column.key}`}
                  style={{ width: column.width }}
                  className={`
                    px-4 py-3 text-sm font-semibold text-[var(--apple-foreground)]
                    border-b border-[var(--apple-border)]
                    ${getAlignmentClass(column.align)}
                    ${index === 0 ? 'text-left' : ''}
                  `}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flattenedRows.map((row, rowIndex) => {
              const isRowExpanded = row.isExpanded;
              const isRowSelected = selectedIds?.has(row.node.id);
              const isRowLoading = loadingIds.has(row.node.id);
              const isFocused = focusedRowIndex === rowIndex;

              return (
                <tr
                  key={`${row.node.id}-${rowIndex}`}
                  role="row"
                  aria-level={row.depth + 1}
                  aria-expanded={row.hasChildren ? isRowExpanded : undefined}
                  aria-selected={selectable ? isRowSelected : undefined}
                  tabIndex={isFocused ? 0 : -1}
                  data-testid={`row-${row.node.id}`}
                  className={`
                    ${designTokens.transitions.base}
                    ${isRowSelected ? 'bg-[var(--apple-primary-soft)]' : 'bg-white'}
                    hover:bg-gray-50
                    ${isFocused ? 'ring-2 ring-inset ring-[var(--apple-primary)]' : ''}
                    ${selectable ? 'cursor-pointer' : ''}
                  `}
                  onClick={() => {
                    setFocusedRowIndex(rowIndex);
                    if (selectable && onSelect) {
                      onSelect(row.node.id);
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, row)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.key}
                      data-testid={`cell-${column.key}-${row.node.id}`}
                      className={`
                        px-4 py-3 text-sm text-gray-900
                        border-b border-[var(--apple-border)]
                        ${getAlignmentClass(column.align)}
                        ${colIndex === 0 ? 'relative' : ''}
                      `}
                    >
                      {colIndex === 0 && (
                        <div
                          className="flex items-center"
                          style={{ paddingLeft: `${row.depth * indentSize}px` }}
                        >
                          {showIndentLines && row.depth > 0 && (
                            <div
                              className="absolute left-0 top-0 bottom-0"
                              style={{ left: `${(row.depth - 1) * indentSize + indentSize / 2}px` }}
                            >
                              <div className="h-full border-l border-[var(--apple-border)]" />
                            </div>
                          )}
                          
                          {row.hasChildren ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(row.node.id, row.node);
                              }}
                              aria-label={isRowExpanded ? labels.collapseRow : labels.expandRow}
                              className={`
                                flex items-center justify-center w-5 h-5 mr-2
                                text-gray-600 hover:text-[var(--apple-primary)]
                                ${designTokens.transitions.fast}
                                focus:outline-none focus:ring-2 focus:ring-[var(--apple-primary)] rounded
                              `}
                              data-testid={`toggle-${row.node.id}`}
                            >
                              {isRowLoading ? (
                                <IoReloadOutline className="w-4 h-4 animate-spin" />
                              ) : isRowExpanded ? (
                                <IoChevronDownOutline className="w-4 h-4" />
                              ) : (
                                <IoChevronForwardOutline className="w-4 h-4" />
                              )}
                            </button>
                          ) : (
                            <span className="w-5 h-5 mr-2" />
                          )}
                          
                          <div className="flex-1">
                            {column.render(row.node, row.depth)}
                          </div>
                        </div>
                      )}
                      
                      {colIndex !== 0 && typeof column.render === 'function' && column.render(row.node, row.depth)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
