import { motion } from "framer-motion";
import * as React from "react";

const CustomButton = ({text, onClick, className}) => {
  return (
    <motion.div onClick={onClick} className={`${className} bg-[#F6D31F] text-[#9B4191] rounded-full cursor-pointer flex items-center text-center justify-center `} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
      {text}
    </motion.div>
  );
};

export default CustomButton;
