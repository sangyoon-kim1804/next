import React, { useState, useEffect } from 'react';
import { BackDrop } from '../BackDrop';
import { Logo, User, Menu } from './index'

const Gnb = () => {
  const [open, setOpen] = useState(false);
  const isOpen = (x:any) => { 
    setOpen(x);
  };
  return (
    <>
      <BackDrop open={ open } />
      <div className={`w-full md:w-[220px] md:border-r`}>
        <div className='fixed left-0 top-0 border-b md:border-r bg-white z-[1]' style={{ width: 'inherit' }}>
          <div className='flex w-full flex-row md:flex-col min-h-[60px]'>
            <Logo />
            <User isOpen={isOpen} />
          </div>
          <Menu open={open} />
        </div>
      </div>
    </>
  );
};

export default Gnb;
