import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { slideAnimation } from '../config/motion'

const Download = () => {
  return (
    <AnimatePresence>
        <motion.section className='' {...slideAnimation("left")}>

        </motion.section>
    </AnimatePresence>
  )
}

export default Download