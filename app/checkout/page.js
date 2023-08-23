'use client'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//import { useInitialRender } from "../utils/useInitialRender";
import CheckoutForm from '../components/checkoutForm';
import CheckoutCart from '../components/checkoutCart';
import { useAppContext } from "../appContext";
import { TbTruckDelivery } from "react-icons/tb";

export default function Checkout() {
  const stripePromise = loadStripe("pk_test_FO8HbyXvpirdE8owXllx89ti");
  const { orderConfirmed } = useAppContext();

  //const initialRender = useInitialRender();
  //if (!initialRender) return null;

  return (
    <main>
      <section className="container mx-auto">
        {orderConfirmed ? (
          <div class="order-confirmation">
            <TbTruckDelivery size={40}/><br/>
            <h4 className="order-confirmed">Your order has been placed!</h4>
          </div>
        ) : (
          <div className="row">
            <h1>Checkout</h1>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-2">
                <CheckoutCart />
              </div>
              <div className="col-span-3">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
              </div>
            </div>
          </div>
        )
        }
      </section>
    </main>
  )
}