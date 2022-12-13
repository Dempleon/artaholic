const { gql } = require('apollo-server-express');

// todo: user, art, cart query mutaion auth
const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }
    
    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        orders: [Order]
        arts: [Art]
    }

    type Art {
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
        category: Category
    }

    type Order {
        _id: ID
        purchaseDate: String
        arts: [Art]
    }

    type Checkout {
        session: ID
      }
    

    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        arts(
            category: ID,
            name: String
        ): [Art]
        art(_id: ID!): Art
        user: User
        order(_id: ID!): Order
        checkout(arts: [ID]!): Checkout
    }

    type Mutation {
        addUser(
            firstName: String!,
            lastName: String!,
            email: String!,
            password: String!
        ): Auth
        addOrder(arts: [ID]!): Order
        addArt(
            name: String
            description: String
            image: String
            quantity: Int
            price: Float
            category: ID
        ): Art
        updateUser(
            firstName: String,
            lastName: String,
            email: String,
            password: String
        ): User
        updateArt(_id: ID!, price: Float!): Art
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;