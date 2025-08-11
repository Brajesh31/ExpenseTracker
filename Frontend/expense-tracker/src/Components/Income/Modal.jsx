import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop: Covers the entire screen with a semi-transparent background
    <div 
      className="fixed inset-0 z-50 flex justify-center items-center  bg-opacity-20 backdrop-blur-sm"
      onClick={onClose} // Optional: close the modal when clicking the backdrop
    >
      {/* Modal Container: Stop click propagation to prevent closing when clicking inside */}
      <div 
        className="relative p-4 w-full max-w-lg bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-bold text-gray-900">
            {title}
          </h3>
          <button 
            type="button" 
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={onClose}
            aria-label="Close modal"
          >
            {/* Using an SVG for a cleaner 'X' icon */}
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>

        {/* Modal Body: This is where the content (children) will go */}
        <div className="p-4 md:p-5 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
