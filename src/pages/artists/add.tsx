import React, { useEffect } from 'react'
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import { BaseTemplate } from '@/components/Template';

export default function Add() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(titleStatus(['홈', '아티스트 현황', '아티스트 추가']));
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
        <button className='w-full bg-blue rounded-lg p-3 px-6 text-white font-bold text-[16px]'>
          아티스트 추가하기
        </button>
      </div>
    </BaseTemplate>
  );
}