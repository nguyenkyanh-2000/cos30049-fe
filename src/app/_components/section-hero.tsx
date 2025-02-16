import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

// Hero component for the main section of the page
export default async function Hero() {
  return (
    // Container for the hero section
    <section className="container relative h-screen mx-auto px-8">
      {/* Centered content within the hero section */}
      <div className="absolute w-full z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4">
        {/* Main heading */}
        <h1 className="font-bold text-3xl sm:text-5xl md:text-7xl text-center">
          Financial platform
          <br />
          for your portfolio
        </h1>

        {/* Subheading */}
        <p className="text-center text-md sm:text-lg md:text-xl">
          Trade smarter. Own your data. Decentralize your future.
        </p>

        {/* Call to action button */}
        <Link href="/wallets">
          <Button>Get started</Button>
        </Link>
      </div>

      {/* Decorative animated blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-300 animation-delay-2000 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-300 animation-delay-4000 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-300 animation-delay-6000 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob3"></div>
    </section>
  );
}
