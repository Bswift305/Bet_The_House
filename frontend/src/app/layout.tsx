import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Bet The House',
  description: 'NFL & NCAA Football Betting Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans min-h-screen">
        <Navbar />
        <main className="p-4 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
