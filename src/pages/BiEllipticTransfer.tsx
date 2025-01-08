import { useState, useEffect } from "react";
import { BlockMath } from "react-katex";
import { calculateBiellipticTransfer } from "../utils/orbitalCalculations";

function BiEllipticTransfer() {
  const [r1, setR1] = useState<number>(7000);
  const [r2, setR2] = useState<number>(105000);
  const [rIntermediate, setRIntermediate] = useState<number>(210000);
  const [results, setResults] = useState<any>(null);
  const [satellitePos, setSatellitePos] = useState({ x: 0, y: 0 });
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [finalOrbitAngle, setFinalOrbitAngle] = useState(0);

  const handleCalculate = () => {
    const results = calculateBiellipticTransfer(
      r1,
      r2,
      rIntermediate,
      398600.4418
    );
    setResults(results);
  };

  // Scale orbits for visualization
  const scale = 400 / Math.max(rIntermediate, Math.max(r2, r1));
  const centerX = 400;
  const centerY = 400;

  useEffect(() => {
    if (!isAnimating || !results) return;

    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        const next = prev + 0.5; // Slower animation
        if (next >= 200) {
          return 200;
        }
        return next;
      });

      // Add continuous rotation when transfer is complete
      if (animationStep >= 200) {
        setFinalOrbitAngle((prev) => (prev + 0.02) % (2 * Math.PI)); // Slower final orbit
      }
    }, 20); // Smoother animation with shorter interval

    return () => clearInterval(interval);
  }, [isAnimating, results, animationStep]);

  // Modified position calculation
  useEffect(() => {
    if (!results) return;

    const step = animationStep / 100; // 0 to 2 for full animation
    let x = 0,
      y = 0;

    if (step < 1) {
      // First transfer ellipse - using full 2π range
      const angle = (step * 2 * Math.PI) % (2 * Math.PI);
      const progress = Math.sin((step * Math.PI) / 2); // Smoother transition
      const r = r1 + (rIntermediate - r1) * progress;
      x = r * Math.cos(angle) * scale;
      y = r * Math.sin(angle) * scale;
    } else if (step < 2) {
      // Second transfer ellipse - using full 2π range
      const angle = ((step - 1) * 2 * Math.PI) % (2 * Math.PI);
      const progress = Math.sin(((step - 1) * Math.PI) / 2); // Smoother transition
      const r = rIntermediate + (r2 - rIntermediate) * progress;
      x = r * Math.cos(angle) * scale;
      y = r * Math.sin(angle) * scale;
    } else {
      // Continuous motion in final orbit
      x = r2 * Math.cos(finalOrbitAngle) * scale;
      y = r2 * Math.sin(finalOrbitAngle) * scale;
    }

    setSatellitePos({ x: x + centerX, y: y + centerY });
  }, [animationStep, finalOrbitAngle, results, r1, r2, rIntermediate, scale]);

  // Reset handler modification
  const handleReset = () => {
    setAnimationStep(0);
    setFinalOrbitAngle(0);
    setIsAnimating(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Bi-Elliptic Transfer Calculator
      </h1>

      {/* Theory section */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Theory</h2>
        <p className="mb-4">
          The bi-elliptic transfer is a three-impulse orbital maneuver that can
          be more efficient than the Hohmann transfer for large orbit changes,
          typically when the ratio of final to initial radius is greater than
          11.94.
        </p>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <BlockMath>{`\\Delta v_{total} = \\Delta v_1 + \\Delta v_2 + \\Delta v_3`}</BlockMath>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Angular Momentum Conservation
          </h3>
          <p className="mb-2">
            During the coast phases of the transfer orbits, angular momentum is
            conserved:
          </p>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <BlockMath>{`h = r \\times v = \\sqrt{\\mu a(1-e^2)}`}</BlockMath>
          </div>
          <p className="mt-2">
            Changes in angular momentum occur only during the impulsive burns at
            r₁, r_int, and r₂.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Calculator section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Calculator</h2>
          <div className="space-y-3 sm:space-y-4">
            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Initial Radius (km)
                  <input
                    type="number"
                    value={r1}
                    onChange={(e) => setR1(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Intermediate Radius (km)
                  <input
                    type="number"
                    value={rIntermediate}
                    onChange={(e) => setRIntermediate(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
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
                <h4 className="font-medium text-blue-600">
                  Step 1: Initial Conditions
                </h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`r_1 = ${r1.toFixed(
                      0
                    )} \\text{ km}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`r_2 = ${r2.toFixed(
                      0
                    )} \\text{ km}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`r_{int} = ${rIntermediate.toFixed(
                      0
                    )} \\text{ km}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\mu = 398600.4418 \\text{ km}^3/\\text{s}^2`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">
                  Step 2: Initial and Final Orbit Velocities
                </h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_1 = \\sqrt{\\frac{\\mu}{r_1}} = ${results.v1.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_2 = \\sqrt{\\frac{\\mu}{r_2}} = ${results.v2.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_{int} = \\sqrt{\\frac{\\mu}{r_{int}}} = ${results.v_intermediate.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">
                  Step 3: First Transfer Orbit
                </h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`a_1 = \\frac{r_1 + r_{int}}{2} = ${results.sma1.toFixed(
                      2
                    )} \\text{ km}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`e_1 = \\frac{|r_{int} - r_1|}{r_{int} + r_1} = ${results.ecc1.toFixed(
                      4
                    )}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_{t1} = \\sqrt{\\mu(\\frac{2}{r_1} - \\frac{1}{a_1})} = ${results.v_t1.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_{t2} = \\sqrt{\\mu(\\frac{2}{r_{int}} - \\frac{1}{a_1})} = ${results.v_t2.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">
                  Step 4: Second Transfer Orbit
                </h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`a_2 = \\frac{r_{int} + r_2}{2} = ${results.sma2.toFixed(
                      2
                    )} \\text{ km}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`e_2 = \\frac{|r_2 - r_{int}|}{r_2 + r_{int}} = ${results.ecc2.toFixed(
                      4
                    )}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_{t3} = \\sqrt{\\mu(\\frac{2}{r_{int}} - \\frac{1}{a_2})} = ${results.v_t3.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`v_{t4} = \\sqrt{\\mu(\\frac{2}{r_2} - \\frac{1}{a_2})} = ${results.v_t4.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">
                  Step 5: Required Velocity Changes
                </h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\Delta v_1 = |v_{t1} - v_1| = ${results.delta_v1.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\Delta v_2 = |v_{t3} - v_{t2}| = ${results.delta_v2.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\Delta v_3 = |v_2 - v_{t4}| = ${results.delta_v3.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`\\Delta v_{total} = \\Delta v_1 + \\Delta v_2 + \\Delta v_3 = ${results.total_delta_v.toFixed(
                      2
                    )} \\text{ km/s}`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">
                  Step 6: Transfer Times
                </h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`t_1 = \\pi\\sqrt{\\frac{a_1^3}{\\mu}} = ${(
                      results.transfer_time1 / 3600
                    ).toFixed(2)} \\text{ hours}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`t_2 = \\pi\\sqrt{\\frac{a_2^3}{\\mu}} = ${(
                      results.transfer_time2 / 3600
                    ).toFixed(2)} \\text{ hours}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`t_{total} = t_1 + t_2 = ${(
                      results.total_time / 3600
                    ).toFixed(2)} \\text{ hours}`}</BlockMath>
                  </div>

                  {results.total_time / 3600 > 24 && (
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`t_{total} = ${(
                        results.total_time /
                        3600 /
                        24
                      ).toFixed(2)} \\text{ days}`}</BlockMath>
                    </div>
                  )}
                  {
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`t_{total} = ${(
                        results.total_time /
                        3600 /
                        24
                      ).toFixed(2)} \\text{ days}`}</BlockMath>
                    </div>
                  }
                </div>

                <h4 className="font-medium text-blue-600">Energy Analysis</h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`E_1 = -\\frac{\\mu}{2r_1} = ${results.e1.toFixed(
                      2
                    )} \\text{ km}^2/\\text{s}^2`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`E_2 = -\\frac{\\mu}{2r_2} = ${results.e2.toFixed(
                      2
                    )} \\text{ km}^2/\\text{s}^2`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`E_{t1} = -\\frac{\\mu}{2a_1} = ${results.e_t1.toFixed(
                      2
                    )} \\text{ km}^2/\\text{s}^2`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`E_{t2} = -\\frac{\\mu}{2a_2} = ${results.e_t2.toFixed(
                      2
                    )} \\text{ km}^2/\\text{s}^2`}</BlockMath>
                  </div>
                </div>

                <h4 className="font-medium text-blue-600">
                  Angular Momentum Analysis
                </h4>
                <div className="pl-4 space-y-2">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`h_{initial} = r_1v_1 = ${results.h_initial.toFixed(
                      2
                    )} \\text{ km}^2/\\text{s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`h_{intermediate} = r_{int}v_{int} = ${results.h_intermediate.toFixed(
                      2
                    )} \\text{ km}^2/\\text{s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`h_{final} = r_2v_2 = ${results.h_final.toFixed(
                      2
                    )} \\text{ km}^2/\\text{s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`h_1 = \\sqrt{\\mu a_1(1-e_1^2)} = ${results.h1.toFixed(
                      2
                    )} \\text{ km}^2/\\text{s}`}</BlockMath>
                  </div>
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <BlockMath>{`h_2 = \\sqrt{\\mu a_2(1-e_2^2)} = ${results.h2.toFixed(
                      2
                    )} \\text{ km}^2/\\text{s}`}</BlockMath>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Visualization section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Orbit Visualization
          </h2>
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

              {/* Intermediate orbit */}
              <circle
                cx={centerX}
                cy={centerY}
                r={rIntermediate * scale}
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1"
                strokeDasharray="5,5"
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
                  {isAnimating ? "Pause" : "Start Transfer"}
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

export default BiEllipticTransfer;
