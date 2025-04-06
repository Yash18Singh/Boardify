"use client"
import Image from 'next/image'
import React, {useContext, useEffect, useState} from 'react'
import SideTopSection from './SideTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import SideBottomSection from './SideBottomSection'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { FileListContext } from '@/app/_context/FilesListContext'



type Props = {}

const SideNav = (props: Props) => {
  const {user} : any = useKindeBrowserClient();
  const [activeTeamInfo, setActiveTeamInfo] = useState<any>();
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const {fileList, setFileList} = useContext(FileListContext);

  const createFile = useMutation(api.files.createFile);
  
  const createNewFile = (fileName : any) => {
    createFile({
      fileName: fileName,
      teamId:activeTeamInfo._id,
      createdBy: user?.email,
      archive: false,
      document: '',
      whiteboard: '',
    }).then((res) => {
      if(res){
        getFiles();
        toast('File created successfully!');
      }
    },(e) => {
      toast("Error while creating file");
    })
  }

  const getFiles = async() => {
    if(activeTeamInfo){
      const result = await convex.query(api.files.getFiles, {teamId: activeTeamInfo?._id})
      // console.log('TEAM INFO :', result);
      setFileList(result);
      setTotalFiles(result?.length);
    }
  }

  useEffect(() => {
    getFiles();
  }, [activeTeamInfo]);

  return (
    <div className='bg-gray-30 h-screen fixed w-72 border-r p-6 flex flex-col'>
       <div className='flex-1'>
          <SideTopSection setActiveTeamInfo={setActiveTeamInfo} user={user} />
       </div>
       

       <div>
          <SideBottomSection totalFiles={totalFiles} createNewFile={createNewFile} />
       </div>
    </div>
  )
}

export default SideNav