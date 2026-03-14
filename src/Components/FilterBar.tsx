import { motion } from 'framer-motion';
import { type Priority, type Category, priorityLabels, categoryLabels, categoryIcons } from '../Interfaces/Task';

export type StatusFilter = 'all' | 'active' | 'completed';

interface FilterBarProps {
    statusFilter: StatusFilter;
    priorityFilter: Priority | 'all';
    categoryFilter: Category | 'all';
    onStatusChange: (status: StatusFilter) => void;
    onPriorityChange: (priority: Priority | 'all') => void;
    onCategoryChange: (category: Category | 'all') => void;
}

const FilterBar = ({
    statusFilter,
    priorityFilter,
    categoryFilter,
    onStatusChange,
    onPriorityChange,
    onCategoryChange,
}: FilterBarProps) => {
    const statusOptions: { value: StatusFilter; label: string }[] = [
        { value: 'all', label: 'Tümü' },
        { value: 'active', label: 'Aktif' },
        { value: 'completed', label: 'Tamamlanan' },
    ];

    const priorityOptions: { value: Priority | 'all'; label: string }[] = [
        { value: 'all', label: 'Tüm Öncelikler' },
        { value: 'high', label: priorityLabels.high },
        { value: 'medium', label: priorityLabels.medium },
        { value: 'low', label: priorityLabels.low },
    ];

    const categoryOptions: { value: Category | 'all'; label: string; icon?: string }[] = [
        { value: 'all', label: 'Tüm Kategoriler' },
        ...(['personal', 'work', 'shopping', 'health', 'other'] as Category[]).map((c) => ({
            value: c,
            label: categoryLabels[c],
            icon: categoryIcons[c],
        })),
    ];

    return (
        <motion.div
            className="filter-bar glass-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="filter-section">
                <span className="filter-label">Durum</span>
                <div className="filter-group">
                    {statusOptions.map((opt) => (
                        <motion.button
                            key={opt.value}
                            className={`filter-btn ${statusFilter === opt.value ? 'active' : ''}`}
                            onClick={() => onStatusChange(opt.value)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {opt.label}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <span className="filter-label">Öncelik</span>
                <div className="filter-group">
                    {priorityOptions.map((opt) => (
                        <motion.button
                            key={opt.value}
                            className={`filter-btn ${priorityFilter === opt.value ? 'active' : ''}`}
                            onClick={() => onPriorityChange(opt.value)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {opt.label}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <span className="filter-label">Kategori</span>
                <div className="filter-group">
                    {categoryOptions.map((opt) => (
                        <motion.button
                            key={opt.value}
                            className={`filter-btn ${categoryFilter === opt.value ? 'active' : ''}`}
                            onClick={() => onCategoryChange(opt.value)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {opt.icon && <span>{opt.icon}</span>} {opt.label}
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default FilterBar;
