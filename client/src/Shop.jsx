import React from "react";
import {useNavigate} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ShopItem from "./shopItem.jsx";

function Shop(props) {
    let navigate = useNavigate();
    const amount = 120;

    function paymentHandler(){

        fetch("http://127.0.0.1:8000/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"amount": amount*100, "currency": "USD"})
        })
        .then((res) => res.json())
        .then((data) => {
            if (props.save) {
                props.save('clientSecret', data.client_secret);
                props.save('amount', amount);
            }

        });

        navigate("checkout");
    }
    console.log("amount in shop: ", amount);
    return (
        <div>
            <ShopItem amount={amount}/>
            <Button onClick={paymentHandler} variant="contained" size="large" color="primary">Buy Now</Button>
        </div>
    );
}

export default Shop;