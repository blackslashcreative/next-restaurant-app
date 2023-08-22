'use client';
import { useQuery, gql } from '@apollo/client';
import Dishes from '../../components/dishes';
import Cart from '../../components/cart';
import { Row, Col } from 'reactstrap';

export default function Restaurant({params}) {

  const GET_RESTAURANT = gql`
  query getRestaurant($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          Name
          Dishes {
            data {
              id
              attributes {
                Name
                Description
                Price
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
  // console.log(`restaurant = ${params.id}`);
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
    <main class="container">
      <h1>{restaurant.attributes.Name}</h1>
      <Row>
        <Dishes restId={params.id}/>
        <Col md="3" key="cart">
          <Cart/>
        </Col>
      </Row>
    </main>
  )
}
