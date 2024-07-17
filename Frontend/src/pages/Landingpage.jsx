import React from 'react';
import { Carousel } from 'flowbite-react';
import Link from '../components/Link';

const Landingpage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
        <header className="flex flex-col md:flex-row justify-center items-center h-[170px] w-[50%] p-4">
            <div className="flex items-center">
                <div className="flex flex-col items-center self-center">
                    <img src="/assets/logo.png" alt="logo" className="w-[150px] h-[125px]" />
                    <h1 className="font-bold md:text-[20px] lg:text-[20px] text-blue-900">Mindhub Brothers Bank</h1>
                </div>
            </div>
        </header>
            <div className="flex gap-4 ">
                <Link to="/login" className="text-blue-900 lg:text-[20px]"><p className="text-blue-900 lg:text-[20px]">Login</p></Link>
                <p className=' lg:text-[20px]'>or</p>
                <Link to="/signup" className="text-blue-900 lg:text-[20px]"><p className="text-blue-900 lg:text-[20px]">Sign up</p></Link>
            </div>
      <main className="flex-grow my-6 bg-gray-100">
            <div className="h-72 md:h-[24rem] lg:h-[28rem] w-full">
                <Carousel pauseOnHover slideInterval={5000}>
                    <img src="/assets/imageC1.jpg" alt="Slide 1" className='object-cover'/>
                    <img src="/assets/imageC2.jpg" alt="Slide 2" className='object-cover'/>
                    <img src="/assets/imageC3.jpg" alt="Slide 3" className='object-cover'/>
                </Carousel>
            </div>
        <div className="py-8 w-full border bg-gradient-to-b from-violet-500 to-violet-800">
          <h2 className="text-2xl font-bold text-center mb-4 text-white">About Mindhub Brothers Bank</h2>
          <p className="max-w-2xl mx-auto text-center text-white">
            Mindhub Brothers Bank is committed to providing top-notch banking services
            to our customers. We offer a range of services designed to meet your financial needs.
          </p>
        </div>
        <section id="services" className="py-8 bg-white">
          <h2 className="text-2xl font-bold text-center mb-4">Our Services</h2>
          <div className="grid px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-black rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Accounts</h3>
              <p>Manage your bank accounts with ease.</p>
            </div>
            <div className="p-4 border border-black rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Cards</h3>
              <p>Apply for and manage your credit and debit cards.</p>
            </div>
            <div className="p-4 border border-black rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Transactions</h3>
              <p>Keep track of all your transactions effortlessly.</p>
            </div>
            <div className="p-4 border border-black rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Loans</h3>
              <p>Apply for loans and manage your loan details.</p>
            </div>
          </div>
        </section>
        <section className="py-8 px-2 bg-gradient-to-b from-violet-500 to-violet-800">
          <h2 className="text-2xl font-bold text-center mb-4 text-white">Contact Us</h2>
          <p className="max-w-2xl mx-auto text-center text-white">
            Have any questions or concerns? Reach out to us via our contact form or social media channels.
          </p>
          <form className="max-w-lg mx-auto mt-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-2 font-semibold text-white">Name</label>
              <input type="text" id="name" className="p-2 border-2 border-black rounded" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-2 font-semibold text-white">Email</label>
              <input type="email" id="email" className="p-2 border-2 border-black rounded" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="message" className="mb-2 font-semibold text-white">Message</label>
              <textarea id="message" className="p-2 border-2 border-black rounded" rows="4"></textarea>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Send Message</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Landingpage;
