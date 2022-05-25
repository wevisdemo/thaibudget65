import React, { useState } from 'react';
import ItemDescriptionListRowItem from './ItemDescriptionListRowItem';
import Pagination from './Pagination';

function ItemDescriptionList() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEM_PER_PAGE = 10;
  const itemDescriptions = Array(53).fill(0);
  return (
    <div className="w-full">
      <Pagination currentPage={currentPage} pageLength={Math.ceil(itemDescriptions.length / ITEM_PER_PAGE)} setCurrentPage={setCurrentPage}/>
      {itemDescriptions.slice(0 + ((currentPage - 1) * ITEM_PER_PAGE), ITEM_PER_PAGE + (((currentPage - 1) * ITEM_PER_PAGE))).map((v, i) => <ItemDescriptionListRowItem />)}
    </div>
  )
}

export default ItemDescriptionList;
