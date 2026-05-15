import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface SpatieTableSearchProps {
  filterKey: string;
  value?: string;
  placeholder?: string;
  debounce?: number;
}

export function SpatieTableSearch({
  filterKey,
  value = '',
  placeholder = 'Search...',
  debounce = 300
}: SpatieTableSearchProps) {
  const [search, setSearch] = useState(value);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (value) {
      currentParams.set(`filter[${filterKey}]`, value);
    } else {
      currentParams.delete(`filter[${filterKey}]`);
    }

    // Reset to page 1 when searching
    currentParams.delete('page');

    setIsSearching(true);
    router.get(
      `${window.location.pathname}?${currentParams.toString()}`,
      {},
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        onFinish: () => setIsSearching(false)
      }
    );
  }, debounce);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const handleChange = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearch('');
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete(`filter[${filterKey}]`);
    currentParams.delete('page');

    setIsSearching(true);
    router.get(
      `${window.location.pathname}?${currentParams.toString()}`,
      {},
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        onFinish: () => setIsSearching(false)
      }
    );
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={search}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />
      {isSearching ? (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Spinner className="h-4 w-4" />
        </div>
      ) : (
        search && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )
      )}
    </div>
  );
}
