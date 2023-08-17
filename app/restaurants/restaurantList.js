import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
//import Dishes from './dishes';
import { useState } from 'react';

export default function RestaurantList(props) {
  const[restaurantID, setRestaurantID] = useState();
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error)   return <p>ERROR</p>;
  if (!data)   return <p>Not found</p>;
  console.log(data.restaurants)

  const searchQuery = data.restaurants.filter((res) =>
    res.name.toLowerCase().includes(props.search)
  );

  // set id for first restaurant
  let restID = searchQuery[0].id;
  // define renderer for dishes
  /*const renderDishes = (restaurant_Id) => {

  };*/
}