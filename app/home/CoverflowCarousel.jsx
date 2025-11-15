"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CoverflowCarousel({ artworks }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % artworks.length);
  const prev = () => setIndex((prev) => (prev - 1 + artworks.length) % artworks.length);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-10">
      
      {/* CARDS CONTAINER */}
      <div className="relative h-[350px] w-full flex items-center justify-center perspective">
        {artworks.map((art, i) => {
          const offset = i - index;
          const absOffset = Math.abs(offset);

          return (
            <motion.div
              key={art.id}
              className="absolute rounded-xl overflow-hidden shadow-xl"
              style={{
                width: offset === 0 ? "420px" : "260px",
                height: offset === 0 ? "270px" : "200px",
                zIndex: 100 - absOffset,
              }}
              animate={{
                x: offset * 180,
                rotateY: offset * -45,
                scale: offset === 0 ? 1 : 0.85,
                opacity: absOffset > 3 ? 0 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={prev}
          className="bg-white/20 backdrop-blur-lg px-5 py-3 rounded-full text-white"
        >
          ◀
        </button>

        <button
          onClick={next}
          className="bg-white/20 backdrop-blur-lg px-5 py-3 rounded-full text-white"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
