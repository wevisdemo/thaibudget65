import React from 'react';

function Modal({
  onClose, children, className,
}) {
  return (
    <div
      className="fixed inset-0 flex bg-black/10 p-4 justify-center items-center z-[2000]"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className={`max-h-full bg-white rounded-md shadow-xl w-full max-w-xl flex flex-col lg:flex-row relative text-left overflow-hidden ${className}`}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[1.5rem] right-[1.5rem] z-20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 4L20 20" stroke="#333333" strokeWidth="2" />
            <path d="M4 20L20 4" stroke="#333333" strokeWidth="2" />
          </svg>
        </button>

        <div className="grow p-6 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
