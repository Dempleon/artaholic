import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import CartItem from "../CartItem/CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const styles = {
  image: {
    marginTop: "5%",
    textAlign: "center",
  },
  name: {
    marginTop: "5px",
  },
};

class TakeMoney extends React.Component {
  onToken = (token) => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token),
    }).then((response) => {
      response.json().then((data) => {
        alert(`We are in business`);
      });
    });
  };

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
    );
  }
}

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
      const cart = await idbPromise("cart", "get");
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
    });
  }

  const options = {
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <div>
      <h2 style={styles.image}>Cart</h2>
      {state.cart.length ? (
        <>
          <div
            className="d-flex justify-content-center flex-wrap"
            style={styles.name}
          >
            {state.cart.map((art) => (
              <CartItem
                key={art._id}
                _id={art._id}
                name={art.name}
                price={art.price}
                image={art.image}
                quantity={art.purchaseQuantity}
              />
            ))}
          </div>
          <div className="d-flex justify-content-center flex-wrap">
            <div className="col-6"></div>
            <div className="col-6 mb-3">
              <strong>Total: ${getCartTotal()}</strong>
            </div>
            {Auth.checkToken() ? <TakeMoney /> : <span>Login to checkout</span>}
          </div>
        </>
      ) : (
        <div>
          <h3>The cart is empty</h3>
        </div>
      )}
    </div>
  );
}
