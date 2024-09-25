// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import img from './stock-rotation (2).png'
// import './navbar.css';

// const Navbar = () => {
//     const [menuActive, setMenuActive] = useState(false);

//     const toggleMenu = () => {
//         setMenuActive(!menuActive);
//     };

//     return (
//         <div>
//     <div class="flex min-h-[70px] items-center justify-between bg-[#0a101e] p-4 shadow-xl">
//   <div class="icon">
//     <i class="ri-pie-chart-2-fill text-2xl text-indigo-400 transition duration-300 hover:text-[#a5b4ee]"></i>
//   </div>
//   <div class="links flex items-center justify-center gap-3">
//     <a href="/" class="hidden text-ml text-white transition duration-500 hover:text-[#a5b4ee] sm:block">Home</a>
//     <a href="/per" class="hidden text-ml text-white transition duration-500 hover:text-[#a5b4ee] sm:block">Product</a>
//     <a href="#" class="hidden text-ml text-white transition duration-500 hover:text-[#a5b4ee] sm:block">Marketing</a>
//     <a href="#" class="hidden text-ml text-white transition duration-500 hover:text-[#a5b4ee] sm:block">About Us</a>
//   </div>
//   <div class="login">
//     <a href="#" class="text-lg text-white transition duration-300 hover:text-[#a5b4ee]">Login</a>
//   </div>
//  </div>

//  <div class="n transition duration-500 sm:hidden">
//   <div class="nav flex items-center justify-center">
//     <div class="mob-nav flex min-h-[70px] items-center justify-center gap-6 rounded-2xl bg-[#0a101e] shadow-xl">
//       <div class="tab1">
//         <a href="#" class="text-sm text-white transition duration-300 hover:text-[#a5b4ee]">Home</a>
//       </div>
//       <div class="tab2">
//         <a href="#" class="text-sm text-white transition duration-300 hover:text-[#a5b4ee]">Product</a>
//       </div>
//       <div class="tab3">
//         <a href="#" class="text-sm text-white transition duration-300 hover:text-[#a5b4ee]">Marketing</a>
//       </div>
//       <div class="tab4">
//         <a href="#" class="text-sm text-white transition duration-300 hover:text-[#a5b4ee]">About</a>
//       </div>
//     </div>
//   </div>
//  </div>
//  </div>
//     );
// };

// export default Navbar;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import './navbar.css';

const solutions = [
  {
    name: 'Performance',
    description: 'Product Performac',
    href: '/per',
    icon: "ri-percent-line text-2xl pt-2", // replace with your own icon component
  },
  {
    name: 'Bundle',
    description: 'Bundle your products',
    href: '/bundle',
    icon: "ri-book-shelf-fill text-2xl pt-2", // replace with your own icon component
  },
  {
    name: 'Dynamic price',
    description: 'Set dynamic price for your products',

    href: '/dprice',
    icon: "ri-wallet-3-fill text-2xl pt-2", // replace with your own icon component
  },
  {
    name: 'PredictSales',
    description: 'Predict your sales',
    href: '/Predictsales',
    icon: "ri-funds-box-fill text-2xl pt-2", // replace with your own icon component
  },
  {
    name: 'Charts',
    description: 'Insights of your sales',
    href: '/chart',
    icon: "ri-funds-box-fill text-2xl pt-2", // replace with your own icon component
  },
];


const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div>
      <div className="flex min-h-[70px] items-center justify-between bg-[#0a101e] p-4 shadow-xl">
        <div className="icon">
          <i className="ri-pie-chart-2-fill text-2xl text-indigo-400 transition duration-300 hover:text-[#a5b4ee]"></i>
        </div>
        <div className="links flex items-center justify-center gap-5">
          <a href="/" className="hidden text-ml text-white transition duration-500 hover:text-[#a5b4ee] sm:block">
            Home
          </a>
          {/* Popover for Product */}
          <Popover className="relative hidden sm:block ">
            <PopoverButton className="inline-flex items-center gap-x-1 text-ml text-white transition duration-500 hover:text-[#a5b4ee]">
              <span>Product</span>
              {/* <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-white" /> */}
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-[#101a30] text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {solutions.map((item) => (
                    <div key={item.name} className="group relative flex gap-x-6 text-white rounded-lg p-4 hover:bg-blue-600">
                      <i class={item.icon}></i>
                      <div>
                        <a href={item.href} className="font-semibold text-white">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-white">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                      {item.name}
                    </a>
                  ))}
                </div> */}
              </div>
            </PopoverPanel>
          </Popover>

          <a href="/con" className="hidden text-ml text-white transition duration-500 hover:text-[#a5b4ee] sm:block">
          Concept
          </a>
          <a href="/aboutus" className="hidden text-ml text-white transition duration-500 hover:text-[#a5b4ee] sm:block">
            About Us
          </a>
        </div>
        <div className="login">
          <a href="/login" className="text-lg text-white transition duration-300 hover:text-[#a5b4ee]">
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`n transition duration-500 sm:hidden ${menuActive ? 'block' : 'hidden'}`}>
        <div className="nav flex items-center justify-center">
          <div className="mob-nav flex min-h-[70px] items-center justify-center gap-6 rounded-2xl bg-[#0a101e] shadow-xl">
            <div className="tab1">
              <a href="#" className="text-sm text-white transition duration-300 hover:text-[#a5b4ee]">
                Home
              </a>
            </div>
            <div className="tab2">
              <a href="#" className="text-sm text-white transition duration-300 hover:text-[#a5b4ee]">
                Product
              </a>
            </div>
            <div className="tab3">
              <a href="#" className="text-sm text-white transition duration-300 hover:text-[#a5b4ee]">
                Marketing
              </a>
            </div>
            <div className="tab4">
              <a href="#" className="text-sm text-white transition duration-300 hover:text-[#a5b4ee]">
                About
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
