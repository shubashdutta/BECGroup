import React, { FC, useEffect, useState } from "react";

import illustration from "@/asstest/Image/illustration.png";
import Image from "next/image";

interface userDetails {
  user: any;
}
const Greeting: FC<userDetails> = ({ user }) => {
  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateGreetingAndDate = () => {
      const now = new Date(); // Gets the CURRENT time on the user's device
      const hour = now.getHours(); // Gets the hour (0–23) from user's local time

      let newGreeting = "";

      if (hour >= 5 && hour < 12) {
        newGreeting = "Good Morning,";
      } else if (hour >= 12 && hour < 18) {
        newGreeting = "Good Afternoon,";
      } else {
        newGreeting = "Good Evening,";
      }

      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }); // Example: Wednesday, January 1, 2026

      setGreeting(newGreeting); // Updates the greeting in your component
      setCurrentDate(formattedDate); // Updates the date
    };

    updateGreetingAndDate();

    const interval = setInterval(updateGreetingAndDate, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white p-6 rounded-2xl flex justify-between items-center font-sans h-[150px]">
      <div className="space-y-3">
        <h3 className="text-lg font-bold">
          {greeting} {user?.userType === "ADMIN" ? "Admin" : user?.firstName} 👋
        </h3>
        <p className="text-md opacity-90">{currentDate}</p>
      </div>

      <div>
        <Image src={illustration} alt="img" priority height={200} />
      </div>
    </div>
  );
};

export default Greeting;
