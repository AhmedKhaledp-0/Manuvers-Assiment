import { useState, useEffect } from "react";
import { BlockMath } from "react-katex";
import { HohmannGraph, BiEllipticGraph } from "../components/TransferGraphs";

function Home() {
  const [showAlert, setShowAlert] = useState(true);

  // Auto-hide alert after 10 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="prose max-w-none relative">
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-11/12 max-w-lg mx-auto animate-fade-in bg-gradient-to-br from-purple-900 to-fuchsia-900 text-white p-6 rounded-xl shadow-2xl border border-purple-400/30 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-purple-500/20 p-3 rounded-full">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Academic Project - SNS419
                </h3>
                <p className="text-lg text-purple-200 mb-1">
                  Orbital Maneuvers
                </p>
                <p className="text-md text-purple-300 mb-1">By Ahmed Khaled</p>
                <p className="text-sm text-purple-400">
                  Supervised by DR. Mohammed Elfran
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/AhmedKhaledp-0/Manuvers-Assiment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md flex items-center gap-2 transition-colors text-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  View on GitHub
                </a>
                <button
                  onClick={() => setShowAlert(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors text-sm"
                >
                  Continue to App
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Orbital Transfer Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Advanced Orbital Mechanics Analysis Tool
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-800">
            Course Project Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-700">
                Project Details
              </h3>
              <ul className="list-none pl-0 space-y-1">
                <li>
                  <strong>Course:</strong> Maneuvers
                </li>
                <li>
                  <strong>Student:</strong> Ahmed Khaked
                </li>
                <li>
                  <strong>Supervisor:</strong> DR. Mohammed Elfran
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-purple-700">
                Implemented Methods
              </h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Hohmann Transfer (Circular Orbits)</li>
                <li>Non-Circular Hohmann Transfer</li>
                <li>Bi-Elliptic Transfer</li>
                <li>ΔV Optimization Analysis</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Core Equations
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Angular Momentum</h3>
                <BlockMath>{`h = r \\times v = \\sqrt{\\mu a(1-e^2)}`}</BlockMath>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Vis-viva Equation</h3>
                <BlockMath>{`v^2 = \\mu(\\frac{2}{r} - \\frac{1}{a})`}</BlockMath>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Transfer Calculations
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Angular Momentum Transfer
                </h3>
                <BlockMath>{`h_1 = \\sqrt{2\\mu}\\sqrt{\\frac{r_ar_a'}{r_a + r_a'}}`}</BlockMath>
                <BlockMath>{`h_2 = \\sqrt{2\\mu}\\sqrt{\\frac{r_pr_p'}{r_p + r_p'}}`}</BlockMath>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Orbit Visualization
          </h2>
        </div>

        <div className="space-y-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
              Hohmann Transfer Analysis
            </h2>
            <div className="w-full overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="w-full min-w-[300px] h-[400px] md:h-[500px]">
                <HohmannGraph />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
              Bi-elliptic Transfer Analysis
            </h2>
            <div className="w-full overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="w-full min-w-[300px] h-[400px] md:h-[500px]">
                <BiEllipticGraph />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
