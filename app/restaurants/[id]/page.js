'use client';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import Dishes from '../../components/dishes';
import Cart from '../../components/cart';
import { Row, Col, InputGroup, Input } from 'reactstrap';

export default function Restaurant({params}) {

  const GET_RESTAURANT = gql`
  query getRestaurant($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          Name,
          Description
        }
      }
    }
  }`;
  
  const [query, setQuery] = useState("");
  const { loading, error, data } = useQuery(GET_RESTAURANT, {
    variables: { id: params.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error); 
    return <p>ERROR</p>;
  }
  if (!data) return <p>Oops! Nothing found...</p>;

  let restaurant = data.restaurant.data;

  return (
    <main className="container">
      <div className="search">
        <h1>{restaurant.attributes.Name}</h1>
        <InputGroup>
          <Input
            placeholder="Type to search for something to nybble on..."
            type="text"
            value={query}
            onChange={(e) =>
              setQuery(e.target.value.toLocaleLowerCase())
            }
          />
        </InputGroup> 
      </div>
      <Row>
        <Col md="3" key="cart">
          <Cart/>
        </Col>
        <Dishes restId={params.id} search={query}/>
      </Row>
    </main>
  )
}
