import React, { useEffect, useState } from 'react'

export default function Grid({ status, prices, type }: any) {
  return (
    <>
      {(type === 'dashboard' ? status : prices).map((stats: any, index: number) =>
        <div key={index} className={`
          flex flex-col justify-between items-start ${type === 'dashboard' ? 'py-3 px-6' : ''} relative 
          ${type === 'dashboard' && stats.value[0] > stats.value[1] ? 'bg-pink-light rounded-md text-magenta' : ''}
          ${type === 'project' && index < 2 ? stats.value > 100 ? 'text-magenta' : 'text-black' : 'text-black'}
          after:content-[''] after:absolute after:-right-3 after:top-0
          ${index == 3 ? 'after:hidden' : ''}
          ${index == 1 ? 'after:hidden lg:after:block' : ''}
          after:w-[1px] after:h-full after:bg-black/5
          ${type === 'project' ? 'after:hidden lg:after:hidden' : ''}
        `} >
          <p className='font-[500]'>
            {stats.value[0] > stats.value[1] && type === 'dashboard' ? '🚨 ' : ''}
            {type === 'project' && index < 2 ? stats.value > 100 ? '🚨 ' : '' : ''}
            {
              type === 'dashboard' ?
                index == 0 ? '프로젝트 경과' : index == 1 ? '완료된 프로젝트' : index == 2 ? '인력 투입 현황' : '외주 용역 투입 현황'
                :
                index == 0 ? '작업진행율' : index == 1 ? '인력 투입 현황' : index == 2 ? '총 견적비용' : '총 외주비용'
            }
          </p>
          <p className='cabin'>
            {type == 'dashboard' ? <>
              <span className={`${stats.value[0] > stats.value[1] ? 'text-magenta' : 'text-black'} text-[20px] 2xl:text-[30px] font-[700]`}>
                {Math.floor(stats.value[0] / stats.value[1] * 100)}
              </span>
              <span className={`${stats.value[0] > stats.value[1] ? 'text-magenta' : 'text-black'} text-[12px] 3xl:text-[18px] me-3`}>%</span>
              <span className='inline text-[10px] md:text-[12px]'>({stats.value[0].toLocaleString()}/{stats.value[1].toLocaleString()})</span>
            </> : <>
              <span className={`text-[14px] 2xl:text-[18px] font-[500] `}>
                {stats.value.toLocaleString()}
              </span>
              <span className={`text-[12px] 3xl:text-[16px] me-3`}>{index > 1 ? '원' : '%'}</span>
            </>}
          </p>
        </div>)}
    </>
  );
}