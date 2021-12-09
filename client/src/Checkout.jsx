import React, { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StorageComp from "./util/storageComp.jsx";
import CheckoutForm from "./CheckoutForm.jsx";

const CheckoutFormWithStorage = StorageComp(CheckoutForm);
const stripePromise = loadStripe("pk_test_51I2dtwKYFcH0CnWCSYR2PnKNspV9wJEnPmYOcaNfX7VmuzcgZvM3b591RyEatnAcEB2wiAkccGrZUDmpb9CYt2wq00P1dKvW7t");


function Checkout (props) {
    const [amount, setAmount] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {

        if (props.load) {
            setClientSecret(props.load('clientSecret'));
            setAmount(props.load("amount"));
        }
    }, [props]);

    const appearance = {
        theme: 'stripe',
      };
    const options = {
        clientSecret,
        appearance,
    };


    console.log("options: ", options);
    console.log("amount in checkout: ", amount);
    return (
        <div>
            {(clientSecret && amount) && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutFormWithStorage amount={amount}/>
                </Elements>
            )}
        </div>
    );
}

export default Checkout;