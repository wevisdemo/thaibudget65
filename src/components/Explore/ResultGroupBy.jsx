import React from 'react';
import Section from './Section';

const TITLE_PATTERN_STRING = 'และปริมาณงบที่เกี่ยวข้อง';
const AMOUNT_UNIT_STRING = 'ล้านบาท';
const ITEM_PER_PAGE = 5;

const MOCK = {
  name: 'พัฒนาระบบบริหารจัดการความปลอดภัยโครงสร้างพื้นฐานเทคโนโลยีดิจิทัล แขวงพญาไท เขตพญาไท กรุงเทพมหานคร 1 ระบบ',
  total: 4003194204,
  items: [],
};

const SEE_MORE_BUTTON_STRING = 'ดูทั้งหมด';
const ARROW_RIGHT = (
  <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.705 0.75L0.294998 2.16L4.875 6.75L0.294998 11.34L1.705 12.75L7.705 6.75L1.705 0.75Z" fill="#3904E9"/>
  </svg>
);

function ResultGroupBy({
  name, budgetYearTotal
}) {
  return (
    <Section title={name + TITLE_PATTERN_STRING}>
      <div>
        {Array(40).fill(MOCK).slice(0, ITEM_PER_PAGE).map((v, i) => <RowItem index={i} number={i + 1} name={v.name} amount={v.total} />)}
      </div>
      <div className="ml-auto">
        <button className="text-[#3904E9] mt-2 inline-flex items-center gap-x-5">
          {SEE_MORE_BUTTON_STRING}
          {ARROW_RIGHT}
        </button>
      </div>
    </Section>
  );
}

function RowItem({
  index, number, name, amount,
}) {
  return (
    <div className={`grid grid-cols-2 py-3 px-2 ${index & 1 ? 'bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="inline-flex items-center">
        <div>
          <span className="flex grow w-6 h-6 bg-[#4F4F4F] rounded-full justify-center mr-4 items-center" >
            <p className="text-white font-semibold text-sm text-justify">{number}</p>
          </span>
        </div>
        <p className="truncate">{name}</p>
      </div>
      <div className="text-right inline">
        <p>
          {(amount / 1_000_000).toLocaleString()} <span className="text-[#828282] text-[13px]">{AMOUNT_UNIT_STRING}</span></p>
      </div>
    </div>
  );
}

export default ResultGroupBy;
