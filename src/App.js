import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Dashboard from "./components/Dashboard";
import './App.scss';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="app">
      <ApolloProvider client={client}>
        <Dashboard />
      </ApolloProvider>
    </div>
  );
}

export default App;
