import React from 'react';
import { useNumberingSystem } from '../../utils/numbering-system';
import Section from './Section';

const TITLE_STRING = 'งบที่เกี่ยวข้องเทียบกับงบทั้งหมด';
const AMOUNT_UNIT_STRING = 'ล้านบาท';
const RATIO_STRING = 'เทียบงบทั้งหมด';
const MILLION_INT = 1_000_000;

function RatioCompare({ total, budgetYearTotal }) {
  const { formatNumber, formatInteger, formatFractions } = useNumberingSystem();
  return (
    <Section title={TITLE_STRING}>
      <div className="flex flex-row space-x-6">
        <div className="flex relative w-64 h-64 bg-[#E0E0E0]">
          <div
            className="flex absolute bg-blue duration-200"
            style={{
              height: `${Math.sqrt(total / budgetYearTotal) * 100}%`,
              width: `${Math.sqrt(total / budgetYearTotal) * 100}%`,
            }}
          />
        </div>
        <div className=" space-y-6">
          <div>
            <p className="text-[25px]">
              {formatFractions(total / MILLION_INT)}
            </p>
            <p className="text-gray-2">{AMOUNT_UNIT_STRING}</p>
          </div>
          <div>
            <p className="text-[25px]">
              {formatFractions((total * 100) / budgetYearTotal)}%
            </p>
            <p className="text-gray-2">{RATIO_STRING}</p>
          </div>
          <div>
            <p className="text-gray-2">{`งบประมาณทั้งหมดของปีงบประมาณ ${formatNumber(
              2566
            )} คือ ${formatInteger(budgetYearTotal / MILLION_INT)} ล้านบาท`}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default RatioCompare;
