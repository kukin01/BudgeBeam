// 'use client'
import React from 'react';
const image = '/images/login.jpg';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-[url("/images/login.jpg")] bg-no-repeat bg-cover h-screen flex items-center justify-center'>
      {children}
    </div>);
}
