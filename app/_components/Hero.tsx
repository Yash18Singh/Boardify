"use client"
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'
import React, {createContext} from 'react'

type Props = {}

const Hero = (props: Props) => {
  return (
    <>
      <section className="bg-white lg:grid h-screen place-content-center justify-center align-middle">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Create Technical Designs
              <br/>
              <strong> & </strong>
              Documentation
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Deliver accurate, consistent designs faster
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <div
                className="inline-block rounded border  bg-black px-5 py-3 font-medium text-white shadow-sm transition-colors"
              >
                <Link href='/dashboard'>
                  Get Started
                </Link>
               
              </div>

              <a
                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero