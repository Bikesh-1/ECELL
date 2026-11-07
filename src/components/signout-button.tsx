"use client";
import {signOut} from "next-auth/react";
export default function SignOutButton(){return <button type="button" onClick={()=>signOut({callbackUrl:"/"})} style={{border:0,background:"transparent",cursor:"pointer"}}>Sign out</button>;}