'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import Cookie from "js-cookie";
import { gql } from "@apollo/client";
import client from './client';
const AppContext = createContext({});
 
export const AppContextProvider = ({ children }) => {
  
  const [restaurantID, setRestaurantID] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  
  const cart = {
    items: [],
    total: 0,
  };
  const [cartState, setCartState] = useState({cart:cart});

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser().catch(error => console.error(error));
      setUser(userData);
    };
    fetchData();
  }, []);

  const getUser = async () => {
    const token = Cookie.get("token");
    if (!token) return null;
    const { data } = await client.query({
      query: gql`
        query {
          me {
            id
            email
            username
          }
        }
      `,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    return data.me;
  };

  const resetCart = (logout) => {
    if (!logout) {
      setOrderConfirmed(true);
    }
    setCartState({ cart: {items: [], total: 0 }});
  };

  const addItem = (item) => {
    let { items } = cartState.cart;
    // check if item already in cart, or add it
    let foundItem = true;
    if(items.length > 0) {
      foundItem = items.find((i) => i.id === item.id);
      if(!foundItem) foundItem = false;
    }
    else {
      foundItem = false;
    }
    // if item is not new, add to cart, set quantity to 1 
    if (!foundItem) {
      // set quantity to 1
      let temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;
      let newCart = {
        items: [...cartState.cart.items,temp],
        total: Number(cartState.cart.total + item.attributes.Price),
      }
      setCartState({ cart : newCart });
    } else {
      // we already have it so just increase quantity ++
      console.log(`Total before adding:  ${cartState.cart.total}`)
      let newCart = {
        items: items.map((item) =>{
          if(item.id === foundItem.id){
            return Object.assign({}, item, { quantity: item.quantity + 1 })
            }else{
          return item;
        }}),
        total: cartState.cart.total + item.attributes.Price,
      }
      setCartState({ cart : newCart });
    }
  };

  const removeItem = (item) => {
    let { items } = cartState.cart;
    // check for item already in cart
    const foundItem = items.find((i) => i.id === item.id);
    if (foundItem.quantity > 1) {
      // more than one, remove one
      var newCart = {
        items: items.map((item) => {
        if(item.id === foundItem.id) {
          return Object.assign({}, item, { quantity: item.quantity - 1 });
        } else {
          return item;
        }}),
        total: cartState.cart.total - item.attributes.Price,
      }
    } else {
      // only 1 in the cart so remove the item entirely from cart
      console.log(`Trying to remove item... ${JSON.stringify(foundItem)}`);
      const index = items.findIndex((i) => i.id === foundItem.id);
      items.splice(index, 1);
      var newCart = { items: items, total: cartState.cart.total - item.attributes.Price };
    }
    setCartState({cart:newCart});
  }
  
  return (
    <AppContext.Provider value={{ 
      user, setUser, 
      cart: cartState.cart, 
      addItem: addItem, 
      removeItem: removeItem, 
      setCartState, 
      resetCart, 
      restaurantID, setRestaurantID, 
      orderConfirmed, setOrderConfirmed,
      error, setError
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);