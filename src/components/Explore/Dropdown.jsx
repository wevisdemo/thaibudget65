import React, { useState } from 'react';

const ARROW_DOWN_ICON = (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="black" fillOpacity="0.6" />
  </svg>
);

function Dropdown() {
  const listItems = Array(5).fill(1).map((v) => <li>{`item ${v}`}</li>);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div>
        <button type="button" className="flex items-center" onClick={() => setIsOpen((p) => !p)}>
          <span>Header</span>
          {ARROW_DOWN_ICON}
        </button>
      </div>
      <div>
        {isOpen && (
          <ul className="shadow-md absolute">
            {listItems}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
