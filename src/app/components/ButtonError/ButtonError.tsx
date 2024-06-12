"use client"
import { signOut } from "next-auth/react"
import Link from "next/link"
import React from 'react'

export default function ButtonError() {

  const signOutSession = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <Link href={"/"} onClick={ () => signOutSession()} className='text-gray-100 hover:underline text-sm rounded-md font-medium'>Volver a inicio</Link>
  )
}
