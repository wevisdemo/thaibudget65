import React, { useState } from 'react';
import RatioCompare from './ResultRatioCompare';
import ResultGroupBy from './ResultGroupBy';
import ItemDescriptionList from './ItemDescriptionList';
/*
interface FilterResult {
  keyword: string;
  totalYearBudget: number;
  total: number;
  groupBy: {
    ministries: GroupByResult;
    budgetaryUnits: GroupByResult;
    projects: GroupByResult;
    outputs: GroupByResult;
    provinces: GroupByResult;
  };
  items: Item[];
}

interface GroupByResult {
  name: string;
  total: number;
  items: Item[];
}
*/

function Result({ result }) {
  const keyword = 'ค่าธรรมเนียม';
  const count = 4123;
  const total = 3_130_000_000_000 / 7;
  const budgetYearTotal = 3_130_000_000_000;
  const [activeTabIndex, setActiveTabIndex] = useState(1);

  const groupByFields = [
    'ระดับกระทรวง',
    'หน่วยรับงบ',
    'แผนงาน',
    'โครงการ',
    'ผลผลิต',
    'จังหวัด',
  ];

  console.log(result);

  const tabs = [
    {
      name: 'สรุปข้อมูล',
      component: (
        <>
          <RatioCompare total={total} budgetYearTotal={budgetYearTotal} />
          {groupByFields.map((v) => (<ResultGroupBy name={v} />))}
        </>),
    },
    {
      name: 'รายการงบ',
      component: <ItemDescriptionList />,
    },
  ];

  return (
    <div className="flex md:col-span-2 flex-col bg-white border rounded-xl px-8 py-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl">{keyword}</h2>
        <p className="text-base text-[#828282]">{`พบทั้งหมด ${count.toLocaleString()} ครั้ง ในรายละเอียดงบประมาณ`}</p>
      </div>
      <div className="grid grid-flow-col gap-1 h-12">
        {tabs.map(({ name }, i) => (
          <button
            className={`rounded-md duration-100 ${i === activeTabIndex ? 'bg-[rgba(57,4,233,0.06)] hover:bg-[rgba(57,4,233,0.08)]' : 'hover:bg-[rgba(0,0,0,0.03)]'}`}
            type="button"
            onClick={() => setActiveTabIndex(i)}
          >
            {name}
          </button>
        ))}
      </div>
      {tabs[activeTabIndex].component}
    </div>
  );
}

export default Result;
