"use client"
import { LoginLink, LogoutLink, RegisterLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React, {createContext, useEffect} from 'react'

type Props = {}

const Header = (props: Props) => {
    const {user} = useKindeBrowserClient();

    useEffect(() => {
        console.log("USER IN HEADER :", user);
    }, [user]);

  return (
    <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <a className="block text-teal-600" href="#">
            <span className="sr-only">Home</span>
            <Image alt='logo' src={'/logo-black.png'} height={150} width={150} />
            </a>

            <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-md">
                    <li>
                        <a className="text-white-500 transition hover:text-white-500/75" href="#"> Product </a>
                    </li>

                    <li>
                        <a className="text-white-500 transition hover:text-white-500/75" href="#"> Solutions </a>
                    </li>

                    <li>
                        <a className="text-white-500 transition hover:text-white-500/75" href="#"> Pricing </a>
                    </li>
                </ul>
            </nav>

            <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                    {
                        user ?
                            <div
                                className="hidden rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white border-1 transition sm:block"
                            >
                                <LogoutLink>
                                    Logout
                                </LogoutLink>
                            </div>
                            :
                            <>
                                <div
                                    className="block rounded-md bg-white-600 px-5 py-2.5 text-sm font-medium border-1 border-white text-black transition hover:border-1 hover:border-black"
                                >
                                    <LoginLink postLoginRedirectURL='/dashboard'>
                                        Login
                                    </LoginLink>
                                </div>

                                <div
                                    className="hidden rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white border-1 transition sm:block"
                                >
                                    <RegisterLink postLoginRedirectURL='/dashboard'>
                                        Register
                                    </RegisterLink>
                                </div>
                        </>
                    }
                   
                </div>

                <button
                    className="block rounded-sm bg-gray-100 p-2.5 cursor-pointer text-gray-600 transition hover:text-gray-600/75 md:hidden"
                >
                <span className="sr-only">Toggle menu</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </button>
            </div>
            </div>
        </div>
    </header>
  )
}

export default Header