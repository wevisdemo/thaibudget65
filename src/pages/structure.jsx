import React, { useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
// import { useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Dropdown from 'react-dropdown';
import '../styles/treemap.css';
import DataView from '../components/DataView';
import { provinces } from '../provinces';

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  @media screen and (orientation: portrait) {
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

  @media screen and (orientation: landscape) {
    width: 65px;
    & > *:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  @media screen and (orientation: portrait) {
    height: 64px;
    flex-direction: row;
    /* display: none !important; */

    & > *:not(:last-child) {
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

function TreemapPage() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [data65, setData65] = useState([]);
  const [isLoading65, setLoading65] = useState(true);
  const [isCompareView, setCompareView] = useState(false);
  const [filters, setFilters] = useState(['all']);
  const [sumWindows, setSumWindows] = useState([0, 0]);

  const [searchQuery, setSearchQuery] = useState('');
  const [optionsState, setOptionsState] = useState('หน่วยงาน');
  const options = ['หน่วยงาน', 'จังหวัด'];
  const defaultOption = options[0];

  const handleDropdown = (e) => {
    setOptionsState(e.value);
    setFilters(['all']);
  };

  useEffect(() => {
    d3.csv(`${process.env.PUBLIC_URL}/data/2566.csv`).then((d) => {
      setLoading(false);
      setData(d);
    });
  }, []);

  useEffect(() => {
    if (data65.length === 0 && isCompareView) {
      d3.csv(`${process.env.PUBLIC_URL}/data/2565.csv`).then((d) => {
        setLoading65(false);
        setData65(d);
      });
    }
  }, [data65, isCompareView]);

  const setSumWindowsIdx = (i, value) => {
    const temp = [...sumWindows];
    temp[i] = value;
    setSumWindows(temp);
  };

  const maxSumValue = useMemo(() => d3.max(sumWindows), [sumWindows]);
  // const minSumValue = useMemo(() => d3.min(sumWindows), [sumWindows]);

  const isMultipleMaxSum = useMemo(() => {
    const mx = d3.max(sumWindows);
    return sumWindows.filter((x) => mx === x).length > 1;
  }, [sumWindows]);

  const matchedProvinces = (province) => {
    let matched = [];
    provinces.forEach((p) => {
      // eslint-disable-next-line no-unused-expressions
      province.includes(p) ? (matched = [...matched, p]) : null;
    });
    return matched.join('-');
  };

  const preprocessedData65 = useMemo(
    () =>
      data65
        .map((d) => ({
          ...d,
          AMOUNT: parseFloat(d.AMOUNT.replace(/,/g, '')),
          OUTPUT_PROJECT:
            d.OUTPUT || d.PROJECT
              ? d.OUTPUT + d.PROJECT
              : 'ไม่ระบุโครงการ/ผลผลิต',
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
    [data65]
  );

  const preprocessedData = useMemo(
    () =>
      data
        .map((d) => ({
          ...d,
          AMOUNT: parseFloat(d.AMOUNT.replace(/,/g, '')),
          OUTPUT_PROJECT:
            d.OUTPUT || d.PROJECT
              ? d.OUTPUT + d.PROJECT
              : 'ไม่ระบุโครงการ/ผลผลิต',
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
        .filter((d) => +d.FISCAL_YEAR === 2023),
    [data]
  );

  // const location = useLocation();

  // useEffect(() => {
  //   const f = location.pathname.split('/').slice(1);
  //   setFilters(f.length > 0 && f[0] ? f : ['all']);
  // }, [location]);

  return (
    <div className="flex-1 flex flex-col">
      {/* <div className="absolute top-8 right-[83px] wv-font-anuphan z-30"> */}
      <div className="flex justify-center text-white p-5 pt-8 md:pt-10">
        <div className="wv-font-anuphan text-2xl font-bold flex items-center">
          <img
            className="w-[24px] h-[24px] mr-2"
            src={`${process.env.PUBLIC_URL}/images/inspect.png`}
            alt="inspect"
            title="inspect"
          />
          <h1>สำรวจงบประมาณผ่านโครงสร้าง</h1>
        </div>
      </div>
      <div>
        <div className="wv-font-anuphan flex justify-center">
          <div className="pr-2">
            <label className="flex text-xs items-center pb-2">แบ่งตาม</label>

            <Dropdown
              className=" text-red-400"
              options={options}
              onChange={handleDropdown}
              value={defaultOption}
              placeholder="Select"
            />
          </div>
          <div>
            <label className="flex text-xs items-center pb-2">
              <svg
                className="h-4 w-4 mr-1 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 30 30"
              >
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971  23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
              </svg>
              ค้นหา
            </label>
            <input
              className="w-48 h-[40px] text-white rounded-sm p-2 bg-[#141414] border border-[#ccc] placeholder-[#767676]"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                optionsState === 'หน่วยงาน'
                  ? 'หน่วยรับงบหรือกระทรวง'
                  : 'จังหวัด'
              }
            />
          </div>
        </div>
        <p className="wv-b7 text-gray-2 text-center pt-4 wv-font-anuphan">
          หมายเหตุ : งบประมาณแบ่งตามจังหวัด
          เป็นการแสดงผลรวมของโครงการ/ผลผลิตที่ปรากฎชื่อจังหวัดนั้นอยู่
          ไม่ได้หมายความถึงงบทั้งหมดที่จังหวัดนั้นได้รับ
          โปรดตรวจสอบบริบทอีกครั้งก่อนการใช้งาน
        </p>
      </div>
      <PageContainer>
        <div
          style={{
            position: 'relative',
            flexGrow: 1,
          }}
        >
          <DataView
            data={preprocessedData}
            isLoading={isLoading}
            fullValue={maxSumValue}
            setCurrentSum={(s) => setSumWindowsIdx(0, s)}
            isMultipleMaxSum={isMultipleMaxSum}
            sumWindows={[0, 0]}
            index={0}
            optionsState={optionsState}
            searchQuery={searchQuery}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        {isCompareView && (
          <div
            style={{
              position: 'relative',
              flexGrow: 1,
            }}
          >
            <DataView
              data={preprocessedData65}
              isLoading={isLoading65}
              fullValue={maxSumValue}
              setCurrentSum={(s) => setSumWindowsIdx(1, s)}
              isMultipleMaxSum={isMultipleMaxSum}
              // sumWindows={sumWindows}
              sumWindows={[sumWindows[1], 0]}
              index={1}
              optionsState={optionsState}
              searchQuery={searchQuery}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        )}
        <Sidebar>
          <ActionButton
            type="button"
            className="wv-font-anuphan text-xs md:mt-[80px]"
            onClick={() => {
              if (isCompareView) {
                setSumWindowsIdx(1, 0);
              }
              setCompareView(!isCompareView);
            }}
          >
            <span
              style={{
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
            {!isCompareView ? 'เทียบงบ 65' : 'ปิดการเทียบ'}
          </ActionButton>
          <div style={{ flexGrow: 1 }} />

          <CreditLink
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1Js6iDnBR53nk80Hr4UybEwV4poUpNEeOoUUWJDCpLjI/edit#gid=696564335"
          >
            <small className="wv-font-anuphan text-xs">ดูข้อมูลปี 66</small>
          </CreditLink>
          <CreditLink
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1yyWXSTbq3CD_gNxks-krcSBzbszv3c_2Nq54lckoQ24/edit#gid=343539850"
          >
            <small className="wv-font-anuphan text-xs">ดูข้อมูลปี 65</small>
          </CreditLink>
          <CreditLink target="_blank" href="https://taepras.com">
            {/* <small className="wv-font-anuphan text-xs">Visualized by</small> */}
            <ResponsiveImage
              src={`${process.env.PUBLIC_URL}/images/tp_logo_dark.svg`}
              alt="kaogeek logo"
              title="Thanawit Prasongpongchai"
            />
          </CreditLink>
          <CreditLink target="_blank" href="https://github.com/kaogeek">
            {/* <small className="wv-font-anuphan text-xs">Data Source</small> */}
            <ResponsiveImage
              src={`${process.env.PUBLIC_URL}/images/kaogeek_logo_dark.png`}
              alt="kaogeek logo"
              title="กลุ่มก้าว Geek"
            />
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
    </div>
  );
}

export default TreemapPage;
