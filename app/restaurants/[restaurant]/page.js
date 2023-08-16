'use client';
import { usePathname } from 'next/navigation';
import styles from '../restaurants.module.css';

export default function Restaurant() {
  const pathname = usePathname().split("/").pop();
  const restaurant = pathname.charAt(0).toUpperCase() + pathname.slice(1)
  return (
    <main>
      <h1>Dynamic Restaurant Page: {restaurant}</h1>
    </main>
  )
}
