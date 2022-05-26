import React, { useEffect, useState } from 'react';
import KeywordListItem from './KeywordListItem';
import Section from './Section';

const KEYWORD_HEADER_STRING = 'คำสำคัญ';
const AMOUNT_UNIT_HEADER_STRING = 'ล้านบาท';
const TITLE_STRING = 'คำสำคัญในรายละเอียดงบ';
function KeywordList({
  keywords, activeKeyword, onActiveKeywordIndex,
}) {

  return (
    <div className="flex flex-col w-full">
      <Section title={TITLE_STRING}>
        <table className="border-collapse w-full">
          <tr>
            <th> </th>
            <th className="text-left text-sm text-[#828282] font-normal">{KEYWORD_HEADER_STRING}</th>
            <th className="text-right text-sm text-[#828282] font-normal">{AMOUNT_UNIT_HEADER_STRING}</th>
            <th> </th>
          </tr>
          {keywords.map((keyword, i) => (
            <KeywordListItem
              key={`keyword-item-${keyword}`}
              keyword={keyword}
              count={400}
              total={31442}
              checked={activeKeyword === keyword}
              onCheck={() => onActiveKeywordIndex(i)}
            />
          ))}
        </table>
      </Section>
    </div>
  );
}

export default KeywordList;
