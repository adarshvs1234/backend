
import React from 'react';

import Navbar from './Navbar';


const StickyLayout = ({ children }) => {
  return (
    <div className="flex w-86">
     
    <Navbar/>

     
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default StickyLayout;
