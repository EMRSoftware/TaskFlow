import { motion, AnimatePresence } from 'framer-motion';
import { HiExclamationTriangle } from 'react-icons/hi2';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="dialog-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onCancel}
                >
                    <motion.div
                        className="dialog-content glass-card"
                        initial={{ scale: 0.7, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.7, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="dialog-icon-wrapper">
                            <HiExclamationTriangle className="dialog-icon" />
                        </div>
                        <h3 className="dialog-title">{title}</h3>
                        <p className="dialog-message">{message}</p>
                        <div className="dialog-actions">
                            <motion.button
                                className="btn-cancel"
                                onClick={onCancel}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                İptal
                            </motion.button>
                            <motion.button
                                className="btn-danger"
                                onClick={onConfirm}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Sil
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmDialog;
