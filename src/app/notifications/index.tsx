import Image from "next/image"
import React, { useState, useRef, useEffect } from 'react'
import { BaseTemplate } from '@/components/Template'
//import { RootView } from "@/components/ui/Scheduler";
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from "next/router"
import { Table } from "@/components/Table"

export default function Notifications() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const changeTitle = (e:any) => { 
    setTitle(e.target.value);
  }
  const changeProject = (e: any) => {
    setProject(e.target.value);
  }

  const notification = [
    {
      time: '30분 전',
      type: 'danger',
      contents: '별들에게 물어봐 프로젝트의 예상 투입 인력이 초과되었습니다.',
      confirm: false
    },
    {
      time: '2시간 전',
      type: 'danger',
      contents: '리얼리티 바이츠 프로젝트의 예상 투입 인력이 초과되었습니다.',
      confirm: true
    },
    {
      time: '2024.02.18 오후 2시 30분',
      type: 'alert',
      contents: '별들에게 물어봐 프로젝트의 총 예산이 변경되었습니다.',
      confirm: true
    },
  ];  
  const notifications: any = [];
  /*notification.map((noti, i) => {      
    const object: any = {};
    object.time = noti.time;
    object.type = noti.type=='danger'?<span className='text-magenta font-bold'>🚨 경고</span>:<b>알림</b>;
    object.contents = noti.contents;
    object.confirm = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>;
    notifications.push(object);      
  });  */
  useEffect(() => {
    dispatch(titleStatus(['홈', '알림내역']));  
  }, []);
  return (
    <BaseTemplate>
      <div className='search flex flex-col md:flex-row justify-end gap-3 mb-6 w-full'>
        <div className='flex gap-3 justify-end flex-1'>
          <select className={`w-1/3 xl:w-1/4 2xl:w-1/6 border rounded-lg p-3 ${title==''?'text-[#c8c8c8]':'text-black'}`} value={title} onChange={changeTitle}>
            <option value=''>직무분야</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <select className={`w-2/3 xl:w-1/4 2xl:w-1/6 border rounded-lg p-3 ${project==''?'text-[#c8c8c8]':'text-black'}`} value={project} onChange={changeProject}>
            <option>참여 프로젝트</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
        </div>
        <div className='flex gap-3 justify-end lg:w-[400px]'>
          <input className='flex-1 border rounded-lg p-3 px-6' placeholder='검색어를 입력하세요.' />
          <button className='w-[100px] bg-blue rounded-lg p-3 px-6 text-white'>
            검색
          </button>
        </div>
      </div>
      <Table
        thead={[
          { title: '알림시간', class: 'w-[200px] hidden lg:table-cell' },
          { title: '알림타입', class: 'w-[80px] md:w-[120px]' },
          { title: '알림내용', class: '', tdClass: 'text-start truncate' },
          { title: '확인여부', class: 'w-[80px] md:w-[120px] hidden sm:table-cell', tdClass: 'text-start truncate'},
        ]}
        tbody={notifications}
      />
    </BaseTemplate>
  );
}
