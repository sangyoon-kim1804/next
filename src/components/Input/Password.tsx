import React, { useEffect, useState } from 'react'

export default function Password({config, changeHandler}:any) {
  const [placeholder, setPlaceholder] = useState('');
  const [view, setView] = useState(false);
  const [value, setValue] = useState('');
   const [capsLockFlag, setCapsLockFlag] = useState(false);
  useEffect(() => {
    setValue(config?.value);
    setPlaceholder(config?.placeholder);
  }, [config]);
  const changeValue = (e:any) => { 
    setValue(e.target.value);
    changeHandler(e.target.value);
  }
  const checkCapsLock = (e:any) => {
    let capsLock = e.getModifierState("CapsLock");
    setCapsLockFlag(capsLock);
  };
  return (
    <div className="relative w-full">
      {capsLockFlag ?
        <span className='absolute bg-g6 text-white left-8 -top-3 px-2 py-1 text-[10px] rounded-full'>
          Caps Lock이 켜져 있습니다.
        </span>
      : null}
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 text-g6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </div>
      <input
        type={`${view ? "text" : "password"}`}
        className="border outline-none border-g3 rounded-lg block w-full ps-10 p-4 "
        placeholder={placeholder}
        value={value}
        onChange={changeValue}
        onKeyUp={(e) => checkCapsLock(e)}
        required
      />
      <button
        type="button"
        className="absolute inset-y-0 end-0 flex items-center pe-3"
        onMouseDown={() => setView(true)}
        onMouseUp={() => setView(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-g4 hover:text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>
    </div>
  );
}