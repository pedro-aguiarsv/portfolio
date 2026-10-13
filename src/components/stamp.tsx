"use client"

import { motion, useReducedMotion } from "framer-motion"

export function Stamp({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.p
      className="inline-block border-[3px] border-stamp px-3 py-1 font-mono text-sm tracking-[0.18em] text-stamp uppercase"
      initial={reduce ? false : { opacity: 0, scale: 1.35, rotate: -16 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {children}
    </motion.p>
  )
}
