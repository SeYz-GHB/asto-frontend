import React from 'react'
import { motion } from 'framer-motion'

const FloatingShape = ({color, size, top, left, delay}) => {
  return (
    <motion.div 
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`} 
      style={{top, left}} 
      animate={{
        y: ["0%", "20%", "0%"],  // Reduced from 100% to 20%
        x: ["0%", "30%", "0%"],  // Reduced from 100% to 30%
        rotate: [0, 360]
      }}
      transition={{
        duration: 10,
        ease: "linear",
        repeat: Infinity,
        delay
      }}
      aria-hidden="true"
    />
  )
}



export default FloatingShape