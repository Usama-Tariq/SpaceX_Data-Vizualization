import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import styled from 'styled-components';

import Dashboard from "./components/Dashboard";
import store from "./redux/store";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

function App() {
  return (
    <StyledApp>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Dashboard />
        </ApolloProvider>
      </Provider>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  padding: 2.5rem;
`;
