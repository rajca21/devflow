/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import React from 'react';
import Image from 'next/image';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';

import { useTheme } from '@/context/ThemeProvider';
import { themes } from '@/constants';

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className='relative border-none bg-transparent shadow-none'>
      <MenubarMenu>
        <MenubarTrigger className='focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200'>
          {mode === 'light' ? (
            <Image
              src='/assets/icons/sun.svg'
              width={20}
              height={20}
              className='active-theme cursor-pointer'
              alt='sun'
            />
          ) : (
            <Image
              src='/assets/icons/moon.svg'
              width={20}
              height={20}
              className='active-theme cursor-pointer'
              alt='moon'
            />
          )}
        </MenubarTrigger>
        <MenubarContent className='dark:border-dark-400 dark:bg-dark-300 absolute -right-12 mt-3 min-w-[120px] rounded border py-2'>
          {themes.map((theme) => (
            <MenubarItem
              key={theme.value}
              className='dark:focus:bg-dark-400 flex cursor-pointer items-center gap-4 px-2.5 py-2'
              onClick={() => {
                setMode(theme.value);
                if (theme.value !== 'system') {
                  localStorage.theme = theme.value;
                } else {
                  localStorage.removeItem('theme');
                }
              }}
            >
              <Image
                src={theme.icon}
                alt={theme.value}
                width={16}
                height={16}
                className={`${mode === theme.value && 'active-theme'}`}
              />
              <p
                className={`body-semibold text-light-500 ${mode === theme.value ? 'text-primary-500' : 'text-dark100_light900'}`}
              >
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
