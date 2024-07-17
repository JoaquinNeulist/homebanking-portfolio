import React, { useState, useEffect } from 'react';
import Card from '../components/Cardaccount';
import Transactions from '../layouts/Transactiontablelayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Accountpage = () => {
  const [client, setClient] = useState(null);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const token = localStorage.getItem('token');
        const selectedAccountId = localStorage.getItem('selectedAccountId');
        if (!selectedAccountId) {
          throw new Error('No account selected');
        }

        const response = await axios.get('http://localhost:8080/api/auth/current', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        if (response.data) {
          setClient(response.data);
          const selectedAccount = response.data.accounts.find(account => account.id === Number(selectedAccountId));
          if (!selectedAccount) {
            throw new Error('Selected account not found');
          }
          setAccount(selectedAccount);
        } else {
          throw new Error('Failed to fetch client data');
        }
      } catch (error) {
        console.log(error);
        alert(error.message || 'An error occurred');
        dispatch(logout());
        navigate('/login');
      }
    };

    loadAccount();
  }, [navigate]);

  if (!client || !account) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex w-full flex-col gap-2 lg:relative'>
      <h2 className='font-semibold text-[24px] p-4 md:ml-8 mt-8'>Your selected account</h2>
      <div className='flex p-4 md:justify-center lg:justify-start lg:ml-20 lg:w-[500px]'>
        <Card
          key={account.id}
          accountNumber={account.number}
          amount={account.balance}
          creationDate={account.creationDate}
        />
      </div>
      <div className='lg:flex lg:justify-start lg:flex-col lg:items-start lg:ml-20 lg:w-1/3 lg:mb-8'>
        {account.transactions && account.transactions.length > 0 ? (
          <>
            <h2 className='font-semibold flex text-[20px] ml-8'>Transactions Resume:</h2>
            <Transactions transactions={account.transactions} />
          </>
        ) : (
          <h2 className='font-semibold flex text-[20px] ml-8'>This account has no transaction history</h2>
        )}
      </div>
      <div className='flex items-center justify-center lg:justify-end lg:mr-20 lg:top-2 lg:absolute lg:right-0'>
        <img src="/assets/mainImage.png" className='h-[125px] w-11/12 m-2 rounded-lg md:h-[175px] my-8 object-cover lg:h-[480px] lg:w-[520px]' alt="Main" />  
      </div>
    </div>
  );
};

export default Accountpage;
