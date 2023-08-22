'use client';
import { useRouter } from 'next/navigation';

export default function Restaurants() {
  // redirect to home page
  const router = useRouter();
  router.push("/");
}