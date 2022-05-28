import React from 'react';
import Modal from './Modal';

function ItemDescriptionModal({
  item, onClose,
}) {
  return (
    <Modal onClose={onClose}>
      <div className="space-y-3 pr-6">
        <h5 className="text-[#333333] font-semibold text-lg flex-1">{item.ITEM_DESCRIPTION}</h5>
        <div className="space-x-1 text-[#828282]">
          <span>{item.MINISTRY}</span>
          <span>{item.BUDGETARY_UNIT}</span>
          <span>{item.OUTPUT}</span>
          <span>{item.PROJECT}</span>
          <span>{item.BUDGET_PLAN}</span>
          <span>{item.CATEGORY_LV1}</span>
          <span>{item.CATEGORY_LV2}</span>
          <span>{item.CATEGORY_LV3}</span>
          <span>{item.CATEGORY_LV4}</span>
          <span>{item.CATEGORY_LV5}</span>
          <span>{item.CATEGORY_LV6}</span>
        </div>
        <p className="text-[#333333]">{item.AMOUNT}</p>
      </div>
    </Modal>
  );
}

export default ItemDescriptionModal;
