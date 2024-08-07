import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSnapshot } from "valtio";
import CustomButton from "../components/CustomButton";
import {
  fadeAnimation,
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation
} from "../config/motion";
import state from "../store";

const SignIn = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {!snap.auth && (
      <motion.section className="flex flex-col items-center mt-4" {...headContainerAnimation}>
        <motion.h1 className="text-[46px] md:text-[72px] text-[#F6D31F] text-center mb-4" {...headTextAnimation}>
          Welcome to Plonkkaa
        </motion.h1>
        <motion.video {...fadeAnimation}
        src="Plonkkaa.mp4"
        className="w-full max-w-[90%] md:max-w-[40%] mb-10 rounded-lg border-4 border-[#F6D31F]"
        controls
      />
        <motion.form className="flex flex-col items-center w-full" {...headContentAnimation}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={`p-4 border border-[#F6D31F] bg-transparent rounded-full text-white placeholder-white w-[90%] md:w-[35%] mb-10`}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`p-4 border border-[#F6D31F] bg-transparent rounded-full text-white placeholder-white w-[90%] md:w-[35%] mb-10`}
          />
          <CustomButton
            onClick={() => state.auth = true}
            text={"Log In"}
            className="bg-[#F6D31F] py-4 px-4 w-[90%] md:w-[35%] text-[#9B4191] rounded-full"
          />
        </motion.form>
      </motion.section>
  )}
    </AnimatePresence>
  );
};

export default SignIn;
