import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import styled from 'styled-components';

import Dashboard from "./components/Dashboard";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

function App() {
  return (
    <StyledApp>
      <ApolloProvider client={client}>
        <Dashboard />
      </ApolloProvider>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  padding: 2.5rem;
`;
