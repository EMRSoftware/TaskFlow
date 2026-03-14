import { motion } from 'framer-motion';
import type { Task } from '../Interfaces/Task';
import { HiClipboardDocumentList, HiCheck, HiClock, HiExclamationTriangle } from 'react-icons/hi2';

interface StatsPanelProps {
    tasks: Task[];
}

const StatsPanel = ({ tasks }: StatsPanelProps) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter((t) => t.priority === 'high' && !t.completed).length;

    const stats = [
        {
            label: 'Toplam Görev',
            value: total,
            icon: <HiClipboardDocumentList />,
            color: '#818cf8',
            bg: 'rgba(129, 140, 248, 0.1)',
        },
        {
            label: 'Tamamlanan',
            value: completed,
            icon: <HiCheck />,
            color: '#34d399',
            bg: 'rgba(52, 211, 153, 0.1)',
        },
        {
            label: 'Bekleyen',
            value: pending,
            icon: <HiClock />,
            color: '#fbbf24',
            bg: 'rgba(251, 191, 36, 0.1)',
        },
        {
            label: 'Yüksek Öncelik',
            value: highPriority,
            icon: <HiExclamationTriangle />,
            color: '#f87171',
            bg: 'rgba(248, 113, 113, 0.1)',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <motion.div
            className="stats-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {stats.map((stat) => (
                <motion.div
                    key={stat.label}
                    className="stat-card glass-card"
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <div className="stat-icon" style={{ color: stat.color, background: stat.bg }}>
                        {stat.icon}
                    </div>
                    <div className="stat-info">
                        <motion.span
                            className="stat-value"
                            key={stat.value}
                            initial={{ scale: 1.3, color: stat.color }}
                            animate={{ scale: 1, color: '#ffffff' }}
                            transition={{ duration: 0.3 }}
                        >
                            {stat.value}
                        </motion.span>
                        <span className="stat-label">{stat.label}</span>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default StatsPanel;
