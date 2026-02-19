"use client";

import { type ColorToken } from "@/lib/color";
import { useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Star from "./Star";

interface StarrySightProps {
  orbitRadius?: number;
  velocity?: number;
  starCount?: number;
  starSize?: number;
  coefficientOfVariation?: number;
  correctionFactor?: number;
  starColor?: ColorToken;
}

export default function StarrySight({
  orbitRadius = 3000,
  velocity = 1000,
  starCount = 30,
  starSize = 32,
  coefficientOfVariation = 0.3,
  correctionFactor = 1.3,
  starColor,
}: StarrySightProps) {
  const [windowWidth, setWindowWidth] = useState(1024);
  const radian = useMotionValue(0);

  // Use window width
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ARC = windowWidth * correctionFactor;
  const MIN_ANGLE = -Math.PI / 2 - ARC / (2 * orbitRadius);
  const MAX_ANGLE = -Math.PI / 2 + ARC / (2 * orbitRadius);
  const ANGLE_RANGE = MAX_ANGLE - MIN_ANGLE;

  const radiusOffsets = useMemo(
    () =>
      Array.from({ length: starCount }).map((_, i) => {
        const randomFactor = Math.random() * coefficientOfVariation;
        const sign = Math.pow(-1, i);
        return orbitRadius * randomFactor * sign;
      }),
    [starCount, orbitRadius],
  );

  useAnimationFrame((time) => {
    const newRadian = (velocity / (2 * Math.PI * orbitRadius)) * (time / 1000);
    radian.set(newRadian);
  });

  return (
    <div className="absolute left-1/2 top-1/2">
      {Array.from({ length: starCount }).map((_, i) => {
        const angleOffset = MIN_ANGLE + (i / starCount) * ANGLE_RANGE;
        const starRadius = orbitRadius + radiusOffsets[i];

        return (
          <Star
            key={i}
            radian={radian}
            initialRadian={angleOffset}
            minRadian={MIN_ANGLE}
            maxRadian={MAX_ANGLE}
            centerX={0}
            centerY={orbitRadius}
            radius={starRadius}
            size={starSize}
            color={starColor}
          />
        );
      })}
    </div>
  );
}
