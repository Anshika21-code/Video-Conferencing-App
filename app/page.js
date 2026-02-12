// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// import Loader from "@/app/components/Loader";
// import Header from "@/app/components/Header";
// import MeetingAction from "@/app/components/MeetingAction";
// import MeetingFeature from "@/app/components/MeetingFeature";

// export default function Home() {
//   const [isLoading, setIsLoading] = useState(true);
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === "loading") {
//       setIsLoading(false);
//       const hasShownWelcome = localStorage.getItem("hasShownWelcome");
//       if (!hasShownWelcome) {
//         toast.success(`Welcome ${session?.user?.name}!`);
//         localStorage.setItem("hasShownWelcome", "true");
//       }
//     } else if (status === "unauthenticated") {
//       setIsLoading(false);
//     }
//   }, [status, session]);

//   if (isLoading) return <Loader />;

//   return (
//     <div className="flex flex-col min-h-screen bg-white-100 dark:bg-gray-900">
//       <Header />

//       <main className="flex-grow px-20 pt-5 pb-10">
//         <div className="max-w-5xl mx-auto text-center">
//           <h1 className="text-5xl  mb-6 text-gray-900 dark:text-white">
//             Video calls and meetings for
//           </h1>
//           <h1 className="text-5xl  mb-6 text-gray-900 dark:text-white">
//              everyone
//           </h1>

//           <p className="text-2xl text-gray-600 dark:text-gray-300 mb-10">
//             Connect, collaborate and celebrate from anywhere with Google Meet.
//           </p>

//           {/* Buttons Center */}
//           <div className="flex justify-center">
//             <MeetingAction />
//           </div>

//           {/* Divider Line */}
//           <div className="border-t border-gray-300 dark:border-gray-700 my-12"></div>

//           {/* Feature Below */}
//           <div className="flex justify-center">
//             <MeetingFeature />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// import Loader from "@/app/components/Loader";
// import Header from "@/app/components/Header";
// import MeetingAction from "@/app/components/MeetingAction";
// import MeetingFeature from "@/app/components/MeetingFeature";

// export default function Home() {
//   const [isLoading, setIsLoading] = useState(true);
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (status === "loading") {
//       setIsLoading(false);
//       const hasShownWelcome = localStorage.getItem("hasShownWelcome");
//       if (!hasShownWelcome) {
//         toast.success(`Welcome ${session?.user?.name}!`);
//         localStorage.setItem("hasShownWelcome", "true");
//       }
//     } else if (status === "unauthenticated") {
//       setIsLoading(false);
//     }
//   }, [status, session]);

//   if (isLoading) return <Loader />;

//   return (
//     <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
//       <Header />

//       <main className="flex-grow px-6 pt-4 pb-10">
//         <div className="max-w-4xl mx-auto text-center">
//           {/* Title - single line on desktop, wrapped naturally */}
//           <h1 className="text-5xl font-normal mb-1 text-gray-900 dark:text-white leading-tight">
//   Video calls and meetings for
// </h1>
// <h1 className="text-5xl font-normal mb-4 text-gray-900 dark:text-white leading-tight">
//   everyone
// </h1>


//           {/* Subtitle */}
//           <p className="text-lg text-gray-600 dark:text-gray-400 mb-1 font-normal">
//   Connect, collaborate and celebrate from anywhere with
// </p>
// <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 font-normal">
//   Google Meet
// </p>


//           {/* Buttons - centered with proper spacing */}
//           <div className="flex justify-center mb-6">
//             <MeetingAction />
//           </div>

//           {/* Divider Line */}
//           <div className="border-t border-gray-300 dark:border-gray-700 mb-4"></div>

//           {/* Feature Section */}
//           <div className="flex justify-center">
//             <MeetingFeature />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loader from "@/app/components/Loader";
import Header from "@/app/components/Header";
import MeetingAction from "@/app/components/MeetingAction";
import MeetingFeature from "@/app/components/MeetingFeature";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(false);
      const hasShownWelcome = localStorage.getItem("hasShownWelcome");
      if (!hasShownWelcome) {
        toast.success(`Welcome ${session?.user?.name}!`);
        localStorage.setItem("hasShownWelcome", "true");
      }
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, session]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-grow px-6 pt-6 pb-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-5xl font-normal text-gray-900 dark:text-white leading-tight">
            Video calls and meetings for <br /> everyone
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Connect, collaborate and celebrate from anywhere with <br />
            Google Meet
          </p>

          {/* Buttons */}
          <div className="flex justify-center mt-8">
            <MeetingAction />
          </div>

          {/* Divider (short like Google Meet) */}
          <div className="flex justify-center mt-8">
            <div className="w-[65%] border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          {/* Feature */}
          <div className="flex justify-center mt-10">
            <MeetingFeature />
          </div>
        </div>
      </main>
    </div>
  );
}
