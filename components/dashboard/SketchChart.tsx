'use client';

import { useEffect, useRef } from 'react';
import rough from 'roughjs';

const data = [
  { day: 'Mon', hot: 2, recovered: 1 },
  { day: 'Tue', hot: 4, recovered: 3 },
  { day: 'Wed', hot: 3, recovered: 3 },
  { day: 'Thu', hot: 6, recovered: 5 },
  { day: 'Fri', hot: 5, recovered: 4 },
  { day: 'Sat', hot: 7, recovered: 7 },
  { day: 'Sun', hot: 8, recovered: 8 },
];

export default function SketchChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barWidth = 20;
    const gap = 6;
    const groupWidth = barWidth * 2 + gap;
    const step = groupWidth + 8; 
    ctx.clearRect(0, 0, 400, 180);

    const maxVal = Math.max(...data.map(d => Math.max(d.hot, d.recovered)));
    
    let startX = 30;
    const bottomY = 160;

    data.forEach((d, i) => {
      const x = startX + i * step;
      
      const hotH = (d.hot / maxVal) * 120;
      const recH = (d.recovered / maxVal) * 120;

      // Hot Leads Bar (Darker green/grey outline)
      rc.rectangle(x, bottomY - hotH, barWidth, hotH, {
        fill: 'transparent',
        stroke: '#304732',
        strokeWidth: 2,
        roughness: 1.5,
      });

      // Recovered Leads Bar (Bright Green)
      rc.rectangle(x + barWidth + gap, bottomY - recH, barWidth, recH, {
        fill: '#a3e635',
        fillStyle: 'zigzag',
        hachureAngle: 60,
        hachureGap: 3,
        stroke: '#a3e635',
        strokeWidth: 1,
        roughness: 1,
      });

      // X-axis label
      ctx.fillStyle = '#304732';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.day, x + groupWidth / 2, bottomY + 15);
    });

    // Legend
    rc.rectangle(canvas.width - 90, 10, 10, 10, { fill: '#1a3a1c', fillStyle: 'solid', stroke: 'none' });
    ctx.fillStyle = '#304732';
    ctx.textAlign = 'left';
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.fillText('Hot leads', canvas.width - 75, 19);

    rc.rectangle(canvas.width - 90, 25, 10, 10, { fill: '#a3e635', fillStyle: 'solid', stroke: 'none' });
    ctx.fillStyle = '#1a3a1c';
    ctx.fillText('Recovered', canvas.width - 75, 34);

  }, []);

  return (
    <div className="w-full">
      <canvas ref={canvasRef} width={400} height={180} className="w-full h-auto" />
    </div>
  );
}
