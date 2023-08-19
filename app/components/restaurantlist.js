import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Dishes from './dishes';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardImg, CardText, Container, Row, Col } from 'reactstrap';

function RestaurantList(props) {
  const [restaurantID, setRestaurantID] = useState(0);

  const GET_RESTAURANTS = gql`
  {
    restaurants {
      data {
        id
        attributes {
          Name
          Description
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
  }`;
  const { loading, error, data } = useQuery(GET_RESTAURANTS); // DONE?
  if (loading) return <p>Loading...</p>;
  if (error)   return <p>ERROR</p>;
  if (!data)   return <p>Nothing found...</p>;
  //console.log(data.restaurants.data);

  const searchQuery = data.restaurants.data.filter((res) => 
   res.attributes.Name.toLowerCase().includes(props.search)
  );
  
  console.log(`searchQuery: ${searchQuery}`);
  if(searchQuery.length > 0){
    // set ID for first restaurant
    let restId = searchQuery[0].id;
    // define renderer for dishes
    const renderDishes = (restaurant_id) => {
      return (
        <Dishes restId={restaurant_id}/>
      )
    };

    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card>
          <CardImg 
            top={true}
            style={{height:200}}
            src={`http://localhost:1337` + res.attributes.Image.data.attributes.url}
          />
          <CardBody>
            <CardText>{res.attributes.Description}</CardText>
          </CardBody>
          <div className="card-footer">
            <Link key={res.attributes.Name} as={"/restaurants/"+res.attributes.Name} href="restaurants/[restaurant]">
              <button onClick={()=>setRestaurantID(res.id)}>
                {res.attributes.Name}
              </button>
            </Link>
          </div>
        </Card>
      </Col>
    ))
    return (
      <Container className="p-0">
        <Row>
          {restList}
        </Row>
        { props.search && <Row>{renderDishes(restId)}</Row> }
      </Container>
    )
  }
}

export default RestaurantList;