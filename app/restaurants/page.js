'use client';
import { useRouter } from 'next/navigation';

export default function Restaurants() {
  useEffect(() => {
    const router = useRouter();
  }, []);
  // redirect to home page
  router.push("/");
}