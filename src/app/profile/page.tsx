'use client';
import Link from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface UserData {
  _id: string,
  username:string
  // Add other properties as needed
}

export default function ProfilePage() {
  const [data, setData] = useState<UserData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/users/me");
        if (res.data && res.data.data && res.data.data._id) {
          setData(res.data.data);
        } else {
          console.error("Invalid response structure:", res.data);
          // Handle the case where the response structure is unexpected
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error, e.g., display an error message to the user
      }
    };

    fetchData();
  }, []);

  const router = useRouter();

  const logout = async () => {
    try {
      const response = axios.post("/api/users/logout");
      alert("User Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr></hr>
        <p>Profile Page</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-5 rounded"
          onClick={logout}
        >
          LOGOUT
        </button>
        <div>
          {data && (
            <>
              <p className="text-white">ID: {data._id}</p>
              <p className="text-white">NAME: {data.username}</p>
              
            </>
          )}
        </div>
      </div>
    </>
  );
}
