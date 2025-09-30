import React from 'react';
import Signup from './Signup'; // مسار الملف بتاعك

const SignupModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white max-w-3xl w-full rounded-xl p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-600 text-xl hover:text-red-500"
        >
          <i className="fas fa-times"></i>
        </button>
        <Signup  onClose={onClose} />
      </div>
    </div>
  );
};

export default SignupModal;
