import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSnapshot } from "valtio";
import { headTextAnimation, slideAnimation } from "../config/motion";
import state from "../store";

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.auth && (
        <motion.section className="" {...slideAnimation("left")}>
          <motion.h1
            className="text-[46px] md:text-[72px] text-[#F6D31F] text-center mb-4"
            {...headTextAnimation}
          >
            Welcome to Plonkkaa
          </motion.h1>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
