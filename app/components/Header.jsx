import React, { useState } from 'react'
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';


const Header = () => {
    const {theme, setTheme} = useTheme();
    const {data:session,status} = useSession();
    const [open,setOpen]= useState(false);


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
    </div>
  )
}

export default Header
