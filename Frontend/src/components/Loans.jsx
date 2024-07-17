// Componente Loans
import React from 'react';

const Loans = ({ type, amount, payments }) => {
  return (
    <div className='shadow-lg bg-[#8aaee0] rounded-2xl mb-4 h-[25vh] w-11/12 flex md:w-5/6 md:justify-between md:m-4 md:h-[29vh] lg:justify-around'>
      {/* Tarjetas de préstamos*/}
      <div className='flex flex-col justify-around p-4 gap-8 lg:p-7'>
        <p className='font-bold text-[18px]'>Loan type:</p>
        <p className='font-bold text-[18px]'>Amount:</p>
        <p className='font-bold text-[18px]'>Payments:</p>
      </div>
      <div className='flex p-4 gap-8 flex-col justify-around md:items-end md:p-6 lg:justify-around lg:gap-4'>
        <p className='font-bold text-[18px]'>{type}</p>
        <p className='font-bold text-[18px] lg:text-[32px]'>${amount}</p>
        <p className='font-bold text-[18px]'>{payments}</p>
      </div>
    </div>
  );
};

export default Loans;
