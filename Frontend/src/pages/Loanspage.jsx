import React, { useEffect, useState } from 'react'
import Loans from '../components/Loans'
import Link from '../components/Link'
import axios from 'axios'

const Loanspage = () => {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClientLoans = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:8080/api/auth/current', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const client = response.data
        setLoans(client.loans)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching client loans:', error.response.data)
        setLoading(false)
      }
    }
    fetchClientLoans()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className='flex items-center flex-col md:items-start md:m-8'>
      {loans.length > 0 && (
        <div className='flex'>
          <h2 className='font-semibold text-[20px] py-4'>Your Loans</h2>
        </div>
      )}
      {loans.length === 0 ? (
        <h2 className='text-lg text-gray-600'>You don't have loans in your accounts.</h2>
      ) : (
        <div className='w-full flex flex-col items-center md:flex-row md:justify-between'>
          {loans.map((loan) => (
            <Loans
              key={loan.id}
              type={loan.loanName}
              amount={loan.amount}
              payments={loan.payments}
            />
          ))}
        </div>
      )}
      <div className='flex justify-center w-full items-center'>
        <Link to='/accounts/getloan'>
          <button className='bg-emerald-400 p-4 rounded-xl shadow-xl px-16 text-gray-800 mb-4'>
            Get loans
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Loanspage
