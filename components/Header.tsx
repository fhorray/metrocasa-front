'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { links } from '@/constants';
import { Button } from '@/components/ui/button';
import { Sidebar } from './sidebar';

export const Header = () => {
  const router = useRouter;

  return (
    <header className="max-w-[1216px] mx-auto bg-slate-50 py-5 flex justify-between p-5 items-center h-[100px] border-b-2 border-slate-100">
      <Link href={'/'}>
        <Image
          src={'logo-red.svg'}
          alt="Logo metrocasa"
          width={215}
          height={100}
          priority
          className="w-[200px] md:w-[230px]"
        />
      </Link>
      <nav className="hidden lg:flex justify-between items-center">
        <ul className="p-5 flex gap-7 font-bold items-center">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-primary-dark hover:text-main-red p-5 py-7 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <Button variant="primary" size={'lg'}>
            Fazer Simulação
          </Button>
        </ul>
      </nav>

      <div className="lg:hidden">
        <Sidebar />
      </div>
    </header>
  );
};