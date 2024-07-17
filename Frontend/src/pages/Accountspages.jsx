import React, { useState, useEffect } from 'react';
import Card from '../components/Cardaccount';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Accountspages = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadClient = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/auth/current', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const hasShownWelcomeToast = localStorage.getItem('hasShownWelcomeToast');
      if (!hasShownWelcomeToast) {
        toast.success('Login successful');
        localStorage.setItem('hasShownWelcomeToast', 'true'); 
      }

      setClient(response.data);
    } catch (error) {
      alert('Error loading client data');
      console.log(error);
      dispatch(logout());
      navigate('/login');
    }
  };

  useEffect(() => {
    loadClient();
  }, [dispatch, navigate]);

  const getAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/clients/current/accounts', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.data) {
        setClient(prevClient => ({
          ...prevClient,
          accounts: [...prevClient.accounts, response.data]
        }));
      }
      
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You do not have permission to create a new account.');
      } else {
        alert('Error creating account, client may already have 3 accounts');
      }
      console.log(error);
      navigate('/login');
    }
  };

  const handleCardClick = (accountId) => {
    localStorage.setItem('selectedAccountId', accountId);
    navigate(`/accounts/account/${accountId}`);
  };

  if (!client) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex flex-col'>
      <h1 className='font-semibold text-[24px] p-4 lg:p-8 lg:text-[32px]'>{`Welcome, ${client.firstName} ${client.lastName}!`}</h1>
      <div className='flex gap-8 items-center justify-center flex-col lg:flex-row lg:justify-around lg:w-full'>
        {client.accounts.map((account, index) => (
          <div 
            onClick={() => handleCardClick(account.id)} 
            key={index} 
            className='w-full flex items-center justify-center lg:w-1/3 cursor-pointer' 
          >
            <Card
              accountNumber={account.number}
              amount={`${account.balance}`}
              creationDate={account.creationDate}
              index={index}
            />
          </div>
        ))}
      </div>
      <div className='flex items-center flex-col justify-center'>
        {client.accounts.length < 3 && 
          <>
            <button className='bg-blue-400 p-4 rounded-xl text-white' onClick={getAccount}>Get Account</button>
          </>
        }
        {
          client.accounts.length === 3 &&
          <p className='text-red-600 p-4 self-center text-center mt-4'>You have reached the maximum number of accounts. You can only have 3 accounts.</p>
        }
      </div>
      <div className='flex items-center justify-center'>
        <img src="/assets/mainImage.png" className='h-[125px] w-11/12 m-2 rounded-lg md:h-[175px] my-8 object-cover lg:h-[275px]' alt="img.png" />
      </div>
    </div>
  );
};

export default Accountspages;
