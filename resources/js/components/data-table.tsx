import { DataPagination } from '@/components/data-pagination';
import { EmptyState } from '@/components/empty-state';
import { SpatieTableFilter } from '@/components/spatie-table-filter';
import { SpatieTableSearch } from '@/components/spatie-table-search';
import { SpatieTableSort } from '@/components/spatie-table-sort';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaginatedResponse } from '@/types/index.d';
import { router } from '@inertiajs/react';
import { LucideIcon, X } from 'lucide-react';
import { ReactNode } from 'react';

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  className?: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDef {
  key: string;
  placeholder: string;
  options: FilterOption[];
}

export interface DataTableProps<T> {
  data: PaginatedResponse<T>;
  columns: ColumnDef<T>[];
  searchable?: {
    key: string;
    placeholder?: string;
  };
  filters?: FilterDef[];
  emptyState?: {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: ReactNode;
  };
  caption?: string;
  currentFilters?: {
    filter?: Record<string, string>;
    sort?: string;
  };
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable,
  filters,
  emptyState,
  caption,
  currentFilters = {}
}: DataTableProps<T>) {
  const hasData = data.data.length > 0;

  // Extract filter values safely - handle both object and array cases
  const filterValues = typeof currentFilters.filter === 'object' && !Array.isArray(currentFilters.filter)
    ? currentFilters.filter
    : {};

  const currentSort = currentFilters.sort;

  const handleClearSort = () => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete('sort');
    currentParams.delete('page');

    router.get(
      `${window.location.pathname}?${currentParams.toString()}`,
      {},
      { preserveState: true, preserveScroll: true, replace: true }
    );
  };

  const getSortLabel = (sortValue?: string) => {
    if (!sortValue || typeof sortValue !== 'string') return null;

    const isDescending = sortValue.startsWith('-');
    const columnKey = isDescending ? sortValue.slice(1) : sortValue;
    const column = columns.find(col => col.key === columnKey);

    if (!column) return null;

    return {
      label: column.header,
      direction: isDescending ? 'descending' : 'ascending'
    };
  };

  const sortInfo = getSortLabel(currentSort);

  return (
    <div className="flex flex-col gap-4">
      {(searchable || (filters && filters.length > 0) || sortInfo) && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {searchable && (
              <SpatieTableSearch
                filterKey={searchable.key}
                value={filterValues[searchable.key] || ''}
                placeholder={searchable.placeholder}
              />
            )}

            {sortInfo && (
              <Badge variant="secondary" className="w-fit gap-2">
                <span className="text-xs">
                  Sort: {sortInfo.label} ({sortInfo.direction})
                </span>
                <button
                  onClick={handleClearSort}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>

          {filters && filters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <SpatieTableFilter
                  key={filter.key}
                  filterKey={filter.key}
                  value={filterValues[filter.key] || ''}
                  placeholder={filter.placeholder}
                  options={filter.options}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {hasData ? (
        <>
          <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  column.sortable ? (
                    <SpatieTableSort
                      key={String(column.key)}
                      column={String(column.key)}
                      currentSort={currentSort}
                      className={column.className}
                    >
                      {column.header}
                    </SpatieTableSort>
                  ) : (
                    <TableHead key={String(column.key)} className={column.className}>
                      {column.header}
                    </TableHead>
                  )
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className={column.className}>
                      {column.render
                        ? column.render(item)
                        : item[column.key as keyof T]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <DataPagination data={data} variant="outline" showFirstLast />
        </>
      ) : (
        emptyState && (
          <EmptyState
            icon={emptyState.icon}
            title={emptyState.title}
            description={emptyState.description}
            action={emptyState.action}
          />
        )
      )}
    </div>
  );
}
