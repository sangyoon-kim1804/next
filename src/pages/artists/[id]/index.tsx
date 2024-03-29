import Image from "next/image"
import React, { useState, useRef, useEffect } from 'react'
import { BaseTemplate } from '@/components/Template'
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { CustomAvatar } from '@/components/Avatar'
// import { Information } from '@/components/pages/projects/detail/information'
import { Information } from '@/components/pages/projects/';
import moment from 'moment'
import { artistList, workList, pipeList, pipeCode, taskList, projectList } from '@/api/data'
import { useRouter } from "next/router"
import { Table } from "@/components/Table"
import Link from "next/link"

function CustomTabPanel(props: any) {
  const { children, value, index } = props;
  return (
    <>
      {value === index && (
        <div>{children}</div>
      )}
    </>
  );
}
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ProjectDetail() {
  const router = useRouter();
  const dispatch = useDispatch();  
  const [value, setValue] = React.useState(0);
  const [change, onChange] = useState<Value>(new Date());
  const works: any = [];
  workList.filter((x) => x.artistId === Number(router.query.id)).map((work) => {
    const workObject: any = {};
    workObject.hour = work.hours;
    workObject.date = work.date;
    const pipe = pipeList.find((x) => x.id === work.pipeId);
    workObject.work = pipeCode.find((x)=> x.id === pipe?.pipeCode)?.title;
    const task = taskList.find((x) => x.id === pipe?.taskId);
    workObject.task = task?.title;    
    const project = projectList.find((x) => x.id === task?.projectId);
    workObject.title = project?.title;
    workObject.color = project?.color;
    works.push(workObject);
  });
  const result = works.reduce((acc: any, curr: any) => {  // [1]    
    const { date } = curr;                // [2]
    if (acc[date]) acc[date].push(curr);  // [3]
    else acc[date] = [curr];              // [4]
    return acc;                           // [5]
  }, {});
  const workArray: any = [];
  Object.entries(result).map((object) => {
    const workObject: any = {};
    workObject.date = object[0];
    workObject.event = object[1];
    workArray.push(workObject);
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const artistInfo: any = artistList.find((x: any) => x.id === Number(router.query.id));
  useEffect(() => {
    dispatch(titleStatus(['홈', '아티스트 현황', artistInfo?.name]));    
  }, [artistInfo]);
  return (
    <BaseTemplate>
      <div className='profile text-center'>
        <div className='inline-block'>
          <CustomAvatar size={32} name={artistInfo?.name} />        
          </div>
        <p className='py-6'>{ artistInfo?.name }</p>
      </div>
      <div className={`relative after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-black/5 after:left-0 after:bottom-0`}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab className='text-[14px]' label="기본정보"/>
          <Tab className='text-[14px]' label="작업현황"/>
          <Tab className='text-[14px]' label="로그"/>
        </Tabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <Information
          data={[
            {
              '직급': artistInfo?.title,
              '직무': artistInfo?.works,
              '입사일': artistInfo?.join,
              '이메일 주소': artistInfo?.email,
              '최종 접속 시간': artistInfo?.lastLogin,
            },
          ]}
        />
        <Link href={`/artists/${router.query.id}/modify`}>
          <button className='bg-blue text-white text-[12px] px-6 py-3 rounded-lg mt-6'>아티스트 정보 수정</button>
        </Link>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} >
        <div className='py-6 artist-calendar'>
          <Calendar
            locale="ko"
            calendarType='iso8601'
            prevLabel={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            }
            nextLabel={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            }
            formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
            tileContent={({ date, view }) => {            
              return (
                <div className='w-full'>
                  {workArray.find((x:any) => moment(x.date).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD"))?.event.map((item:any, i:number) => (
                  <div className={`mt-2 w-full p-2 rounded-lg text-white text-start`} key={`${date.getDate()}-${i+1}`} style={{ background: item.color }}>
                    <p className='text-[10px] md:text-[12px] font-bold truncate'>{item.title}</p>
                    <p className='text-[10px] mt-1 truncate hidden md:block'>{`${item.task} - ${item.work}`}</p>
                  </div>
                  ))}
                </div>
              );
            }}
          />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* <Table
          thead={[
            { title: '시간', class: 'w-[120px] xl:w-[180px]' },
            { title: '구분', class: 'hidden lg:table-cell w-[180px]' },
            { title: '참여중인 프로젝트', tdClass:'text-start truncate'},
          ]}
          tbody={
            logs
          }
        /> */}
      </CustomTabPanel>
    </BaseTemplate>
  );
}
