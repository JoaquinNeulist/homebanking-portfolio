import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Transactionpage = () => {
  const [destiny, setDestiny] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [originAccounts, setOriginAccounts] = useState([])
  const [destinationAccounts, setDestinationAccounts] = useState([])
  const [selectedOriginAccount, setSelectedOriginAccount] = useState('')
  const [selectedDestinationAccount, setSelectedDestinationAccount] = useState('')
  const [originAccountError, setOriginAccountError] = useState('')
  const [destinationAccountError, setDestinationAccountError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get("http://localhost:8080/api/auth/current", {
          headers: { Authorization: `Bearer ${token}` }
        })
        const client = response.data
        setOriginAccounts(client.accounts)
        setDestinationAccounts(client.accounts)
      } catch (error) {
        console.error("Error fetching data:", error.response.data)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        "http://localhost:8080/api/transactions",
        { sourceAccountNumber: selectedOriginAccount, destinationAccountNumber: selectedDestinationAccount, amount: amount, description: description },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/accounts')
    } catch (error) {
      console.error("Error creating transaction:", error.response.data)
      setErrorMessage(error.response.data)
    }
  }

  const handleDestinyChange = (e) => {
    setDestiny(e.target.value)
    setSelectedDestinationAccount('')
  }

  const handleOriginAccountChange = (e) => {
    setSelectedOriginAccount(e.target.value)
    setOriginAccountError('')
  }

  const handleDestinationAccountChange = (e) => {
    setSelectedDestinationAccount(e.target.value)
    setDestinationAccountError('')
  }

  return (
    <div className='flex flex-col gap-4 mt-4 w-full relative items-center justify-center md:flex-row'>
      <div className='flex flex-col w-full md:w-1/2 p-4'>
        <h2 className='font-semibold self-start text-[24px]'>Make a transaction</h2>
        <div className='bg-gray-300 flex w-full gap-8 p-4 flex-wrap'>
          <form action="" className='flex flex-col gap-4 w-full'>
            <p className='font-semibold text-[20px]'>Destiny</p>
            <div className='flex gap-8'>
              <label htmlFor="" className='font-semibold text-[20px]'>
                <input type='radio' name="destiny" value="My accounts" className='mr-2' onChange={handleDestinyChange} />
                My accounts
              </label>
              <label htmlFor="" className='font-semibold text-[20px]'>
                <input type='radio' name="destiny" value="Others" className='mr-2' onChange={handleDestinyChange} />
                Others
              </label>
            </div>
          </form>
          <div className='flex flex-col mb-4 w-full p-2 gap-8'>
            <div className='flex flex-col gap-6 w-full'>
              <h3 className='font-semibold text-[20px]'>Origin Account</h3>
              <select className='w-full rounded' value={selectedOriginAccount} onChange={handleOriginAccountChange}>
                <option value="" disabled selected hidden>Select your origin account</option>
                {originAccounts.map(account => (
                  <option key={account.number} value={account.number}>
                    {account.number} - ${account.balance}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-6 w-full'>
              <h3 className='font-semibold text-[20px]'>Amount</h3>
              <div className='flex w-full'>
                <label className='flex w-full'>
                  <p className='text-[18px]'>$</p><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className='w-full rounded' />
                </label>
              </div>
            </div>
            <div className='flex flex-col gap-6 w-full'>
              <h3 className='font-semibold text-[20px]'>Description</h3>
              <label className='w-full'>
                <input className='w-full rounded' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
            </div>
            {destiny === 'My accounts' && (
              <div className='flex flex-col gap-6 w-full'>
                                <h3 className='font-semibold text-[20px]'>Destination Account</h3>
                <select className='w-full rounded' value={selectedDestinationAccount} onChange={handleDestinationAccountChange}>
                  <option value="" disabled selected hidden>Select the destination account</option>
                  {destinationAccounts.map(account => (
                    account.number !== selectedOriginAccount && (
                      <option key={account.number} value={account.number}>
                        {account.number}
                      </option>
                    )
                  ))}
                </select>
              </div>
            )}
            {destiny === 'Others' && (
              <div className='flex flex-col gap-6 w-full'>
                <h3 className='font-semibold text-[20px]'>Destination Account</h3>
                <input type="text" placeholder="Enter destination account" value={selectedDestinationAccount} onChange={handleDestinationAccountChange} className='w-full rounded' />
              </div>
            )}
          </div>
          {errorMessage && <p className='self-center text-red-600'>{errorMessage}</p>}
          <button type="button" onClick={handleSubmit} className='w-full h-[50px] border justify-self-center border-black bg-blue-300 rounded-xl self-center hover:bg-blue-500 transition-colors duration-400'>Submit</button>
        </div>
      </div>
      <img
        src="/assets/transaction.png"
        alt="Transaction Background"
        className='hidden md:block md:w-1/2 md:h-full md:object-cover md:ml-4'
      />
    </div>
  )
}

export default Transactionpage
