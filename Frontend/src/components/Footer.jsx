import React from 'react';
import Link from './Link';

const Footer = () => {
  return (
    <footer className='w-full h-[14vh] gap-4 flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-slate-200 to-purple-500'>
      <p>All rights reserved - Mindhub Brothers Bank &copy;</p>
      <div className='flex gap-8'>
        <Link to="https://www.facebook.com">
          <img src="/assets/Facebook.png" className='h-[50px] w-[50px]' alt="Facebook" />
        </Link>
        <Link to="https://www.instagram.com">
          <img src="/assets/Instagram.png" className='h-[50px] w-[50px]' alt="Instagram" />
        </Link>
        <Link to="https://www.whatsapp.com">
          <img src="/assets/whatsapp.png" className='h-[50px] w-[50px]' alt="WhatsApp" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
