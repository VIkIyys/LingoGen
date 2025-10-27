import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Translator from "./components/Translator";
import RandomStringGenerator from "./components/RandomStringGenerator";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        {/* Navbar */}
        <nav className="flex justify-center space-x-6 bg-white/10 backdrop-blur-md py-4 shadow-md">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg hover:bg-white/20 transition font-semibold"
          >
            🌍 Translator
          </Link>
          <Link
            to="/random"
            className="px-4 py-2 rounded-lg hover:bg-white/20 transition font-semibold"
          >
            🎲 Random Generator
          </Link>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Translator />} />
          <Route path="/random" element={<RandomStringGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}
