import { useAppContext } from '../context/appContext';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  // button
  Card, 
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col, 
  CardFooter} from 'reactstrap';
function Dishes({restId}) {
  const [restaurantID, setRestaurantID] = useState();
  const { addItem } = useAppContext();
  
  const GET_RESTAURANT_DISHES = gql`
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
  console.log(`restaurant = ${restaurantID}`);
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId },
  });
  console.log("Data...");
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error); 
    return <p>ERROR</p>;
  }
  if (!data)   return <p>Nothing found...</p>;

  let restaurant = data.restaurant.data;
  console.log(`restId: ${restId}`);
  if (restId > 0) {
    return (
      <>
      {restaurant.attributes.Dishes.data.map((res) => (
        <Col xs="6" sm="4" key={res.id}>
          <Card>
            <CardImg
              top={true}
              style={{ height:150, width:150 }}
              src={`http://localhost:1337${res.attributes.Image.data.attributes.url}`}
            />
            <CardBody>
              <CardTitle>{res.attributes.Name}</CardTitle>
              <CardText>{res.attributes.Description}</CardText>
            </CardBody>
            <CardFooter>
              <button
                onClick={() => { addItem(res) }}
              >
                Add To Cart
              </button>
            </CardFooter>
          </Card>
        </Col>
      ))}
      </>
    )
  }
  else {
    return <p>No dishes found.</p>
  }
}

export default Dishes;