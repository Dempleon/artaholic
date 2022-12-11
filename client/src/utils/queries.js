<<<<<<< HEAD
import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
=======
import {gql} from '@apollo/client';

// todo: QUERY_CHECKOUT
export const QUERY_CHECKOUT = gql`

`;

// todo: QUERY_USER
export const QUERY_USER = gql`

`;

// todo: QUERY_CATEGORIES
export const QUERY_CATEGORIES = gql`

`;

// todo: QUERY_ART 
export const QUERY_ART = gql`

`;

// todo: QUERY_ALL_ART
export const QUERY_ALL_ART = gql`

`;
>>>>>>> main
