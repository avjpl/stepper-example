import '@babel/polyfill';
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { routes } from './routes/syncRoutes';

const client = new ApolloClient({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
});

import styles from './App.css';

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <nav>
        <ul className={styles.navigation}>
          {/* <li>
            <Link to='/'>Home</Link>
          </li> */}
        </ul>

        {renderRoutes(routes)}
      </nav>
    </Router>
  </ApolloProvider>
);

export default App;
