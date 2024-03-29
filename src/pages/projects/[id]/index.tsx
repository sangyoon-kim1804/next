import Image from "next/image"
import React, { useState, useRef, useEffect } from 'react'
import { BaseTemplate } from '@/components/Template'
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { CustomAvatar } from '@/components/Avatar'
import { useRouter } from "next/router"
import { Progress, Information } from '@/components/pages/projects'
import { projectList, projectLogList, artistList, taskList, pipeList, pipeCode, statusCode, workList }  from '@/api/data'
import { Table } from '@/components/Table'
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
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function ProjectDetail() {
  const router = useRouter();
  const dispatch = useDispatch();  
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };  
  const dateFormatKr = (n:any) => {
    return `${n?.split("-")[0]}년 ${n?.split("-")[1].replace(/(^0+)/, "")}월 ${n?.split("-")[2].replace(/(^0+)/, "")}일`;
  } 
  const tasks: any = [];
  taskList.filter((x: any) => x.projectId === Number(router.query.id)).map((task) => {
    const taskObject: any = {};
    taskObject.task = `TASK ${task?.title}`;
    taskObject.stat = statusCode.find((x: any) => x.id === task?.statusCode)?.title;
    const pipes: any = [];
    pipeList.filter((x: any) => x.taskId === task.id).map((pipe) => {
      const pipeObject: any = {};
      const work = workList.filter((x: any) => x.pipeId === pipe.id);
      pipeObject.title = pipeCode.find((x: any) => x.id === pipe.pipeCode)?.title;
      pipeObject.stat = statusCode.find((x) => x.id === pipe.statusCode)?.title;
      const result = work.reduce((acc: any, curr: any) => {  // [1]    
        const { artistId } = curr;                // [2]
        if (acc[artistId]) acc[artistId].push(curr);  // [3]
        else acc[artistId] = [curr];              // [4]
        return acc;                           // [5]
      }, {});
      const workObject: any = {};
      Object.entries(result).map((object:any) => {        
        workObject.artist = artistList.find((x) => x.id === Number(object[0]))?.name;
        workObject.hour = object[1].reduce((prev:any , current:any ) => prev + current.hours, 0);
        workObject.minObjArr = object[1].reduce( (prev:any, value:any) => {
          return prev.date <= value.date ? prev : value
        });
        workObject.maxObjArr = object[1].reduce( (prev:any, value:any) => {
          return prev.date >= value.date ? prev : value
        });
      });      
      pipeObject.artist = workObject.artist;
      pipeObject.hour = workObject.hour;
      pipeObject.sdate = workObject.minObjArr?.date;
      pipeObject.edate = workObject.maxObjArr?.date;
      pipes.push(pipeObject);
    });
    taskObject.pipe = pipes;
    tasks.push(taskObject);
  });
  console.log(tasks);
  const project = projectList.find((x: any) => x.id === Number(router.query.id));
  const manager = artistList.find((x: any) => x.id === project?.managerId);
  const logs: any = [];
  projectLogList.filter((x:any) => x.projectId === Number(router.query.id)).map((log: any, i: number) => {
    const object: any = {};
    object.time = log.time;
    const avatar = artistList.find((x: any) => x.id === log.artistId)?.name;
    object.name = <div className='flex justify-center items-center gap-2'>
      <CustomAvatar size={8} name={avatar} key={i} /><span className='inline-block'>{avatar}</span>
    </div>;
    object.contents = log.contents;
    logs.push(object);
  });  
  useEffect(() => {    
    dispatch(titleStatus(['홈', '프로젝트 현황', project?.title]));
  }, [project]);  
  return (
    <BaseTemplate>
      <div className='profile text-center'>
        <div className={`w-[150px] h-[150px] flex items-center justify-center text-white bg-[#${project?.color}] mx-auto rounded-full`} style={{ backgroundColor: project?.color }}>
          {project?.title}
        </div>
        <p className='py-6 font-[500] text-[14px]'>{project?.title}</p>
        <p className='mb-6'>🗓️ {dateFormatKr(project?.period_start)} ~ {dateFormatKr(project?.period_end)}  👩🏻‍💻 {manager?.name} PM 👬 참여 아티스트 {project?.artistsId.length}명</p>
      </div>      
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className={`relative after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-black/5 after:left-0 after:bottom-0`}>
        <Tab className='text-[14px]' label="진행현황" {...a11yProps(0)} />
        <Tab className='text-[14px]' label="기본정보" {...a11yProps(1)} />
        <Tab className='text-[14px]' label="로그" {...a11yProps(2)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Progress tasks={tasks} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Information data={[
          {
            '진행 기간': <>{dateFormatKr(project?.period_start)} ~ {dateFormatKr(project?.period_end)}</>,
            '프로젝트 매니저': <div className='flex items-center' >
              <CustomAvatar size={10} name={manager?.name} />
              <span className='ms-2'>{manager?.name}</span>
            </div>,
            '프로젝트 예산': `${project?.price.toLocaleString()}원`,
            '참여 아티스트': project?.artistsId.map((item: any, index: number) => {
              const worker = artistList.find((x:any) => x.id === item)
              return (
                <div className='flex items-center' key={index}>
                  <CustomAvatar size={10} name={worker?.name} />
                  <span className='ms-2'>{worker?.name}</span>
                </div>
              )
            })
          },          
        ]} />
        <Link href={`/projects/${router.query.id}/modify`}>
          <button className='bg-blue text-white text-[12px] px-6 py-3 rounded-lg mt-6'>프로젝트 정보 수정</button>
        </Link>
        <button className='bg-magenta text-white text-[12px] px-6 py-3 rounded-lg mt-6 ms-4'>프로젝트 완료처리</button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Table
          thead={[
            { title: '시간', class: 'w-[200px] hidden lg:table-cell' },
            { title: '작업자', class: 'w-[120px] md:w-[200px]' },
            { title: '내용', class: 'w-full', tdClass: 'text-start truncate'},
          ]}
          tbody={logs}
        />
      </CustomTabPanel>
    </BaseTemplate>
  );
}