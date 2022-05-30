import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import '../../dropdown.css';
import ItemDescriptionListRowItem from './ItemDescriptionListRowItem';
import ItemDescriptionModal from './ItemDescriptionModal';
import Pagination from './Pagination';

const options = ['งบมากไปน้อย', 'ตัวอักษร'];
const defaultOption = options[0];
const mappedOption = {
  งบมากไปน้อย: 'AMOUNT',
  ตัวอักษร: 'ITEM_DESCRIPTION',
};

function ItemDescriptionList({ itemDescriptions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalItem, setModalItem] = useState(null);
  const ITEM_PER_PAGE = 10;

  useEffect(() => setCurrentPage(1), [itemDescriptions]);

  const [optionsState, setOptionsState] = useState('งบมากไปน้อย');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredItems = itemDescriptions.filter(
    (keyword) =>
      keyword.ITEM_DESCRIPTION.includes(searchQuery) ||
      keyword.MINISTRY.includes(searchQuery) ||
      keyword.CATEGORY_LV1.includes(searchQuery) ||
      keyword.CATEGORY_LV2.includes(searchQuery) ||
      keyword.CATEGORY_LV3.includes(searchQuery)
  );

  const handleDropdown = (e) => {
    setOptionsState(e.value);
  };

  const sorter = (sortBy, data) => {
    if (sortBy === 'AMOUNT') {
      return data.sort(
        (a, b) =>
          parseFloat(b[sortBy].replaceAll(',', '')) -
          parseFloat(a[sortBy].replaceAll(',', ''))
      );
    }
    return data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  };

  const items = sorter(mappedOption[optionsState], filteredItems);

  return (
    <div className="w-full mt-2">
      {modalItem && (
        <ItemDescriptionModal
          item={modalItem}
          title="TITLENAME"
          onClose={() => setModalItem(null)}
        />
      )}
      <div className="flex flex-col xl:flex-row xl:justify-between items-center my-4">
        {/* <div>เรียงงบมากไปน้อย</div> */}
        <div className="flex justify-end pb-6">
          <div className="pr-2">
            <label className="flex text-xs items-center pb-2">เรียงจาก</label>

            <Dropdown
              options={options}
              onChange={handleDropdown}
              value={defaultOption}
              placeholder="Select"
            />
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
              className="w-64 h-[40px] text-black rounded-sm p-2 bg-white border border-[#ccc] placeholder-[#767676]"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ชื่อแผนงาน/ กระทรวง/ รายละเอียด"
            />
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          pageLength={Math.ceil(items.length / ITEM_PER_PAGE)}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {items &&
        items
          .slice(
            (currentPage - 1) * ITEM_PER_PAGE,
            ITEM_PER_PAGE + (currentPage - 1) * ITEM_PER_PAGE
          )
          .map((v) => (
            <ItemDescriptionListRowItem
              item={v}
              onItemClick={() => setModalItem(v)}
            />
          ))}
    </div>
  );
}

export default ItemDescriptionList;
