'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const RootHeader = () => {
  return (
    <motion.div
        initial={{height:0}}
        animate={{height:'20%'}}
        exit={{height:0}}
        key={'1'}
        className='
            w-full bg-gray-500
        '
    >
        <AnimatePresence>

        </AnimatePresence>
    </motion.div>
  )
}

export default RootHeader