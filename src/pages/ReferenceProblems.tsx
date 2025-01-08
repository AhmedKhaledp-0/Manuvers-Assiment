import React, { useState } from "react";
import { BlockMath } from "react-katex";
import {
  calculateHohmannTransfer,
  calculateHohmannFromPoint,
  calculateBiellipticTransfer,
} from "../utils/orbitalCalculations";

const ReferenceProblems: React.FC = () => {
  const [showCircular1Steps, setShowCircular1Steps] = useState(false);
  const [showCircular2Steps, setShowCircular2Steps] = useState(false);
  const [showNonCircularSteps, setShowNonCircularSteps] = useState(false);
  const [showBiEllipticSteps, setShowBiEllipticSteps] = useState(false);

  // Pre-calculate results
  const circular1 = calculateHohmannTransfer(6678, 9378, 398600);
  const circular2 = calculateHohmannTransfer(6878, 7378, 398600);
  const nonCircular = calculateHohmannFromPoint(
    6858,
    7178,
    22378,
    22378,
    false,
    398600
  );
  const biElliptic = calculateBiellipticTransfer(7000, 105000, 210000, 398600);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Reference Problems</h1>

      {/* Hohmann Circular Transfer Problems */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Hohmann Circular Transfer Examples
        </h2>

        {/* Problem 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Problem 1</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>Given:</strong>
              </p>
              <BlockMath>{`r_i = 6,678 \\text{ km}`}</BlockMath>
              <BlockMath>{`r_f = 9,378 \\text{ km}`}</BlockMath>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <p>
                <strong>Final Results:</strong>
              </p>
              <BlockMath>{`\\Delta v_{total} = ${circular1.total_delta_v.toFixed(
                2
              )} \\text{ km/s}`}</BlockMath>
              <BlockMath>{`T_{transfer} = ${(
                circular1.transfer_time / 3600
              ).toFixed(2)} \\text{ hours}`}</BlockMath>
            </div>

            <button
              onClick={() => setShowCircular1Steps(!showCircular1Steps)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {showCircular1Steps ? "Hide Steps" : "Show Steps"}
            </button>

            {showCircular1Steps && (
              <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded">
                <h4 className="font-medium">Calculation Steps:</h4>
                <div className="space-y-2">
                  <BlockMath>{`v_1 = \\sqrt{\\frac{\\mu}{r_1}} = ${circular1.v1.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`v_2 = \\sqrt{\\frac{\\mu}{r_2}} = ${circular1.v2.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_1 = ${circular1.delta_v1.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_2 = ${circular1.delta_v2.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Problem 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Problem 2</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>Given:</strong>
              </p>
              <BlockMath>{`r_i = 6,878 \\text{ km}`}</BlockMath>
              <BlockMath>{`r_f = 7,378 \\text{ km}`}</BlockMath>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <p>
                <strong>Final Results:</strong>
              </p>
              <BlockMath>{`\\Delta v_{total} = ${circular2.total_delta_v.toFixed(
                2
              )} \\text{ km/s}`}</BlockMath>
              <BlockMath>{`T_{transfer} = ${(
                circular2.transfer_time / 3600
              ).toFixed(2)} \\text{ hours}`}</BlockMath>
            </div>

            <button
              onClick={() => setShowCircular2Steps(!showCircular2Steps)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {showCircular2Steps ? "Hide Steps" : "Show Steps"}
            </button>

            {showCircular2Steps && (
              <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded">
                <h4 className="font-medium">Calculation Steps:</h4>
                <div className="space-y-2">
                  <BlockMath>{`v_1 = \\sqrt{\\frac{\\mu}{r_1}} = ${circular2.v1.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`v_2 = \\sqrt{\\frac{\\mu}{r_2}} = ${circular2.v2.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_1 = ${circular2.delta_v1.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_2 = ${circular2.delta_v2.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Non-Circular Transfer Problem */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Non-Circular Transfer Example
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Problem 1</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>Given:</strong>
              </p>
              <BlockMath>{`r_p = 6,858 \\text{ km}`}</BlockMath>
              <BlockMath>{`r_a = 7,178 \\text{ km}`}</BlockMath>
              <BlockMath>{`r_f = 22,378 \\text{ km}`}</BlockMath>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <p>
                <strong>Final Results:</strong>
              </p>
              <BlockMath>{`\\Delta v_{total} = ${nonCircular.totalDv.toFixed(
                2
              )} \\text{ km/s}`}</BlockMath>
              <BlockMath>{`T_{transfer} = ${(
                nonCircular.transferTime / 3600
              ).toFixed(2)} \\text{ hours}`}</BlockMath>
            </div>

            <button
              onClick={() => setShowNonCircularSteps(!showNonCircularSteps)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {showNonCircularSteps ? "Hide Steps" : "Show Steps"}
            </button>

            {showNonCircularSteps && (
              <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded">
                <h4 className="font-medium">Calculation Steps:</h4>
                <div className="space-y-2">
                  <BlockMath>{`v_1 = ${nonCircular.v1.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`v_2 = ${nonCircular.v2.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`v_{t1} = ${nonCircular.vt1.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`v_{t2} = ${nonCircular.vt2.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_1 = ${nonCircular.dv1.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_2 = ${nonCircular.dv2.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_{total} = ${nonCircular.totalDv.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bi-Elliptic Transfer Problem */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Bi-Elliptic Transfer Example</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Problem 1</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>Given:</strong>
              </p>
              <BlockMath>{`r_1 = 7,000 \\text{ km}`}</BlockMath>
              <BlockMath>{`r_2 = 105,000 \\text{ km}`}</BlockMath>
              <BlockMath>{`r_{int} = 210,000 \\text{ km}`}</BlockMath>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <p>
                <strong>Final Results:</strong>
              </p>
              <BlockMath>{`\\Delta v_{total} = ${biElliptic.total_delta_v.toFixed(
                2
              )} \\text{ km/s}`}</BlockMath>
              <BlockMath>{`T_{total} = ${(biElliptic.total_time / 3600).toFixed(
                2
              )} \\text{ hours}`}</BlockMath>
              <BlockMath>{`T_{total} = ${(
                biElliptic.total_time /
                3600 /
                24
              ).toFixed(2)} \\text{ days}`}</BlockMath>
            </div>

            <button
              onClick={() => setShowBiEllipticSteps(!showBiEllipticSteps)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {showBiEllipticSteps ? "Hide Steps" : "Show Steps"}
            </button>

            {showBiEllipticSteps && (
              <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded">
                <h4 className="font-medium">Calculation Steps:</h4>
                <div className="space-y-2">
                  <BlockMath>{`v_1 = \\sqrt{\\frac{\\mu}{r_1}} = ${biElliptic.v1.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`v_2 = \\sqrt{\\frac{\\mu}{r_2}} = ${biElliptic.v2.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`v_{intermediate} = ${biElliptic.v_intermediate.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_1 = ${biElliptic.delta_v1.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_2 = ${biElliptic.delta_v2.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_3 = ${biElliptic.delta_v3.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                  <BlockMath>{`\\Delta v_{total} = ${biElliptic.total_delta_v.toFixed(
                    2
                  )} \\text{ km/s}`}</BlockMath>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReferenceProblems;
