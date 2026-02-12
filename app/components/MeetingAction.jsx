"use client"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from 'radix-ui';
import { Button } from '@/components/ui/button';
import {LinkIcon, Video} from "lucide-react";
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Link2 } from "lucide-react";

const MeetingAction = () => {
    const {data:session} = useSession();
    const [isLoading, setIsLoading] = useState();

  return (
    <div className=' flex flex-col sm:flex-row space-y-4 sm:space-y-0  sm:space-x-4'>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className ="w-full sm:w-auto color-blue text-white" size="lg" >
                    <Video className="w-5 h-5 mr-2" />
                      New Meeting

                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem >
                    <Link2 className='w-4 h-4 mr-2'/>
                    Create a meeting for later
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Link2 className='w-4 h-4 mr-2'/>
                    Start a instant meeting
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Link2 className='w-4 h-4 mr-2'/>
                    Schedule in Google Calendar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex w-full relative">
            <span className=''>
                <LinkIcon className='w-4 h-4 text-gray'/>
            </span>
        </div>
     
    </div>
  )
}

export default MeetingAction
