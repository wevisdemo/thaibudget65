import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import WvNavbar from '@wevisdemo/ui/components/navbar';
import WvNavButton from '@wevisdemo/ui/components/nav-button';
import Treemap from './pages/treemap';
import reportWebVitals from './reportWebVitals';
import '@wevisdemo/ui/styles/typography.css';
import '@wevisdemo/ui/styles/components.css';
import Explore from './pages/explore';
import IndexPage from './pages/index';

const basePath = process.env.REACT_APP_BASE_PATH || '/';

ReactDOM.render(
  <React.StrictMode>
    <Router basename={basePath}>
      <link
        rel="stylesheet"
        href="https://design-systems.wevis.info/typography.css"
      />
      <div className="z-40 relative">
        <WvNavbar title="THAILAND BUDGET 2566 (BETA)">
          <Link to="/">
            <WvNavButton>Home</WvNavButton>
          </Link>
          <Link to="/treemap">
            <WvNavButton>Treemap</WvNavButton>
          </Link>
          <Link to="/explore">
            <WvNavButton>Explore</WvNavButton>
          </Link>
        </WvNavbar>
      </div>
      <Switch>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route exact path="/treemap">
          <Treemap />
        </Route>
        <Route path="/explore">
          <Explore />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
