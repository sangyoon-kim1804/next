import React, { useEffect, useState } from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'

export default function CustomAvatar(props:any) {
  const [config, setConfig] = useState<any>(genConfig(''));
  useEffect(() => {
    setConfig(genConfig(props.name));
  },[props])
  return (
    <>
      <Avatar className={`inline-block`} {...config} style={{ width: `${props.size * 3}px`, height: `${props.size * 3}px` }} />
    </>
  );
}
