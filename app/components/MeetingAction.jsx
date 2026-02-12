"use client"
import React, { useState, useEffect, useRouter  } from 'react'
import { useSession } from 'next-auth/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from 'radix-ui';
import { Button } from '@/components/ui/button';
import {LinkIcon, Video} from "lucide-react";
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Link2 } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { v4 as uuidv4 } from 'uuid';



const MeetingAction = () => {
    const {data:session} = useSession();
    const [isLoading, setIsLoading] = useState();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [baseUrl, setBaseUrl] = useState("")
    const router = useRouter();
    const [generatedMeetingUrl, setGeneratedMeetingUrl] = useState("");
    const [meetingLink, setMeetingLink] = useState("");


    useEffect(() => {
        setBaseUrl(window.location.origin);

    },[])

    const handleCreateMeetingForLater = () => {
        const roomId= uuidv4();
        console.log('this is room id', roomId);
        const url = `${baseUrl}/video-meeting/${roomId}`;
        setGeneratedMeetingUrl(url);
        setIsDialogOpen(true);
        toast.success("Meeting link generated! You can share it with others.") 
    }

    const handleJoinMeeting = () => {
        if(!meetingLink){
            setIsLoading(true);
            const formattedLink = meetingLink.includes("http")?meetingLink: `${baseUrl}/video-meeting/${meetingLink}`
            router.push(formattedLink);
            toast.info("Joining meeting...")
        }else{
            toast.error("Please enter a valid meeting link.")
            
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedMeetingUrl);
        toast.success("Meeting link copied to clipboard!");
    }


  return (
    <>
    <div className=' flex flex-col sm:flex-row space-y-4 sm:space-y-0  sm:space-x-4'>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className ="w-full sm:w-auto color-blue text-white" size="lg" >
                    <Video className="w-5 h-5 mr-2" />
                      New Meeting

                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleCreateMeetingForLater} >
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
            <span className='absolute left-2 top-1/2 transform-translate-y-1/2'>
                <LinkIcon className='w-4 h-4 text-gray'/>
            </span>
            <Input 
            className="pl-8 rounded-r-none pr-10"
            placeholder="Enter meeting link"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            />
            <Button variant="secondary"
            className='rounded-l-none'
            onClick={handleJoinMeeting}>
                Join
            </Button>
        </div>
     
    </div>
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-w-sm rounded-lg p-6'>
            <DialogHeader>
                <DialogTitle className='text-3xl font-normal'>
                    Here's your joining information
                </DialogTitle>
            </DialogHeader>
            <div className='flex flex-col space-y-4'>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                    Send this to people that you want to meet with. Make sure that  you save it so that you can use it later, too.
                </p>
                <div className=' flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg '>
                    <span className='text-gray-700 dark:text-gray-200 break-all'>
                        {generatedMeetingUrl.slice(0,30)}...
                    </span>
                    <Button className='hover:bg-gray-200' onClick={copyToClipboard}>
                        <Copy className="w-5 h-5 text-black"/>

                        
                    </Button>
                </div>

            </div>

        </DialogContent>

    </Dialog>
    </>
  )
  
}

export default MeetingAction
