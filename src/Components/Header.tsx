import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';

const Header = () => {
    return (
        <motion.header
            className="app-header"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="header-content">
                <div className="header-logo">
                    <motion.div
                        className="logo-icon-wrapper"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.4 }}
                    >
                        <HiSparkles className="logo-icon" />
                    </motion.div>
                    <div>
                        <h1 className="logo-text">TaskFlow</h1>
                        <p className="logo-subtitle">Kurumsal Görev Yönetimi</p>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
