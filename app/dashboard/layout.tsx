'use client';

import { ptBR } from '@clerk/localizations';

import { Header } from './_components/header';
import { Sidebar } from './_components/sidebar';

import { usePathname } from 'next/navigation';
import { UserProvider } from '@/contexts/user-context';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  return (
    <UserProvider>
      <main className="bg-tertiary-black">
        {path === '/dashboard' ||
        path === '/dashboard/materiais' ||
        path === '/dashboard/evolucao-de-obras' ||
        path === '/dashboard/blog' ||
        path === '/dashboard/profile' ||
        path === '/dashboard/linkX' ? (
          <Sidebar />
        ) : null}

        <Header />
        {children}
      </main>
    </UserProvider>
  );
};

export default DashboardLayout;
