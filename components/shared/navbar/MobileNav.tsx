/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedOut } from '@clerk/nextjs';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { sidebarLinks } from '@/constants';

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className='flex h-full flex-col gap-6 pt-16'>
      {sidebarLinks.map((sidebarLink) => {
        const isActive =
          (pathname.includes(sidebarLink.route) &&
            sidebarLink.route.length > 1) ||
          pathname === sidebarLink.route;

        return (
          <SheetClose asChild key={sidebarLink.route}>
            <Link
              href={sidebarLink.route}
              className={`${isActive ? 'primary-gradient text-light-900 rounded-lg' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={sidebarLink.imgURL}
                alt={sidebarLink.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                {sidebarLink.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src='/assets/icons/hamburger.svg'
          width={36}
          height={36}
          alt='menu'
          className='invert-colors sm:hidden'
        />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='background-light900_dark200 border-none'
      >
        <Link href='/' className='flex items-center gap-1'>
          <Image
            src='/assets/images/site-logo.svg'
            width={23}
            height={23}
            alt='DevFlow'
          />
          <p className='h2-bold text-dark100_light900 font-spaceGrotesk '>
            Dev<span className='text-primary-500'>Flow</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className='flex flex-col gap-3'>
              <SheetClose asChild>
                <Link href='/sign-in'>
                  <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 font-semibold shadow-none'>
                    <span className='primary-text-gradient'>Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href='/sign-up'>
                  <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 font-semibold shadow-none'>
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
