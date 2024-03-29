import React, { useState, useRef, useEffect } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { workList, pipeList, taskList, projectList, pipeCode } from '@/api/data'
import axios from 'axios'
import { api } from "@api/module";

export default function Projects(props:any) {
  const [view, setView] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [width, setWidth] = useState<number>(0);
  const projectRef = useRef<any>();
  const [task, setTask] = useState<string>('');
  const [taskId, setTaskId] = useState<number>(0);
  const [projectId, setProjectId] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [taskData, setTaskData] = useState({});
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  }
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const taskText = event.currentTarget.innerText;
    if (taskText === '직접입력') {
      setView(true);
      setTask('');
    } else {
      setView(false);
      setTask(taskText);
      setInput("");
    }
    setAnchorEl(null);
    setTaskId(Number(event.currentTarget.dataset.task));
    setProjectId(Number(event.currentTarget.dataset.project));
  };

  const [projectList, setProjectList] = useState([]);
  const renderProjectList = () => {
    api.get({
      url: '/shotgrid/tasks', options: {withAuthorization: true}
    }).then(response => {
      setProjectList(response.data.data);
    });
  }
  const handleResize = () => { 
    setWidth(projectRef.current.clientWidth);
  }
  useEffect(() => {
    setWidth(projectRef.current.clientWidth);
    window.addEventListener('resize', handleResize);
    return () => { 
      window.removeEventListener('resize', handleResize);
    }    
  }, []);
  useEffect(() => {
    const taskData = view ? {
      title: input,
    } : {
      shotgridTaskId: taskId,
      shotgridProjectId: projectId,
      title: task,
    }
    props.changeTask(taskData);
  }, [input, task]);
  useEffect(() => {
    setTask(props.task);
  }, [props.task]);
  useEffect(() => {
    renderProjectList();
  },[])
  return (
    <div className='flex-1 relative select-project' ref={projectRef}>
      {view ? <>
        <div className='border border-blue text-blue rounded-full h-[36px] flex items-center w-full pe-4'>
          <button className='w-[40px] h-full text-center' onClick={() => { setView(false); setTask(''); }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <input className='w-full h-full outline-none text-[12px]' value={input} onChange={handleInputChange}/>
        </div>
      </> : <>
        <button
          className='border border-blue text-blue rounded-full py-3 px-5 h-[36px] flex items-center w-full'
          //style={{ backgroundColor: 'red' }}
            onClick={handleClick}
            disabled={props.disabled}
          >
          <span className='truncate absolute w-[calc(100%-2rem)] ms-4 left-0 text-start text-[12px]' >
            {task == '' ? '프로젝트 선택' : task}
          </span>
        </button>
        <div className='w-full relative'>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            className=''
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            MenuListProps={{ className: `css-MuiMenu-list bg-white border border-blue max-h-[300px] rounded-2xl overflow-auto text-blue text-[12px]`, sx: { width: width } }}
            >
            <MenuItem onClick={handleClose} className='text-[12px]'>직접입력</MenuItem>
            {projectList.map((object:any, i:number) => (
              <MenuItem key={i} onClick={handleClose} className='text-[12px]' data-task={object.id} data-project={object.relationships.project.data.id}>
                {`${object.relationships.project.data.name} - ${object.relationships.entity.data.name} #${object.id} - ${object.attributes.content} [${object.attributes.sg_status_list}]`}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </> }    
    </div>
  );
}