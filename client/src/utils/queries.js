import { gql } from "@apollo/client";

export const QUERY_ARTS = gql`
  query getArts($category: ID) {
    arts(category: $category) {
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
  query getCheckout($arts: [ID]!) {
    checkout(arts: $arts) {
      session
    }
  }
`;

export const QUERY_ALL_ARTS = gql`
  {
    arts {
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
        arts {
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
