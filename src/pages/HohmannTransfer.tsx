import { useState, useEffect } from 'react';
import { BlockMath } from 'react-katex';
import { calculateHohmannTransfer } from '../utils/orbitalCalculations';

function HohmannTransfer() {
  const [r1, setR1] = useState<number>(7000);
  const [r2, setR2] = useState<number>(42000);
  const [results, setResults] = useState<any>(null);
  const [satellitePos, setSatellitePos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [finalOrbitAngle, setFinalOrbitAngle] = useState(0); // Add this new state

  const handleCalculate = () => {
    const results = calculateHohmannTransfer(r1, r2, 398600.4418);
    setResults(results);
  };

  // Scale orbits for visualization
  const scale = 400 / Math.max(r2, r1);
  const centerX = 400;
  const centerY = 400;

  // Position calculation effect
  useEffect(() => {
    if (!results) return;

    const step = animationStep / 100;
    let x = 0, y = 0;

    if (step < 1) {
      // Transfer orbit motion
      const transferAngle = step * Math.PI;
      const progress = Math.sin(step * Math.PI / 2);
      const radius = r1 * (1 - progress) + r2 * progress;
      x = radius * Math.cos(transferAngle);
      y = radius * Math.sin(transferAngle);
    } else {
      // Final orbit continuous motion
      const orbitAngle = finalOrbitAngle;
      x = r2 * Math.cos(orbitAngle);
      y = r2 * Math.sin(orbitAngle);
    }

    setSatellitePos({ 
      x: (x * scale) + centerX, 
      y: (y * scale) + centerY 
    });
  }, [animationStep, finalOrbitAngle, results, r1, r2, scale]);

  // Animation effect
  useEffect(() => {
    if (!isAnimating || !results) return;

    const interval = setInterval(() => {
      // Update animation step for transfer
      if (animationStep < 100) {
        setAnimationStep(prev => Math.min(prev + 0.5, 100));
      }

      // Always update the final orbit angle regardless of animation step
      setFinalOrbitAngle(prev => (prev + 0.02) % (2 * Math.PI));
    }, 20);

    return () => clearInterval(interval);
  }, [isAnimating, results, animationStep]);

  const handleReset = () => {
    setAnimationStep(0);
    setFinalOrbitAngle(0);
    setIsAnimating(false);
    setSatellitePos({ 
      x: centerX + (r1 * scale), 
      y: centerY 
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Hohmann Transfer Calculator</h1>

      {/* Theory sections */}
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Theory and Steps</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Laws Used:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kepler's Laws of Orbital Motion</li>
                <li>Conservation of Energy</li>
                <li>Conservation of Angular Momentum</li>
                <li>Vis-viva Equation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Calculation Steps:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Calculate circular velocities at both orbits:
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_{circular} = \\sqrt{\\frac{\\mu}{r}}`}</BlockMath>
                  </div>
                </li>
                <li>Calculate transfer orbit parameters:
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`r_a = r_2, r_p = r_1`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`a = \\frac{r_1 + r_2}{2}`}</BlockMath>
                  </div>
                </li>
                <li>Calculate velocities at periapsis and apoapsis of transfer orbit:
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_{transfer} = \\sqrt{\\mu(\\frac{2}{r} - \\frac{1}{a})}`}</BlockMath>
                  </div>
                </li>
                <li>Calculate ΔV for both burns:
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\Delta v_1 = |v_{transfer,p} - v_{circular,1}|`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\Delta v_2 = |v_{circular,2} - v_{transfer,a}|`}</BlockMath>
                  </div>
                </li>
                <li>Calculate transfer time:
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`t_{transfer} = \\pi\\sqrt{\\frac{a^3}{\\mu}}`}</BlockMath>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator and Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Calculator section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Calculator</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Initial Radius (km)
                  <input
                    type="number"
                    value={r1}
                    onChange={(e) => setR1(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Final Radius (km)
                  <input
                    type="number"
                    value={r2}
                    onChange={(e) => setR2(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>
            <button
              onClick={handleCalculate}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Calculate
            </button>
          </div>

          {results && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold mb-2">Results</h3>
              
              <div className="space-y-4 bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-blue-600">Step 1: Initial Conditions</h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`r_1 = ${r1.toFixed(0)} \\text{ km}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`r_2 = ${r2.toFixed(0)} \\text{ km}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\mu = 398600.4418 \\text{ km}^3/\\text{s}^2`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">Step 2: Initial Orbit Velocity</h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_1 = \\sqrt{\\frac{\\mu}{r_1}} = \\sqrt{\\frac{398600.4418}{${r1.toFixed(0)}}} = ${results.v1.toFixed(2)} \\text{ km/s}`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">Step 3: Transfer Orbit Parameters</h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`a = \\frac{r_1 + r_2}{2} = ${results.sma.toFixed(2)} \\text{ km}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_{t,p} = \\sqrt{\\mu(\\frac{2}{r_1} - \\frac{1}{a})} = ${results.v_transfer_p.toFixed(2)} \\text{ km/s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_{t,a} = \\sqrt{\\mu(\\frac{2}{r_2} - \\frac{1}{a})} = ${results.v_transfer_a.toFixed(2)} \\text{ km/s}`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">Step 4: Final Orbit Velocity</h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_2 = \\sqrt{\\frac{\\mu}{r_2}} = \\sqrt{\\frac{398600.4418}{${r2.toFixed(0)}}} = ${results.v2.toFixed(2)} \\text{ km/s}`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">Step 5: Required Velocity Changes</h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\Delta v_1 = |v_{t,p} - v_1| = ${results.delta_v1.toFixed(2)} \\text{ km/s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\Delta v_2 = |v_2 - v_{t,a}| = ${results.delta_v2.toFixed(2)} \\text{ km/s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\Delta v_{total} = \\Delta v_1 + \\Delta v_2 = ${results.total_delta_v.toFixed(2)} \\text{ km/s}`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">Step 6: Transfer Time</h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`t_{transfer} = \\pi\\sqrt{\\frac{a^3}{\\mu}} = ${(results.transfer_time / 3600).toFixed(2)} \\text{ hours}`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">Additional Orbital Parameters</h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`e = \\frac{|r_2 - r_1|}{r_2 + r_1} = ${results.ecc.toFixed(4)}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`h = \\sqrt{\\mu a(1-e^2)} = ${results.angular_momentum.toFixed(2)} \\text{ km}^2/\\text{s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`E_{transfer} = -\\frac{\\mu}{2a} = ${results.transfer_energy.toFixed(2)} \\text{ km}^2/\\text{s}^2`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">Orbital Periods</h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`T_1 = ${(results.initial_period / 3600).toFixed(2)} \\text{ hours}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`T_2 = ${(results.final_period / 3600).toFixed(2)} \\text{ hours}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`T_{transfer} = ${(results.transfer_time / 3600).toFixed(2)} \\text{ hours}`}</BlockMath>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Visualization section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Orbit Visualization</h2>
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 800 800" 
              className="w-full h-full"
            >
              {/* Central body */}
              <circle cx={centerX} cy={centerY} r="10" fill="#FDB813" />
              
              {/* Initial orbit */}
              <circle
                cx={centerX}
                cy={centerY}
                r={r1 * scale}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
              />
              
              {/* Final orbit */}
              <circle
                cx={centerX}
                cy={centerY}
                r={r2 * scale}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
              />
              
              {/* Satellite */}
              {results && (
                <circle
                  cx={satellitePos.x}
                  cy={satellitePos.y}
                  r="8"
                  fill="#FFD700"
                  stroke="#FFA500"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="fill-opacity"
                    values="1;0.5;1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </svg>

            {results && (
              <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
                >
                  {isAnimating ? 'Pause' : 'Start Transfer'}
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm sm:text-base"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HohmannTransfer;