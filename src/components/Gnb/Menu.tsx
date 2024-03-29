import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Menu = ({ open }: any) => {
  const router = useRouter();
  const menus = [
    { image: 'gear', link: 'mypage', title: '비밀번호 변경', type: true },
    { image: 'logout', link: 'logout', title: '로그아웃', type: true },
    //{ image: 'dash', link: 'dashboard', title: '대시보드', type: false },
    //{ image: 'calendar', link: 'projects', title: '프로젝트 현황', type: false },
    //{ image: 'artist', link: 'artists', title: '아티스트 현황', type: false },
    { image: 'edit', link: 'works', title: '작업내역 입력', type: false },
    /*{ image: 'alert', link: 'notifications', title: '알림내역', type: false },*/
  ];  
  return (
    <ul className={`w-[90%] md:w-full m-0 p-0 absolute h-[calc(100vh-60px)] ${open?'left-0':'-left-[100%]'} bg-white md:left-0`} style={{ transition: 'all .5s ease' }}>
      {menus.map((item, index) => (
        <li className={`border-t flex items-center h-[50px] p-3 menu
          ${item.type ? 'text-white bg-[#495057] hidden md:flex' : router.pathname.split('/')[1] == item.link ? 'font-[400]' : 'text-g4'}
        `} key={`menu-${index + 1}`}>
        <Link href={`/${item.link}`} className='w-full block relative top-[2px]'>
          <img src={`/images/icon/${item.image}${item.type?'_active':router.pathname.split('/')[1]==item.link?'_on':''}.png`} className='w-9 h-9 inline me-3' />
          {item.title}
        </Link>
      </li>
      ))}
    </ul>
  );
};

export default Menu;