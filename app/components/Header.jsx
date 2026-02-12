"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sun, Moon, LogOut, Plus, X } from 'lucide-react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { CircleHelp } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Settings } from "lucide-react";
import { Grip } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from 'next-auth/react';


const Header = () => {
    const {theme, setTheme} = useTheme();
    const {data:session,status} = useSession();
    const [open,setOpen]= useState(false);
    const formatTimeDate = (date) => {
    const now = new Date();
        return now.toLocaleString("en-US", {
            hour:'numeric',
            minute:'numeric',
            hour12:true,
            weekday:'short',
            month:'short',
            day:'numeric',
            year:'numeric'
        })
    }

    const [mounted, setMounted] = useState(false);
        
        useEffect(() => {
          setMounted(true);
        }, []);
        
    if (!mounted) 
        return null;

    const userPlaceHolder = session?.user?.name?.split(" ").map((name) => name[0]).join("")

    const handlelogout = async () => {
        await signOut({ callbackUrl: "/user-auth" });
    }

    


  return (
    <div className="relative z-50 flex items-center justify-between p-4 bg-white dark:bg-gray-900 dark:border-gray-700">

      <div className='flex items-center space-x-4'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image
            src="/images/googl-icon.png"
            alt="Google Meet"
            width={34}
            height={34}
            className="object-contain"
          />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Google Meet
          </h1>
        </Link>
        {/* <span className='hidden md:block text-xl font-semibold text-gray-800 dark:text-white'> 

        </span> */}
      </div>
      <div className='flex items-center space-x-4'>
        <span className="text-md text-gray-500 dark:text-gray-200">
            {formatTimeDate(new Date())}

        </span>
        <Button variant="ghost" onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
            <Sun className="w-8 h-8 text-yellow-400"></Sun> 
            ) : (
            <Moon className="w-8 h-8 text-gray-800"></Moon>
            )}
        </Button>
        {/* <Button variant="ghost" size='icon' className='hidden md:block' />

        </Button> */}

        {/* <DropdownMenu>
               <DropdownMenuTrigger asChild>
               <Button size="icon" variant="ghost">
               <CircleHelp className="w-12 h-12 text-gray-600 dark:text-gray-300" />
               </Button>
            </DropdownMenuTrigger>
    
            {/* <DropdownMenuContent align="end">
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuItem>Training</DropdownMenuItem>
                <DropdownMenuItem>Updates</DropdownMenuItem>
            </DropdownMenuContent> 
        </DropdownMenu> */}

        {/* <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon"><AlertTriangle className="w-7 h-7" /></Button>
            <Button variant="ghost" size="icon"><Settings className="w-7 h-7" /></Button>
            <Button variant="ghost" size="icon"><Grip className="w-10 h-10" /></Button>
        </div> */}

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="p-0 rounded-full overflow-hidden"
            >
              <Avatar className="cursor-pointer">
                {session?.user?.image ? (
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                ) : (
                  <AvatarFallback className="text-lg dark:bg-gray-300">
                    {userPlaceHolder}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-80 p-4 z-[9999]"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-800 dark:text-white">
                {session?.user?.email}
              </span>

              <Button
                className="rounded-full"
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex flex-col items-center mb-4">
              <Avatar className="w-20 h-20">
                {session?.user?.image ? (
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                ) : (
                  <AvatarFallback className="text-2xl dark:bg-gray-300">
                    {userPlaceHolder}
                  </AvatarFallback>
                )}
              </Avatar>

              <h1 className="text-xl font-semibold mt-2">
                Hi, {session?.user?.name}!
              </h1>
            </div>

            <div className="flex mb-4">
              <Button className="w-1/2 h-14 rounded-l-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>

              <Button
                className="w-1/2 h-14 rounded-r-full"
                variant="outline"
                onClick={handlelogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                SignOut
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <Link href="#" className="hover:bg-gray-300 p-2 rounded-lg">
                Privacy Policy
              </Link>
              {" . "}
              <Link href="#" className="hover:bg-gray-300 p-2 rounded-lg">
                Terms of Service
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  )
}

export default Header
