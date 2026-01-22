"use client";

import Image from 'next/image';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

function Header() {

  const {user} = useUser();
  return (
    <div className='flex items-center justify-between p-10'>
       <div className='flex gap-2 items-center'>
           <Image src={'/logo.png'} alt="Logo" width={100} height={100} />
           <h2 className='text-xl font-bold'>AI <span className='text-yellow-500'> Code </span> Box</h2>
       </div>

       <ul className='flex gap-8 mr-5 items-center'>
        <li className='text-lg hover:text-yellow-500 font-medium cursor-pointer'>Blank 1</li>
        <li className='text-lg hover:text-yellow-500 font-medium cursor-pointer'>Blank 2</li>
        <li className='text-lg hover:text-yellow-500 font-medium cursor-pointer'>Blank 3</li>
       </ul>

        {user?
            <UserButton /> :
            <SignInButton mode='modal'>
                <Button variant="outline">Get Started</Button>
            </SignInButton> 

        }
    </div>
  )
}

export default Header