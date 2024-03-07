import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-end leading-none text-white`}
    >
      <GlobeAltIcon className="h-10 w-10 rotate-[15deg]" />
      <p className="text-[38px]">Ltd.</p>
    </div>
  );
}
