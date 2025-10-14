"use client"
import { signIn } from "next-auth/react"
 
export function SignIn() {
  return (
    <button className="text-sm font-medium hover:text-primary hover:bg-slate-700" onClick={() => signIn("google", { redirectTo: "/" })}>
      Sign In
    </button>
  )
}