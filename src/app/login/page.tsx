"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";

export default function SignUp() {
  const router = useRouter();
  const [user, setuser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [isLoading, serLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSubmit = async () => {
    try {
      serLoading(true);
      const response = await axios.post("/api/users/login",user)
      alert("User logged in successfully")
      router.push("/profile")

    } catch (error:any) {
      // experiment with react-hot-toast library
      console.log("Login failed",error.message);
    } finally {
      serLoading(false);
    }
  };

  return (
    <>
    <div className="h-1/2 w-1/2 border border-red-50 rounded-3xl mx-auto mt-32">
      <h1 className="text-center text-4xl mt-20">
        {" "}
        {isLoading ? "PROCESSING..." : "LOGIN"}
      </h1>
      <div className="flex items-center justify-center">
        <div className="flex-col">
          <div className="m-3">
            <label>Email</label>
            <input
              type="text"
              className="ml-11 p-2 text-black border rounded-3xl"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
            ></input>
          </div>
          <div className="m-3">
            <label>Password</label>
            <input
              type="password"
              className="m-3 p-2 border rounded-3xl text-black"
              placeholder="password"
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
            ></input>
          </div>

          <button
            className="bg-white text-black ml-32 rounded-3xl w-24 h-10"
            onClick={onSubmit}
          >
            {buttonDisabled ? "No login" : "Login"}
          </button>
          <br></br>
          <br></br>
          <Link href="/signup" className="ml-32">
            Visit Signup page
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
