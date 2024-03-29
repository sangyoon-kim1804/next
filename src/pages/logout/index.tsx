import React, {useState, useEffect} from 'react'
import { loginAuth } from "@api/auth/";
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "@store/slices/userSlice";

export default function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const LogoutFunc = () => {
    dispatch(clearUser());
    loginAuth.logout();
  };
  useEffect(() => { 
    LogoutFunc();
    router.push('/');
  },[])  
}