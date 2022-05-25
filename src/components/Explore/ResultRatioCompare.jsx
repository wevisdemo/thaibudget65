import React from 'react';
import Section from './Section';

const TITLE_STRING = 'งบที่เกี่ยวข้องเทียบกับงบทั้งหมด';
const AMOUNT_UNIT_STRING = 'ล้านบาท';
const RATIO_STRING = 'เทียบงบทั้งหมด';
const MILLION_INT = 1_000_000;

function RatioCompare({
  total, budgetYearTotal,
}) {
  return (
    <Section title={TITLE_STRING}>
      <div className="flex flex-row space-x-6">
        <div className="flex relative w-64 h-64 bg-[#E0E0E0]">
          <div
            className="flex absolute bg-[#3904E9] duration-200"
            style={{
              height: `${Math.sqrt(total / budgetYearTotal) * 100}%`,
              width: `${Math.sqrt(total / budgetYearTotal) * 100}%`,
            }}
          />
        </div>
        <div className=" space-y-6">
          <div>
            <p className="text-[#828282]">{AMOUNT_UNIT_STRING}</p>
            <p className="text-[25px]">{total / MILLION_INT}</p>
          </div>
          <div>
            <p className="text-[#828282]">{RATIO_STRING}</p>
            <p className="text-[25px]">{ (total / budgetYearTotal).toLocaleString(undefined, { style: 'percent' }) }</p>
          </div>
          <div>
            <p className="text-[#828282]">{`งบประมาณทั้งหมดของปีงบประมาณ 2566 คือ ${(budgetYearTotal / MILLION_INT).toLocaleString()} ล้านบาท`}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default RatioCompare;
