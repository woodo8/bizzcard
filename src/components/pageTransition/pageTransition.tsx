import React from 'react';
// @ts-ignore
import { motion, useIsPresent } from 'framer-motion/dist/framer-motion';

export default function PageTransition() {
    const isPresent = useIsPresent();
    return (
        <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0, transition: { duration: 0.7, ease: "circOut" } }}
            exit={{ scaleX: 1, transition: { duration: 1, ease: "circIn" } }}
            style={{ originX: isPresent ? 0 : 1 }}
            className="privacy-screen"
        />
    )
}
