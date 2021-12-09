import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";
import Button from '@material-ui/core/Button';
import ShopItem from "./shopItem.jsx";

export default function CheckoutForm(props) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    let clientSecret = "";
    let amount = "";

    useEffect(() => {
      if (!props.load) {
        return;
      }
      clientSecret = props.load("clientSecret")
      amount = Number(props.load("amount"));
      console.log("client secret is: ", clientSecret);
      console.log("amount in form is: ", amount)
        if(!stripe){
            return;
        }

        if (!clientSecret) {
            return;
        }

        if (!amount) {
          return;
        }

        stripe
      .retrieveSetupIntent(clientSecret)
      .then(({setupIntent}) => {
        // Inspect the SetupIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
          switch (setupIntent.status) {
            case 'succeeded':
              setMessage('Success! Your payment method has been saved.');
              break;

            case 'processing':
              setMessage("Processing payment details. We'll update you when processing is complete.");
              break;

            case 'requires_payment_method':
              // Redirect your user back to your payment page to attempt collecting
              // payment again
              setMessage('Failed to process payment details. Please try another payment method.');
              break;
            default:
              setMessage('Unknown state.');
          }
      });
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
      console.log('in handle submit');
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          console.log("not good");
          return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:3000/success",
          },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occured.");
        }

        setIsLoading(false);
      };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <ShopItem amount={amount}/>
            <PaymentElement id="payment-element" />
            <Button onClick={handleSubmit} disabled={isLoading || !stripe || !elements} variant="contained" size="large" color="primary" id="submit">
                <span id="button-text">
                    Pay now
                </span>
             </Button>

            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>

    )


}