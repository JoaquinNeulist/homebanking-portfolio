import React from 'react';

const Card = ({ accountNumber, amount, creationDate, index }) => {
  return (
    <div className='h-[24vh] gap-12 rounded-3xl bg-[#72727250] shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] mb-4 w-11/12 flex items-center justify-center md:w-2/3 lg:w-full' key={index}>
      {/* Cards/Contenedores de los detalles de cuenta */}
      <div className='flex flex-col gap-6'>
        <p>Account number:</p>
        <p>Amount:</p>
        <p>Creation date:</p>
      </div>
      <div className='flex flex-col gap-3'>
        <p className='font-bold'>{accountNumber}</p>
        <p className='font-bold text-[30px]'>${amount}</p>
        <p className='font-bold'>{creationDate}</p>
      </div>
    </div>
  );
}

export default Card;
