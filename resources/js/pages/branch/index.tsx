import BranchController from "@/actions/App/Http/Controllers/BranchController"
import { ColumnDef, DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Head, router } from "@inertiajs/react"
import { Branch, PaginatedBranches } from "@/types/index.d"
import { Building2, MoreHorizontalIcon } from "lucide-react"

interface Filters {
  filter?: Record<string, string>;
  sort?: string;
}


const index = ({ branches, filters }: { branches: PaginatedBranches; filters: Filters }) => {
  const columns: ColumnDef<Branch>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      className: 'font-medium'
    },
    {
      key: 'code',
      header: 'Code',
      sortable: true
    },
    {
      key: 'phone',
      header: 'Phone'
    },
    {
      key: 'email',
      header: 'Email'
    },
    {
      key: 'city',
      header: 'City',
      sortable: true
    },
    {
      key: 'is_active',
      header: 'Status',
      className: 'text-center',
      render: (branch) => (
        <Badge
          onClick={() => {
            router.optimistic((props: { branches: PaginatedBranches }) => ({
              branches: {
                ...props.branches,
                data: props.branches.data.map((b: Branch) =>
                  b.id === branch.id
                    ? { ...b, is_active: !b.is_active }
                    : b
                )
              }
            })).post(`/branches/${branch.id}/toggle-active`, {}, {
              preserveScroll: true,
              preserveState: true,
              showProgress: false
            })
          }}
          className={branch.is_active
            ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 cursor-pointer'
            : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 cursor-pointer'}
          variant="outline"
        >
          {branch.is_active ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-5">
              <MoreHorizontalIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <>
      <Head title="Branches" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <DataTable
          data={branches}
          columns={columns}
          searchable={{ key: 'name', placeholder: 'Search branches...' }}
          filters={[
            {
              key: 'is_active',
              placeholder: 'Status',
              options: [
                { label: 'Active', value: '1' },
                { label: 'Inactive', value: '0' }
              ]
            },
            {
              key: 'city',
              placeholder: 'City',
              options: [
                { label: 'Dubai', value: 'Dubai' },
                { label: 'Abu Dhabi', value: 'Abu Dhabi' }
              ]
            }
          ]}
          currentFilters={filters}
          caption="A list of all branches."
          emptyState={{
            icon: Building2,
            title: 'No branches found',
            description: 'Get started by creating your first branch location.'
          }}
        />
      </div>
    </>
  )
}

export default index


index.layout = {
  breadcrumbs: [
    {
      title: 'Branches',
      href: BranchController.index(),
    },
  ],
};
