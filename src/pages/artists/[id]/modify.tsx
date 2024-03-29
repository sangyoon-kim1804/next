import React, { useEffect } from 'react'
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import { BaseTemplate } from '@/components/Template'
import { useRouter } from 'next/router'
import { artistList } from '@/api/data'

export default function Modify() {
  const router = useRouter();
  const dispatch = useDispatch();
  const artist = artistList.find((x: any) => x.id === Number(router.query.id));
  useEffect(() => {
    dispatch(titleStatus(['홈', '아티스트 현황', `${artist?.name} 정보 수정`]));
  }, []);
  return (
    <BaseTemplate>      
      <div className='w-full max-w-[400px] mx-auto'>
        <div className='info_general flex flex-col gap-3 mb-4'> 
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='ShotGrid 연동' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='비밀번호' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='비밀번호 재입력' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='직무선택' />
          <input type='text' className='border rounded-lg p-[15px] h-[50px]' placeholder='입사일 선택' />
        </div>
        <button className='w-full bg-blue rounded-lg p-3 px-6 text-white font-bold h-[50px] mb-4'>
          아티스트 정보 수정하기
        </button>
        <button className='w-full bg-magenta rounded-lg p-3 px-6 text-white font-bold h-[50px]'>
          아티스트 정보 삭제하기
        </button>        
      </div>
    </BaseTemplate>
  );
}