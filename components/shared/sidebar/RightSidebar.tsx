/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RenderTag from '../RenderTag';

const fakeQuestions = [
  {
    _id: '1',
    title: 'How do I use express as custom server in NextJS?',
  },
  {
    _id: '2',
    title:
      'Would it be appropriate to point out an error in another paper during a referee report?',
  },
  {
    _id: '3',
    title: 'How can an airconditioning machine exist?',
  },
  {
    _id: '4',
    title: 'Low digit addition generator',
  },
  {
    _id: '5',
    title: 'What is an example of 3 numbers that do not make up a vector?',
  },
];

const fakeTags = [
  {
    _id: '1',
    name: 'JavaScript',
    totalQuestions: 5,
  },
  {
    _id: '2',
    name: 'React',
    totalQuestions: 2,
  },
  {
    _id: '3',
    name: 'Next',
    totalQuestions: 3,
  },
  {
    _id: '4',
    name: 'MongoDB',
    totalQuestions: 1,
  },
  {
    _id: '5',
    name: 'Express',
    totalQuestions: 2,
  },
];

const RightSidebar = () => {
  return (
    <section className='background-light900_dark200 light-border custom-scrollbar shadow-light-300 sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 max-xl:hidden dark:shadow-none'>
      <div>
        <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {fakeQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className='flex cursor-pointer items-center justify-between gap-7'
            >
              <p className='body-medium text-dark500_light700'>
                {question.title}
              </p>
              <Image
                src='/assets/icons/chevron-right.svg'
                alt='chevron right'
                width={20}
                height={20}
                className='invert-colors'
              />
            </Link>
          ))}
        </div>
      </div>
      <div className='mt-16'>
        <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
        <div className='mt-7 flex flex-col gap-4'>
          {fakeTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
