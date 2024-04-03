'use client';

import React from 'react';
import EmpreendimentoCard from './EmpreendimentoCard';
import Link from 'next/link';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

import { useImoveis } from '@/contexts/imoveis-context';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { Title } from '../title';

interface IProps {
  region?: string | null;
  status?: string | null;
  search?: string | null;
}

const EmpreendimentoList = ({ search, region, status }: IProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 424px)' });

  const path = usePathname();

  const { imoveis, quantityImoveis } = useImoveis();

  const filteredImoveis = (
    paramTitle: string | null | undefined,
    paramNeighborhoods: string | null | undefined,
    paramStatus: string | null | undefined,
  ) => {
    // Transformar os parâmetros de filtro, se estiverem definidos
    const normalizedTitle = paramTitle
      ? paramTitle.trim().toLowerCase().normalize()
      : null;
    const normalizedNeighborhoods = paramNeighborhoods
      ? paramNeighborhoods.trim().toLowerCase().normalize()
      : null;
    const normalizedStatus = paramStatus
      ? paramStatus.trim().toLowerCase().normalize()
      : null;

    // Verificar se todos os filtros estão vazios
    if (!normalizedTitle && !normalizedNeighborhoods && !normalizedStatus) {
      // Se nenhum filtro estiver preenchido, retornar todos os imóveis
      return imoveis;
    }

    // Aplicar os filtros individualmente se estiverem preenchidos
    let filtered = [...imoveis];

    if (normalizedTitle) {
      filtered = filtered.filter((imovel) =>
        imovel.attributes.title
          ?.trim()
          .toLowerCase()
          .normalize()
          .includes(normalizedTitle),
      );
    }

    if (normalizedNeighborhoods) {
      filtered = filtered.filter(
        (imovel) =>
          imovel.attributes.neighborhoods?.trim().toLowerCase().normalize() ===
          normalizedNeighborhoods,
      );
    }

    if (normalizedStatus) {
      filtered = filtered.filter(
        (imovel) =>
          imovel.attributes.status?.trim().toLowerCase().normalize() ===
          normalizedStatus,
      );
    }

    return filtered;
  };

  return (
    <>
      {/* RENDERIZAR NA PAGINA HOME */}
      {path === '/' && (
        <section className="w-full pt-24 px-[15px] md:px-0">
          <Title
            title="Conheça seu novo Apartamento"
            subtitle="Seu mais novo"
          />

          <Swiper
            spaceBetween={isMobile ? 15 : 185}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            effect={isMobile ? 'fade' : ''}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1,
              },
              800: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1400: {
                slidesPerView: 5,
              },
            }}
            modules={[Autoplay, Pagination, EffectFade]}
          >
            {quantityImoveis(15).map((imovel, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={`/empreendimentos/${imovel.attributes.slug}/${imovel.id}`}
                >
                  <EmpreendimentoCard key={imovel.id} data={imovel} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* RENDER DA PAGINA EMPREENDIMENTOS */}
      {path.startsWith('/empreendimentos') && (
        <div className="flex gap-1 w-full flex-wrap">
          {filteredImoveis(search, region, status).map((imovel, index) => (
            <Link
              key={index}
              href={`/empreendimentos/${imovel.attributes.slug}/${imovel.id}`}
              className={`flex flex-1  ${
                search || region || (status && 'md:max-w-[350px]')
              }`}
            >
              <EmpreendimentoCard key={imovel.id} data={imovel} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default EmpreendimentoList;
