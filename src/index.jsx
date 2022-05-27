import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import WvNavbar from '@wevisdemo/ui/components/navbar';
import WvNavButton from '@wevisdemo/ui/components/nav-button';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@wevisdemo/ui/styles/typography.css';
import '@wevisdemo/ui/styles/components.css';
import Explore from './pages/explore';

ReactDOM.render(
  <React.StrictMode>
    <Router basename={`${process.env.REACT_APP_BASE_PATH}`}>
      <link
        rel="stylesheet"
        href="https://design-systems.wevis.info/typography.css"
      />
      <div className="z-40 relative">
        <WvNavbar title="THAILAND BUDGET 2566 (BETA)" homeHref={`${process.env.REACT_APP_BASE_PATH}`}>
          <Link to="/">
            <WvNavButton>Treemap</WvNavButton>
          </Link>
          <Link to="/explore">
            <WvNavButton>Explore</WvNavButton>
          </Link>
        </WvNavbar>
      </div>
      <Switch>
        <Route exact path="/"><App /></Route>
        <Route path="/explore"><Explore /></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
