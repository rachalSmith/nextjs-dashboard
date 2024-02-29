import Cards from '@/app/dashboard/(overview)/cards';
import RevenueChart from '@/app/dashboard/(overview)/revenue-chart';
import LatestInvoices from '@/app/dashboard/(overview)/latest-invoices';
import { lusitana } from '@/app/ui/fonts';

import { Suspense } from 'react';
import {
  CardSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from '@/app/components/skeletons';
import RevenueChartContainer from './revenue-chart-container';

export default async function DashboardPage() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <Cards />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartContainer />
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
