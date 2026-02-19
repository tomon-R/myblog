"use client";

import { resolveColor, type ColorToken } from "@/lib/color";
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
  color?: ColorToken;
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
  color = "star",
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
        style={{ filter: "blur(6px)", color: resolveColor(color) }}
      >
        {/* ダイヤの形状 */}
        <path
          d="M12 4L18 12L12 20L6 12L12 4Z"
          fill="currentColor"
          fillOpacity={0.6}
        />
      </svg>
    </motion.div>
  );
}
