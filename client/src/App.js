import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import "./App.css";
import Home from "./pages/Home";
import NavTabs from "./components/Nav/NavTabs";
import Login from "./pages/Login";
import Sell from "./pages/Sell";
import Signup from './pages/Signup';
import Gallery from './pages/Gallery';
import Arts from './pages/Arts';
import Cart from './components/Cart/Cart'
import GalleryCategory from './components/GalleryCategory/GalleryCategory';
import { StoreProvider } from "./utils/GlobalState";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("login_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
                path="/arts/:id"
                element={<Gallery />}
              />
              <Route
                path="/sell"
                element={<Sell />}
              />
              <Route
                path="/cart"
                element={<Cart />}
              />
              <Route
                path="/arts"
                element={<Arts />}
              />
              <Route
                path="/category/:id"
                element={<GalleryCategory />}
              />
            </Routes>

          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
