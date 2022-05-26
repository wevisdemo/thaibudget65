import React, { useEffect, useState } from 'react';
import ItemDescriptionListRowItem from './ItemDescriptionListRowItem';
import Pagination from './Pagination';

function ItemDescriptionList({
  itemDescriptions,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEM_PER_PAGE = 10;

  useEffect(() => setCurrentPage(1), [itemDescriptions]);

  return (
    <div className="w-full">
      <Pagination currentPage={currentPage} pageLength={Math.ceil(itemDescriptions.length / ITEM_PER_PAGE)} setCurrentPage={setCurrentPage} />
      {itemDescriptions && itemDescriptions
        .slice(0 + ((currentPage - 1) * ITEM_PER_PAGE), ITEM_PER_PAGE + (((currentPage - 1) * ITEM_PER_PAGE)))
        .map((v) => <ItemDescriptionListRowItem item={v} />)}
    </div>
  );
}

export default ItemDescriptionList;
