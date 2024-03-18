import Image from "next/image";
import React from "react";

const EmpreendimentoCard = ({ data }: { data: any }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const POPULATE_PARAM = process.env.POPULATE_PARAM;

  console.log(data);

  return (
    <div key={data.id} className="relative">
      <Image
        src={`${BASE_URL}${data.attributes.fachada.data.attributes.url}`}
        alt={data.attributes.hash}
        className="w-96 h-[520px] object-cover transition"
        width={400}
        height={400}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-bg" />

      <div className="absolute bottom-0 p-5 flex flex-col gap-5">
        <h2 className="text-white font-bold text-3xl">
          {data.attributes.title}
        </h2>
        <span className="text-white font-medium">
          {data.attributes.subtitle}
        </span>
      </div>
    </div>
  );
};

export default EmpreendimentoCard;
