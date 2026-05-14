import { cn } from '@/lib/utils';
import { PaginatedResponse } from '@/types/index.d';
import { Link } from '@inertiajs/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';

const paginationVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        simple: 'hover:underline'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-6',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const activePageVariants = cva('pointer-events-none', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
      outline: 'border-primary bg-primary/10 text-primary',
      ghost: 'bg-accent text-accent-foreground',
      simple: 'font-bold underline'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface DataPaginationProps<T> extends VariantProps<typeof paginationVariants> {
  data: PaginatedResponse<T>;
  className?: string;
  showFirstLast?: boolean;
  showInfo?: boolean;
}

export function DataPagination<T>({
  data,
  variant = 'default',
  size = 'default',
  className,
  showFirstLast = false,
  showInfo = true
}: DataPaginationProps<T>) {
  const { links, current_page, last_page, from, to, total } = data;

  if (last_page <= 1) return null;

  const firstPageUrl = links[1]?.url?.replace(/page=\d+/, 'page=1');
  const lastPageUrl = links[1]?.url?.replace(/page=\d+/, `page=${last_page}`);

  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', className)}>
      {showInfo && (
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </div>
      )}

      <nav className="flex items-center gap-1">
        {showFirstLast && current_page > 1 && firstPageUrl && (
          <Link
            href={firstPageUrl!}
            className={cn(paginationVariants({ variant, size: 'icon' }))}
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Link>
        )}

        {links[0]?.url && (
          <Link
            href={links[0].url!}
            className={cn(paginationVariants({ variant, size: variant === 'simple' ? 'default' : 'icon' }))}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            {variant === 'simple' && <span className="hidden sm:inline">Previous</span>}
          </Link>
        )}

        <div className="flex items-center gap-1">
          {links.slice(1, -1).map((link, index) => {
            if (link.label === '...') {
              return (
                <span key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More pages</span>
                </span>
              );
            }

            if (!link.url) return null;

            return (
              <Link
                key={index}
                href={link.url}
                aria-current={link.active ? 'page' : undefined}
                className={cn(
                  paginationVariants({ variant, size: 'icon' }),
                  link.active && activePageVariants({ variant })
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {links[links.length - 1]?.url && (
          <Link
            href={links[links.length - 1].url!}
            className={cn(paginationVariants({ variant, size: variant === 'simple' ? 'default' : 'icon' }))}
            aria-label="Go to next page"
          >
            {variant === 'simple' && <span className="hidden sm:inline">Next</span>}
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}

        {showFirstLast && current_page < last_page && lastPageUrl && (
          <Link
            href={lastPageUrl!}
            className={cn(paginationVariants({ variant, size: 'icon' }))}
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Link>
        )}
      </nav>
    </div>
  );
}
