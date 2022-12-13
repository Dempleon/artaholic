import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
    ) {
        addUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
        ) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_ART = gql`
    mutation addArt(
            $name: String!
            $image: String!
            $price: Float!
            $description: String
            $category: ID
            $quantity: Int
    ) {
        addArt(
                name: $name
                image: $image
                price: $price
                description: $description
                category: $category
                quantity: $quantity
        ) {
                art {
                    _id
                    name
                    image
                }
            }
    }
    
`;