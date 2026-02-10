"use client";

import { motion } from "framer-motion";
import CategoryNode from "./CategoryNode";
import { Category } from "@/domain/models";

interface HomePageClientProps {
  categories: Category[];
}

export default function HomePageClient({ categories }: HomePageClientProps) {
  return (
    <main className="min-h-screen">
      {/* Categories Section with Staggered Animation */}
      <section id="categories" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold mb-8"
          >
            カテゴリー
          </motion.h2>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CategoryNode category={category} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-muted-foreground text-center py-12"
            >
              カテゴリーが見つかりませんでした。
            </motion.p>
          )}
        </div>
      </section>
    </main>
  );
}
