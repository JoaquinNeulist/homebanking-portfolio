import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signuppage = () => {
  const navigate = useNavigate();
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleSignUp = async () => {
    const firstName = inputFirstName.current.value;
    const lastName = inputLastName.current.value;
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    const newUser = { firstName, lastName, email, password };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', newUser);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        if (typeof errorMessage === 'string') {
          // Assume backend returns a string error message
          setErrors({ general: errorMessage });
        } else if (typeof errorMessage === 'object') {
          // Assume backend returns an object with field errors
          setErrors(errorMessage);
        } else {
          console.error('Unexpected error response format:', errorMessage);
        }
      } else if (error.request) {
        console.error('Network Error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='w-full relative min-h-screen flex items-center justify-center'>
      <div className='absolute inset-0 z-0'>
        <img src='/assets/signupimage.jpg' alt='Signup Background' className='w-full h-full object-cover' />
      </div>
      <div className='relative z-10 w-[80%] bg-gray-200 flex items-center justify-start gap-10 border-4 flex-col border-black md:w-[60%] lg:w-[45%]'>
        <img src='/assets/logo.png' alt='logo.png' className='w-[100px] mt-4 h-[75px]' />
        <form className='flex flex-col items-center w-full h-[80%] gap-6 md:gap-8 lg:gap-10'>
          <div className='flex flex-col w-[80%]'>
            <label htmlFor='fName' className='font-semibold'>
              First name
            </label>
            <input
              type='text'
              ref={inputFirstName}
              name='fName'
              placeholder='Enter your first name'
              className='w-full h-[50px] rounded-xl border-2 border-gray-800'
            />
            {errors.firstName && <p className='text-red-600'>{errors.firstName}</p>}
          </div>
          <div className='flex flex-col w-[80%]'>
            <label htmlFor='lName' className='font-semibold'>
              Last name
            </label>
            <input
              type='text'
              ref={inputLastName}
              name='lName'
              placeholder='Enter your last name'
              className='w-full h-[50px] rounded-xl border-2 border-gray-800'
            />
            {errors.lastName && <p className='text-red-600'>{errors.lastName}</p>}
          </div>
          <div className='flex flex-col w-[80%]'>
            <label htmlFor='email' className='font-semibold'>
              E-mail
            </label>
            <input
              type='text'
              ref={inputEmail}
              name='email'
              placeholder='Enter your email'
              className='w-full h-[50px] rounded-xl border-2 border-gray-800'
            />
            {errors.email && <p className='text-red-600'>{errors.email}</p>}
          </div>
          <div className='flex flex-col w-[80%] relative'>
            <label htmlFor='password' className='font-semibold'>
              Password
            </label>
            <div className='flex'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                ref={inputPassword}
                name='password'
                placeholder='Enter your password'
                className='w-full h-[50px] rounded-xl border-2 border-gray-800 pr-12'
              />
              <img
                src={passwordVisible ? '/assets/ojoabierto.png' : '/assets/ojocerrado.png'}
                alt='toggle visibility'
                className='cursor-pointer h-12'
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && <p className='text-red-600'>{errors.password}</p>}
          </div>
          {errors.general && <p className='text-red-600'>{errors.general}</p>}
        </form>
        <div className='flex flex-col items-center gap-4 mb-4'>
          <button
            type='button'
            className='rounded-xl border bg-blue-400 p-4 px-12 text-white lg:text-[20px]'
            onClick={handleSignUp}
          >
            Create
          </button>
          <Link to='/login'>
            <p className='underline text-blue-500 text-[18px] lg:text-[20px]'>Do you already have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signuppage;
