"use client"
import React, { useState } from 'react'
import { Archive, Flag, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'


type Props = {}

const SideBottomSection = ({createNewFile, totalFiles} : {createNewFile: any, totalFiles: any}) => {
  const menuList = [
    {
      id:1,
      name: 'Getting Started',
      icon: Flag,
      path:''
    },
    {
      id:2,
      name: 'Github',
      icon: Github,
      path:''
    },
    {
      id:3,
      name: 'Archive',
      icon: Archive,
      path:''
    },
  ];

  const [fileInput, setFileInput] = useState('')

  return (
    <div className='flex flex-col gap-2'>
      {
        menuList.map((menu, index) => (
          <div key={index} className='flex gap-2 p-3 rounded-md cursor-pointer items-center bg-gray-100 hover:bg-black hover:text-white'>
            <menu.icon size={20} />
            <h2 className='text-sm font-semibold'>{menu.name}</h2>
          </div>
        ))
      }

      {/* ADD NEW FILE BUTTON */}
      <Dialog>
        <DialogTrigger asChild className='w-full'>
            <Button disabled={totalFiles === 5}  className='w-full cursor-pointer justify-start mt-3'>
              New File
            </Button>
        </DialogTrigger>

        <DialogContent className='w-full'>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
                <Input onChange={(e) => setFileInput(e.target.value)} className='mt-10' placeholder='Enter File Name (Atleast 4 characters)' />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => createNewFile(fileInput)} disabled={!(fileInput && fileInput.length>3)} className='cursor-pointer'>
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      

      {/* PROGRESS BAR */}
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
        <div
          className={`h-4 rounded-full bg-red-500`}
          style={{ width: `${(totalFiles / 5) * 100}%` }}
        ></div>
      </div>


      <h2 className='text-sm font-semibold'>{totalFiles} out of 5 files are created.</h2>
      <h2 className='text-sm font-light'>Upgrade your plan for unlimited access.</h2>
    </div>
  )
}

export default SideBottomSection