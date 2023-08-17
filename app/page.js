'use client'
import Image from 'next/image';
import Link from 'next/link';
import Layout from './layout.js';
import { useAppContext } from './context/appContext';

const restaurants = [
  {name:"WoodsHill"},
  {name:"Fiorellas"},
  {name:"Karma"}
];

export default function Home() {
  const { working, setWorking} = useAppContext();
  const { isAuthenticated, setIsAuthentica} = useAppContext();

  return (
    <main>
      <h1>Hello World</h1>
      <p>Working? = {working}</p>
      {restaurants.map( item => {
        return <div>
          <Link as={"/restaurants/"+item.name} href="restaurants/[restaurant]">
            {item.name}
          </Link>
        </div>
      })}
    </main>
  )
}
