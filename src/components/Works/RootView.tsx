import React, { useState, useEffect } from 'react';
import { Time, Projects, Delete } from '@/components/Works'
import moment from 'moment';
import { taskList } from '@api/data';

export default function RootView(props: any) {
  const [hour, setHour] = useState(props.minute/60);  
  const [task, setTask] = useState(props.title);
  const [data, setData] = useState({});
  const changeHour = (e:number) => { setHour(e*60); }
  const changeTask = (e: any) => {
    setTask(e);
  }
  //const [disabled, setDisabled] = useState(false);
  const submitComponent = (e: any) => { 
    if (!hour) { alert('작업 시간을 선택해주세요'); return false; }
    if (!task.title) { alert('작업 내용을 선택 또는 입력해주세요'); return false; }
    setData({
      minute: hour,
      workingDate: new Date(moment(props.date).format("YYYY-MM-DD")),
      //workingDate: `${moment(props.date).format("YYYY-MM-DD")}T00:00:00.000Z`,
      ...task
    });
  }
  function isEmptyObj(obj:any)  {
    if(obj.constructor === Object && Object.keys(obj).length === 0)  {
      return true;
    }
    return false;
  }
  useEffect(() => {
    isEmptyObj(data) ? null : props.onSubmit(data);    
  }, [data]);
  return (
    <div className='flex flex-row gap-2 lg:gap-3 w-full mb-3'>
      <Time hour={props.data.minute} changeHour={changeHour} disabled={props.data.id ? true : false} />
      <Projects task={props.data.title} changeTask={changeTask} disabled={props.data.id ?true : false} />
      <button
       //disabled={moment(new Date()).format("YYYY-MM-DD") > moment(props.date).format("YYYY-MM-DD") ? true : false}
        onClick={props.data.id ? props.onDelete : submitComponent}
        // className={`w-[50px] h-[36px] text-[12px] ${props.data.id ? moment(new Date()).format("YYYY-MM-DD") > moment(props.date).format("YYYY-MM-DD") ? 'text-g5' : 'text-magenta' : 'text-blue'} flex items-center justify-center`}
        className={`w-[50px] h-[36px] text-[12px] ${props.data.id ? 'text-magenta' : 'text-blue'} flex items-center justify-center`}
      >
        {props.data.id ? <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline me-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg> 삭제
          </> : <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline me-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg> 저장
          </>}
      </button>
    </div>
  )
};