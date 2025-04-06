"use client"
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex } from 'convex/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SideNav from './_dashboardComp/SideNav'
import { FileListContext } from '@/app/_context/FilesListContext'

type Props = {}

const DashboardLayout = ({children} : {children: React.ReactNode}) => {
    const {user} : any = useKindeBrowserClient();
    const [fileList, setFileList] = useState();
    const convex = useConvex();
    const router = useRouter();

    const checkTeam = async() => {
        const result = await convex.query(api.teams.getTeam, {email: user?.email})
        
        if(!result.length){
            router.push('/teams/create')
        }
    }

    useEffect(() => {
        user && checkTeam();
    }, [user]);

  return (
    <FileListContext.Provider value={{fileList, setFileList}}>
        <div>
            <div className='grid grid-cols-4'>
                <div className='h-screen w-72 fixed'>
                    <SideNav />
                </div>

                <div className='col-span-4 ml-72'>
                    {children}
                </div>
            </div>
        </div>
        
    </FileListContext.Provider>
    
  )
}

export default DashboardLayout