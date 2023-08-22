'use client'
import RestaurantList from './components/restaurantlist';
import { useState } from 'react';
import { InputGroup, Input } from 'reactstrap';

function Home() {
  const [query, setQuery] = useState("");
  return (
    <main class="home">
      <div className="search">
        <h1>Hungry?</h1>
        <InputGroup>
          <Input
            placeholder="Type to search for local restaurants..."
            type="text"
            value={query}
            onChange={(e) =>
              setQuery(e.target.value.toLocaleLowerCase())
            }
          />
        </InputGroup> 
      </div>
      <RestaurantList search={query} />
    </main>
  )
}

export default Home;