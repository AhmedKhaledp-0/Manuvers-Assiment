import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import HohmannTransfer from "./pages/HohmannTransfer";
import BiEllipticTransfer from "./pages/BiEllipticTransfer";
import DeltaVComparison from "./pages/DeltaVComparison";
import HohmannNonCircle from "./pages/HohmannNonCircle";
import "katex/dist/katex.min.css";
import ReferenceProblems from "./pages/ReferenceProblems";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex-1 overflow-x-auto">
                <div className="flex justify-between items-center w-full  space-x-2 sm:space-x-4 md:space-x-8 whitespace-nowrap px-2">
                  <Link
                    to="/"
                    className="flex-shrink-0 flex items-center px-2 py-2 text-sm sm:text-base text-gray-700 hover:text-blue-600"
                  >
                    Home
                  </Link>
                  <Link
                    to="/hohmann"
                    className="flex-shrink-0 flex items-center px-2 py-2 text-sm sm:text-base text-gray-700 hover:text-blue-600"
                  >
                    Hohmann Transfer
                  </Link>
                  <Link
                    to="/bi-elliptic"
                    className="flex-shrink-0 flex items-center px-2 py-2 text-sm sm:text-base text-gray-700 hover:text-blue-600"
                  >
                    Bi-Elliptic Transfer
                  </Link>
                  <Link
                    to="/comparison"
                    className="flex-shrink-0 flex items-center px-2 py-2 text-sm sm:text-base text-gray-700 hover:text-blue-600"
                  >
                    ΔV Comparison
                  </Link>
                  <Link
                    to="/hohmann-non-circle"
                    className="flex-shrink-0 flex items-center px-2 py-2 text-sm sm:text-base text-gray-700 hover:text-blue-600"
                  >
                    Hohmann Non-Circle
                  </Link>
                  <Link
                    to="/refrence-problems"
                    className="flex-shrink-0 flex items-center px-2 py-2 text-sm sm:text-base text-gray-700 hover:text-blue-600"
                  >
                    Refrence Problems
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hohmann" element={<HohmannTransfer />} />
            <Route path="/bi-elliptic" element={<BiEllipticTransfer />} />
            <Route path="/comparison" element={<DeltaVComparison />} />
            <Route path="/hohmann-non-circle" element={<HohmannNonCircle />} />
            <Route path="/refrence-problems" element={<ReferenceProblems />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
