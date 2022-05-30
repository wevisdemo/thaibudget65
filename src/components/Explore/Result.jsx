import React, { useState } from 'react';
import ItemDescriptionList from './ItemDescriptionList';
import ResultSummary from './ResultSummary';

function Result({ result, keyword }) {
  const count = result ? result.items.length : 0;
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    {
      name: 'สรุปข้อมูล',
      component: <ResultSummary result={result} />,
    },
    {
      name: 'รายการงบ',
      component: (
        <ItemDescriptionList itemDescriptions={result ? result.items : []} />
      ),
    },
  ];

  return (
    <div className="flex md:col-span-2 flex-col w-full">
      <div className="bg-white px-8 py-6 border rounded-xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl">{keyword}</h2>
          <p className="text-base text-[#828282]">{`พบทั้งหมด ${count.toLocaleString()} ครั้ง ในรายละเอียดงบประมาณ`}</p>
        </div>
        <div className="grid grid-flow-col gap-1 h-12">
          {tabs.map(({ name }, i) => (
            <button
              className={`rounded-md duration-100 ${
                i === activeTabIndex
                  ? 'bg-[rgba(57,4,233,0.06)] hover:bg-[rgba(57,4,233,0.08)] text-[#3904E9]'
                  : 'hover:bg-[rgba(0,0,0,0.03)]'
              }`}
              type="button"
              onClick={() => setActiveTabIndex(i)}
            >
              {name}
            </button>
          ))}
        </div>
        {tabs[activeTabIndex].component}
      </div>
    </div>
  );
}

export default Result;
