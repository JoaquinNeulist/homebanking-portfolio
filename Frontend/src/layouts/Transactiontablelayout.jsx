import React from 'react';
import Transactionrow from '../components/Transactionrow';

const Transactions = ({ transactions }) => {
  return (
    <div className='flex ml-4 mt-2 md:justify-center'>
      <table>
        <thead>
          <tr>
            <th className='py-2 text-center border-2 border-black bg-[#D0D0D0] md:px-10 md:py-4'>Type</th>
            <th className='py-2 text-center border-2 border-black bg-[#D0D0D0] md:px-10 md:py-4'>Amount</th>
            <th className='py-2 text-center border-2 border-black bg-[#D0D0D0] md:px-10 md:py-4'>Date</th>
            <th className='py-2 text-center border-2 border-black bg-[#D0D0D0] md:px-10 md:py-4'>Definition</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <Transactionrow
              key={transaction.id}
              Type={transaction.type}
              Amount={`$${transaction.amount}`}
              Date={transaction.date}
              Definition={transaction.description}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;