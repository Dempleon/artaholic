import React, { useEffect, userEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import Cart from '../components/Cart/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_ARTS,
} from '../utils/actions';
import { QUERY_ARTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import Button from 'react-bootstrap/Button';
import '../components/ArtItem/ArtItem';
import '../components/ArtList/ArtList';

function Gallery() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();

    const [currentArt, setCurrentArt] = useState({});

    const { loading, data } = useQuery(QUERY_ARTS);

    const { arts, cart } = state;

    useEffect(() => {
        // already in global store
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
                idbPromise('arts', 'put', art);
            });
        }
        // get cache from idb
        else if (!loading) {
            idbPromise('arts', 'get').then((indexedArts) => {
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
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                art: { ...currentArt, purchaseQuantity: 1 },
            });
            idbPromise('cart', 'put', { ...currentArt, purchaseQuantity: 1 });
        }
    };

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentArt._id,
        });

        idbPromise('cart', 'delete', { ...currentArt });
    };

    return (
        <>
        <h1>Gallery page</h1>
            {currentArt && cart ? (
                <div className="container my-1">
                    <h2>{currentArt.name}</h2>
                    <p>
                        <strong>Price:</strong>${currentArt.price}{''}
                        <Button onClick={addToCart} variant="outline-secondary">Add to Cart</Button>{' '}
                        <Button disabled={!cart.find((p) => p._id === currentArt._id)}
                            onClick={removeFromCart}
                            variant="outline-secondary">Remove From Cart</Button>{' '}
                    </p>

                    <img
                        src={`/images/${currentArt.image}`}
                        alt={currentArt.name}
                    />
                </div>
            ): null}
            {loading ? <p>Loading</p> : null}
            {/* {loading ? <img src={''} alt="loading" placeholder='loading'/> : null} */}
        </>
    );
}

export default Gallery;