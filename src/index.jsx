import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import '@wevisdemo/ui/styles/typography.css';
import '@wevisdemo/ui/styles/components.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import WvNavbar from '@wevisdemo/ui/components/navbar';
import WvNavButton from '@wevisdemo/ui/components/nav-button';
import WvFooter from '@wevisdemo/ui/components/footer';
import Structure from './pages/structure';
import reportWebVitals from './reportWebVitals';
import Keywords from './pages/keywords';
import IndexPage from './pages/index';
import About from './pages/about';

const basePath = process.env.REACT_APP_BASE_PATH || '/';

const routes = [
  ['/', 'หน้าแรก', <IndexPage />],
  ['/structure', 'โครงสร้าง', <Structure />],
  ['/keywords', 'คีย์เวิร์ด', <Keywords />],
  ['/about', 'เกี่ยวกับโครงการ', <About />],
];

const Navbar = () => {
  const location = useLocation();

  return (
    <WvNavbar title="THAILAND BUDGET 2566">
      {routes.map(([path, label]) => (
        <Link key={label} to={path}>
          <WvNavButton active={location.pathname === path}>{label}</WvNavButton>
        </Link>
      ))}
    </WvNavbar>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router basename={basePath}>
      <link
        rel="stylesheet"
        href="https://design-systems.wevis.info/typography.css"
      />
      <div className="flex flex-col min-h-screen">
        <div className="z-40 relative">
          <Navbar />
        </div>
        <Switch>
          {routes.map(([path, label, component]) => (
            <Route key={label} exact path={path}>
              {component}
            </Route>
          ))}
        </Switch>
        <WvFooter dark />
      </div>
    </Router>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
