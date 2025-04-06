"use client"
import { FileListContext } from '@/app/_context/FilesListContext'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import { Ellipsis, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

type Props = {};

export interface FILE{
    archive: boolean,
    createdBy: string,
    document: string,
    fileName: string,
    teamId: string,
    whiteBoard: string,
    _id: string,
    _creationTime: number,
}

const FileList = (props: Props) => {
    const {fileList, setFileList} = useContext(FileListContext);
    const [files, setFiles] = useState<any>(null);
    const {user}:any = useKindeBrowserClient();
    const router = useRouter();
    const convex = useConvex();
    const deleteFileById = useMutation(api.files.deleteFileById);
    

    const deleteFile = async (fileId: string) => {
        const result = await deleteFileById({ _id: fileId }); // ✅ Pass as an object
        console.log("RESULT ", result);
        setFileList(files.filter((file: FILE) => file._id !== fileId));
        toast('File deleted successfully!');
    };
    
    useEffect(() => {
        fileList && setFiles(fileList);
        console.log('FILES ',files);
    }, [fileList, files]);

  return (
    <div className='mt-6 justify-items-center'>
        <div className="overflow-x-auto w-[90%] rounded border border-gray-300 shadow-sm">
            <table className="min-w-full divide-y-2 divide-gray-200">
                <thead className="ltr:text-left rtl:text-right">
                    <tr className="*:font-medium *:text-gray-900">
                        <th className="px-3 py-2 whitespace-nowrap">File Name</th>
                        <th className="px-3 py-2 whitespace-nowrap">Created By</th>
                        <th className="px-3 py-2 whitespace-nowrap">Created At</th>
                        <th className="px-3 py-2 whitespace-nowrap">Edited</th>
                        <th className="px-3 py-2 whitespace-nowrap">Author</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        files?.map((file:FILE, index:number) => (
                            <tr onClick={() => router.push(`/workspace/${file._id}`)} key={file._id} className="*:text-gray-900 *:first:font-medium items-center justify-items-center cursor-pointer hover:bg-gray-100">
                                <td className="px-3 py-2 whitespace-nowrap">{file.fileName}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">{file.createdBy}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">{moment(file._creationTime).format('DD MMM YYYY')}</td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">{moment(file._creationTime).format('DD MMM YYYY')}</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <Image className='rounded-full' src={user?.picture} alt='user' width={40} height={40} />
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <Trash onClick={(e) => {
                                            e.stopPropagation(); // ⛔ Stop event from reaching <tr>
                                            deleteFile(file._id);
                                        }}  className='hover:bg-gray-300 rounded-full' 
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default FileList