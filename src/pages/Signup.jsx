import React from "react";
import Header from "../components/Header";
import SignupSignin from "../components/SignupSignin";

const Signup = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center w-[100vw] h-[90vh]">
        <SignupSignin />
      </div>
    </div>
  );
};

export default Signup;
