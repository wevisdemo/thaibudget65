import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
// import Dropdown from 'react-dropdown';
import '../dropdown.css';
import Treemap from './Treemap';
import FullView from './FullView';

// const options = ['หน่วยงาน', 'จังหวัด'];
// const defaultOption = options[0];

const TOP_BAR_HEIGHT = 40;

const hierarchyByMinistry = [
  'MINISTRY',
  'BUDGETARY_UNIT',
  'BUDGET_PLAN',
  // 'OUPUT',
  // 'PROJECT',
  'OUTPUT_PROJECT',
  // 'CATEGORY_LV1',
  'ITEM',
  // 'CATEGORY_LV2',
  // 'CATEGORY_LV3',
  // 'CATEGORY_LV4',
  // 'CATEGORY_LV5',
  // 'CATEGORY_LV6',
  // 'ITEM_DESCRIPTION',
];

const hierarchyByProvince = [
  'PROVINCE',
  'ITEM',
];

const THAI_NAME = {
  MINISTRY: 'กระทรวงหรือเทียบเท่า',
  BUDGETARY_UNIT: 'หน่วยรับงบฯ',
  BUDGET_PLAN: 'แผนงาน',
  OUTPUT_PROJECT: 'ผลผลิต/โครงการ',
  ITEM: 'รายการ',
  PROVINCE: 'จังหวัด',
};

function DataView({
  data,
  isLoading,
  setCurrentSum = (sum) => { },
  fullValue = -1,
  index = 0,
  isMultipleMaxSum = false,
  sumWindows = [],
  optionsState,
  searchQuery,
  filters,
  setFilters,
}) {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [optionsState, setOptionsState] = useState('หน่วยงาน');
  // const [filters, setFilters] = useState(['all']);

  const filterDataByQuery = useCallback((datum, query) => {
    const searchLevels = [
      'MINISTRY',
      'BUDGETARY_UNIT',
      'PROVINCE',
    ];
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const i in searchLevels) {
      if (datum[searchLevels[i]].includes(query)) { return true; }
    }
    return false;
  }, []);

  const filteredData = useMemo(
    () => data.filter((d) => filterDataByQuery(d, searchQuery)),
    [data, filterDataByQuery, searchQuery],
  );

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const f = location.pathname.split('/').slice(1);
    console.log('f', f, f.length > 0 && f[0] ? f : ['all']);
    setFilters(f.length > 0 && f[0] ? f : ['all']);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const navigateTo = (x, i) => {
    console.log(x, i);
    const temp = [...filters];
    temp.splice(i + 1);
    // setFilters(temp);
    console.log('temp', temp);
    setFilters(temp);
    // history.push(`/${temp.join('/')}`);
  };

  // const handleDropdown = (e) => {
  //   setOptionsState(e.value);
  //   setFilters(['all']);
  // };

  return (
    <FullView className="wv-font-anuphan">
      {/*
      <button type="button" onClick={() => setCompareView(!isCompareView)}>
      toggle compare view
      </button>
       */}
      <div className="ml-4 text-xs">
        งบประมาณปี
        {' '}
        <span className="font-bold">
          {index === 0 ? 2566 : 2565}
        </span>
      </div>
      <div
        style={{
          height: TOP_BAR_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            overflowX: 'auto',
          }}
        >
          {/* <button type="button" onClick={() => setDisplayMode('treemap')}>treemap</button>
        <button type="button" onClick={() => setDisplayMode('bar')}>bar</button> */}

          {filters.map((x, i) => (
            <>
              <button
                type="button"
                onClick={() => navigateTo(x, i)}
                style={{
                  marginRight: 8,
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  padding: 0,
                  textAlign: 'left',
                }}
              >
                {optionsState === 'หน่วยงาน' ? <small style={{ opacity: '0.4', whiteSpace: 'nowrap' }}>{i > 0 && THAI_NAME[hierarchyByMinistry[i - 1]]}</small> : <small style={{ opacity: '0.4', whiteSpace: 'nowrap' }}>{i > 0 && THAI_NAME[hierarchyByProvince[i - 1]]}</small>}
                {i > 0 && <br />}
                <span style={{ textDecoration: i < filters.length - 1 ? 'underline' : 'none', whiteSpace: 'nowrap' }}>
                  {i === 0
                    ? (
                      searchQuery === ''
                        ? optionsState === 'หน่วยงาน' ? 'หน่วยงานทั้งหมด' : 'จังหวัดทั้งหมด'
                        : optionsState === 'หน่วยงาน' ? `หน่วยงานทั้งหมดที่ชื่อมีคำว่า "${searchQuery}"` : `จังหวัดทั้งหมดที่ชื่อมีคำว่า "${searchQuery}"`
                    )
                    : x.length < 20 ? x : `${x.substr(0, 20)}...`}
                </span>
              </button>
              {i === filters.length - 1
                && (
                  <>
                    <small style={{ color: 'white', marginRight: 8, opacity: '0.4' }}>
                      :
                    </small>
                    <small style={{ color: 'white', marginRight: 8, opacity: '0.4' }}>
                      แบ่งตาม
                      {' '}
                      {optionsState === 'หน่วยงาน' ? THAI_NAME[hierarchyByMinistry[i]] : THAI_NAME[hierarchyByProvince[i]]}
                    </small>
                  </>
                )}
              {i < filters.length - 1
                && <span style={{ color: 'white', marginRight: 8 }}>&gt;</span>}
            </>
          ))}
          {/* {JSON.stringify(filters)} */}
        </div>
        {/* <div className="pr-2">
          <label className="flex text-xs items-center pb-2">แบ่งตาม</label>

          <Dropdown className=" text-red-400" options={options} onChange={handleDropdown} value={defaultOption} placeholder="Select" />
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
            placeholder={optionsState === 'หน่วยงาน' ? 'หน่วยรับงบหรือกระทรวง' : 'จังหวัด'}
          />
        </div> */}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <div style={{
          position: 'relative',
          flexGrow: 1,
        }}
        >
          <Treemap
            data={optionsState === 'หน่วยงาน' ? filteredData : filteredData.filter((d) => d.PROVINCE !== '')}
            isLoading={isLoading}
            filters={filters}
            hierarchyBy={optionsState === 'หน่วยงาน' ? hierarchyByMinistry : hierarchyByProvince}
            setFilters={setFilters}
            setCurrentSum={(x) => {
              // console.log('!!setting sum', x, setCurrentSum);
              setCurrentSum(x);
            }}
            fullValue={fullValue}
            index={index}
            isMultipleMaxSum={isMultipleMaxSum}
            sumWindows={sumWindows}
          />
        </div>
      </div>
    </FullView>
  );
}

export default DataView;
