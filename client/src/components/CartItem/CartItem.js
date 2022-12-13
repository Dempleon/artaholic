import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const CartItem = function(art) {
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
}