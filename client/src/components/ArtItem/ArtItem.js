//Rui
import React from 'react';


function ArtItem(item) {
    const [state, dispatch] = useStoreContext()
    // TODO: need to create a global state for useStoreContext

    const {
        image,
        name,
        _id,
        price,
        quantity,
    } = item;

    const { cart } = state

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id)
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                art: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }

    return (
        //TODO: HTML part to show arts with a slide(image/name/price/add to cart button/ quantity?)
        <div className='card gallery'>
            <Link to={`/arts/${_id}`}>
                <img 
                alt={artname}
                src={`/images/${image}`}
                />
                <p>{name}</p>
            </Link>
            <div>
                {/* TODO: determine if we need quantity for arts */}
                <div>{quantity} {pluralize('item', quantity)} in stock</div>
                <span>${price}</span>
            </div>
        <button onClick={addToCart}>Add to cart</button>
        </div>
    );
}

export default ArtItem;