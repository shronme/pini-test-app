import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import StorageComp from './util/storageComp.jsx';
import Shop from './Shop.jsx';
import Checkout from './Checkout.jsx';
import Success from './Success.jsx';

const ShopWithStorage = StorageComp(Shop);
const CheckoutWithStorage = StorageComp(Checkout);

function AppRouter() {

    return (
        <Router>
            <div>
                <h1 href="/">Bounce Shop</h1>
                <hr />
                <Routes>
                    <Route path="/" element={<ShopWithStorage />} />
                    <Route path="/checkout" element={

                        <CheckoutWithStorage amount="10000"/>
                    } />
                    <Route path="/success/*" element=<Success /> />

                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;