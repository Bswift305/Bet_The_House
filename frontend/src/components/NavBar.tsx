'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Odds', href: '/odds' },
  { name: 'Stats', href: '/stats' },
  { name: 'About', href: '/about' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600 tracking-wider">🏈 Bet The House</h1>
        <div className="flex space-x-6">
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={`hover:text-red-500 transition-colors ${
                pathname === href ? 'text-red-500 font-semibold' : ''
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
