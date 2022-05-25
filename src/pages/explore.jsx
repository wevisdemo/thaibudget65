import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import WvFooter from '@wevisdemo/ui/components/footer';
import KeywordList from '../components/Explore/KeywordList';
import Result from '../components/Explore/Result';
import { filter } from '../explore/filter';
import { provinces } from '../provinces';

const Explore = () => {
  const [result, setResult] = useState(null);
  const [allItems, setAllItems] = useState([]);

  const matchedProvinces = (province) => {
    let matched = [];
    provinces.forEach((p) => {
      // eslint-disable-next-line no-unused-expressions
      province.includes(p) ? matched = [...matched, p] : null;
    });
    return matched.join('-');
  };

  useEffect(() => {
    d3.csv(`${process.env.PUBLIC_URL}/data65.csv`).then((items) => {
      setAllItems(items.map((item) => ({
        ...item,
        PROVINCE: matchedProvinces(item.ITEM_DESCRIPTION),
      })));
    });
  }, []);

  const handleKeywordChange = (keyword) => {
    const filtered = filter(keyword, allItems);
    setResult(filtered);
  };

  return (
    <div className="bg-[hsl(0,0%,98%)] text-black px-4 md:px-36 pt-6 md:pt-[73px]">
      <h1 className="wv-font-anuphan text-4xl font-bold">สำรวจงบประมาณปี 2566</h1>
      <p className="text-[#828282]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames
        velit eget bibendum augue et, sit nisl.
      </p>
      <div className="wv-font-anuphan grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
        <KeywordList onKeywordChange={handleKeywordChange} />
        <Result result={result} />
      </div>
      <WvFooter />
    </div>
  );
};

export default Explore;
