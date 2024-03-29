import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link'

const BackDrop = ({open}:any) => {
  return (
    <div className={`fixed w-full z-[1] h-full bg-black/50 backdrop-blur-sm md:hidden ${open?'block':'hidden'}`} style={{ transition: 'all .5s ease' }} />
  );
};

export default BackDrop;
