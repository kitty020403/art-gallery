import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Server component: decide the landing based on presence of auth token
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (token) {
    redirect('/catalog');
  }
  redirect('/landingpage');
}
