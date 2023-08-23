import { useAppContext } from "../appContext";

function CartItem({ data }) {
  const { addItem, removeItem } = useAppContext();
  const { quantity, attributes } = data;
  return (
    <div className="checkout-cart p-6 flex flex-wrap justify-between border-b border-gray-400">
      <div className="w-2/4">
        <div className="flex flex-col h-full">
          <h6 className="text-sm mb-1">{attributes.Name}</h6>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex flex-col items-end h-full mt-1">
          <div className="update-quantity flex justify-between">
            <button
              className="mr-2 inline-block mb-auto font-medium text-sm hover:text-gray-200"
              onClick={() => removeItem(data)}
            >
              -
            </button>
            <button
              className="inline-block mb-auto font-medium text-sm hover:text-gray-200"
              onClick={() => addItem(data)}
            >
              +
            </button>
          </div>
          <span className="block text-xs mb-auto text-gray-400 mt-2">
            {quantity} x ${attributes.Price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutCart() {
  const { cart } = useAppContext();
  const total = cart.total;
  const displayTotal = Math.abs(total);

  return (
    <div className="rounded-2xl co">
      <div className="max-w-lg pt-6 pb-8 px-8 mx-auto bg-blueGray-900">
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
            <span>Order total</span>
            <span className="text-sm">
              ${displayTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}