import Image from "next/image"
import React, { useEffect, useState } from 'react'
import { BaseTemplate } from '@/components/Template'
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import Chip from '@mui/material/Chip'
import Link from "next/link"
import { artistList, projectList, taskList, pipeList, workList }  from '@/api/data'
import { CustomAvatar } from "@/components/Avatar"
import { useRouter } from "next/router"
import { Table } from "@/components/Table"

export default function Artist() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(titleStatus(['홈', '아티스트 현황']));
  }, []);
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const changeTitle = (e:any) => { 
    setTitle(e.target.value);
  }
  const changeProject = (e: any) => {
    setProject(e.target.value);
  }    
  const artists: any = [];
  artistList.map((artist, i) => {      
    const object: any = {};
    const avatar = artistList.find((x: any) => x.id === artist.id)?.name;
    object.avatar = <div className='flex justify-center items-center gap-2'>
      <CustomAvatar size={12} name={avatar}/>
    </div>;
    object.name = artist.name;
    object.title = `${artist.works}/${artist.title}`;
    object.join = artist.join;
    const projects:any = [];
    workList.filter((work) => work.artistId === artist.id).map((work) => {
      const pipe = pipeList.find((pipe) => pipe.id === work.pipeId);
      const task = taskList.find((task) => task.id === pipe?.taskId);
      const project = projectList.find((project) => project.id === task?.projectId);
      projects.push(project?.title);
    });    
    const uniqueArr = projects.filter((element:any, index:number) => {return projects.indexOf(element) === index});
    object.project = uniqueArr.map((item: any, index: number) => (
      <Chip label={item} key={`project-${i + 1}-${index + 1}`} className="bg-[#868E96] text-white text-[11px] h-[30px] pt-1 m-1" />
    ));
    artists.push(object);
  });
  return (
    <BaseTemplate>
      <div className='search'>
      </div>
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
          { title: '프로필 이미지', class: 'w-[150px] xl:w-[15%] hidden xl:table-cell' },
          { title: '이름', class: 'w-[80px] xl:w-[10%]' },
          { title: '분야/직급', class: 'w-[200px] xl:w-[20%] hidden lg:table-cell' },
          { title: '입사일', class: 'w-[150px] xl:w-[15%] hidden lg:table-cell' },
          { title: '참여중인 프로젝트', tdClass:'text-start'},
        ]}
        tbody={artists}
        click={[router.pathname,artistList.map((row)=>row.id)]}
      />
      <div className='text-end mt-8'>
        <Link href='/artists/add'>
          <button className='bg-blue rounded-lg p-3 px-6 text-white'>
            신규 아티스트 추가
          </button>
        </Link>
      </div>      
    </BaseTemplate>
  );
}
