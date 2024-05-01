import React from "react";

const Footer = () => {
  return (
    <div className="footer text-center fixed bottom-0 w-full bg-slate-900 flex flex-col">
      <div className=" font-bold text-xl text-white ">
        <span className=" text-green-500">&lt;</span>
        i-PassManager
        <span className=" text-green-500">/&gt;</span>
      </div>
      <div className=" text-white flex items-center justify-center s">
        Created with
        <img className=" m-2" src="/heart.svg" width={20} alt="" />
        by Mayank
      </div>
    </div>
  );
};

export default Footer;
