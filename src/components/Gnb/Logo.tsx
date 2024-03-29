import React, { useState, useEffect } from 'react';
import Link from 'next/link'

const Logo = () => {
  return (
    <div className='logo w-[140px] md:w-full p-6 md:p-12 flex items-center'>
      <Link href='/dashboard'>
        <img src='/images/logo/vfx_logo2.png' className='w-full h-auto' />
      </Link>
    </div>
  );
};

export default Logo;