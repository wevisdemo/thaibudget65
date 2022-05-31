import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import '@wevisdemo/ui/styles/typography.css';
import '@wevisdemo/ui/styles/components.css';
import {
  HashRouter as Router,
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
import {
  numberingSystemContext,
  useNumberingSystem,
} from './utils/numbering-system';

const routes = [
  ['/', 'หน้าแรก', <IndexPage />],
  ['/structure', 'โครงสร้าง', <Structure />],
  ['/keywords', 'คีย์เวิร์ด', <Keywords />],
  ['/about', 'เกี่ยวกับโครงการ', <About />],
];

const Navbar = () => {
  const location = useLocation();
  const { numberingSystem, toggleNumberingSystem, formatNumber } =
    useNumberingSystem();

  return (
    <WvNavbar title={`THAILAND BUDGET ${formatNumber(2566)}`}>
      {routes.map(([path, label]) => (
        <Link key={label} to={path}>
          <WvNavButton active={location.pathname === path}>{label}</WvNavButton>
        </Link>
      ))}
      <WvNavButton onClick={toggleNumberingSystem}>
        <div
          className={`rounded-full px-2 self-center place-self-center ${
            numberingSystem ? 'bg-black text-white' : ''
          }`}
        >
          🇹🇭
        </div>
      </WvNavButton>
    </WvNavbar>
  );
};

const App = () => {
  const [numberingSystem, setNumberingSystem] = useState(null);

  useEffect(() => {
    const plausibleDomain = process.env.PUBLIC_URL.split('//')?.[1];

    if (plausibleDomain) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://analytics.punchup.world/js/plausible.js';
      script.setAttribute('data-domain', plausibleDomain);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <numberingSystemContext.Provider
      value={[numberingSystem, setNumberingSystem]}
    >
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
    </numberingSystemContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
<<<<<<< HEAD
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
=======
    <link
      rel="stylesheet"
      href="https://design-systems.wevis.info/typography.css"
    />
    <Router>
      <App />
>>>>>>> 4ffccd328843734d17f77b44e45782eb71a502bf
    </Router>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
