//Rui
import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";

function ArtItem(item) {
  const [state, dispatch] = useStoreContext();
  // TODO: need to create a global state for useStoreContext

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
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
    //TODO: HTML part to show arts with a slide(image/name/price/add to cart button/ quantity?) slider needs to be completed
    // https://codesandbox.io/s/znqout?file=/src/App.jsx:403-983
    <div className="card gallery">
      <Link to={`/arts/${_id}`}>
        {/* <img alt={artname} src={`/images/${image}`} /> */}
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>{name}</SwiperSlide>
          {/* <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide> */}
        </Swiper>
        <p>{name}</p>
      </Link>
      <div>
        {/* TODO: determine if we need quantity for arts */}
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ArtItem;
