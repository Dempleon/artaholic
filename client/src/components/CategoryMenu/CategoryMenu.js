import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";

const styles = {
  marginLeft: "8%",
  marginTop: "15px",
};

export default function GalleryMenu(props) {
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
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
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
        currentCategory: id,
      });
    }
  };

  return (
    <NavDropdown title="Art Categories" id="basic-nav-dropdown" style={styles}>
      <Dropdown.Item href="/arts">View All Amazing Arts!</Dropdown.Item>
      {categories.map((item) => (
        <NavDropdown.Item
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}
