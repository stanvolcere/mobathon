"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      className="text-sm font-medium hover:text-primary hover:bg-red-200"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
