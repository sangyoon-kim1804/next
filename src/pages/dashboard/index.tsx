import React, { useState, useEffect } from 'react'
import { BaseTemplate } from '@/components/Template'
import { Information, Status } from '@/components/pages/dashboard'
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import { projectList } from '@/api/data'

export default function Dashboard(props:any) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(titleStatus(['대시보드']));
  }, []);
  return (
    <BaseTemplate>
      <h1 className='text-[15px] font-[500] mb-8'>프로젝트 현황</h1>      
      <div className='flex flex-col w-full 2xl:w-5/6'>
        {projectList.map((item, i) => (
          <Information item={item} type={'dashboard'} key={`info-${i}`}>
            <Status data={ item.status }/>
          </Information>
        ))}        
      </div>
    </BaseTemplate>
  )
}
