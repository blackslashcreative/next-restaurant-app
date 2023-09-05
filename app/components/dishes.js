import { useAppContext } from '../appContext';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Card, CardBody, CardImg, CardText, Col, CardFooter} from 'reactstrap';


function Dishes({restId, search}) {

  const { addItem } = useAppContext();
  
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

  const { loading, error, data } = useQuery(GET_RESTAURANT, {
    variables: { id: restId},
  });
  if (loading) return <p className="loading">Loading...</p>;
  if (error)   return <p>ERROR</p>;
  if (!data)   return <p>Nothing found...</p>;

  const dishes = data.restaurant.data.attributes.Dishes;

  const searchResults = dishes.data.filter((dish) => 
    dish.attributes.Name.toLowerCase().includes(search)
  );

  if(searchResults.length > 0){

    const listDishes = searchResults.map((dish) => (
      <Col md="3" key={dish.id}>
        <Card>
          <CardImg 
            top={true}
            style={{height:200}}
            src={`https://strapi-kc1z.onrender.com` + dish.attributes.Image.data.attributes.url}
          />
          <CardBody>
            <h2>{dish.attributes.Name}</h2>
            <CardText>{dish.attributes.Description}</CardText>
          </CardBody>
          <CardFooter>
            <button
              onClick={() => { addItem(dish) }}
            >
              Add To Cart
            </button>
          </CardFooter>
        </Card>
      </Col>
    ))
    return (
      <>{listDishes}</>
    )

  } else {

    return (
      <Container className="p-0">
        <Row>
          Nothing found...
        </Row>
      </Container>
    )

  }
}

export default Dishes;