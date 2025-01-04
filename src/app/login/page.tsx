"use client"

import Layout from '@/components/Layout'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

const Login = () => {

  const {status} = useSession();

  const router = useRouter();

  if (status==="loading") {
    return (
      <div className='text-red-500'>Loading...</div>
    )
  }

  if (status === "authenticated") {
    router.push("/");
  }

  const onGoing = () => {
    toast.error("This didn't work.");
  }

  return (
    <Layout>
        <div className='bg-base-200 max-w-96 mx-auto p-2'>
            <div className='max-w-52 mx-auto text-white'>
            <div className='btn btn-error w-full mt-10 text-white' onClick={()=>signIn("google")}>Sign in with Google</div>
            <div className='btn btn-neutral w-full mt-10 text-white' onClick={onGoing}>Sign in with Github</div>
            <div className='btn btn-primary w-full mt-10 mb-10 text-white' onClick={onGoing}>Sign in with Facebook</div>
            </div>
        </div>
    </Layout>
  )
}

export default Login