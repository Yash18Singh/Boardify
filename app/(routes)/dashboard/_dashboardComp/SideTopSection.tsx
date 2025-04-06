"use client"
import React, { useEffect, useState } from 'react'
import {ChevronDown, LayoutGrid, LogOut, Settings, TrashIcon, Users} from 'lucide-react'
import Image from 'next/image'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from 'next/navigation'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Separator } from "@/components/ui/separator"
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'

  

type Props = {}

export interface TEAM {
    createdBy: String,
    teamName: String,
    _id: String,
}

const SideTopSection = ({ user, setActiveTeamInfo }: { user: any; setActiveTeamInfo: (team: TEAM) => void }) => {
    const router = useRouter();
    const [teamList, setTeamList] = useState<TEAM[] | undefined>();
    const [activeTeam, setActiveTeam] = useState<any>();
    const deleteTeamById = useMutation(api.teams.deleteTeamById);
    const deleteAllTeamFiles = useMutation(api.files.deleteAllFilesByTeamId);

    useEffect(() => {
        if(user){
            getTeamList();
        }
    }, [user]);

    const convex = useConvex();
    const getTeamList = async() => {
        const result = await convex.query(api.teams.getTeam, {email: user?.email});
        setTeamList(result);
        setActiveTeam(result[0]);
    }

    const deleteTeam = async() => {
        const result1 = await deleteTeamById({ _id: activeTeam._id });
        const result2 = await deleteAllTeamFiles({_id: activeTeam._id});

        console.log("TEAM DELETED :", result1, result2);
        getTeamList();
    }


    useEffect(() => {
        activeTeam && setActiveTeamInfo(activeTeam);
        console.log('ACTIVE TEAM INFO :', activeTeam);
    }, [activeTeam]);

  return (
    <div>
        <Popover>
            <PopoverTrigger>
                <div className='flex justify-center items-center gap-3  hover:bg-gray-200 p-2 rounded-md cursor-pointer'>
                    <Image src='/logo-1.png' alt='logo' height={50} width={50} />
                    <div className='flex gap-2 items-center'>
                        <h1 className='font-bold'>{activeTeam?.teamName}</h1>
                        <ChevronDown />
                    </div>
                </div>
            </PopoverTrigger>

            <PopoverContent className='ml-6 p-8'>
                {/* TEAM SECTION */}
                <div className='flex flex-col gap-2'>
                    <h1 className='text-sm font-light'>{user?.given_name}'s Teams:</h1>
                    {
                        teamList?.map((team, index) => (
                            <div onClick={() => setActiveTeam(team)} key={index}>
                                <h2 className={`text-md font-semibold p-3 ${activeTeam?.teamName === team.teamName ? 'bg-black text-white' : 'bg-gray-100 text-black'} hover:bg-black hover:text-white cursor-pointer rounded-lg`}>{team.teamName}</h2>
                            </div>
                        ))
                    }
                </div>

                <Separator className='mt-2' />

                {/* OPTION SECTION */}
                <div className='mt-2'>
                    <div onClick={() => router.push('/teams/create')} className='flex gap-2 items-center cursor-pointer p-2 hover:bg-gray-100 rounded-lg'>
                        <Users className='h-4 w-4' />
                        <h2 className='text-sm'>Create Team</h2>
                    </div>

                    <div onClick={() => deleteTeam()}  className='flex gap-2 items-center cursor-pointer p-2 hover:bg-gray-100 rounded-lg'>
                        <TrashIcon className='h-4 w-4' />
                        <h2 className='text-sm'>Delete Team</h2>
                    </div>

                    <LogoutLink>
                        <div className='flex gap-2 items-center cursor-pointer p-2 hover:bg-gray-100 rounded-lg'>
                            <LogOut className='h-4 w-4' />
                            <h2 className='text-sm'>Logout</h2>
                        </div>
                    </LogoutLink>
                </div>
                <Separator className='mt-2' />

                {/* USER INFO SECTION */}
                {
                    user && 
                    <div className='flex gap-3 mt-2 cursor-pointer items-center'>
                        <Image className='rounded-4xl border-2 border-black' src={user?.picture} alt='user' height={50} width={50} />
                        <div>
                            <h2 className='font-bold'>{user?.given_name} {user?.family_name}</h2>
                            <h3 className='text-xs text-gray-500'>{user?.email}</h3>
                        </div>
                        
                    </div>
                }
               
            </PopoverContent>
        </Popover>

        {/* ALL FILE BUTTON */}
        <Button className='w-full mt-8 justify-start gap-2 rounded-md cursor-pointer'>
            <LayoutGrid className='h-5 w-5' />
            All Files
        </Button>
    </div>
  )
}

export default SideTopSection