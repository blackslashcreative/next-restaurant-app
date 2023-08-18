'use client'
import RestaurantList from './components/restaurantlist';
import { useAppContext } from './context/appContext';
import { useQuery, ApolloProvider, InMemoryCache } from '@apollo/client';
import client from './client';
import { useState } from 'react';

function Home() {
  const [query, setQuery] = useState("");
  return (
    <main>
      <h1>Search Restaurants</h1>
      <div className="search">
        <input 
          type="text"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value.toLocaleLowerCase())
          }
        />
      </div>
      <ApolloProvider client={client}>
        <RestaurantList search={query} />
      </ApolloProvider>
    </main>
  )
}

export default Home;