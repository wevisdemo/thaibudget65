import React from 'react';

function ItemDescriptionListRowItem() {
  const i = 0;
  return (
    <div className="flex flex-row w-full py-4 hover:bg-[rgba(0,0,0,0.02)] border-b">
      <div className="flex-1 space-y-1">
        <p className="text-base">ค่าธรรมเนียมสมาชิก cobsea (coordinating body on the sea of east asia)</p>
        <div className="text-[10px] space-x-1">
          <span>กรมทรัพยากรทางทะเลและชายฝั่ง</span>
          <span>-</span>
          <span>งบดำเนินงาน</span>
          <span>งบเงินอุดหนุน</span>
          <span>เงินอุดหนุนทั่วไป</span>
        </div>
      </div>
      <div>
        <p className="text-[#828282] text-right">{(Math.random() * 1_000_000).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ItemDescriptionListRowItem;
