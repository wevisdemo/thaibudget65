import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import '../../dropdown.css';
import KeywordListItem from './KeywordListItem';
import Section from './Section';

const KEYWORD_HEADER_STRING = 'คีย์เวิร์ด';
const KEYWORD_COUNT = 'จำนวนที่พบ';
const AMOUNT_UNIT_HEADER_STRING = 'ล้านบาท';
const TITLE_STRING = 'คีย์เวิร์ดในรายละเอียดงบ';
const options = ['งบมากไปน้อย', 'ตัวอักษร', 'จำนวนที่พบ'];
const defaultOption = options[0];
const mappedOption = {
  งบมากไปน้อย: 'summation',
  ตัวอักษร: 'word',
  จำนวนที่พบ: 'count',
};

function KeywordList({
  keywords, activeKeyword, onActiveKeywordIndex,
}) {
  const [optionsState, setOptionsState] = useState('งบมากไปน้อย');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredKeywords = keywords.filter((keyword) => keyword.word.includes(searchQuery));

  const handleDropdown = (e) => {
    setOptionsState(e.value);
  };

  const sorter = (sortBy, data) => {
    if (sortBy === 'summation' || sortBy === 'count') {
      return data.sort((a, b) => (b[sortBy] - a[sortBy]));
    }
    return data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  };
  return (
    <div className="flex flex-col w-full">
      <Section title={TITLE_STRING}>
        <div className="flex justify-end pb-6">
          <div className="pr-2">
            <label className="flex text-xs items-center pb-2">เรียงจาก</label>

            <Dropdown options={options} onChange={handleDropdown} value={defaultOption} placeholder="Select" />
          </div>
          <div>
            <label className="flex text-xs items-center pb-2">
              <svg
                className="h-4 w-4 mr-1 fill-black"
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
              className="w-48 h-[40px] text-black rounded-sm p-2 bg-white border border-[#ccc] placeholder-[#767676]"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นคีย์เวิร์ด"
            />
          </div>
        </div>
        <table className="border-collapse w-full">
          <tr>
            <th> </th>
            <th className="text-left text-sm text-[#828282] font-normal">{KEYWORD_HEADER_STRING}</th>
            <th className="text-left text-sm text-[#828282] font-normal">{KEYWORD_COUNT}</th>
            <th className="text-right text-sm text-[#828282] font-normal">{AMOUNT_UNIT_HEADER_STRING}</th>
          </tr>
          {sorter(mappedOption[optionsState], filteredKeywords).map((keyword) => (
            <KeywordListItem
              key={`keyword-item-${keyword.word}`}
              keyword={keyword}
              checked={activeKeyword === keyword.word}
              onCheck={() => onActiveKeywordIndex(keyword.index)}
            />
          ))}
        </table>
      </Section>
    </div>
  );
}

export default KeywordList;
