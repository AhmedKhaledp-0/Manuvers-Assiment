import { useState } from "react";
import { BlockMath } from "react-katex";
import { calculateHohmannFromPointWithH } from "../utils/orbitalCalculations";

function HohmannNonCircle() {
  const [A, setA] = useState<number>(7000); // Initial perigee
  const [Ap, setAp] = useState<number>(10000); // Initial apogee (RA')
  const [B, setB] = useState<number>(42000); // Final perigee
  const [Bp, setBp] = useState<number>(50000); // Final apogee ({RB'})
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const fromApogeeResults = calculateHohmannFromPointWithH(
      A,
      Ap,
      B,
      Bp,
      true
    );
    const fromPerigeeResults = calculateHohmannFromPointWithH(
      A,
      Ap,
      B,
      Bp,
      false
    );

    setResults({
      fromApogee: fromApogeeResults,
      fromPerigee: fromPerigeeResults,
      difference: fromApogeeResults.totalDv - fromPerigeeResults.totalDv,
      recommendation:
        fromApogeeResults.totalDv < fromPerigeeResults.totalDv
          ? "apogee"
          : "perigee",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Non-Circular Hohmann Transfer Calculator
      </h1>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Theory</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Laws and Equations Used:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Specific Angular Momentum for Transfer:
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`h_1 = \\sqrt{2\\mu}\\sqrt{\\frac{r_Ar_{A'}}{r_A + r_{A'}}} `}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`h_2 = \\sqrt{2\\mu}\\sqrt{\\frac{r_B r_{B'}}{r_B + r_{B'}}}`}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`h_3 = \\sqrt{2\\mu}\\sqrt{\\frac{r_A r_B}{r_A + r_B}} `}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`h_{3'} = \\sqrt{2\\mu}\\sqrt{\\frac{r_{A'} r_{B'}}{r_{A'} + r_{B'}}} `}</BlockMath>
                </div>
              </li>
              <li>
                Velocity at Any Point:
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`v_A)_1 = \\frac{h_1}{r_A}`}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`v_A)_3 = \\frac{h_3}{r_A}`}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`v_B)_2 = \\frac{h_2}{r_B}`}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`v_B)_3 = \\frac{h_3}{r_B}`}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`v_{A'})_1 = \\frac{h_{1'}}{r_A}`}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`v_{A'})_{3'} = \\frac{h_{3'}}{r_{A'}}`}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`v_{B'})_{2} = \\frac{h_{2}}{r_{B'}}`}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`v_{B'})_{3'} = \\frac{h_{3'}}{r_{B'}}`}</BlockMath>
                </div>
              </li>
              <li>
                Transfer Orbit Parameters:
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`a_t = \\frac{r_1 + r_2}{2}`}</BlockMath>
                </div>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`e_t = \\frac{|r_2 - r_1|}{r_2 + r_1}`}</BlockMath>
                </div>
              </li>
              <li>
                Transfer Time:
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <BlockMath>{`t_{transfer} = \\pi\\sqrt{\\frac{a_t^3}{\\mu}}`}</BlockMath>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Key Points:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Transfer can be initiated from either apogee (A') or perigee (A)
              </li>
              <li>Angular momentum is conserved during coast phases</li>
              <li>
                ΔV requirements differ between apogee and perigee departures
              </li>
              <li>
                Optimal departure point depends on initial and final orbit
                geometry
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Calculator</h2>

        {/* Input Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Initial Orbit</h3>
            <label className="block">
              Perigee Radius A (km)
              <input
                type="number"
                value={A}
                onChange={(e) => setA(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              Apogee Radius A' (km)
              <input
                type="number"
                value={Ap}
                onChange={(e) => setAp(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Final Orbit</h3>
            <label className="block">
              Perigee Radius B (km)
              <input
                type="number"
                value={B}
                onChange={(e) => setB(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              Apogee Radius B' (km)
              <input
                type="number"
                value={Bp}
                onChange={(e) => setBp(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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

        {results && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From Apogee Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Transfer from Apogee (A')
                </h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-600">
                      Step 1: Angular Momentum Calculations
                    </h4>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`h_1 = \\sqrt{2\\mu}\\sqrt{\\frac{r_Ar_{A'}}{r_A + r_{A'}}} = ${results.fromApogee.h1.toFixed(
                        2
                      )}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`h_2 = \\sqrt{2\\mu}\\sqrt{\\frac{r_B r_{B'}}{r_B + r_{B'}}} = ${results.fromApogee.h2.toFixed(
                        2
                      )}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`h_3 = \\sqrt{2\\mu}\\sqrt{\\frac{r_A r_B}{r_A + r_B}} = ${results.fromApogee.h3.toFixed(
                        2
                      )}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`h_{3'} = \\sqrt{2\\mu}\\sqrt{\\frac{r_{A'} r_{B'}}{r_{A'} + r_{B'}}} = ${results.fromApogee.h3p.toFixed(
                        2
                      )}`}</BlockMath>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600">
                      Step 2: Initial Orbit Parameters
                    </h4>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`r_{{A'}} = ${Ap.toFixed(
                        0
                      )} \\text{ km}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`v_{{A'}} = ${results.fromApogee.vA3.toFixed(
                        2
                      )} \\text{ km/s}`}</BlockMath>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600">
                      Step 3: Transfer Orbit Parameters
                    </h4>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`a_t = ${results.fromApogee.at.toFixed(
                        2
                      )} \\text{ km}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`e_t = ${results.fromApogee.et.toFixed(
                        4
                      )}`}</BlockMath>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600">
                      Step 4: Velocity Changes
                    </h4>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`v_{{A'}1} = ${results.fromApogee.vA1.toFixed(
                        2
                      )} \\text{ km/s}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`\\Delta v_1 = ${results.fromApogee.dv1.toFixed(
                        2
                      )} \\text{ km/s}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`\\Delta v_2 = ${results.fromApogee.dv2.toFixed(
                        2
                      )} \\text{ km/s}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`\\Delta v_{total} = ${results.fromApogee.totalDv.toFixed(
                        2
                      )} \\text{ km/s}`}</BlockMath>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600">
                      Step 5: Transfer Time
                    </h4>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`t_{transfer} = \\pi\\sqrt{\\frac{a_t^3}{\\mu}} = ${(
                        results.fromApogee.transferTime / 3600
                      ).toFixed(2)} \\text{ hours}`}</BlockMath>
                    </div>
                  </div>
                </div>
              </div>

              {/* From Perigee Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Transfer from Perigee (A)
                </h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-600">
                      Step 1: Angular Momentum Calculations
                    </h4>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`h_1 = \\sqrt{2\\mu}\\sqrt{\\frac{r_Ar_{A'}}{r_A + r_{A'}}} = ${results.fromApogee.h1.toFixed(
                        2
                      )}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`h_2 = \\sqrt{2\\mu}\\sqrt{\\frac{r_B r_{B'}}{r_B + r_{B'}}} = ${results.fromApogee.h2.toFixed(
                        2
                      )}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`h_3 = \\sqrt{2\\mu}\\sqrt{\\frac{r_A r_B}{r_A + r_B}} = ${results.fromApogee.h3.toFixed(
                        2
                      )}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`h_{3'} = \\sqrt{2\\mu}\\sqrt{\\frac{r_{A'} r_{B'}}{r_{A'} + r_{B'}}} = ${results.fromApogee.h3p.toFixed(
                        2
                      )}`}</BlockMath>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600">
                      Step 2: Initial Orbit Parameters
                    </h4>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`r_A = ${A.toFixed(
                        0
                      )} \\text{ km}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`v_A = ${results.fromPerigee.vB3.toFixed(
                        2
                      )} \\text{ km/s}`}</BlockMath>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600">
                      Step 3: Transfer Orbit Parameters
                    </h4>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`a_t = ${results.fromPerigee.at.toFixed(
                        2
                      )} \\text{ km}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`e_t = ${results.fromPerigee.et.toFixed(
                        4
                      )}`}</BlockMath>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600">
                      Step 4: Velocity Changes
                    </h4>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`v_{A2} = ${results.fromPerigee.vB2.toFixed(
                        2
                      )} \\text{ km/s}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`\\Delta v_1 = ${results.fromPerigee.dv1.toFixed(
                        2
                      )} \\text{ km/s}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`\\Delta v_2 = ${results.fromPerigee.dv2.toFixed(
                        2
                      )} \\text{ km/s}`}</BlockMath>
                    </div>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`\\Delta v_{total} = ${results.fromPerigee.totalDv.toFixed(
                        2
                      )} \\text{ km/s}`}</BlockMath>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600">
                      Step 5: Transfer Time
                    </h4>
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <BlockMath>{`t_{transfer} = \\pi\\sqrt{\\frac{a_t^3}{\\mu}} = ${(
                        results.fromPerigee.transferTime / 3600
                      ).toFixed(2)} \\text{ hours}`}</BlockMath>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Analysis</h3>
                <div className="space-y-2">
                  <p className="mb-2">
                    ΔV Difference: {Math.abs(results.difference).toFixed(2)}{" "}
                    km/s
                    {results.difference > 0
                      ? " in favor of perigee departure"
                      : " in favor of apogee departure"}
                  </p>
                  <p>
                    The {results.recommendation} departure is more efficient
                    because:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Lower total ΔV requirement</li>
                    <li>
                      Better utilization of orbital velocity at departure point
                    </li>
                    <li>More efficient use of angular momentum</li>
                  </ul>
                  <p className="font-medium mt-2">
                    Recommendation: Start transfer from {results.recommendation}{" "}
                    for optimal efficiency
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HohmannNonCircle;
