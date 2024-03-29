import React, { useState, useEffect } from 'react'
import { titleStatus } from '@/store/slices/titleSlice'
import { useDispatch } from 'react-redux'
import { BaseTemplate } from '@/components/Template';
import { Password } from '@/components/Input'
import { api } from "@api/module";

export default function Mypage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [view, setView] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const ChangeFunc = async (e: any) => {
    e.preventDefault();
    var reg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!oldPassword) {
      setMsg('기존 비밀번호를 입력해 주세요.');      
    } else if (!newPassword) {
      setMsg('신규 비밀번호를 입력해 주세요.');
    } else if (reg.test(newPassword) === false) { 
      setMsg('비밀번호는 8자 이상이어야 하며, 숫자/소문자/특수문자를 모두 포함해야 합니다.');
    } else if (!conPassword) {
      setMsg('신규 비밀번호를 다시 입력해 주세요.');
    } else if (newPassword != conPassword) { 
      setMsg('신규 비밀번호를 확인해 주세요.');
    } else {
      setMsg("Loading...");
      setLoading(true);
      api.patch({
        url: '/user/updatePassword', body: {
          password: oldPassword,
          newPassword: newPassword,
        }, options: {withAuthorization: true}
      }).then((response) => {
        alert('비밀번호가 정상적으로 변경되었습니다.');
        setOldPassword("");
        setNewPassword("");
        setConPassword("");
        setLoading(false);
        setMsg("");
      }).catch((e) => {        
        if (JSON.parse(e.request.response).status == 401) {
          setMsg('기존 비밀번호를 확인해 주세요.');
          setLoading(false);
        }
      });
    }    
  }
  const oldChange = (n: any) => { setOldPassword(n); }
  const newChange = (n: any) => { setNewPassword(n); }
  const conChange = (n: any) => { setConPassword(n); }  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(titleStatus(['홈', '비밀번호 변경']));
  }, []);
  return (
    <BaseTemplate>
      <div className="w-full max-w-[400px] text-center mx-auto mt-40">
        <form className="flex flex-col gap-[10px]">
          <Password changeHandler={oldChange} config={{
            value: oldPassword,
            placeholder: '기존 비밀번호 확인'
          }}/>
          <Password changeHandler={newChange} config={{
            value: newPassword,
            placeholder: '신규 비밀번호'
          }}/>
          <Password changeHandler={conChange} config={{
            value: conPassword,
            placeholder: '신규 비밀번호 재입력'
          }} />
          <button
            className="text-white w-full p-4 h-[50px] bg-magenta rounded-lg form-btn font-bold"
            type="button"
            disabled={loading}
            onClick={ChangeFunc}
          >
            비밀번호 변경하기
          </button>
          <p className="text-magenta font-[200] mt-2">{msg}</p>
        </form>
      </div>
    </BaseTemplate>
  );
}