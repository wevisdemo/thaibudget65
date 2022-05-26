import React, { useEffect, useState } from 'react';
import RatioCompare from './ResultRatioCompare';
import ResultGroupBy from './ResultGroupBy';
import ItemDescriptionList from './ItemDescriptionList';

function Result({
  result, keyword,
}) {
  const count = result ? result.items.length : 0;
  const [activeTabIndex, setActiveTabIndex] = useState(1);

  const groupByFields = [
    {
      name: 'หน่วยรับงบ',
      key: 'budgetaryUnits',
    },
    {
      name: 'แผนงาน',
      key: 'plans',
    },
    {
      name: 'โครงการ/ผลผลิต',
      key: 'projects',
    },
    {
      name: 'จังหวัด',
      key: 'provinces',
    },
  ];

  const tabs = [
    {
      name: 'สรุปข้อมูล',
      component: (
        <>
          <RatioCompare total={result && result.total} budgetYearTotal={result && result.totalYearBudget} />
          {groupByFields.map(({ name, key }) => (<ResultGroupBy groupName={name} items={result && result.groupBy[[key]]} />))}
        </>),
    },
    {
      name: 'รายการงบ',
      component: <ItemDescriptionList itemDescriptions={result ? result.items : []} />,
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
