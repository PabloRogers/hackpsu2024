import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const HeroPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-white p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Unlock Your Career Potential
      </h1>
      <p className="text-xl text-center mb-8">
        Discover the steps to achieve your dream career based on your
        educational journey. Our personalized guidance from Pathfinder helps you
        navigate your career path with confidence.
      </p>
      <div>
        <Link href="/pathfinder">
          <Button className="bg-white text-indigo-500 font-bold py-2 px-4 rounded hover:bg-cover-white ">
            Find Your Path Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroPage;
