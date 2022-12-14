import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const styles = {
    artInCart: {
        maxWidth: '30vw'
    }
}

export default function CartItem (art) {
    console.log(art)
    const [, dispatch] = useStoreContext();
    const {image, name, _id, price, quantity} = art

    const removeFromCart = function(art) {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: _id
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
                <img
                    src={`${image}`}
                    style={styles.artInCart}
                />
            </div>

            <div>
                <div>
                    {`${name}`}, ${`${price}`}
                </div>
                <div>
                    <span>Quantity:</span>
                    <input
                        type="number"
                        placeholder='1'
                        value={quantity}
                        onChange={onChange}
                    />
                    <button onClick={() => removeFromCart(_id)}>Remove from cart</button>
                </div>
            </div>
        </div>
    );
}