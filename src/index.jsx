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
    <Router>
      <link
        rel="stylesheet"
        href="https://design-systems.wevis.info/typography.css"
      />
      <div className="z-40 relative">
        <WvNavbar title="THAILAND BUDGET 2566" homeHref={`${process.env.PUBLIC_URL}/`}>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <WvNavButton>Treemap</WvNavButton>
          </Link>
          <Link to={`${process.env.PUBLIC_URL}/explore`}>
            <WvNavButton>Explore</WvNavButton>
          </Link>
        </WvNavbar>
      </div>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`}><App /></Route>
        <Route path={`${process.env.PUBLIC_URL}/explore`}><Explore /></Route>
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
