import { RevenueChartSkeleton } from '@/app/components/skeletons';
import { fetchRevenue } from '@/app/lib/data';
import { Suspense } from 'react';
import RevenueChart from './revenue-chart';

export default async function RevenueChartContainer() {
  const revenue = await fetchRevenue();

  return (
    <Suspense fallback={<RevenueChartSkeleton />}>
      <RevenueChart revenue={revenue} />
    </Suspense>
  );
}
