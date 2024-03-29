import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { CustomAvatar } from '@components/Avatar';
import { loginUser } from "@store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from '@mui/material';

const User = ({ isOpen }: any) => { 
  const user = useSelector((state: any) => state.user);
  const [menu, setMenu] = useState(false);  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openEl = Boolean(anchorEl);
  const setMenuChange = () => { 
    setMenu(!menu);
    isOpen(!menu);
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width:768px) and (max-width:1023px)");
  const isMobile = useMediaQuery("(max-width:767px)");
  return (
    <div className='user flex-1 md:w-full flex items-center justify-end flex-row md:flex-col  md:pb-6'>
      <div className='me-3 block md:hidden'>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={setMenuChange} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="cursor-pointer w-8 h-8">
          {menu ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />                    
          ): (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}                  
        </svg>
      </div>
      <button className='me-4 md:me-0'
        id="basic-button"
        aria-controls={openEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openEl ? 'true' : undefined}
        onClick={handleClick}
        disabled={isMobile?false:true}
      >
        <CustomAvatar name={user.name} size={isMobile?10:18} />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openEl}
        onClose={handleClose}
        // MenuListProps={{
        //   'aria-labelledby': 'basic-button',
        // }}
        MenuListProps={{
          className: `bg-white border py-0 relative md:hidden`,
          sx: { padding: '0 !important' }
        }}        
      >
        <MenuItem className='w-[150px]' style={{ borderBottom: '1px solid #eee' }} onClick={handleClose}>
          <Link href='/mypage'>
            <img src={`/images/icon/gear.png`} className='w-9 h-9 inline me-2' /> 비밀번호 변경
          </Link>
        </MenuItem>
        <MenuItem className='w-[150px]' onClick={handleClose}>
          <Link href='/logout'>
            <img src={`/images/icon/logout.png`} className='w-9 h-9 inline me-2' /> 로그아웃
          </Link>
        </MenuItem>
      </Menu>
      <p className='hidden md:block mt-6 text-[12px]'>{user.name}</p>
    </div>
  );
};

export default User;