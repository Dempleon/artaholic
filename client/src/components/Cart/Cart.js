import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import CartItem from '../CartItem/CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import './Cart.css';

// todo: change the imported queries/mutations later
// todo: refactor as needed
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART, OPEN_CART } from '../../utils/actions';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
// import { startSession } from '../../../../server/models/User';

// todo: may need to change api key into loadstrip
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from "react-stripe-checkout";
import Row from "react-bootstrap/Row";
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


class TakeMoney extends React.Component {
    onToken = (token) => {
        fetch('/save-stripe-token', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(response => {
            response.json().then(data => {
                alert(`We are in business`);
            });
        });
    }

    render() {
        return (
            
            <StripeCheckout
                name="Artaholics"
                token={this.onToken}
                stripeKey="my_PUBLISHABLE_stripekey"
                shippingAddress
                billingAddress={false}
                currency="USD"
                bitcoin
            />
        )
    }
}

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

    // function toggleCart() {
    //     dispatch({ type: TOGGLE_CART });
    // }

  

    // function to checkout the order
    function checkoutOrder() {
        const artsIds = [];

        console.log(state.cart);
        state.cart.forEach((art) => {
            for (let i = 0; i < art.purchasedQuantity; i++) {
                artsIds.push(art._id);
            }
        });

        getCheckout({
            variables: { arts: artsIds },
        })
    }

    // if (!state.cartOpen) {
    //     dispatch({type: OPEN_CART})
    //     return (
    //         // <div className="cart-closed" onClick={toggleCart}>
    //         //     <span>
    //         //         [open cart]
    //         //     </span>
    //         // </div>
    //         <div></div>
    //     )
    // }

    const options = {
        clientSecret: '{{CLIENT_SECRET}}'
    }

    return (
        <div>
            <h2>Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map((art) => (
                        
                        <CartItem key={art._id} name={art.name} price={art.price} image={art.image} quantity={art.quantity}/>
                    ))}

                    <div>
                        <strong>Total: ${getCartTotal()}</strong>

                        {/* Check to see if the user is logged in. If so render a button to check out */}
                        {Auth.checkToken() ? (
                            <TakeMoney/>
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