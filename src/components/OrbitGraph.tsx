import React, { useEffect, useRef } from 'react';

interface OrbitGraphProps {
  initialOrbit: {
    semiMajorAxis: number;
    eccentricity: number;
  };
  finalOrbit: {
    semiMajorAxis: number;
    eccentricity: number;
  };
  transferOrbit?: {
    semiMajorAxis: number;
    eccentricity: number;
  };
}

const OrbitGraph: React.FC<OrbitGraphProps> = ({ initialOrbit, finalOrbit, transferOrbit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawOrbit = (
    ctx: CanvasRenderingContext2D,
    semiMajorAxis: number,
    eccentricity: number,
    color: string
  ) => {
    const scale = 100; // Scale factor to fit orbits on canvas
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Draw elliptical orbit
    for (let angle = 0; angle <= 2 * Math.PI; angle += 0.01) {
      const r = (semiMajorAxis * (1 - eccentricity * eccentricity)) /
                (1 + eccentricity * Math.cos(angle));
      const x = centerX + r * Math.cos(angle) * scale;
      const y = centerY + r * Math.sin(angle) * scale;

      if (angle === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw central body
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFD700';
    ctx.fill();

    // Draw orbits
    drawOrbit(ctx, initialOrbit.semiMajorAxis, initialOrbit.eccentricity, '#3B82F6');
    drawOrbit(ctx, finalOrbit.semiMajorAxis, finalOrbit.eccentricity, '#10B981');
    
    if (transferOrbit) {
      drawOrbit(ctx, transferOrbit.semiMajorAxis, transferOrbit.eccentricity, '#EF4444');
    }
  }, [initialOrbit, finalOrbit, transferOrbit]);

  return (
    <div className="relative bg-gray-100 rounded-lg p-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="w-full h-full"
      />
      <div className="absolute bottom-4 right-4 flex gap-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2" />
          <span>Initial Orbit</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2" />
          <span>Final Orbit</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2" />
          <span>Transfer Orbit</span>
        </div>
      </div>
    </div>
  );
};

export default OrbitGraph;
