import BranchController from "@/actions/App/Http/Controllers/BranchController"
import { DataPagination } from "@/components/data-pagination"
import { Head } from "@inertiajs/react"
import { PaginatedBranches } from "@/types/index.d"


const index = ({ branches }: { branches: PaginatedBranches }) => {
  return (
    <>
      <Head title="Branches" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Code</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">City</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {branches.data.map(branch => (
              <tr key={branch.id} className="border-b hover:bg-accent/50">
                <td className="p-3">{branch.name}</td>
                <td className="p-3">{branch.code}</td>
                <td className="p-3">{branch.phone}</td>
                <td className="p-3">{branch.email}</td>
                <td className="p-3">{branch.city}</td>
                <td className="p-3">{branch.is_active ? '✓' : '✗'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <DataPagination data={branches} variant="outline" showFirstLast />
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
