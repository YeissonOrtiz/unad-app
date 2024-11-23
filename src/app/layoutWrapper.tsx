import React from 'react';
import Link from 'next/link';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">My App</div>
        <nav className="space-x-4">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/tutorials" className="hover:underline">
            Tutorials
          </Link>
          <Link href="/integrations-tools" className="hover:underline">
            Integrations & Tools
          </Link>
        </nav>
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
};

export default LayoutWrapper;