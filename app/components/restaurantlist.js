import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Dishes from './dishes';
import { useState } from 'react';

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
  console.log(data.restaurants.data);

  const searchQuery = data.restaurants.data.filter((res) => 
   res.attributes.Name.toLowerCase().includes(props.search)
  );
  
  if(searchQuery.length > 0){
    // set ID for first restaurant
    let restId = searchQuery[0].id;
    // define renderer for dishes
    const renderDishes = (restaurant_id) => {
      return (
        // <Dishes restId={restaurant_id}></Dishes>
        <p>TODO: Add dishes here</p>
      )
    };

    const restList = searchQuery.map((res) => (
      <div>
        <img src={`http://localhost:1337` + res.attributes.Image.data.attributes.url} />
        <div>
          {res.attributes.Description}
        </div>
        <div className="card-footer">
          <Link key={res.attributes.Name} as={"/restaurants/"+res.attributes.Name} href="restaurants/[restaurant]">
            {res.attributes.Name}
          </Link>
        </div>
      </div>
    ))
    return (
      <container>
        <row>
          {restList}
        </row>
        <row>
          {/* {renderDishes(restId)} */}
        </row>
      </container>
    )
  } else {
    return (
      <p>Nothing found...</p>
    )
  }
}

export default RestaurantList;