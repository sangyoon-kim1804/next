import React, { useEffect } from 'react'
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import { BaseTemplate } from '@/components/Template'
import { projectList } from '@/api/data'
import { useRouter } from 'next/router'

export default function Modify() {
  const router = useRouter();
  const project = projectList.find((x) => x.id === Number(router.query.id));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(titleStatus(['홈', '프로젝트 현황', `${project?.title} 수정`]));
  }, [project]);
  return (
    <BaseTemplate>
      <div className='w-full max-w-[400px] mx-auto'>
        <div className='info_general flex flex-col gap-3 mb-4'>
          <h1 className='text-center text-[16px] py-4 font-bold'>기본정보</h1>
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='ShotGrid 연동' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='프로젝트명' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='프로젝트 시작일' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='프로젝트 종료예정일' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='프로젝트 예산(원)' />
        </div>
        <div className='info_general flex flex-col gap-3 mb-4'>
          <h1 className='text-center text-[16px] py-4 font-bold'>예산 투입인력 정보</h1>
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='3D 투입인력(시간)' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='ASSET 투입인력(시간)' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='COMP 투입인력(시간)' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='외주 투입인력(시간)' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='외주 투입 예산(원)' />
        </div>
        <button className='w-full bg-blue rounded-lg p-3 px-6 text-white font-bold h-[50px] mb-4'>
          프로젝트 정보 수정하기
        </button>
        <button className='w-full bg-magenta rounded-lg p-3 px-6 text-white font-bold h-[50px]'>
          프로젝트 삭제하기
        </button>
      </div>
    </BaseTemplate>
  );
}