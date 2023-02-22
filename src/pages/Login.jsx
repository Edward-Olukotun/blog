import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <div className="md:w-[40%] mx-auto text-center mt-52">
      <p className="font-bold text-xl">Sign In With Google to Continue</p>
      <button
        onClick={SignInWithGoogle}
        className="flex shadow-lg w-[70%] md:w-[50%] mx-auto mt-4 font-medium px-2"
      >
        <FcGoogle size={28} className="mr-3" />
        Sign In With Google
      </button>
    </div>
  );
}

export default Login;
