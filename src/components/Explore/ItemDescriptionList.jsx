import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import ItemDescriptionListRowItem from './ItemDescriptionListRowItem';
import ItemDescriptionModal from './ItemDescriptionModal';
import Pagination from './Pagination';

function ItemDescriptionList({
  itemDescriptions,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalItem, setModalItem] = useState(null);
  const ITEM_PER_PAGE = 10;

  useEffect(() => setCurrentPage(1), [itemDescriptions]);

  return (
    <div className="w-full mt-2">
      {modalItem && <ItemDescriptionModal item={modalItem} title="TITLENAME" onClose={() => setModalItem(null)} />}
      <div className="flex flex-row justify-between my-4">
        <Dropdown />
        <Pagination currentPage={currentPage} pageLength={Math.ceil(itemDescriptions.length / ITEM_PER_PAGE)} setCurrentPage={setCurrentPage} />
      </div>
      {itemDescriptions && itemDescriptions
        .slice((currentPage - 1) * ITEM_PER_PAGE, ITEM_PER_PAGE + (((currentPage - 1) * ITEM_PER_PAGE)))
        .map((v) => <ItemDescriptionListRowItem item={v} onItemClick={() => setModalItem(v)} />)}
    </div>
  );
}

export default ItemDescriptionList;
