import React from 'react';

const ProcessBar = ({ progress }) => {
  return (
    <div className="relative w-full h-6 bg-gray-300 rounded-full overflow-hidden shadow-inner"> 
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-lg transition-all duration-700 ease-in-out"
        style={{ width: `${progress}%` }}
      />
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-sm">
        {Math.round(progress)}%
      </span>
    </div>
  );
};

export default ProcessBar;
