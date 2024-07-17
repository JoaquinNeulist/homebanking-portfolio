import React from 'react';

const Transactionrow = ({ Type, Amount, Date, Definition }) => {
  return (
    <tr>
      {/* FILAS DE LA TABLA DE TRANSACCIONES */}
      <td className='py-2 px-4 border-2 text-center border-t-0 border-black bg-[#D0D0D0]'>{Type}</td>
      <td className='py-2 px-4 border-2 text-center border-t-0 border-black bg-[#D0D0D0]'>{Amount}</td>
      <td className='py-6 border-2 text-center border-t-0 md:px-4 border-black bg-[#D0D0D0]'>{Date}</td>
      <td className='py-6 border-2 text-center border-t-0 md:px-4 border-black bg-[#D0D0D0]'>{Definition}</td>
    </tr>
  );
};

export default Transactionrow;
