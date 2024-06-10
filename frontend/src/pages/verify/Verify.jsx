import React, { useState } from "react";
import { Link } from "react-router-dom";
import useVerify from "../../hooks/useVerfy";

const Verify = () => {
  const [verificationPin, setVerificationPin] = useState("");
  const { loading, verify } = useVerify();

  const email = JSON.parse(localStorage.getItem("chat-user"))?.user?.username;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await verify(verificationPin);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-blue-500">
          Welcome
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <p className="mt-8 p-2">
              We have send a verification code to "<span>{email}</span>"
            </p>
            <label className="label p-2">
              <span className="text-base label-text text-blue-500">
                Enter OTP
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full input input-bordered h-10 "
              value={verificationPin}
              onChange={(e) => setVerificationPin(e.target.value)}
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm text-slate-100 hover:underline hover:text-blue-500 mt-2 inline-block"
          >
            Back to SignUp
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Verify;
