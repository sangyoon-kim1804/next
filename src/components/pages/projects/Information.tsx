import React, { useState, useRef, useEffect } from 'react'
import styled from "styled-components"

const StyledInfo = styled.dl`
  margin-top: 1rem;
  margin-bottom: 2rem;
  & dt {
    font-weight: 300;
    font-size: 12px;
    margin-bottom: .25rem;
  }
  & dd {
    font-weight: bold;
    font-size: 16px;
  }
`;

export default function Information({ data }: any) { 
  return (
    <>
      {Object.entries(data[0]).map((object: any, idx: number) => (
        <dl className='mt-4 mb-8' key={idx}>
          <dt className='mb-1 text-[12px] font-[300]'>{object[0]}</dt>
          <dd className='flex flex-row gap-5 pt-2 font-bold text-[16px]'>{object[1]}</dd>
        </dl>
      ))}
    </>
  );  
}