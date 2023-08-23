'use client'
import RestaurantList from './components/restaurantlist';
import { useState } from 'react';
import { InputGroup, Input } from 'reactstrap';
import { useAppContext } from './appContext';

function Home() {
  const [query, setQuery] = useState("");
  const { successMessage } = useAppContext();

  return (
    <main className="home">
      <div className="search">
        <h1>Hungry?</h1>
        {successMessage && <div className="form-footer-alert success">{successMessage}</div>}
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