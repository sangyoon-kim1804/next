import { CustomAvatar } from '@/components/Avatar'

export default function Progress({ tasks }: any) { 
  const dateFormatKr = (n:any) => {
    return `${n.split("-")[0]}년 ${n.split("-")[1].replace(/(^0+)/, "")}월 ${n.split("-")[2].replace(/(^0+)/, "")}일`;
  }  
  return (
    <div className='flex flex-col gap-12 lg:gap-4 mt-6'>
      {tasks.map((task:any, i:number) => (
        <div className='flex flex-col lg:flex-row gap-4' key={`task-title-${i}`}>
          <div className='w-full lg:w-[150px] xl:w-[200px] h-[40px]'>
            <div className={`${
              task.stat == 'DONE' ? 'text-[#FFFFFF] bg-blue' : 
              task.stat == 'ASN' ? 'border border-[#CCCCCC] text-[#BBBBBB]' : 'border border-blue text-blue' 
            } py-3 px-4 rounded-lg h-full`}>{task.task}</div>
          </div>
          <div className='flex-1 flex flex-col gap-4'>
            {task.pipe && task.pipe.map((pipe:any, index:number) => (
              <div className='flex flex-col sm:flex-row gap-4' key={`task-row-${i}-${index}`}>
                <div className={`${
                  pipe.stat == 'DONE' ? 'text-[#FFFFFF] bg-blue' :
                  pipe.stat == 'ASN' ? 'border border-[#CCCCCC] text-[#BBBBBB]' : 'border border-blue text-blue' 
                } py-3 px-4 rounded-lg w-[100px] lg:w-[150px] xl:w-[200px] h-[40px]`}>{pipe.title}</div>
                <div className={`${pipe.stat == 'DONE' ? 'text-blue' : pipe.stat == 'ASN' ? 'text-[#BBBBBB]' : 'text-black'} text-blue py-0 md:py-3 flex-1 flex items-center flex-row gap-2 sm:gap-3 xl:gap-6 text-[11px] sm:text-[12px]`} key={index}>
                  <span className='flex items-center'>
                    {
                      pipe.artist == "outsourcing" ? <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                        <p className="ms-2">외주/바른손랩스</p>
                      </> : <>
                        <CustomAvatar size={8} name={pipe.artist} />
                        <p className='ms-2'>{pipe.artist}</p>
                      </>
                    }
                  </span>
                  {pipe.hour > 0 ? 
                  <span className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline me-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    {pipe.hour}시간
                  </span> : null}
                  {pipe.sdate && pipe.edate ?
                  <span className='flex items-center'>                          
                    {pipe.sdate === '' && pipe.edate === '' ? null : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline me-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>} 
                    { pipe.sdate === '' && pipe.edate === '' ? '' :
                      pipe.sdate === '' ? `${dateFormatKr(pipe.edate)} 마감` :
                      pipe.edate === '' || pipe.sdate === pipe.edate ? `${dateFormatKr(pipe.sdate)} 시작` :
                      `${dateFormatKr(pipe.sdate)} ~ ${dateFormatKr(pipe.edate)} `}
                  </span>
                  : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );  
}