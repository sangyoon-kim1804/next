import React from "react"
import { useRouter } from "next/router";

export default function Table({ thead, tbody, click }: any) { 
  const router = useRouter();
  const goUrl = (n:number) => { 
    click == undefined ? null : router.push(`${click[0]}/${click[1][n]}`);
  }
  return (
    <table className='w-full table-fixed mt-6'>
      <thead>
        <tr className='border-b-2 border-[#868E96]'>
          {thead.map((item:any, i:number) => (
            <th key={i} className={`right-border p-4 text-center text-[13px] text-black font-[500] relative ${item.class}`}>{item.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {tbody.map((item: any, i: number) => {
        return (
          <tr key={i} onClick={() => goUrl(i)} className='cursor-pointer'>
            {Object.entries(item).map((object: any, idx: number) => (
              <td key={idx} className={`px-4 py-3 border-b h-[61px] ${thead[idx].class} ${thead[idx].tdClass?thead[idx].tdClass:'text-center'}`}>
                {object[1]}
              </td>
            ))}
          </tr>
        )
      })}
      </tbody>  
    </table>
  );
}