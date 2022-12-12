import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import NavTabs from "./components/Nav/NavTabs";
import Login from "./pages/Login";
import Sell from "./pages/Sell";
import Signup from './pages/Signup';
import Gallery from './pages/Gallery';
import Arts from './pages/Arts';
import { StoreProvider } from "./utils/GlobalState";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: process.env.NODE_ENV ? authLink.concat(httpLink) : "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <NavTabs>
            </NavTabs>
              <Routes>
              <Route 
              path="/"
              element={<Home />}
              />
               <Route 
              path="/login"
              element={<Login />}
              />
               <Route 
              path="/signup"
              element={<Signup />}
              />
               <Route 
              path="/gallery"
              element={<Gallery />}
              />
               <Route 
              path="/sell"
              element={<Sell />}
              />
               {/* <Route 
              path="/arts/:id"
              // TODO: create arts page
              element={<Arts />}
              /> */}
              </Routes>
            
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
    // <>
    //   <NavTabs />
    //   <Home />,
    // </>
  );
}

export default App;
