import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSnapshot } from "valtio";
import {
  headContainerAnimation,
  headTextAnimation
} from "../config/motion";
import state from "../store";
import Download from "./Download";
import Selection from "./Selection";
import Upload from "./Upload";

const alertAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

const alertIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 mr-2"
  >
    {/* SVG content */}
  </svg>
);

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.auth && (
        <motion.section
          className="flex flex-col items-center"
          {...headContainerAnimation}
        >
          <motion.h1
            className="text-[46px] md:text-[72px] text-[#F6D31F] text-center mb-4"
            {...headTextAnimation}
          >
            Hello {state.name}
          </motion.h1>
          {snap.isOnDownload ? (
            <Download/>
          ) : snap.isOnUpload ? (
            <Upload/>
          ) : (
            <Selection/>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;