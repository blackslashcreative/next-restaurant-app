'use client'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//import { useInitialRender } from "../utils/useInitialRender";
import CheckoutForm from '../components/checkoutForm';
import CheckoutCart from '../components/checkoutCart';

export default function Checkout() {
  const stripePromise = loadStripe("pk_test_FO8HbyXvpirdE8owXllx89ti");

  //const initialRender = useInitialRender();
  //if (!initialRender) return null;

  return (
    <main>
      <section className="container mx-auto py-24">
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
      </section>
    </main>
  )
}