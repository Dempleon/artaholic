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
import Card from 'react-bootstrap/Card';

import '../components/ArtItem/ArtItem'
import '../components/ArtList/ArtList'
import ArtItem from '../components/ArtItem/ArtItem';
import ArtList from '../components/ArtList/ArtList';

export default function Arts() {


    return (
        <ArtList/>
    )
}