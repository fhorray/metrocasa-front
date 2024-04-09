import React from 'react';

import { Imovel } from '@/contexts/imoveis-context';

import Image from 'next/image';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

import { useMediaQuery } from 'react-responsive';

import { Gallery } from 'react-grid-gallery';

// LIGHTBOX
import Lightbox, {
  FullscreenRef,
  SlideshowRef,
  ThumbnailsRef,
  ZoomRef,
} from 'yet-another-react-lightbox';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

// Import Swiper styles
import 'swiper/css';
import { Title } from '@/components/title';

export const Plantas = ({ imovel }: { imovel: Imovel }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const isMobile = useMediaQuery({ query: '(max-width: 690px)' });

  const slideshowRef = React.useRef<SlideshowRef>(null);
  const zoomRef = React.useRef<ZoomRef>(null);
  const fullscreenRef = React.useRef<FullscreenRef>(null);
  const thumbnailsRef = React.useRef<ThumbnailsRef>(null);

  const [openLightBox, setOpenLightBox] = React.useState(false);
  const allImages = imovel.attributes.planta_comp.map((planta) => [
    planta.planta_image.data.attributes.url,
    planta.planta_image.data.attributes.height,
    planta.planta_image.data.attributes.url,
    planta.planta_title,
  ]);

  const allImagesMapped = allImages.map((url) => ({
    src: `${BASE_URL}${url[0]}`,
    alt: 'Planta',
    height: Number(url[1]),
    width: Number(url[2]),
    // thumbnailCaption: url[3],  Titulo da Planta
  }));

  const slides = allImagesMapped.map(({ src, width, height }) => ({
    src: src,
    width,
    height,
  }));

  const handleClick = (index: number) => setIndex(index);
  const [index, setIndex] = React.useState(-1);

  return (
    <section className="w-full px-[15px] md:px-0 py-24">
      <div className="w-full">
        <Title subtitle="Veja mais" title="Plantas" />

        <div className="w-full max-w-[1216px] mx-auto">
          {/* TODO: Alterar Galeria para uma proria e remover a dependencia 'react-grid-gallery
' */}
          <Gallery
            images={allImagesMapped}
            onClick={handleClick}
            enableImageSelection={false}
            maxRows={5}
            rowHeight={150}
            tagStyle={{ height: 150, width: 150 }}
            tileViewportStyle={
              isMobile
                ? {
                    width: '100%',
                    height: '100%',
                  }
                : {
                    width: '100%',
                    maxWidth: 580,
                    height: '100%',
                  }
            }
            thumbnailStyle={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              border: '2px solid #c6c6c6',
              cursor: 'pointer',
              borderRadius: 10,
            }}
          />

          <Lightbox
            plugins={[Slideshow, Thumbnails, Fullscreen, Zoom]}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={slides}
            fullscreen={{ ref: fullscreenRef }}
            zoom={{ ref: zoomRef }}
            slideshow={{ ref: slideshowRef }}
            thumbnails={{ ref: thumbnailsRef }}
            on={{
              click: () => {
                (thumbnailsRef.current?.visible
                  ? thumbnailsRef.current?.hide
                  : thumbnailsRef.current?.show)?.();
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};
