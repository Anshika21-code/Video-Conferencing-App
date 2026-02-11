"use client"
import Image from "next/image";
import {useSession} from 'next-auth/react'
import { useState } from "react";
import Loader from "@/app/components/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/app/components/Header";
import MeetingAction from "@/app/components/MeetingAction";
import MeetingFeature from "@/app/components/MeetingFeature";

export default function Home() {
  const [isLoading,setIsLoading] = useState(true);
    const {data:session,status}= useSession();
    // console.log(session);
    // console.log(status);

  useEffect(()=>{
    if(status === 'loading'){
      setIsLoading(false);
      const hasShownWelcome = localStorage.getItem('hasShownWelcome');
      if(!hasShownWelcome){
        toast.success(`Welcome ${session?.user?.name}!`)
        localStorage.setItem('hasShownWelcome', 'true');
      }
    }
    else if(status === 'unauthenticated'){
      setIsLoading(false);
    }
  }, [status, session])
  if(isLoading){
    return <Loader />
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex-grow p-8 pt-32">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 m-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Video calls and meetings for everyone
          </h1>
            <p className="text-3xl text-gray-600  dark:text-gray-300 mb-12 ">
              Connect, collaborate and celebrate from anywhere with Google Meet.
          </p>
            <MeetingAction/>
          </div>
          <div className="md:w-1/2">
            <MeetingFeature/>
          </div>

          </div>

        </div>

      </main>
    </div>
    
  );
}
