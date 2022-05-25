import React from 'react';

const ARROW_DOWN = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="mx-auto"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.59 8.29492L12 12.8749L7.41 8.29492L6 9.70492L12 15.7049L18 9.70492L16.59 8.29492Z"
      fill="black"
      fillOpacity="0.54"
    />
  </svg>
);

const BULLET_CHECKED = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#3904E9" />
  </svg>
);

const BULLET_UNCHECKED = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="black" fillOpacity="0.6" />
  </svg>
);

function KeywordListItem({
  keyword, count, total, checked, onCheck,
}) {
  return (
    <tr
      className={`duration-100 border-b  ${checked && 'bg-[#3904E90F] border-white/0'} items-center`}
      role="menuitemradio"
      aria-checked={checked}
      onClick={onCheck}
    >
      <td className="pl-2 rounded-l-md">
        {checked ? BULLET_CHECKED : BULLET_UNCHECKED}
      </td>
      <td className="py-4">
        <span className="">{keyword}</span>
        <span className="text-[#828282] text-sm ml-2">
          (
          {count}
          )
        </span>
      </td>
      <td className="text-right">
        <span>{total.toLocaleString()}</span>
      </td>
      <td className="rounded-r-md">{ARROW_DOWN}</td>
    </tr>
  );
}

export default KeywordListItem;
