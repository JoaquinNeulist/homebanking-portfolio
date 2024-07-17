import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '../components/Link'
import axios from 'axios'

const Applycardpage = () => {
  const [cardType, setCardType] = useState('')
  const [cardColor, setCardColor] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const getCard = async () => {
    if (!cardType || !cardColor) {
      setErrorMessage('Please complete all fields')
      return
    }

    try {
      let token = localStorage.getItem('token')
      await axios.post(
        "http://localhost:8080/api/clients/current/cards",
        { type: cardType, color: cardColor },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      navigate('/accounts/cards')
    } catch (error) {
        setErrorMessage(error.response.data)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='font-semibold text-[20px] p-4'>Apply for a card</h2>
      <div className='flex flex-col w-11/12 h-[58vh] border border-black bg-gray-300 lg:relative'>
        <h2 className='px-4 p-2 text-[18px] font-semibold'>Select card type</h2>
        <select 
          required 
          className='w-11/12 self-center border border-black rounded-xl lg:w-1/3 lg:self-start lg:ml-8'
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
        >
          <option value="" disabled selected hidden>E.g. Debit</option>
          <option value="DEBIT">Debit</option>
          <option value="CREDIT">Credit</option>
        </select>
        <h2 className='px-4 p-2 text-[18px] font-semibold mt-4'>Select card membership (color)</h2>
        <select 
          required 
          className='w-11/12 self-center border border-black rounded-xl lg:w-1/3 lg:self-start lg:ml-8'
          value={cardColor}
          onChange={(e) => setCardColor(e.target.value)}
        >
          <option value="" disabled selected hidden>E.g. Gold</option>
          <option value="GOLD">Gold</option>
          <option value="SILVER">Silver</option>
          <option value="TITANIUM">Titanium</option>
        </select>
        {errorMessage && <p className="text-red-500 text-start mt-2 w-full">{errorMessage}</p>}
        <div className='flex gap-4 justify-center mt-4 lg:justify-start lg:ml-32 lg:mt-12'>
          <button onClick={getCard} className='w-[64px] h-[32px] border border-black bg-white rounded-xl self-center lg:w-[96px]'>Apply</button>
          <Link to='/accounts/cards'>
            <button className='w-[64px] h-[32px] border border-black bg-white rounded-xl self-center lg:w-[96px]'>Cancel</button>
          </Link>
        </div>
        <img src="/assets/applyimage.png" className='w-[200px] self-center object-cover h-[250px] lg:self-end lg:h-[400px] lg:absolute lg:w-[450px] lg:right-8' alt="image.png" />
      </div>
    </div>
  )
}

export default Applycardpage
