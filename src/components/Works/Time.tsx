import React, { useState, useRef, useEffect } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Time({ hour, changeHour, disabled }:any) {
  const [time, setTime] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const timeRef = useRef<any>();
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    var time = parseInt(event.currentTarget.innerText.replace("시간","")) || 0;
    setTime(time);
    setAnchorEl(null);
    changeHour(time);
  };  
  useEffect(() => {
    //console.log(timeRef.current.clientWidth);
    setWidth(timeRef.current.clientWidth);
  }, []);
  useEffect(() => {
    setTime(hour/60);
  },[hour])
  return (
    <div className='w-[80px] relative select-time' ref={timeRef}>
      <button
        className='border border-blue text-blue text-[12px] rounded-full py-3 px-2 h-[36px] flex items-center w-full'
        onClick={handleClick}
        disabled={disabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>        
        {time==0?'선택':`${time}시간`}
      </button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className=''
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}        
        MenuListProps={{
          className: `
            css-MuiMenu-list bg-white border border-blue rounded-2xl overflow-auto text-blue text-[12px]            
          `,
          sx: {
            width: width 
          }
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <MenuItem key={i} onClick={handleClose}>
            {i + 1}시간
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}