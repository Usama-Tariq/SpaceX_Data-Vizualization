import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Dashboard from "./components/Dashboard";
import store from "./redux/store";
import './App.scss';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Dashboard />
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
