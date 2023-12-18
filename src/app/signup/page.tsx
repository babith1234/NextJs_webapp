"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();
  const [user, setuser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [isLoading, serLoading] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSubmit = async () => {
    try {
      serLoading(true);
      const response = await axios.post("/api/users/signup",user)
      alert("User registered successfully")
      router.push("/login")

    } catch (error:any) {
      // experiment with react-hot-toast library
      console.log("Sign up failed",error.message);
    } finally {
      serLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl mt-20">
        {isLoading ? "PROCESSING..." : "SIGN UP"}
      </h1>
      <div className="flex items-center justify-center h-screen">
        <div className="flex-col">
          <div className="m-3">
            <label>Email</label>
            <input
              type="text"
              className="ml-11 border rounded p-2 text-black"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
            ></input>
          </div>
          <div className="m-3">
            <label>Password</label>
            <input
              type="password"
              className="m-3 border rounded p-2  text-black"
              placeholder="password"
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
            ></input>
          </div>
          <div className="m-3">
            <label>Username</label>
            <input
              type="text"
              className="m-3 border rounded p-2 text-black"
              placeholder="username"
              value={user.username}
              onChange={(e) => setuser({ ...user, username: e.target.value })}
            ></input>
          </div>
          <button
            className="bg-white text-black ml-32 rounded-3xl w-24 h-12"
            onClick={onSubmit}
          >
            {buttonDisabled ? "No signup" : "SignUp"}
          </button>
          <br></br>
          <br></br>
          <Link href="/login" className="ml-32">
            Visit login page
          </Link>
        </div>
      </div>
    </>
  );
}
