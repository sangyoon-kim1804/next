import React, { useEffect, useState } from 'react'

export default function BreadCrumb({ label }: any) {
  const [title, setTitle] = useState(['']);
  useEffect(() => {
    setTitle(label.title);
  }, [label]);
  return (
    <div className='bread-crumb border-b p-7 h-[60px] text-[10px] text-[#adb5bd] flex flex-row items-center md:mt-0'>
      {title.map((item:any, index:number)=>(
        index+1 != title.length ? 
          <div className='flex items-center' key={index+1}>
            <p className='text-[12px]'>{ item }</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#000" className="w-4 h-4 inline mx-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div> : <h1 key={index+1} className='inline text-black text-[18px] font-bold'>{ item }</h1>
      ))}
    </div>
  );
}