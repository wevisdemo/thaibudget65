import React, { useMemo, useState } from 'react';
import Section from './Section';
import Pagination from './Pagination';
import { toLocaleWithFixed3Digits } from '../../numberUtils';

const ITEM_PER_PAGE_BRIEF = 5;
const ITEM_PER_PAGE = 10;

const TITLE_PATTERN_STRING = 'และปริมาณงบที่เกี่ยวข้อง';
const AMOUNT_UNIT_STRING = 'ล้านบาท';
const SEE_MORE_BUTTON_STRING = 'ดูทั้งหมด';
const EMPTY_ITEM_LIST_STRING = 'ไม่มีข้อมูล';
const ARROW_RIGHT = (
  <svg
    width="8"
    height="13"
    viewBox="0 0 8 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.705 0.75L0.294998 2.16L4.875 6.75L0.294998 11.34L1.705 12.75L7.705 6.75L1.705 0.75Z"
      fill="#3904E9"
    />
  </svg>
);

function ResultGroup({ groupName, items, onSeeMore, brief }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = brief ? ITEM_PER_PAGE_BRIEF : ITEM_PER_PAGE;

  const sortedItems = useMemo(
    () => items.sort((a, b) => b.total - a.total),
    [items]
  );

  return (
    <Section
      title={groupName + TITLE_PATTERN_STRING}
      className={brief && 'mt-6'}
    >
      <div>
        {items &&
          (sortedItems.length > 0 ? (
            sortedItems
              .slice(
                (currentPage - 1) * itemPerPage,
                itemPerPage + (currentPage - 1) * itemPerPage
              )
              .map(({ name, total }, i) => (
                <RowItem
                  key={`groupBy-row-item-${name}`}
                  index={i}
                  number={i + 1 + (currentPage - 1) * itemPerPage}
                  name={name}
                  amount={total}
                />
              ))
          ) : (
            <div>{EMPTY_ITEM_LIST_STRING}</div>
          ))}
      </div>
      <div className="ml-auto mt-3">
        {items &&
          sortedItems.length > itemPerPage &&
          (brief ? (
            <button
              type="button"
              onClick={onSeeMore}
              className="text-[#3904E9] inline-flex items-center gap-x-5"
            >
              {SEE_MORE_BUTTON_STRING}
              {ARROW_RIGHT}
            </button>
          ) : (
            <Pagination
              currentPage={currentPage}
              pageLength={Math.ceil(sortedItems.length / itemPerPage)}
              setCurrentPage={setCurrentPage}
            />
          ))}
      </div>
    </Section>
  );
}

function RowItem({ index, number, name, amount }) {
  return (
    <div
      className={`grid grid-cols-4 py-3 px-2 ${
        index % 2 ? 'bg-white' : 'bg-[#FAFAFA]'
      }`}
    >
      <div className="inline-flex items-center col-span-3">
        <div>
          <span className="flex grow w-6 h-6 bg-[#4F4F4F] rounded-full justify-center mr-4 items-center">
            <p className="text-white font-semibold text-sm text-justify">
              {number}
            </p>
          </span>
        </div>
        <p>{name}</p>
      </div>
      <div className="text-right inline">
        <p>
          {toLocaleWithFixed3Digits(amount / 1_000_000)}{' '}
          <span className="text-[#828282] text-[13px]">
            {AMOUNT_UNIT_STRING}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ResultGroup;
