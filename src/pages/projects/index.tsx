import React, { useState, useEffect } from 'react'
import { BaseTemplate } from '@/components/Template'
import { DashInfo } from '@/components/Dashboard'
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import { projectList } from '@/api/data'
import Link from 'next/link'

export default function Project(props:any) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(titleStatus(['홈','프로젝트 현황']));
  }, []);
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const changeTitle = (e:any) => { 
    setTitle(e.target.value);
  }
  const changeProject = (e: any) => {
    setProject(e.target.value);
  }  
  return (
    <BaseTemplate>
      <h1 className='text-[15px] font-[500] mb-8'>프로젝트 현황</h1>
      <div className='search flex flex-col md:flex-row justify-end gap-3 mb-6 w-full'>
        <div className='flex gap-3 justify-end flex-1'>
          <select className={`w-1/3 xl:w-1/4 2xl:w-1/6 border rounded-lg p-3 ${title==''?'text-[#c8c8c8]':'text-black'}`} value={title} onChange={changeTitle}>
            <option value=''>프로젝트 상태</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <select className={`w-2/3 xl:w-1/4 2xl:w-1/6 border rounded-lg p-3 ${project==''?'text-[#c8c8c8]':'text-black'}`} value={project} onChange={changeProject}>
            <option>전체 기간</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
        </div>
        <div className='flex gap-3 justify-end lg:w-[400px]'>
          <input className='flex-1 border rounded-lg p-3 px-6' placeholder='검색어를 입력하세요.' />
          <button className='w-[70px] bg-blue rounded-lg p-3 px-6 text-white'>
            검색
          </button>
        </div>
      </div>      
      <div className='flex flex-col w-full 2xl:w-5/6 3xl:w-4/6'>
        {projectList.map((item, i) => (
          <DashInfo item={item} type={'project'} key={i}/>
        ))}
      </div>
      <div className='text-end'>
        <Link href='/projects/add'>
          <button className='bg-blue rounded-lg p-3 px-6 text-white'>
            신규 프로젝트 추가
          </button>
        </Link>
      </div>
    </BaseTemplate>
  )
}
