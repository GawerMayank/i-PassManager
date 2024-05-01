import React from "react";

const Navbar = () => {
  return (
    <nav className=" bg-slate-900 flex justify-around items-center h-14 text-white">
      <div className=" font-bold cursor-pointer text-3xl">
        <span className=" text-green-500">&lt;</span>
        i-PassManager
        <span className=" text-green-500">/&gt;</span>
      </div>
      <a
        href="https://github.com/GawerMayank/i-PassManager.git"
        target="_blank"
      >
        <button className="flex flex-row bg-green-500 rounded-full w-28 space-x-5 px-1 ring-2 ring-white">
          <img className="w-7 py-1" src="/github.png" alt="" />
          <span className=" text-black font-bold my-1 py-1">GitHub</span>
        </button>
      </a>
    </nav>
  );
};

export default Navbar;
