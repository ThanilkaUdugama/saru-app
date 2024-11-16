import React from 'react';
import { Avatar } from '@mui/material';

export default function Profile({src}){
  console.log(`${process.env.REACT_APP_API}${src}`)
  return (
    <div className="flex justify-center items-center w-[100%] h-[100%]">
        <Avatar src={`${process.env.REACT_APP_API}${src}`} />
    </div>
  );
};