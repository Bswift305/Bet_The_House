// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import NFLPage from './pages/NFLPage';
import NCAA from './pages/NCAA';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nfl" element={<NFLPage />} />
          <Route path="ncaa" element={<NCAA />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

