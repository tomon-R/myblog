"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface StarProps {
  radian: MotionValue<number>;
  initialRadian: number;
  minRadian?: number;
  maxRadian?: number;

  centerX?: number;
  centerY?: number;
  radius: number;
  size: number;
}

export default function Star({
  radian, // MotionValue
  initialRadian,
  minRadian = 0,
  maxRadian = Math.PI * 2,
  centerX = 0,
  centerY = 0,
  radius,
  size,
}: StarProps) {
  const range = maxRadian - minRadian;

  const x = useTransform(radian, (r) => {
    const currentAngle = minRadian + ((r + initialRadian) % range);
    return centerX + radius * Math.cos(currentAngle) - size / 2;
  });

  const y = useTransform(radian, (r) => {
    const currentAngle = minRadian + ((r + initialRadian) % range);
    return centerY + radius * Math.sin(currentAngle) - size / 2;
  });

  return (
    <motion.div
      style={{ x, y }}
      className="absolute bg-primary/60 rounded-sm blur-[1px]"
      animate={{
        width: size,
        height: size,
        rotate: 45,
      }}
    />
  );
}
