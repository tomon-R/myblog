"use client";

import { wdxlLubrifontJPN } from "@/components/typography/fonts";
import { Typography } from "@/components/typography/Typography";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Star from "./_components/Star";

interface HeroProps {
  appName: string;
  appDescription: string;
}

const ORBIT_RADIUS = 1000; // px
const VELOCITY = 1000; // px/sec
const ANGULAR_VELOCITY = VELOCITY / (2 * Math.PI * ORBIT_RADIUS); // rad/sec
const MIN_ANGLE = (Math.PI * 3) / 5;
const MAX_ANGLE = (Math.PI * 7) / 5;
const ANGLE_RANGE = MAX_ANGLE - MIN_ANGLE;
const STAR_COUNT = 8; // 星の数 (N個)

export default function Hero({ appName, appDescription }: HeroProps) {
  const radian = useMotionValue(0);

  useAnimationFrame((time) => {
    const t = ANGULAR_VELOCITY * (time / 1000);
    const newRadian = MIN_ANGLE + (t % ANGLE_RANGE);
    radian.set(newRadian);
  });
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 星のコンテナ (画面中央に配置) */}
        <div className="absolute left-1/2 top-1/2">
          {Array.from({ length: STAR_COUNT }).map((_, i) => {
            // 各星の初期配置角度 (等間隔に配置)
            const angleOffset = (i / STAR_COUNT) * Math.PI * 2;

            return (
              <Star
                key={i}
                radian={radian} // 全員で同じ MotionValue を共有
                initialRadian={angleOffset}
                minRadian={(-Math.PI * 6) / 10}
                maxRadian={0}
                centerX={0}
                centerY={ORBIT_RADIUS}
                radius={ORBIT_RADIUS}
                size={32}
              />
            );
          })}
        </div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-[900px] h-[900px] bg-gradient-to-tl from-accent/10 via-accent/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            font={wdxlLubrifontJPN}
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70"
          >
            {appName}
          </Typography>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          {appDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#categories"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              カテゴリーを見る
            </a>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#latest"
              className="px-8 py-4 bg-background/80 backdrop-blur-sm border border-foreground/20 rounded-lg font-semibold hover:bg-background/90 transition-all"
            >
              最新記事
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            <svg
              className="w-6 h-6 text-muted-foreground"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
