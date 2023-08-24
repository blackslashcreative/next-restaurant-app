import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { Card, CardBody, CardImg, CardText, Container, Row, Col } from 'reactstrap';

function RestaurantList(props) {

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
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading) return <p className="loading">Loading...</p>;
  if (error)   return <p>ERROR</p>;
  if (!data)   return <p>Nothing found...</p>;
  //console.log(data.restaurants.data);

    const searchQuery = data.restaurants.data.filter((res) => 
    res.attributes.Name.toLowerCase().includes(props.search)
    );
  
  //console.log(`searchQuery: ${searchQuery}`);
  if(searchQuery.length > 0){
    // set ID for first restaurant
    let restId = searchQuery[0].id;

    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card>
          <CardImg 
            top={true}
            style={{height:200}}
            src={`http://localhost:1337` + res.attributes.Image.data.attributes.url}
          />
          <CardBody>
            <Link 
              className="restaurant-link"
              key={res.attributes.Name} 
              href="restaurants/[id]"
              as={`restaurants/${res.id}`}
            >
              <h2>{res.attributes.Name}</h2>
            </Link>
            <CardText>{res.attributes.Description}</CardText>
          </CardBody>
        </Card>
      </Col>
    ))
    return (
      <Container className="p-0">
        <Row>
          {restList}
        </Row>
      </Container>
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

export default RestaurantList;