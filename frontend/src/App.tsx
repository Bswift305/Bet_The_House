// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NFLPage from './pages/NFLPage';
import NCAA from './pages/NCAA';
import About from './pages/About';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white font-sans">
        <Navbar />
        <main className="p-4 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nfl" element={<NFLPage />} />
            <Route path="/ncaa" element={<NCAA />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
