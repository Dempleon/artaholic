import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import CartItem from '../CartItem/CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import './Cart.css';

// todo: change the imported queries/mutations later
// todo: refactor as needed
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
// import { startSession } from '../../../../server/models/User';

// todo: may need to change api key into loadstrip
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// todo: complete cart, might have to finish CartItem first
export default function Cart() {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, arts: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    // function to return cart total fixed to two decimal places
    function getCartTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    // function to checkout the order
    function checkoutOrder() {
        const artsIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchasedQuantity; i++) {
                artsIds.push(item._id);
            }
        });

        getCheckout({
            variables: { arts: artsIds },
        })
    }

    if (!state.cartOpen) {
        return (
            <div>
                <span>
                    The cart is not open, keep working on this
                </span>
            </div>
        )
    }

    return (
        <div>
            <div onClick={toggleCart}>
                [close cart]
            </div>
            <h2>Cart</h2>
            <h1>@@@@@@@@@@@@@@@@@ TODO: keep working on cart--------</h1>
            {state.cart.length ? (
                <div>
                    {state.cart.map((art) => (
                        <CartItem key={art._id} item={art} />
                    ))}

                    <div>
                        <strong>Total: ${getCartTotal()}</strong>

                        {Auth.checkToken() ? (
                            <button onClick={checkoutOrder}>checkout</button>
                        ) : (
                            <span>Login to checkout</span>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <h3>The cart is empty</h3>
                </div>
            )}
        </div>
    )
}