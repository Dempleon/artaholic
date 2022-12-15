import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import Button from "react-bootstrap/Button";
import { alignPropType } from "react-bootstrap/esm/types";

const styles = {
  art: {
    height: "25vh",
    width: "auto",
  },
  card: {
    backgroundColor: "transparent",
    border: "none",
    paddingBottom: "35px",
    paddingTop: "15px",
    flexDirection: "column",
    marginLeft: "8%",
  },
};

function ArtItem(item) {
  const [state, dispatch] = useStoreContext();

  let { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        art: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card gallery col-3 d-flex" style={styles.card}>
      <Link to={`/arts/${_id}`} className="col-6">
        <img style={styles.art} alt={name} src={`${image}`} />
      </Link>{" "}
      <br />
      <div className="col-6 d-flex align-items-center">
        <div>
          <strong>{name}</strong>
          <div>
            <strong>${price}</strong>
          </div>
          <br />
          <div>
            <Button variant="outline-secondary" onClick={addToCart}>
              Add Art piece to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtItem;
