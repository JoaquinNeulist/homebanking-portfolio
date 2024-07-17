// Cardspage.js

import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import Link from '../components/Link';
import axios from 'axios';

const Cardspage = () => {
  const [client, setClient] = useState(null);

  const loadClientCards = async () => {
    try {
      let token = localStorage.getItem('token');
      let response = await axios.get("http://localhost:8080/api/auth/current", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setClient(response.data);
    } catch (error) {
      console.error("Error loading client cards", error.response.data);
    }
  };
  

  useEffect(() => {
    loadClientCards();
    
    }, []);

    if (!client) return <p>Loading...</p>;
    
    const creditCards = client.cards.filter(card => card.type === 'CREDIT');
    const debitCards = client.cards.filter(card => card.type === 'DEBIT');

  return (
    <div className='flex flex-col'>
      <h2 className='font-semibold text-[24px] p-4 md:text-[36px] mb-4 px-8'>Your cards</h2>
      
      <div className='flex flex-col gap-4 md:flex-row justify-around md:items-start'>
        {creditCards.length > 0 && (
          <div className='flex flex-col items-center justify-center gap-4 mb-4 md:items-start'>
            <h2 className='font-semibold text-[20px] md:text-[32px]'>Credit</h2>
            {creditCards.map(card => (
              <Cards
                key={card.id}
                color={card.color}
                typeCard={card.type}
                number={card.number}
                name={card.cardHolder}
                validdate={card.thruDate}
                cvv={card.securityCode}
              />
            ))}
          </div>
        )}
        {debitCards.length > 0 && (
          <div className='flex flex-col items-center justify-center gap-4 mb-4 md:items-start'>
            <h2 className='font-semibold text-[20px] md:text-[32px]'>Debit</h2>
            {debitCards.map(card => (
              <Cards
                key={card.id}
                color={card.color}
                typeCard={card.type}
                number={card.number}
                name={card.cardHolder}
                validdate={card.thruDate}
                cvv={card.securityCode}
              />
            ))}
          </div>
        )}
        {creditCards.length === 0 && debitCards.length === 0 && (
          <h2 className='font-semibold text-[24px]'>You don't have any cards</h2>
        )}
      </div> 
      <div className='flex items-center justify-center'>
        <Link to="/accounts/getcards">
          <button className='bg-emerald-400 shadow-xl p-4 rounded-xl mb-4 px-16 text-gray-800'>Get Card</button>
        </Link>
      </div>
    </div>
  );
};

export default Cardspage;
