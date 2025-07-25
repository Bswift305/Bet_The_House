import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'NFL', path: '/nfl' },
  { name: 'NCAA', path: '/ncaa' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 shadow-md flex space-x-6">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `text-lg font-semibold hover:text-red-500 transition ${
              isActive ? 'text-red-500 underline' : ''
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
