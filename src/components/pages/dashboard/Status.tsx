import React, { useEffect, useState } from 'react'

export default function Status({ data }: any) {
  return (
    <>
      {data.map((stats: any, index: number) =>
        <div key={index} className={`
          flex flex-col justify-between items-start py-3 px-6 relative 
          ${stats.value[0] > stats.value[1] ? 'bg-pink-light rounded-md text-magenta' : ''}          
          after:content-[''] after:absolute after:-right-3 after:top-0
          ${index == 3 ? 'after:hidden' : ''}
          ${index == 1 ? 'after:hidden lg:after:block' : ''}
          after:w-[1px] after:h-full after:bg-black/5
        `} >
          <p className='font-[500]'>
            {stats.value[0] > stats.value[1] ? '🚨 ' : ''}
            {index == 0 ? '프로젝트 경과' : index == 1 ? '완료된 프로젝트' : index == 2 ? '인력 투입 현황' : '외주 용역 투입 현황'}
          </p>
          <p className='cabin'>
            <span className={`${stats.value[0] > stats.value[1] ? 'text-magenta' : 'text-black'} text-[20px] 2xl:text-[30px] font-[700]`}>
              {Math.floor(stats.value[0] / stats.value[1] * 100)}
            </span>
            <span className={`${stats.value[0] > stats.value[1] ? 'text-magenta' : 'text-black'} text-[12px] 3xl:text-[18px] me-3`}>%</span>
            <span className='inline text-[10px] md:text-[12px]'>({stats.value[0].toLocaleString()}/{stats.value[1].toLocaleString()})</span>              
          </p>
        </div>)}
    </>
  )
}
