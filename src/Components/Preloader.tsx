import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 600);
        }, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="preloader-container"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <div className="preloader-content">
                        {/* Orbiting rings */}
                        <div className="preloader-rings">
                            <motion.div
                                className="preloader-ring ring-1"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="preloader-ring ring-2"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="preloader-ring ring-3"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>

                        {/* Logo */}
                        <motion.div
                            className="preloader-logo"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
                        >
                            <span className="preloader-icon">✦</span>
                        </motion.div>

                        {/* Text */}
                        <motion.h1
                            className="preloader-title"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            TaskFlow
                        </motion.h1>

                        <motion.p
                            className="preloader-subtitle"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            Görev Yönetim Platformu
                        </motion.p>

                        {/* Loading bar */}
                        <motion.div
                            className="preloader-bar-track"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <motion.div
                                className="preloader-bar-fill"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ delay: 1, duration: 1.2, ease: 'easeInOut' }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
