import React, { useState, useEffect } from "react"
import { BaseTemplate } from "@/components/Template"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { RootView } from '@/components/Works'
import { workList, pipeList, taskList, projectList, pipeCode } from "@/api/data"
import { setConstantValue } from "typescript"
import axios from 'axios'
import { count } from "console"
import { api } from "@api/module";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";

export default function Works() {
  const dispatch = useDispatch();  
  const user = useSelector(selectUser);
  const [value, onChange] = useState<any>(new Date());
  const [viewDate, setViewDate] = useState<any>(new Date());
  const [events, setEvents] = useState<any>([]);
  const [workDate, setWorkDate] = useState<any>([]);  
  const workByDateList = () => {
    api.post({
      url: '/work-history/workByDate', body: {
        startDate: `${moment(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)).format("YYYY-MM-DD")}T00:00:00Z`,
        endDate: `${moment(new Date(viewDate.getFullYear(), viewDate.getMonth() + 2, 0)).format("YYYY-MM-DD")}T23:59:59Z`,
        userId: user.id,
      }, options: {withAuthorization: true}
    }).then((response) => { 
      var dateArray = [];
      for (var i = 0; i < response.data.data.length; i++) {
        dateArray.push(response.data.data[i].workingDateYmd);
      }
      setWorkDate(dateArray);
    }).catch((e) => {
      console.log(e);
    });
  }
  const retrieveList = () => {
    api.post({
      url: '/work-history/retrieve', body: {
        startDate: `${moment(value).format("YYYY-MM-DD")}T00:00:00Z`,
        endDate: `${moment(value).format("YYYY-MM-DD")}T23:59:59Z`,
        userId: user.id,
      }, options: {withAuthorization: true}
    }).then((response) => {
      setEvents(response.data.data);
    }).catch((e) => {
      console.log(e);
    });
  }
  const addComponent = () => {
    if (events) { 
      setEvents([...events, {title: '', minute: 0, task: '', type: 'insert'}])
    } else {
      setEvents([{title: '', minute: 0, task: '', type: 'insert'}]);  
    }
  };
  const deleteComponent = (n:number) => {
    const updatedEvents = events.filter((item: any, index: number) => index !== n);
    // setEvents(updatedEvents);
    api.delete({
      url: `/work-history/${events[n].id}`, body: {
        startDate: `${moment(value).format("YYYY-MM-DD")}T00:00:00Z`,
        endDate: `${moment(value).format("YYYY-MM-DD")}T23:59:59Z`,
        userId: user.id,
      }, options: {withAuthorization: true}
    }).then((response) => {
      workByDateList();
      retrieveList();
    }).catch((e) => {
      console.log(e);
    });
  };
  const submitComponent = (data: any) => {
    console.log(data);
    api.post({
      url: '/work-history/create', body: data, options: {withAuthorization: true}
    }).then((response) => {
      workByDateList();
      retrieveList();
    }).catch((e) => {
      console.log(e);
    });
  }
  const dateFormatKr = (n:string) => {
    return `${n.split("-")[0]}년 ${n.split("-")[1].replace(/(^0+)/, "")}월 ${n.split("-")[2].replace(/(^0+)/, "")}일`;
  }
  const dateWeekKr = (n: number) => {
    var week:string = '';
    switch (n) {
      case 1: week = '월'; break;
      case 2: week = '화'; break;
      case 3: week = '수'; break;
      case 4: week = '목'; break;
      case 5: week = '금'; break;
      case 6: week = '토'; break;
      case 0: week = '일'; break;
    }
    return `${week}요일`;
  }
  useEffect(() => {
    dispatch(titleStatus(['홈', '작업내역 입력']));
    workByDateList();
  }, []);
  useEffect(() => {
    retrieveList();
    workByDateList();
  }, [value, viewDate]);
  /*const activeChange = (n: Date) => { 
    SetViewDate(n);
  }*/
  return (
    <BaseTemplate>
      <div className='max-w-[500px] m-auto work-calendar'>
        <Calendar value={value}
          locale='ko'
          onChange={onChange}
          // onActiveStartDateChange={({ action, activeStartDate, value, view }) => console.log(activeStartDate)}
          onActiveStartDateChange={({ action, activeStartDate, value, view }) => setViewDate(activeStartDate)}
          onClickMonth={(value:any, event) => alert(`Clicked month: ${value}`)}
          prevLabel={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>}
          nextLabel={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>}
          formatDay={(locale: any, date: any) => date.toLocaleString('en', { day: 'numeric' })}
          tileContent={({ date }: any) => {
            if (workDate.find((x: any) => moment(x).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD"))) {
              return (
                <div className="absolute w-[calc(100%-1px)] flex items-center justify-center event h-[calc(100%-1px)] left-[1px] top-[1px] bg-[#FFEF83]">
                  {date.getDate()}
                </div>
              )              
            }
          }
        }
      />
      </div>
      <div className='w-full flex flex-col gap-4 mt-12'>
        <div className='text-center text-[24px] font-bold'>
          {dateFormatKr(moment(value).format("YYYY-MM-DD"))}
          <span className='text-[14px] ms-2 font-[300]'>({dateWeekKr(moment(value).day())})</span>
        </div>
        <div className='mx-auto w-full lg:w-10/12 xl:w-8/12 2xl:w-8/12 max-w-[700px]'>
          {events ? events.map((component: any, index: number) => (
            <RootView
              key={index + 1}              
              data={component}
              date={value}
              onDelete={()=>deleteComponent(index)}
              onSubmit={submitComponent}
            />
          )) :
            <div className='text-center py-6 font-[200]'>
              등록된 작업내역이 없습니다.
            </div>
          }
          {/* {moment(new Date()).format("YYYY-MM-DD") === moment(value).format("YYYY-MM-DD") ?  */}
          <div className='text-center py-6 text-blue'>
            <button onClick={addComponent}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline me-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              작업 추가하기
            </button>
          </div>
           {/* : null } */}
        </div>
      </div>
    </BaseTemplate>
  );
}