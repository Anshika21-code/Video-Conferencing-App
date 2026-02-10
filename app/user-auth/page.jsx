"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { Github } from "lucide-react";

const page = () => {
  //  const [isLoading,setIsLoading] = useSate(false);
  //  const url = process.env.NEXTAUTH_URL;

  //  const handleLogin = async () => {
    
  //  }
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
      
      {/* LEFT IMAGE */}
      <div className="hidden w-1/2 lg:block ">
        <Image
          src="/images/meet_image.jpg"
          width={1080}
          height={1080}
          alt="login_image"
          className="h-full w-full object-cover p-20 bg-white"
          priority
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full flex-col justify-center p-8 lg:w-1/2">
        <div className="mx-auto w-full max-w-md">
          <h1 className="mb-4 text-4xl font-bold">Welcome to Google Meet</h1>

          <p className="mb-8 text-gray-600 dark:text-gray-100">
            Connect with your team anytime, anywhere. Join or start meetings with
            crystal-clear HD video and audio.
          </p>

          <div className="space-y-4">
            <Button
              className="w-full dark:hover:bg-white dark:hover:text-black"
              variant="outline"
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Login with Google
            </Button>
          </div>

          <div className="mt-6 flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className=" px-2 text-gray-700">OR</span>
              </div>
            </div>

            <Button
              className="w-full bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
              variant="ghost"
            >
              <Github className="mr-2 h-5 w-5" />
              Login with Github
            </Button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                Create Now
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default page;
