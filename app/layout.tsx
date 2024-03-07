import '@/app/ui/global.css';
import { inter } from './ui/fonts';
import { Metadata } from 'next';
import SideNav from './components/nav/sidenav';

import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialised relative`}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>

          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            <Link
              className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center !rounded-full bg-white text-blue-500 transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 md:bg-blue-500 md:text-white"
              href={'/profile'}
            >
              RS
            </Link>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
