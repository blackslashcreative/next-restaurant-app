'use client'
import RestaurantList from './components/restaurantlist';
import Cart from './components/cart';
import { useAppContext } from './context/appContext';
import { useQuery, ApolloProvider, InMemoryCache } from '@apollo/client';
import client from './client';
import { useState } from 'react';
import { InputGroup, Input } from 'reactstrap';

function Home() {
  const [query, setQuery] = useState("");
  return (
    <main>
      <ApolloProvider client={client}>
        <div className="search">
          <h1>Search Restaurants</h1>
          <InputGroup>
            <Input
              placeholder="Type to search"
              type="text"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value.toLocaleLowerCase())
              }
            />
          </InputGroup> 
        </div>
        <RestaurantList search={query} />
        <Cart></Cart>
      </ApolloProvider>
    </main>
  )
}

export default Home;