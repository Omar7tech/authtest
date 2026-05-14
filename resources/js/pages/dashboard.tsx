import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { ChartAreaLegend } from '@/components/charts/ChartAreaLegend';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative  overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <ChartAreaLegend />
                    </div>
                    <div className="relative  overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <ChartAreaLegend />
                    </div>
                    <div className="relative  overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    </div>
                </div>
                <div className="relative  flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <ChartAreaLegend />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
