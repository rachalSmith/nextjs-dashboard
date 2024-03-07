import { lusitana } from '@/app/ui/fonts';

import { Button } from '../components/button';
import { fetchUser } from '../lib/data';
import DisplayName from './profile-forms';

export default async function ProfilePage() {
  const user = await fetchUser();

  if (!user || user.length !== 1) {
    throw new Error('Error fetching User');
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Profile
      </h1>
      <div className="flex flex-col gap-6 ">
        <DisplayName displayName={user[0].name} />
      </div>
    </main>
  );
}
