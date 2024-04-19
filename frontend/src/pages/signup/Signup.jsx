import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [inputs,setInputs]=useState({
    fullName:"",
    username:"",
    password:"",
    confirfPassword:"",
    gender:"",
  })
  const handleCheckboxChange=(gender)=>{
    setInputs({ ...inputs, gender });
   
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await Signup(inputs)
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-ful p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-500"> Connectify</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-blue-500">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full input input-bordered h-10 "
              value={inputs.fullName}
              onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-blue-500">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10 "
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs,username: e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-blue-500">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10 "
              value={inputs.password}
              onChange={(e)=>setInputs({...inputs,password:e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-blue-500">
                {" "}
                Confirm Password
              </span>
            </label>
            <input
              type="password" 
              placeholder="Confirm password"
              className="w-full input input-bordered h-10 "
              value={inputs.confirfPassword}
              onChange={(e)=>setInputs({...inputs,confirfPassword:e.target.value})}
            />
          </div>
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
          <Link to={"/login"}
            href="#"
            className="text-sm text-slate-100 hover:underline hover:text-blue-500 mt-2 inline-block"
          >
            Already have an account ?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-4">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
