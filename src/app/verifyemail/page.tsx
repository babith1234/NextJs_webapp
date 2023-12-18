'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || " ");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return <>
    <div className="flex flex-col justify-center items-center py-2 min-h-screen">
        <h1 className="text-4xl">VERIFY EMAIL</h1>
    </div>
  </>;
}
