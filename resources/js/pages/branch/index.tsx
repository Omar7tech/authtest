import BranchController from "@/actions/App/Http/Controllers/BranchController"
import { DataPagination } from "@/components/data-pagination"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Head, Link } from "@inertiajs/react"
import { PaginatedBranches } from "@/types/index.d"
import { Building2 } from "lucide-react"

const index = ({ branches }: { branches: PaginatedBranches }) => {
  const hasData = branches.data.length > 0;

  return (
    <>
      <Head title="Branches" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {hasData ? (
          <>
            <Table>
              <TableCaption>A list of all branches.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branches.data.map(branch => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium">{branch.name}</TableCell>
                    <TableCell>{branch.code}</TableCell>
                    <TableCell>{branch.phone}</TableCell>
                    <TableCell>{branch.email}</TableCell>
                    <TableCell>{branch.city}</TableCell>
                    <TableCell className="text-center">{branch.is_active ? '✓' : '✗'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <DataPagination data={branches} variant="outline" showFirstLast />
          </>
        ) : (
          <EmptyState
            icon={Building2}
            title="No branches found"
            description="Get started by creating your first branch location."
          />
        )}
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
