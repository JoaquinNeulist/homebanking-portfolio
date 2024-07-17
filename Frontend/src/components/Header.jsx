import React from 'react';
import { links } from '../utils/Linklist';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () =>{
      dispatch(logout());
      navigate('/login');
    }
  return (
    <header className="w-full flex-wrap flex items-center bg-gradient-to-r from-purple-500 via-slate-200 to-purple-500">
      <div className='flex justify-between w-full'>
        <img src="/assets/logo.png" className='w-[50px] h-[50px] ml-4 md:ml-8' alt="Logo.png"/>
        <h1 className='self-center text-[20px] font-bold'>Mindhub Brothers Bank</h1>
        <img src="/assets/logout.png" onClick={handleLogout} className='h-[50px] hover:cursor-pointer w-[50px] mr-4 md:mr-8' alt="logout.png" />
      </div>
      <div className='flex w-full items-center justify-evenly flex-wrap gap-8 m-6'>
        {
          links.map(link => (
            <NavLink
              key={link.name}
              to={link.route}
              className={`px-4 py-2 border-2 border-black rounded-xl ${location.pathname === link.route ? 'bg-red-500' : 'bg-white'}`}
            >
              {link.name}
            </NavLink>
          ))
        }
      </div>
    </header>
  )
}

export default Header;
