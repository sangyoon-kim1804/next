import React, { useState, useEffect } from "react";
import { STATUS_CODE } from "@constants/constant";
import { loginUser } from "@store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth } from "@api/auth/";
import { userApi } from "@api/user";
import { useRouter } from "next/router";
export default function Index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);

  if (user.isLogin == true) {
    router.push("/works");
  } else {
    loginAuth.logout();
  }

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
        setLoading(false);
      }, 1500);
    }
  }, [msg]);

  const LoginFunc = async (e: any) => {
    e.preventDefault();
    if (!email) {
      setMsg("이메일 주소를 입력해 주세요");
    } else if (!password) {
      setMsg("비밀번호를 입력해 주세요");
    } else {
      setMsg("Loading...");
      const loginInfo = await loginAuth.login({
        email,
        password,
      });
      if (loginInfo.status == STATUS_CODE.FORBIDDEN) {
        setMsg("이메일 또는 비밀번호를 확인해주세요");
      }
      if (loginInfo.status == STATUS_CODE.OK) {
        const user = await userApi.getUser();
        dispatch(loginUser(user.user));
        router.push("/works");
      }
    }
    setLoading(true);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="w-full max-w-[400px] text-center">
        <h1 className="font-[800]">Hello Again!</h1>
        <p className="text-g6 mb-6 relative -top-1">Welcome Back</p>
        <form className="flex flex-col gap-[10px]">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-g9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0.5"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <input
              type="text"
              className="border outline-none border-g3 rounded-lg block w-full ps-10 p-4 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소"
              required
            />
          </div>
          <div className="relative w-full">
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
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button
            className="text-white w-full p-4 h-[50px] bg-blue rounded-lg form-btn font-bold"
            type="button"
            disabled={loading}
            onClick={LoginFunc}
          >
            로그인
          </button>
          <p className="text-magenta font-[400] mt-2">{msg}</p>
        </form>
      </div>
    </div>
  );
}
