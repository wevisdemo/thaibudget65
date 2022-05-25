import React from 'react';
import WvFooter from '@wevisdemo/ui/components/footer';
import KeywordList from '../components/Explore/KeywordList';
import Result from '../components/Explore/Result';

const Explore = () => (
  <div className="bg-[hsl(0,0%,98%)] text-black px-4 md:px-36 pt-6 md:pt-[73px]">
    <h1 className="wv-font-anuphan text-4xl font-bold">สำรวจงบประมาณปี 2566</h1>
    <p className="text-[#828282]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames
      velit eget bibendum augue et, sit nisl.
    </p>
    <div className="wv-font-anuphan grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
      <KeywordList />
      <Result />
    </div>
    <WvFooter />
  </div>
);

export default Explore;
