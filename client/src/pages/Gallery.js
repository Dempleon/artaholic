import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_ARTS,
} from "../utils/actions";
import { QUERY_ARTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import Button from "react-bootstrap/Button";
import "../components/ArtItem/ArtItem";
import "../components/ArtList/ArtList";

function Gallery() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentArt, setCurrentArt] = useState({});

  const { loading, data } = useQuery(QUERY_ARTS);

  const { arts, cart } = state;

  useEffect(() => {
    if (arts.length) {
      setCurrentArt(arts.find((art) => art._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_ARTS,
        arts: data.arts,
      });

      data.arts.forEach((art) => {
        idbPromise("arts", "put", art);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("arts", "get").then((indexedArts) => {
        dispatch({
          type: UPDATE_ARTS,
          arts: indexedArts,
        });
      });
    }
  }, [arts, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        art: { ...currentArt, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentArt, purchaseQuantity: 1 });
    }
  };

  return (
    <>
      <hr />
      <h1>{currentArt.name}</h1>
      <hr />
      {currentArt && cart ? (
        <div className="container my-1">
          <img
            src={`${currentArt.image}`}
            alt={currentArt.image}
            width="100%"
          />
          <hr />
          <p>
            <strong>Price:</strong>${currentArt.price}
            {""}
            <Button onClick={addToCart} variant="outline-secondary">
              Add to Cart
            </Button>{" "}
          </p>
        </div>
      ) : null}
      {loading ? <p>Loading</p> : null}
    </>
  );
}

export default Gallery;
