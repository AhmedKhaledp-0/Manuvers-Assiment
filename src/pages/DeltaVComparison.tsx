import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BlockMath } from "react-katex";
import {
  calculateHohmannTransfer,
  calculateBiellipticTransfer,
} from "../utils/orbitalCalculations";

function DeltaVComparison() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateComparisonData = () => {
      const r1 = 7000;
      const ratios = Array.from({ length: 20 }, (_, i) => 2 + i);
      const dataPoints = ratios.map((ratio) => {
        const r2 = r1 * ratio;
        const r_intermediate = r2 * 2;
        const mu = 398600.4418;

        const hohmannResults = calculateHohmannTransfer(r1, r2, mu);
        const biellipticResults = calculateBiellipticTransfer(
          r1,
          r2,
          r_intermediate,
          mu
        );

        return {
          ratio,
          hohmann: hohmannResults.total_delta_v,
          bielliptic: biellipticResults.total_delta_v,
          difference:
            biellipticResults.total_delta_v - hohmannResults.total_delta_v,
        };
      });

      setData(dataPoints);
      setLoading(false);
    };

    generateComparisonData();
  }, []);

  const crossoverPoint = data.find((point) => point.difference < 0)?.ratio;

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">ΔV Comparison</h1>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Theory</h2>
        <p className="mb-4">
          The efficiency of bi-elliptic transfers compared to Hohmann transfers
          depends on the ratio of final to initial orbital radii (r₂/r₁). The
          theoretical crossover point occurs at approximately 11.94.
        </p>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <BlockMath>{`\\text{Crossover Ratio} \\approx 11.94`}</BlockMath>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          ΔV Comparison Graph
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-[300px] sm:h-[400px]">
            <p className="text-base sm:text-lg text-gray-600">
              Loading comparison data...
            </p>
          </div>
        ) : (
          <>
            <div className="w-full h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="ratio"
                    label={{
                      value: "Radius Ratio (r₂/r₁)",
                      position: "bottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "ΔV (km/s)",
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                    }}
                  />
                  <Tooltip
                    formatter={(value: number) => value.toFixed(2) + " km/s"}
                    labelFormatter={(ratio) => `Ratio: ${ratio}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="hohmann"
                    name="Hohmann Transfer"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="bielliptic"
                    name="Bi-elliptic Transfer"
                    stroke="#dc2626"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Analysis</h3>
              <p>
                {crossoverPoint
                  ? `The bi-elliptic transfer becomes more efficient at a radius ratio of approximately ${crossoverPoint.toFixed(
                      2
                    )}, 
                     close to the theoretical value of 11.94.`
                  : "The bi-elliptic transfer does not become more efficient within the plotted range."}
              </p>
              <p className="mt-2">
                For smaller ratios, the Hohmann transfer is more efficient due
                to its shorter transfer time and simpler execution. However, for
                larger ratios, the bi-elliptic transfer can save significant ΔV
                despite its longer duration.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DeltaVComparison;
