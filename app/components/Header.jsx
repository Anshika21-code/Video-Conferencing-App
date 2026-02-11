"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';


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
        
    if (!mounted) return null;



  return (
    <div className='flex items-center justify-between p-4 bg-white dark:bg-gray-900  dark:border-gray-700'>
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
            <Sun className="w-5 h-5 text-yellow-400"></Sun> 
            ) : (
            <Moon className="w-5 h-5 text-gray-800"></Moon>

            )}
        </Button>
      </div>
    </div>
  )
}

export default Header
