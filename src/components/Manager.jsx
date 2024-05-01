import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passRef.current.type = "text";
    if (ref.current.src.includes("public/hidden.png")) {
      ref.current.src = "public/eye.png";
      passRef.current.type = "password";
    } else {
      ref.current.src = "public/hidden.png";
      passRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
    }
    else{
      toast("🦄 Requirements not meet!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Do you want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (Text) => {
    toast("🦄 Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(Text);
  };

  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="w-full flex justify-center mx-20 items-center">
        <div className="Manager w-2/3 h-1/2 text-center my-5 rounded">
          <div className="heading text-black">
            <h1 className=" text-2xl font-bold">
              <span className=" text-green-500">&lt;</span>
              i-PassManager
              <span className=" text-green-500">/&gt;</span>
            </h1>
            <p>(Your own password manager)</p>
          </div>
          <div className="input flex flex-col my-8 w-full justify-center items-center space-y-4 text-black">
            <input
              value={form.site}
              onChange={handleChange}
              className=" w-2/3 px-2 rounded-lg border-stone-950 border"
              placeholder="Enter your website URL"
              type="text"
              name="site"
            />
            <input
              value={form.username}
              onChange={handleChange}
              className=" px-2 rounded-lg w-1/2 border-stone-950 border"
              placeholder="Enter Username"
              type="text"
              name="username"
            />
            <div className="pass flex relative">
              <input
                ref={passRef}
                value={form.password}
                onChange={handleChange}
                className=" px-2 rounded-lg  border-stone-950 border"
                placeholder="Enter Password"
                type="password"
                name="password"
              />
              <span
                className=" absolute right-2 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} src="/eye.png" width={20} alt="" />
              </span>
            </div>
            <button
              onClick={savePassword}
              className=" bg-green-500 rounded-lg w-40 flex justify-between p-1 border border-black"
            >
              Save Password
              <img className="" src="/add.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="passwords w-2/3 mx-80">
        <h2 className=" text-2xl font-bold">Your Passwords</h2>
        {passwordArray.length === 0 && (
          <div>No Passwords to show, add your password now</div>
        )}
        {passwordArray.length !== 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden my-5">
            <thead className=" bg-green-900 py-2 text-white">
              <tr>
                <th className="text-left py-2">Website</th>
                <th className="text-left">Username</th>
                <th className="text-left">Password</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody className=" bg-green-50  ">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <a href={item.site} target="_blank">
                        {item.site}
                      </a>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {item.username}
                        <img
                          className=" cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                          src="/copy.svg"
                          width={20}
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2 my-2">
                        {item.password}
                        <img
                          className=" cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                          src="/copy.svg"
                          width={20}
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2 my-2">
                        <img
                          className="cursor-pointer"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                          src="/edit.svg"
                          width={20}
                          alt=""
                        />
                        <img
                          className="cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                          src="/delete.svg"
                          width={20}
                          alt=""
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
