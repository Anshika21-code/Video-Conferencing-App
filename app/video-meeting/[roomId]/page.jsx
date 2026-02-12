"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const VideoMeeting = () => {
  const params = useParams();
  const roomID = params.roomId;

  const { data: session, status } = useSession();
  const router = useRouter();

  const containerRef = useRef(null);

  const [zp, setZp] = useState(null);
  const [isInMeeting, setIsInMeeting] = useState(false);

  // Left meeting screen states
  const [showLeftScreen, setShowLeftScreen] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Join meeting when authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user?.name && containerRef.current) {
      joinMeeting(containerRef.current);
    }
  }, [session, status]);

  // Cleanup Zego instance

  const joinMeeting = async (element) => {
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      throw new Error("Please provide ZEGO App ID and Server Secret");
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      session?.user?.id || Date.now().toString(),
      session?.user?.name || "Guest"
    );

    const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
    setZp(zegoInstance);

    zegoInstance.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "join via this link",
          url: `${window.location.origin}/video-meeting/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },

      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTurnOffRemoteCameraButton: true,
      showTurnOffRemoteMicrophoneButton: true,
      showRemoveUserButton: true,

      onJoinRoom: () => {
        toast.success("Meeting joined successfully");
        setIsInMeeting(true);
      },

      // IMPORTANT: This triggers when user leaves from UI
      onLeaveRoom: () => {
        handleMeetingLeft();
      },
    });
  };

  // When meeting is left (Google Meet like screen)
  const handleMeetingLeft = () => {
    if (zp) {
      zp.destroy();
    }

    setZp(null);
    setIsInMeeting(false);

    // show left meeting UI
    setShowLeftScreen(true);

    toast.info("You left the meeting");
  };

  // Countdown effect
  useEffect(() => {
    if (!showLeftScreen) return;

    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showLeftScreen, router]);

  // Manual end meeting button (your button)
  const endMeeting = () => {
    handleMeetingLeft();
  };

  
  if (showLeftScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 relative">
        
        {/* countdown top-left */}
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 flex items-center justify-center font-semibold text-gray-800 dark:text-white">
            {countdown}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Returning to home screen
          </p>
        </div>

        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-6">
          You've left the meeting
        </h1>

        <div className="flex gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => router.push(`/video-meeting/${roomID}`)}
          >
            Rejoin
          </Button>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push("/")}
          >
            Return to home screen
          </Button>
        </div>

        <p className="text-blue-600 cursor-pointer hover:underline mb-10">
          Submit feedback
        </p>

        {/* safe meeting card */}
        <div className="w-full max-w-xl border rounded-lg p-6 flex items-start gap-4 bg-white dark:bg-gray-800">
          <div className="text-blue-600 text-3xl">🔒</div>

          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Your meeting is safe
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              No one can join a meeting unless invited or admitted by the host
            </p>
            <p className="text-blue-600 text-sm mt-2 cursor-pointer hover:underline">
              Learn more
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Normal Meeting UI
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={`flex-grow flex flex-col md:flex-row relative ${
          isInMeeting ? "h-screen" : ""
        }`}
      >
        <div
          ref={containerRef}
          className="video-container flex-grow"
          style={{ height: isInMeeting ? "100%" : "calc(100vh - 4rem)" }}
        ></div>
      </div>

      {!isInMeeting && (
        <div className="flex flex-col">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Meeting Info
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Participant - {session?.user?.name || "You"}
            </p>

            <Button
              onClick={endMeeting}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              End Meeting
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-200 dark:bg-gray-700">
            <div className="text-center">
              <Image
                src="/images/videoQuality.jpg"
                alt="Feature 1"
                width={150}
                height={150}
                className="mx-auto mb-2 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                HD Video Quality
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Experience crystal clear video calls
              </p>
            </div>

            <div className="text-center">
              <Image
                src="/images/screenShare.jpg"
                alt="Feature 2"
                width={150}
                height={150}
                className="mx-auto mb-2 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                Screen Sharing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Easily share your screen with participants
              </p>
            </div>

            <div className="text-center">
              <Image
                src="/images/videoSecure.jpg"
                alt="Feature 3"
                width={150}
                height={150}
                className="mx-auto mb-2 rounded-full"
              />
              <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                Secure Meetings
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your meetings are protected and private
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMeeting;
