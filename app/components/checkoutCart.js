import { useAppContext } from '../context/appContext';

function CartItem({ data }) {
  const { addItem, removeItem } = useAppContext();
  const { quantity, attributes } = data;
  return (
    <div className="p-6 flex flex-wrap justify-between border-b">
      <div className="w-2/4">
        <div className="flex flex-col h-full">
          <div className="text-white font-sm">{attributes.Name}</div>
          <span className="block pb-4 mb-auto font-sm text-gray-400">
            ${attributes.Price}
          </span>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex flex-col items-end h-full">
          <div className="flex justify-between">
            <button onClick={() => removeItem(data)}>-</button>
            <span className="block pb-4 mb-auto font-sm text-white">{quantity}</span>
            <button onClick={() => addItem(data)}>+</button>
          </div>
          <span className="block mt-2 text-sm text-white">
            ${attributes.Price * quantity}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutCart() {
  const { cart } = useAppContext();
  // console.log(`Checkout cart: ${JSON.stringify(cart)}`);
  const total = cart.total;
  const displayTotal = Math.abs(total);

  return (
    <div className="checkout-cart rounded-2xl co bs-bg-dark">
      <div className="max-w-lg pt-6 pb-8 px-8 mx-auto">
        <div className="flex mb-10 items-center justify-between">
          <h6 className="text-2xl text-white mb-0">Your Cart</h6>
        </div>

        <div>
          {cart.items
            ? cart.items.map((item, index) => {
                if (item.quantity > 0) {
                  return <CartItem key={index} data={item} />;
                }
              })
            : null}
        </div>
        <div className="p-6">
          <div className="flex mb-6 content-center justify-between">
            <span className="font-bold text-white">Order total</span>
            <span className="text-sm text-white">
              ${displayTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}