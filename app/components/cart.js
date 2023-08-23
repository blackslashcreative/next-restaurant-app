import { FaOpencart } from "react-icons/fa";
import { useAppContext } from '../appContext';
import { Card, CardTitle, CardBody } from 'reactstrap';
import Link from 'next/link';
import Image from 'next/image';

function Cart() {
  let isAuthenticated = true; // ???
  const { user, cart, addItem, removeItem } = useAppContext();

  // Render items in cart
  const renderItems = () => {
    let {items} = cart;
    console.log(`items: ${JSON.stringify(items)}`);
    
    if (!items.length) return <p className="empty-cart"><FaOpencart size={40}/><br/>Your cart is empty!</p>

    let itemList = items.map((item => {
      if(item.quantity > 0) {
        return (
          <div
            className="cart-item"
            key={item.id}
          >
            <div className="cart-image">
              <img 
                src={`http://localhost:1337${item.attributes.Image.data.attributes.url}`} 
                alt={`Picture of ${item.attributes.Name}`}
              />
            </div>
            <div className="item-name">{item.attributes.Name}<br/>x{item.quantity}<span className="item-price">${item.attributes.Price}</span></div>
            <div className="update-quantity">
              <button onClick={() => removeItem(item)}>-</button>
              <button onClick={() => addItem(item)}>+</button>
            </div>
          </div>
        )
      }
    }));
    return itemList;
  }

  const checkoutItems = () => {
    const buttonLink = user ? "/checkout" : "/login";
    return (
      <div className="cart-footer">
      <Link href={buttonLink}>
        <button>Checkout</button>
      </Link>
        <h5>Total: ${cart.total}</h5>
      </div>
    )
  }

  return (
    <section id="cart">
      <Card>
        <CardTitle>Your Order:</CardTitle>
        <hr />
        <CardBody>
          {renderItems()}
          {checkoutItems()}
        </CardBody>
      </Card>
    </section>
  )
}

export default Cart;