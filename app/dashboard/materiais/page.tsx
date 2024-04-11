'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { List } from './_components/list';
import { useImoveis } from '@/contexts/imoveis-context';
import { Loader2Icon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import Cookies from 'js-cookie';

const Materiais = () => {
  const { imoveis } = useImoveis();

  // const searchParams = useSearchParams();
  // const search = searchParams.get('search');

  return (
    <section className="bg-tertiary-black w-full flex flex-col lg:pl-[400px] min-h-screen n md:p-14 p-10">
      <h1 className="text-3xl font-bold text-main-red md:mb-[15px]">
        Materiais
      </h1>
      {imoveis.length ? (
        //TODO: ADD A SKELETON IF NEEDED
        <Suspense>
          <List imoveis={imoveis} />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2Icon className="animate-spin w-8 h-8 text-main-red" />
        </div>
      )}
    </section>
  );
};

export default Materiais;
