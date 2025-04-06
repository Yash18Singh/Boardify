'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


type Props = {}

const CreateTeams = (props: Props) => {
  const [teamName, setTeamName] = useState('');
  const createTeam = useMutation(api.teams.createTeam);
  const {user} : any = useKindeBrowserClient();
  const router = useRouter()

  const createNewTeam = () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.email
    }).then((res) => {
      console.log(res);

      if(res){
        showToast()
      }
    })
  }

  const showToast = () => {
    toast("New Team Created", {
      description: `Team Name: ${teamName}`,
    });
    router.push('/dashboard');
  }

  return (
    <div className='md:px-16 my-16'>
      <Image src='/logo-black.png' alt='logo' height={200} width={200} />

      <div className='flex flex-col items-center mt-20 md:mt-8'>
        <h1 className='font-bold text-[40px] py-3'>What should we call your team?</h1>
        <h2 className='text-gray-500'>You can always change this later from settings.</h2>

        <div className='mt-14 md:mt-7 md:w-[40%] w-[80%]'>
          <label className='text-gray-500 text-bold'>Team Name</label>
          <Input placeholder='Team Name...' className='mt-3' onChange={(e) => setTeamName(e.target.value)} />
        </div>
        <Button onClick={() => createNewTeam()} className='bg-black mt-9 md:w-[40%] w-[80%] cursor-pointer' disabled={!(teamName)}>
          Create Team
        </Button>
      </div>
    </div>
  )
}

export default CreateTeams