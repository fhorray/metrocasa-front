import { HeroSection } from '@/components/page-components/hero-section';
import { Header } from '@radix-ui/react-accordion';
import Image from 'next/image';

export default function ContatoPage() {
  return (
    <>
      <Header />
      <HeroSection title={'Entre Contato'} />
      <h1>Contato</h1>
    </>
  );
}
