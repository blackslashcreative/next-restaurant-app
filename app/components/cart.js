import { FaOpencart } from "react-icons/fa";
import { useAppContext } from '../appContext';
import { Card, CardTitle, CardBody } from 'reactstrap';
import Link from 'next/link';
import Image from 'next/image';

function Cart() {
  let isAuthenticated = true; // ???
  const { cart, addItem, removeItem } = useAppContext();

  // Render items in cart
  const renderItems = () => {
    let {items} = cart;
    console.log(`items: ${JSON.stringify(items)}`);
    
    if(!items || !items.length) return <p className="empty-cart"><FaOpencart size={40}/><br/>Your cart is empty!</p>

    let itemList = items.map((item => {
      if(item.quantity > 0) {
        return (
          <div
            className="cart-item"
            key={item.id}
          >
            <span className="cart-image">
              <img 
                src={`http://localhost:1337${item.attributes.Image.data.attributes.url}`} 
                alt={`Picture of ${item.attributes.Name}`}
              />
            </span>
            <span id="item-name">&nbsp; {item.attributes.Name}</span>
            <span id="item-price">&nbsp; ${item.attributes.Price}</span>
            <div className="update-quantity">
              <button onClick={() => removeItem(item)}>-</button>
              <span id="item-quantity">&nbsp;&nbsp; x{item.quantity}&nbsp;</span>
              <button onClick={() => addItem(item)}>+</button>
            </div>
          </div>
        )
      }
    }));
    return itemList;
  }

  const checkoutItems = () => {
    return (
      <div className="cart-footer">
      <Link href="/checkout/">
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