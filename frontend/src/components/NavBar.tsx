// src/components/Navbar.tsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/nfl", label: "NFL" },
    { to: "/ncaa", label: "NCAA" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-lg px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-red-500 tracking-wide">Bet The House</h1>
      <div className="flex space-x-6">
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `text-sm font-medium hover:text-red-400 transition ${
                isActive ? "text-red-500 underline" : "text-gray-300"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
