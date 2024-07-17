import React, { useState } from 'react';

const Cards = ({ typeCard, color, number, name, validdate, cvv }) => {
  const [showCvv, setShowCvv] = useState(false);

  const toggleCvvVisibility = () => {
    setShowCvv(!showCvv);
  };

  const changeBGColor = () => {
    if (color === "GOLD") {
      return 'bg-gradient-to-r from-yellow-300 to-yellow-600';
    } else if (color === "SILVER") {
      return 'bg-gradient-to-r from-gray-300 to-gray-600';
    } else if (color === 'TITANIUM') {
      return 'bg-gradient-to-r from-cyan-500 to-cyan-800';
    }
  };

  return (
    <div className={`${changeBGColor()} card relative w-[300px] h-[180px] md:w-[350px] md:h-[230px] lg:h-[260px] lg:w-[400px] flex flex-col justify-between px-4 py-6 md:px-6 md:py-10 text-white rounded-2xl md:rounded-3xl gap-4 md:gap-8`}>
      <div>
        <p className="text-lg md:text-2xl font-medium">{number}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm md:text-lg font-medium">{name}</p>
        <div className="flex flex-col items-center">
          <p className="text-xs md:text-sm">Valid Date</p>
          <p className="text-xs md:text-sm">{validdate}</p>
        </div>
        <div>
          <img src="/assets/logo.png" alt="logo.png" className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]' />
        </div>
      </div>
      <div className="flex justify-center mt-2 md:mt-4">
        <button className="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-md" onClick={toggleCvvVisibility}>
          {showCvv ? 'Hide CVV' : 'Show CVV'}
        </button>
      </div>
      {showCvv && (
        <div className="absolute bottom-2 right-2 p-2 md:p-4 bg-black bg-opacity-75 rounded-md shadow-md">
          <p className="text-xs md:text-sm font-medium text-white">CVV: {cvv}</p>
        </div>
      )}
    </div>
  );
};

export default Cards;
