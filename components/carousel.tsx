import React, { useEffect, useRef, useState } from 'react';

import BackgroundVideo from 'next-video/background-video';
import Tour from '@/videos/tour.mp4';

import { Imovel, useImoveis } from '@/contexts/imoveis-context';
import Image from 'next/image';
import Link from 'next/link';

const CarouselHero = ({ imovel }: { imovel: Imovel }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { quantityImoveis } = useImoveis();
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  const imoveisData = quantityImoveis(5)[randomNumber];

  const getRandomImages = (i: number) => {
    const images = imoveisData.attributes.main_gallery.data[i].attributes.url;
    return images;
  };

  return (
    <Link
      href={`/empreendimentos/${imoveisData.attributes.slug}/${imoveisData.id}`}
    >
      <div className="md:-mr-[445px] flex gap-4 overflow-hidden">
        <div className="relative w-full md:min-w-[297px] md:h-[474px] h-[400px]">
          {/* REMOVER OU ACRESCENTAR DE ACORDO COM O GOSTO */}
          <Image
            src={`${BASE_URL}${imoveisData.attributes.fachada.data.attributes.url}`}
            alt={imoveisData.attributes.title}
            width={500}
            height={500}
            className="active w-full h-full rounded-xl object-cover bg-center "
          />

          {/* <BackgroundVideo
            src={Tour}
            poster={imovel.attributes.fachada.data.attributes.url}
            className=" object-cover "
          ></BackgroundVideo> */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-bg-reversed rounded-lg" />
          <div className="absolute top-0 p-5 flex flex-col gap-2">
            <h2 className="text-white font-bold text-xl">
              {`${imoveisData.attributes.title}`}
            </h2>
            <span className="text-white font-medium text-sm">
              {`${imoveisData.attributes.subtitle}`}
            </span>
          </div>
        </div>

        {/* TODO: MELHORAR TRANSFORMANDO AS IMAGENS EM IMGS RANDOMICAS E NIMAÇÕES PARA O LADO COM GSAP */}
        <div className="hidden md:block relative w-[197px] h-[474px]">
          <Image
            src={`${BASE_URL}${getRandomImages(1)}`}
            alt={imoveisData.attributes.title}
            width={600}
            height={600}
            className="active w-full h-full rounded-xl object-cover bg-center "
          />

          <div className="absolute top-0 left-0 w-full h-full bg-gradient-bg rounded-lg" />
        </div>
        <div className="hidden md:block  relative w-[197px] h-[474px]">
          <Image
            src={`${BASE_URL}${getRandomImages(3)}`}
            alt={imoveisData.attributes.title}
            width={600}
            height={600}
            className="active w-full h-full rounded-xl object-cover bg-center "
          />

          <div className="absolute top-0 left-0 w-full h-full bg-gradient-bg rounded-lg" />
        </div>
        <div className="hidden md:block relative w-[197px] h-[474px]">
          <Image
            src={`${BASE_URL}${getRandomImages(7)}`}
            alt={imoveisData.attributes.title}
            width={600}
            height={600}
            className="active w-full h-full rounded-xl object-cover bg-center "
          />

          <div className="absolute top-0 left-0 w-full h-full bg-gradient-bg rounded-lg" />
        </div>
      </div>
    </Link>
  );
};

export default CarouselHero;
