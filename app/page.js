import Image from 'next/image';
import Link from 'next/link';
import Layout from './layout.js';

const restaurants = [
  {name:"WoodsHill"},
  {name:"Fiorellas"},
  {name:"Karma"}
];

export default function Home() {
  return (
    <Layout>
      <main>
        <h1>Hello World</h1>
        {restaurants.map( item => {
          return <div>
            <Link as={"/restaurants/"+item.name} href="restaurants/[restaurant]">
              {item.name}
            </Link>
          </div>
        })}
      </main>
    </Layout>
  )
}
