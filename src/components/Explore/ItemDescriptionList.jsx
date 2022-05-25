import React from 'react';
import ItemDescriptionListRowItem from './ItemDescriptionListRowItem';

function ItemDescriptionList() {
  return (
    <div className="w-full">
      {Array(50).fill(0).map(v => <ItemDescriptionListRowItem />)}
    </div>
  )
}

export default ItemDescriptionList;
