import { Imovel } from '@/contexts/imoveis-context';

import { Title } from '@/components/title';

export const MapsSection = ({ imovel }: { imovel: Imovel }) => {
  const { address_json } = imovel.attributes;
  return (
    <section className="w-full pb-24 px-[15px]">
      <iframe
        src={address_json?.src}
        width={address_json?.width}
        height={address_json?.height}
        className={address_json?.className}
        style={{ border: 0 }}
        loading={address_json?.loading}
      />
      <div className="w-full max-w-[1216px] mx-auto mb-20">
        <Title subtitle="Lorem Ipsum" title="Conheça a região" />

        <div
          dangerouslySetInnerHTML={{
            __html: imovel.attributes.about_the_region,
          }}
        />
      </div>
    </section>
  );
};