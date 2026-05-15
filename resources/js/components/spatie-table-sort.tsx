import { TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { ReactNode } from 'react';

interface SpatieTableSortProps {
  column: string;
  currentSort?: string;
  className?: string;
  children: ReactNode;
}

export function SpatieTableSort({
  column,
  currentSort,
  className,
  children
}: SpatieTableSortProps) {
  const isDescending = currentSort === `-${column}`;
  const isAscending = currentSort === column;
  const isActive = isDescending || isAscending;

  const handleSort = () => {
    const currentParams = new URLSearchParams(window.location.search);

    let newSort: string;
    if (isAscending) {
      newSort = `-${column}`;
    } else {
      newSort = column;
    }

    currentParams.set('sort', newSort);

    // Reset to page 1 when sorting
    currentParams.delete('page');

    router.get(
      `${window.location.pathname}?${currentParams.toString()}`,
      {},
      { preserveState: true, preserveScroll: true, replace: true }
    );
  };

  const Icon = isActive
    ? isDescending
      ? ArrowDown
      : ArrowUp
    : ArrowUpDown;

  return (
    <TableHead className={cn('cursor-pointer select-none', className)}>
      <button
        onClick={handleSort}
        className="flex items-center gap-2 hover:text-foreground"
      >
        {children}
        <Icon className={cn('h-4 w-4', isActive ? 'text-foreground' : 'text-muted-foreground')} />
      </button>
    </TableHead>
  );
}
