"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { SignIn } from "./SignIn";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { SignOut } from "./SignOut";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add shadow when user scrolls
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { data: session } = useSession()


  const renderAuth = () => {
    if (session?.user) {
        return <>
            <Link href="/" className="text-sm font-medium hover:text-primary">
                {session?.user?.name}
            </Link>
            <SignOut></SignOut>
        </>
    }
    return <SignIn></SignIn>
  }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b transition-shadow ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/">    
        <Image
            // className="dark:invert"
            src="/images.svg"
            alt="Mob logo"
            width={40}
            height={30}
            priority
        ></Image>
        </Link>


        {/* Center: Search Bar (hidden on mobile) */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <Input
            type="text"
            placeholder="Search recipes..."
            className="max-w-sm"
          />
        </div>

        {/* Right: Nav Links (desktop) */}

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Discover
          </Link>
          <Link href="/cookbooks" className="text-sm font-medium hover:text-primary">
            My Cookbooks
          </Link>

        {renderAuth()}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t flex flex-col space-y-2 px-4 py-3">
          <Input type="text" placeholder="Search recipes..." className="mb-2" />
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Discover
          </Link>
          <Link href="/cookbooks" className="text-sm font-medium hover:text-primary">
            My Cookbooks
          </Link>
          
          {renderAuth()}
        </div>
      )}
    </motion.nav>
  );
}
