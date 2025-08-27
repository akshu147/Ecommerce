import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1">
        <div className="h-48 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded mt-2"></div>
        <div className="h-4 bg-gray-300 rounded mt-1"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
