import Layout from '@/components/Layout'
import React from 'react'

const Login = () => {
  return (
    <Layout>
        <div className='bg-base-200 max-w-96 mx-auto p-2'>
            <div className='max-w-52 mx-auto text-white'>

            <div className='btn btn-error w-full mt-10 text-white'>Sign in with Google</div>
            <div className='btn btn-neutral w-full mt-10 text-white'>Sign in with Github</div>
            <div className='btn btn-primary w-full mt-10 mb-10 text-white'>Sign in with Facebook</div>
            </div>
        </div>
    </Layout>
  )
}

export default Login