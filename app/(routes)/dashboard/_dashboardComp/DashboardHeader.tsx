import { Input } from '@/components/ui/input'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Props = {}

const DashboardHeader = (props: Props) => {
    const {user}:any = useKindeBrowserClient();

  return (
    <div className='flex justify-end w-full p-6 gap-3 items-center'>
        <div className='flex gap-2 items-center p-2 w-[40%] border-1 rounded-md'>
            <Search className='h-5 w-5' />
            <input className='w-[100%] outline-0' type='text' placeholder='Search' />
        </div>

        <div>
            {
                user && 
                <Image className='rounded-full border-2 border-black cursor-pointer' src={user?.picture} alt='user' width={40} height={40} />
            }
        </div>
        
        <Button className='flex gap-2 items-center h-8 cursor-pointer'>
            <Send />
            Invite
        </Button>
    </div>
  )
}

export default DashboardHeader