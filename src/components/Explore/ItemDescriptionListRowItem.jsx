import React from 'react';

const ItemDescriptionListRowItem = ({
  item, onItemClick,
}) => (
  <div
    className="flex flex-row w-full py-4 hover:bg-[rgba(0,0,0,0.02)] border-b"
    onClick={onItemClick}
    aria-hidden="true"
  >
    <div className="flex-1 space-y-1 cursor-pointer">
      <p className="text-base hover:underline">{item.ITEM_DESCRIPTION}</p>
      <div className="text-[10px] space-x-1">
        <span>{item.MINISTRY}</span>
        <span>{item.CATEGORY_LV1 && '-'}</span>
        <span>{item.CATEGORY_LV1}</span>
        <span>{item.CATEGORY_LV2}</span>
        <span>{item.CATEGORY_LV3}</span>
      </div>
    </div>
    <div>
      <p className="text-[#828282] text-right">{(item.AMOUNT).toLocaleString()}</p>
    </div>
  </div>
);

export default ItemDescriptionListRowItem;
