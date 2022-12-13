//Rui
import React, { useEffect } from "react";
import { useQuery } from '@apollo/client'
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";
import ArtItem from '../ArtItem/ArtItem';
import { UPDATE_ARTS } from '../../utils/actions';
import { QUERY_ARTS } from '../../utils/queries';


function ArtList() {
    const [state, dispatch] = useStoreContext();
    const { currentCategory } = state;
    const { loading, data } = useQuery(QUERY_ARTS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_ARTS,
                arts: data.arts,
            });
            data.arts.forEach((art) => {
                idbPromise('arts', 'put', art);
            });
        } else if (!loading) {
            idbPromise('arts', 'get').then((arts) => {
                dispatch({
                    type: UPDATE_ARTS,
                    arts: arts,
                });
            });
        }
    }, [data, loading, dispatch]);

    function filterArts() {
        if (!currentCategory) {
            return state.arts;
        }

        return state.arts.filter(
            (art) => art.category._id === currentCategory
        );
    }
}

// return (
//     // TODO: COMPLETE THE HTML
// )

export default ArtList;
