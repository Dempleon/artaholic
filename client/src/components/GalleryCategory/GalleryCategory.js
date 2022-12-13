import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function GalleryCategory(props) {
    const [state, dispatch] = useStoreContext();

    const { categories } = state;

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories,
            });
            categoryData.categories.forEach((category) => {
                idbPromise('categories', 'put', category);
            });
        } else if (!loading) {
            idbPromise('categories', 'get').then((categories) => {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categories
                });
            });
        }
    }, [categoryData, loading, dispatch]);

    const handleClick = (id, navbar) => {
        if (navbar) {
            document.location.replace(`/category/${id}`);
        } else {
            dispatch({
                type: UPDATE_CURRENT_CATEGORY,
                currentCategory: id
            });
        }
    };

    const inNavbar = props.inNavbar;

    return ( inNavbar ? 
        <NavDropdown title="Gallery" id="basic-nav-dropdown">
            {categories.map((item) => (
                <NavDropdown.Item key={item._id} onClick={() => {handleClick(item._id, inNavbar)}}>{item.name}</NavDropdown.Item>
            ))}
        </NavDropdown>
        :
        <DropdownButton id="dropdown-basic-button" title="Choose a Category">
            {categories.map((item) => (
                <Dropdown.Item key={item._id} onClick={() => {handleClick(item._id, inNavbar)}}>{item.name}</Dropdown.Item>
            ))}
        </DropdownButton>
        
    )
}