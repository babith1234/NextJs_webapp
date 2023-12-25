"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyUserEmail = async () => {
    console.log("Hello");
    try {
      const response = await axios.post("/api/users/verifyEmail", { token });
      if (response.data.success) {
        setVerified(true);
      }
    } catch (error: any) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div className="flex flex-col justify-center items-center py-2 min-h-screen">
        <h1 className="text-4xl">VERIFY EMAIL</h1>

        {token ? (
          <h2 className="p-2 bg-orange-500">{token}</h2>
        ) : (
          <h2 className="p-2 bg-orange-500">NO TOKEN</h2>
        )}

        {verified ? (
          <>
            <h2>VERIFICATION SUCCESSFUL</h2>
            <Link href="/login" className="p-2 mt-5 bg-red-500">
              VISIT LOGIN PAGE
            </Link>
          </>
        ) : (
          <>
            <h2>VERIFICATION UNSUCCESSFUL</h2>
            <Link href="/signup" className="p-2 mt-5 bg-red-500">
              VISIT SIGN UP PAGE
            </Link>
          </>
        )}
      </div>
    </>
  );
}
