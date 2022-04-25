import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import styled from 'styled-components';

import Dashboard from "./components/Dashboard";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

const AppStyled = styled.div`
  padding: 2.5rem;
`;

function App() {
  return (
    <AppStyled>
      <ApolloProvider client={client}>
        <Dashboard />
      </ApolloProvider>
    </AppStyled>
  );
}

export default App;
