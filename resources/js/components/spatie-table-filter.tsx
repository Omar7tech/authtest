import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { router } from '@inertiajs/react';

interface FilterOption {
  label: string;
  value: string;
}

interface SpatieTableFilterProps {
  filterKey: string;
  value?: string;
  placeholder?: string;
  options: FilterOption[];
}

export function SpatieTableFilter({
  filterKey,
  value,
  placeholder = 'Filter...',
  options
}: SpatieTableFilterProps) {
  const handleChange = (newValue: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (newValue === 'all') {
      currentParams.delete(`filter[${filterKey}]`);
    } else {
      currentParams.set(`filter[${filterKey}]`, newValue);
    }

    // Reset to page 1 when filtering
    currentParams.delete('page');

    router.get(
      `${window.location.pathname}?${currentParams.toString()}`,
      {},
      { preserveState: true, preserveScroll: true, replace: true }
    );
  };

  return (
    <Select value={value || 'all'} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
