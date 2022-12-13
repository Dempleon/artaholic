import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

export default function CartItem (art) {
    const [, dispatch] = useStoreContext();

    const removeFromCart = function(art) {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: art._id
        });
        idbPromise('cart', 'delete', {...art});
    };

    const onChange = function(event) {
        const value = event.target.value;
        if(value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: art._id
            });
            idbPromise('cart', 'delete', {...art});
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: art._id,
                purhcaseQuantity: parseInt(value)
            });
            idbPromise('card', 'put', {...art, purhcaseQuantity: parseInt(value)});
        }
    }

    return (
        <div>

            <div>
                {/*todo: add the image source, it will come from the database*/}
                {/* <img
                    src={}
                    alt=""
                /> */}
            </div>

            <div>
                <div>
                    {art.name}, ${art.price}
                </div>
                <div>
                    <span>Quantity:</span>
                    <input
                        type="number"
                        placeholder='1'
                        value={art.purhcaseQuantity}
                        onChange={onChange}
                    />
                    <span
                        onClick={() => removeFromCart(art)}
                    >
                        remove art from cart
                    </span>
                </div>
            </div>

        </div>
    );
}