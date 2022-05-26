import React from 'react';

function Modal({
  title, onClose, children, className,
}) {
  return (
    <div
      className="fixed inset-0 flex bg-black/10 p-4 justify-center items-center z-5"
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

        <div className="grow py-6 pl-6 pr-14 flex flex-col">
          <div className="flex flex-col mb-8">
            <h5 className="text-[#333333] font-semibold text-lg flex-1">{title}</h5>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
