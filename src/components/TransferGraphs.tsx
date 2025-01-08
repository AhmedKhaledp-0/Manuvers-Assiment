import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const HohmannGraph = () => {
  const generateData = () => {
    const radiusRange = Array.from({ length: 50 }, (_, i) => (i + 1) * 2);
    const r1 = 6371; // Earth radius in km
    const μ = 398600.4418; // Earth's gravitational parameter in km³/s²

    return radiusRange.map((r2) => {
      const v1 = Math.sqrt(μ / r1);
      const v2 = Math.sqrt(μ / (r2 * r1));
      const vt1 = Math.sqrt(μ * (2 / r1 - 2 / (r1 + r2 * r1)));
      const vt2 = Math.sqrt(μ * (2 / (r2 * r1) - 2 / (r1 + r2 * r1)));

      const dv1 = Math.abs(vt1 - v1);
      const dv2 = Math.abs(v2 - vt2);

      return {
        radius: r2,
        dv1,
        dv2,
        total: dv1 + dv2,
      };
    });
  };

  const data = generateData();

  const chartData = {
    labels: data.map((d) => d.radius),
    datasets: [
      {
        label: "Total ΔV",
        data: data.map((d) => d.total),
        borderColor: "black",
        fill: false,
      },
      {
        label: "ΔV1",
        data: data.map((d) => d.dv1),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "ΔV2",
        data: data.map((d) => d.dv2),
        borderColor: "red",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Add this line
    plugins: {
      title: {
        display: true,
        text: "Hohmann Transfer ΔV vs Final Radius",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Final Radius (Earth Radii)",
        },
      },
      y: {
        title: {
          display: true,
          text: "ΔV (km/s)",
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export const BiEllipticGraph = () => {
  const generateData = () => {
    const dv2Range = Array.from({ length: 50 }, (_, i) => (i + 1) * 2);
    const r1 = 6371; // Earth radius in km
    const r3 = 20 * r1; // Final radius (20 Earth radii)
    const μ = 398600.4418;

    return dv2Range.map((r2Factor) => {
      const r2 = r2Factor * r1;
      const v1 = Math.sqrt(μ / r1);
      const v3 = Math.sqrt(μ / r3);

      const vt1 = Math.sqrt(μ * (2 / r1 - 2 / (r1 + r2)));
      const vt2 = Math.sqrt(μ * (2 / r2 - 2 / (r2 + r3)));
      const vt3 = Math.sqrt(μ * (2 / r3 - 2 / (r2 + r3)));

      const dv1 = Math.abs(vt1 - v1);
      const dv2 = Math.abs(vt2 - vt1);
      const dv3 = Math.abs(v3 - vt3);

      return {
        radius: r2Factor,
        dv1,
        dv2,
        dv3,
        total: dv1 + dv2 + dv3,
      };
    });
  };

  const data = generateData();

  const chartData = {
    labels: data.map((d) => d.radius),
    datasets: [
      {
        label: "Total ΔV",
        data: data.map((d) => d.total),
        borderColor: "black",
        fill: false,
      },
      {
        label: "ΔV1",
        data: data.map((d) => d.dv1),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "ΔV2",
        data: data.map((d) => d.dv2),
        borderColor: "red",
        fill: false,
      },
      {
        label: "ΔV3",
        data: data.map((d) => d.dv3),
        borderColor: "green",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Bi-elliptic Transfer ΔV vs DV2 Radius",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "DV2 Radius (Earth Radii)",
        },
      },
      y: {
        title: {
          display: true,
          text: "ΔV (km/s)",
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
