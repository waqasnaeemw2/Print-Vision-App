import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
}

export default function Magnetic({ children, range = 35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Use springs for smooth interpolation
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Check if mouse is within range of the center
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if (distance < range * 2.5) {
      // Pull element toward cursor (30% of actual mouse distance)
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
