import { Button } from '@/components/ui/button'
import { ChevronLast, ChevronLeft, Link, Save, SkipBackIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const WorkspaceHeader = ({saveDocument, fileName} : any) => {
  const router = useRouter();

  return (
    <div className='p-3 border-b flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
            <ChevronLeft onClick={() => router.back()} className='h-8 w-8 cursor-pointer' />
            <Image alt='logo' src={'/logo-1.png'} height={700} width={70} />
            <h2 className='text-xl font-bold'>{fileName}</h2>
        </div>

        <div className='flex gap-5'>
          <Button onClick={() => saveDocument()} className='h-8 gap-2 cursor-pointer items-center'>
              Save 
              <Save className='h-4 w-4' />
          </Button>

          <Button className='h-8 gap-2 cursor-pointer items-center bg-white text-black border-1 hover:bg-black hover:text-white'>
              Share 
              <Link className='h-4 w-4' />
          </Button>
        </div>
       
    </div>
  )
}

export default WorkspaceHeader