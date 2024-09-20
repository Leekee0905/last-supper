import React from 'react';

const ProcessBar = ({ progress }) => {
  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-700 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProcessBar;