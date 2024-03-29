import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { DashGrid } from '@/components/Dashboard'
import { artistList } from '@/api/data'

export default function DashboardUI({ item, type }: any) {
  const manager = artistList.find((x: any) => x.id === item.managerId);
  return (
    <Link href={`/projects/${item.id}`} >
      <div className='flex flex-col lg:flex-row w-full gap-6 mb-12' >
        <div className={`w-full ${type==='dashboard'?'lg:w-[150px] h-[100px]':'lg:w-[120px] h-[80px]'} lg:h-auto lg:aspect-square rounded-md text-white flex items-center justify-center`} style={{ backgroundColor: item.color }}>{item.title}</div>
        <div className='flex-1 -z-[1]'>
          <div className='flex flex-col h-full'>
            <div className='text-[#495057] mb-3'>
              <p className='mb-3 font-[500] text-black text-[14px]'>{item.title}</p>
              <span className='me-6'>🗓️ {item.period_start} ~ {item.period_end}</span>              
              <span>👩🏻‍💻 {manager?.name} PM</span>
              {type == 'project' ? <span className='ms-6'>👬 참여 아티스트 {item.artists}명</span>:null}
            </div>
            <div className='mt-2 grid grid-cols-2 lg:grid-cols-4 gap-5 h-full text-[#868E96]'>
              <DashGrid type={type} status={item.status} prices={item.prices}  />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}