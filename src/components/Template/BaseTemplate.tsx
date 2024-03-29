import React, { useState, useEffect } from "react";
import { Gnb } from "../Gnb";
//import { Alert } from '@/components/Alert'
import { BreadCrumb } from "@/components/BreadCrumb";
import { selectTitle } from "@/store/slices/titleSlice";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";
import router from "next/router";

const BaseTemplate: React.FC<React.PropsWithChildren<any>> = ({
  children,
}: any) => {
  const title = useSelector(selectTitle);
  const user = useSelector(selectUser);
  const [view, setView] = useState(false);
  useEffect(() => {
    if (user.isLogin == false) {
      router.push("/");
    }
    setView(user.isLogin);
  }, []);
  return (
    <React.Fragment>
      {view ?
        <div className={`w-full flex md:flex-row flex-col min-h-[100vh] `}>
          <Gnb />
          <div className="flex-1 w-full mt-[60px] md:mt-0">
            {/* <Alert /> */}
            <BreadCrumb label={title} />
            <div className="p-6">{children}</div>
          </div>
        </div>
      : null}
    </React.Fragment>
  );
};

export default BaseTemplate;
