import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import Button from "react-bootstrap/Button";

const styles = {
  cart: {
    margin: "50px",
  },
  artInCart: {
    height: "250px",
    padding: "10px",
  },
};

export default function CartItem(art) {
  console.log(art);
  const [state, dispatch] = useStoreContext();
  console.log(state);
  const { image, name, _id, price, quantity } = art;

  const removeFromCart = function (art) {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: _id,
    });
    idbPromise("cart", "delete", art);
  };

  const onChange = function (event) {
    const value = event.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: art._id,
      });
      idbPromise("cart", "delete", { ...art });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: art._id,
        purhcaseQuantity: parseInt(value),
      });
      idbPromise("card", "put", { ...art, purhcaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="d-flex col-6" style={styles.cart}>
      <div className="col-6">
        <img src={`${image}`} style={styles.artInCart} alt="art-pic" />
      </div>

      <div className="col-6">
        <div className="mb-3">
          <strong>{`${name}`}</strong>
        </div>
        <div className="mb-3">
          <strong>${`${price}`}</strong>
        </div>
        <div className="mb-3">
          <span>Quantity:</span>
          <input
            type="number"
            placeholder="1"
            defaultValue={quantity}
            onChange={onChange}
            disabled
          />
          <div className="mt-5">
            <Button
              onClick={() => removeFromCart(_id)}
              variant="outline-secondary"
            >
              Remove from cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
