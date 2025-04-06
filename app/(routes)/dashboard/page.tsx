"use client"
import Header from '@/app/_components/Header'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import React, { useEffect } from 'react'
import DashboardHeader from './_dashboardComp/DashboardHeader'
import FileList from './_dashboardComp/FileList'

type Props = {}

const Dashboard = (props: Props) => {
  document.title = 'Dashboard | Boardify'

  const convex = useConvex();
  const {user} : any = useKindeBrowserClient();
  //const getUser = useQuery(api.user.getUser, {email: user?.email});
  const createUser = useMutation(api.user.createUser)
  
  const checkUser = async() => {
    const result = await convex.query(api.user.getUser, {email: user?.email});
    if(!result.length){
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture
      }).then((res) => {
        console.log(res)
      })
    }
  }

  useEffect(() => {
    if(user){
      checkUser();
    }
  }, [user]);

  return (
    <>
      <DashboardHeader />
      <FileList />
    </>
  )
}

export default Dashboard