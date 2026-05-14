import BranchController from "@/actions/App/Http/Controllers/BranchController"
import { ChartAreaLegend } from "@/components/charts/ChartAreaLegend"
import { Head } from "@inertiajs/react"


const index = () => {
  return (
    <>
      <Head title="Branches" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
       sdf
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
