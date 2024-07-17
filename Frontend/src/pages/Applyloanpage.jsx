import React, { useEffect, useState } from 'react'
import Link from '../components/Link'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Applyloanpage = () => {
  const [loanType, setLoanType] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [loanPayment, setLoanPayment] = useState('')
  const [destinationAccount, setDestinationAccount] = useState('')
  const [loansData, setLoansData] = useState([])
  const [clientAccounts, setClientAccounts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("Token not found")
        }

        const response = await axios.get("http://localhost:8080/api/loans", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setLoansData(response.data)

        const responseClient = await axios.get("http://localhost:8080/api/auth/current", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const client = responseClient.data
        setClientAccounts(client.accounts)
      } catch (error) {
        console.error("Error fetching data:", error.response.data)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      const selectedLoan = loansData.find(loan => loan.name === loanType)
      const selectedLoanId = selectedLoan ? selectedLoan.id : null
  
      if (!selectedLoanId) {
        setErrorMessage('Please select a valid loan type.')
        return
      }
  
      const response = await axios.post(
        "http://localhost:8080/api/loans",
        { loanId: selectedLoanId, amount: loanAmount, payments: loanPayment, destinationAccountNumber: destinationAccount },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/accounts/loans')
    } catch (error) {
      setErrorMessage(error.response.data)
      console.error("Error creating loan request:", error.response.data)
    }
  }
  

  return (
    <div className='flex flex-col items-center mb-4 lg:relative'>
      <h2 className='font-semibold text-[20px] p-4'>Apply for a loan</h2>
      <img src="/assets/applyloanimage.png" className='w-[150px] self-center h-[150px] lg:self-end lg:h-[480px] lg:absolute lg:w-[420px]' alt="" />
      <div className='flex flex-col w-11/12 border border-black bg-gray-300 lg:w-1/2 lg:self-start lg:ml-12'>
        <form className="flex flex-col gap-4 px-4 py-6">
          <h2 className='text-[18px] font-semibold'>Select loan type</h2>
          <select
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            required
            className='w-full rounded-xl'
          >
            <option value="" disabled hidden>E.g. Personal</option>
            {loansData.map(loan => (
              <option key={loan.id} value={loan.name}>
                {loan.name} (Max amount: ${loan.maxAmount})
              </option>
            ))}
          </select>
          <h2 className='text-[18px] font-semibold'>Origin account</h2>
          <select
            value={destinationAccount}
            onChange={(e) => setDestinationAccount(e.target.value)}
            required
            className='w-full rounded-xl'
          >
            <option value="" disabled hidden>Choose account</option>
            {clientAccounts.map(account => (
              <option key={account.number} value={account.number}>
                {account.number}
              </option>
            ))}
          </select>
          <label className='text-[18px] font-semibold'>Amount:</label>
          <div className='flex items-center'>
            <p className='font-semibold text-[18px]'>$</p>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className='w-full rounded-xl'
            />
          </div>
          <h2 className='text-[18px] font-semibold'>Payment:</h2>
          <select
            value={loanPayment}
            onChange={(e) => setLoanPayment(e.target.value)}
            required
            className='w-full rounded-xl'
          >
            <option value="" disabled hidden>Choose payment</option>
            {loansData
              .find(loan => loan.name === loanType)
              ?.payments.map(payment => (
                <option key={payment} value={payment}>
                  {payment} payments
                </option>
              ))}
          </select>
          {errorMessage && <p className='text-red-600 text-start w-full'>{errorMessage}</p>}
          <div className='flex gap-8 justify-center md:gap-4 lg:gap-4 mt-6'>
            <button type="button" onClick={handleSubmit} className='w-[100px] h-[40px] border border-black bg-white rounded-xl'>Apply</button>
            <Link to='/accounts/loans'>
              <button className='w-[100px] h-[40px] border border-black bg-white rounded-xl'>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Applyloanpage
