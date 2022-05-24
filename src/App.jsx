import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import {
  Link, Route, useHistory, useLocation,
} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import logo from './logo.svg';
import './App.css';
import DataView from './components/DataView';
import FullView from './components/FullView';
import { provinces } from './provinces';
// import Explore from './pages/explore';

const PageContainer = styled.div`
 display: flex;
 flex-direction: row;
 flex-grow: 1;

  @media screen and (orientation:portrait) {
    flex-direction: column;
  }
`;

const ResponsiveImage = styled.img`
  width: 100%;
`;

const CreditLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: white;
  text-align: center;

  &:hover {
    opacity: 0.7;
  }

  small {
    margin-bottom: 4px;
    opacity: 1;
  }

  ${ResponsiveImage} {
    max-width: 64px;
  }
`;

const Sidebar = styled.div`
  position: relative;
  padding: 10px 20px 20px 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  
  @media screen and (orientation:landscape) {
    width: 65px;
    &>*:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  @media screen and (orientation:portrait) {
    height: 64px;
    flex-direction: row;
    /* display: none !important; */

    &>*:not(:last-child) {
      margin-right: 16px;
    }

    ${CreditLink} ${ResponsiveImage} {
      max-width: 48px;
    }
  }
`;

const ActionButton = styled.button`
  padding: 8px;
  border: none;
  color: #888;
  border-radius: 8px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isCompareView, setCompareView] = useState(false);
  const [filters, setFilters] = useState(['all']);
  const [sumWindows, setSumWindows] = useState([0, 0]);

  useEffect(() => {
    d3.csv(`${process.env.PUBLIC_URL}/data.csv`).then((d) => {
      setLoading(false);
      setData(d);
    });
  }, []);

  const setSumWindowsIdx = (i, value) => {
    const temp = [...sumWindows];
    temp[i] = value;
    setSumWindows(temp);
  };

  const maxSumValue = useMemo(() => d3.max(sumWindows), [sumWindows]);
  const minSumValue = useMemo(() => d3.min(sumWindows), [sumWindows]);

  const isMultipleMaxSum = useMemo(() => {
    const mx = d3.max(sumWindows);
    return sumWindows.filter((x) => mx === x).length > 1;
  }, [sumWindows]);

  const matchedProvinces = (province) => {
    let matched = [];
    provinces.forEach((p) => {
      // eslint-disable-next-line no-unused-expressions
      province.includes(p) ? matched = [...matched, p] : null;
    });
    return matched.join('-');
  };

  const preprocessedData = useMemo(() => data
    .map((d) => ({
      ...d,
      AMOUNT: parseFloat(d.AMOUNT.replace(/,/g, '')),
      OUTPUT_PROJECT: (d.OUTPUT || d.PROJECT) ? (d.OUTPUT + d.PROJECT) : 'ไม่ระบุโครงการ/ผลผลิต',
      MINISTRY: d.MINISTRY.replace(/\([0-9]+\)$/, '').trim(),
      PROVINCE: matchedProvinces(d.ITEM_DESCRIPTION),
      ITEM: [
        d.ITEM_DESCRIPTION,
        d.CATEGORY_LV2,
        d.CATEGORY_LV3,
        d.CATEGORY_LV4,
        d.CATEGORY_LV5,
        d.CATEGORY_LV6,
      ]
        .filter((x) => x)
        .join(' - '),
    }))
    .filter((d) => +d.FISCAL_YEAR === 2022),
  [data]);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const f = location.pathname.split('/').slice(1);
    console.log('f', f, f.length > 0 && f[0] ? f : ['all']);
    setFilters(f.length > 0 && f[0] ? f : ['all']);
  }, [location]);

  const navigateTo = (x, i) => {
    console.log(x, i);
    const temp = [...filters];
    temp.splice(i + 1);
    // setFilters(temp);
    console.log('temp', temp);
    history.push(`/${temp.join('/')}`);
  };

  return (
    <div>
      <FullView>
        <PageContainer>
          <div style={{
            position: 'relative',
            flexGrow: 1,
          }}
          >
            <DataView
              data={preprocessedData}
              isLoading={isLoading}
              fullValue={maxSumValue}
              setCurrentSum={(s) => {
                console.log('setCurrentSum 0', s);
                setSumWindowsIdx(0, s);
              }}
              isMultipleMaxSum={isMultipleMaxSum}
              sumWindows={[sumWindows[0], minSumValue]}
              index={0}
            />
          </div>
          {isCompareView && (
          <div style={{
            position: 'relative',
            flexGrow: 1,
          }}
          >
            <DataView
              data={preprocessedData}
              isLoading={isLoading}
              fullValue={maxSumValue}
              setCurrentSum={(s) => {
                console.log('setCurrentSum 1', s);
                setSumWindowsIdx(1, s);
              }}
              isMultipleMaxSum={isMultipleMaxSum}
              // sumWindows={sumWindows}
              sumWindows={[minSumValue, sumWindows[1]]}
              index={1}
            />
          </div>
          )}
          <Sidebar>
            <ActionButton
              type="button"
              className="wv-font-anuphan text-xs mt-[145px]"
              onClick={() => {
                if (isCompareView) { setSumWindowsIdx(1, 0); }
                setCompareView(!isCompareView);
              }}
            >
              <span style={{
                display: 'inline-flex',
                fontSize: 24,
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#333',
                color: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
              }}
              >
                {!isCompareView ? '+' : '×'}
              </span>
              {!isCompareView ? 'Open\nCompare\nView' : 'Close\nCompare\nView'}
            </ActionButton>
            <div style={{ flexGrow: 1 }} />

            <CreditLink target="_blank" href="https://docs.google.com/spreadsheets/d/1Js6iDnBR53nk80Hr4UybEwV4poUpNEeOoUUWJDCpLjI/edit#gid=696564335">
              <small className="wv-font-anuphan text-xs">ดูข้อมูล</small>
            </CreditLink>
            <CreditLink target="_blank" href="https://taepras.com">
              {/* <small className="wv-font-anuphan text-xs">Visualized by</small> */}
              <ResponsiveImage src={`${process.env.PUBLIC_URL}/tp_logo_dark.svg`} alt="kaogeek logo" title="Thanawit Prasongpongchai" />
            </CreditLink>
            <CreditLink target="_blank" href="https://wevis.info/">
              <ResponsiveImage src={`${process.env.PUBLIC_URL}/wv_logo_dark.svg`} alt="kaogeek logo" title="WeVis" />
            </CreditLink>
            <CreditLink target="_blank" href="https://docs.google.com/spreadsheets/d/1Js6iDnBR53nk80Hr4UybEwV4poUpNEeOoUUWJDCpLjI/edit#gid=696564335">
              {/* <small className="wv-font-anuphan text-xs">Data Source</small> */}
              <ResponsiveImage src={`${process.env.PUBLIC_URL}/kaogeek_logo_dark.png`} alt="kaogeek logo" title="กลุ่มก้าว Geek" />
            </CreditLink>
            {/* <div style={{ opacity: 0.6, textAlign: 'center' }}>
            <small style={{ display: 'inline-block', lineHeight: 1.2 }}>
              ** This is a work-in-progress.
            </small>
          </div> */}
          </Sidebar>
        </PageContainer>
        {/* <div
        style={{
          padding: 16,
          paddingTop: 8,
          fontSize: 12,
          opacity: '0.7',
          display: 'flex',
        }}
      >

      </div> */}
        <ReactTooltip className="wv-font-anuphan" multiline />
      </FullView>
    </div>
  );
}

export default App;
