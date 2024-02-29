'use client';

import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Revenue } from '@/app/lib/definitions';

export default async function RevenueChart({
  revenue,
}: {
  revenue: Revenue[];
}) {
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="p-4-1 mt-0 h-[24.08em] rounded-md bg-white">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              barCategoryGap={8}
              data={revenue}
              margin={{
                top: 32,
                right: 16,
                left: 16,
                bottom: 16,
              }}
            >
              <XAxis dataKey="month" stroke="1" tick={{ fill: '#a3a3a3' }} />
              <YAxis stroke="1" tick={{ fill: '#a3a3a3' }} />
              <Tooltip cursor={{ fill: '#fafafa' }} />
              <Bar
                dataKey="revenue"
                fill="#93C5FD"
                radius={4}
                activeBar={<Rectangle fill="#2563eb" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
