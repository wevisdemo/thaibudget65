import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import WvFooter from '@wevisdemo/ui/components/footer';
import KeywordList from '../components/Explore/KeywordList';
import Result from '../components/Explore/Result';
import { filter } from '../explore/filter';
import { provinces } from '../provinces';
import rawKeywords from '../selectedKeyword.json';

const selectedKeywords = rawKeywords.map((d, index) => ({ index, ...d }));

const PAGE_TITLE_STRING = 'สำรวจงบประมาณปี 2566';
const PAGE_SUB_TITLE_STRING = 'ผ่านคำสำคัญที่พบได้บ่อย และคำที่น่าสนใจในงบประมาณ';
const DOWNLOAD_DATA_BUTTON_STRING = 'ดาวน์โหลดข้อมูล';
const DOWNLOAD_DATA_URL_STRING = 'https://docs.google.com/spreadsheets/d/1Js6iDnBR53nk80Hr4UybEwV4poUpNEeOoUUWJDCpLjI/edit#gid=696564335';
const DOWNLOAD_ICON = (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_5321_4)">
      <path d="M7.03576 2.86356H1.17523V19.4081H19.8247V2.86356C19.8247 2.86356 15.3059 2.86356 13.9641 2.86356" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
      <path d="M16.0316 8.65536L10.7283 13.9587L5.42504 8.65536" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
      <line x1="10.6667" y1="0.5" x2="10.6667" y2="13" stroke="currentColor" strokeWidth="2" />
    </g>
    <defs>
      <clipPath id="clip0_5321_4">
        <rect width="20.8333" height="20" fill="white" transform="translate(0.0833435 0.5)" />
      </clipPath>
    </defs>
  </svg>
);
const FEEDBACK_BUTTON_STRING = 'เสนอแนะติชม';
const FEEDBACK_URL_STRING = 'https://airtable.com/shryu4errnlj1LWsM';
const FEEDBACK_ICON = (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.498749 14.7513V18.5013H4.24875L15.3087 7.44128L11.5587 3.69128L0.498749 14.7513ZM18.2087 4.54128C18.5987 4.15128 18.5987 3.52128 18.2087 3.13128L15.8687 0.791279C15.4787 0.401279 14.8487 0.401279 14.4587 0.791279L12.6287 2.62128L16.3787 6.37128L18.2087 4.54128Z" fill="#3904E9" />
  </svg>
);

const Explore = () => {
  const [allItems, setAllItems] = useState([]);
  const [activeKeywordIndex, setActiveKeywordIndex] = useState(0);
  // show fab button state
  const [showFab, setShowFab] = useState(false);

  const matchedProvinces = (province) => {
    let matched = [];
    provinces.forEach((p) => {
      // eslint-disable-next-line no-unused-expressions
      province.includes(p) ? matched = [...matched, p] : null;
    });
    return matched.join('-');
  };

  useEffect(() => {
    d3.csv(`${process.env.PUBLIC_URL}/data.csv`).then((items) => {
      setAllItems(items.map((item) => ({
        ...item,
        PROVINCE: matchedProvinces(item.ITEM_DESCRIPTION),
      })));
    });
  }, []);

  let prevScrollY = 0;
  const onShowFab = () => {
    const { scrollY } = window;
    setShowFab(prevScrollY - scrollY > 0 || scrollY < 1);
    prevScrollY = scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', onShowFab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const result = filter(selectedKeywords[activeKeywordIndex].word, allItems);

  return (
    <div>
      <div className="bg-[hsl(0,0%,98%)] text-black px-4 xl:px-36 py-6 md:pt-[73px] gap-y-8 relative">
        <div>
          <a
            className={`wv-font-anuphan flex items-center space-x-3 rounded-md text-[#3904E9] bg-white shadow-xl p-4 fixed z-50 bottom-6 right-10 duration-200 ${showFab || 'translate-y-20 opacity-0'}`}
            href={FEEDBACK_URL_STRING}
            target="_blank"
            rel="noopener noreferrer"
          >
            {FEEDBACK_ICON}
            <span>{FEEDBACK_BUTTON_STRING}</span>
          </a>
        </div>
        <h1 className="wv-font-anuphan text-4xl font-bold">{PAGE_TITLE_STRING}</h1>
        <p className="text-[#828282] wv-font-anuphan mt-3">{PAGE_SUB_TITLE_STRING}</p>
        <div className="wv-font-anuphan flex p-6 justify-between items-center bg-[#3904E90A] rounded-xl mt-8">
          <p className="text-xl">{`จากงบประมาณทั้งหมด ${result && (result.totalYearBudget / 1_000_000).toLocaleString()} ล้านบาท`}</p>
          <a
            className="inline-flex space-x-3 items-center rounded-md bg-[#3904E9] text-white p-4"
            href={DOWNLOAD_DATA_URL_STRING}
            target="_blank"
            rel="noopener noreferrer"
          >
            {DOWNLOAD_ICON}
            <span>{DOWNLOAD_DATA_BUTTON_STRING}</span>
          </a>
        </div>
        <div className="wv-font-anuphan grid grid-cols-1 md:grid-cols-3 gap-6 my-7">
          <KeywordList keywords={selectedKeywords} activeKeyword={selectedKeywords[activeKeywordIndex].word} onActiveKeywordIndex={setActiveKeywordIndex} />
          <Result result={result} keyword={selectedKeywords[activeKeywordIndex].word} />
        </div>
      </div>
      <WvFooter />
    </div>
  );
};

export default Explore;
