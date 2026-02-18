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
    let currentAngle = initialRadian + r;
    while (currentAngle > maxRadian) currentAngle -= range;
    while (currentAngle < minRadian) currentAngle += range;
    return centerX + radius * Math.cos(currentAngle) - size / 2;
  });

  const y = useTransform(radian, (r) => {
    let currentAngle = initialRadian + r;
    while (currentAngle > maxRadian) currentAngle -= range;
    while (currentAngle < minRadian) currentAngle += range;
    return centerY + radius * Math.sin(currentAngle) - size / 2;
  });

  return (
    <motion.div style={{ x, y }} className="absolute">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-[0_0_6px_rgba(var(--primary),0.4)]"
        style={{ filter: "blur(6px)" }}
      >
        {/* ダイヤの形状 */}
        <path
          d="M12 4L18 12L12 20L6 12L12 4Z"
          fill="currentColor"
          className="text-primary/60"
        />
      </svg>
    </motion.div>
  );
}
