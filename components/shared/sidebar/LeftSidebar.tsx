/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

import { sidebarLinks } from '@/constants';

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <section className='background-light900_dark200 light-border shadow-light-300 custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-[266px] dark:shadow-none'>
      <div className='flex flex-1 flex-col gap-6'>
        {sidebarLinks.map((sidebarLink) => {
          const isActive =
            (pathname.includes(sidebarLink.route) &&
              sidebarLink.route.length > 1) ||
            pathname === sidebarLink.route;

          return (
            <Link
              href={sidebarLink.route}
              className={`${isActive ? 'primary-gradient text-light-900 rounded-lg' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}
              key={sidebarLink.route}
            >
              <Image
                src={sidebarLink.imgURL}
                alt={sidebarLink.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p
                className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}
              >
                {sidebarLink.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className='flex flex-col gap-3'>
          <Link href='/sign-in'>
            <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 font-semibold shadow-none'>
              <Image
                src='/assets/icons/account.svg'
                alt='login'
                width={20}
                height={20}
                className='invert-colors lg:hidden'
              />
              <span className='primary-text-gradient max-lg:hidden'>
                Log In
              </span>
            </Button>
          </Link>

          <Link href='/sign-up'>
            <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 font-semibold shadow-none'>
              <Image
                src='/assets/icons/sign-up.svg'
                alt='signup'
                width={20}
                height={20}
                className='invert-colors lg:hidden'
              />
              <span className='max-lg:hidden'>Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
