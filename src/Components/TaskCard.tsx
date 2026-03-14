import { motion } from 'framer-motion';
import { type Task, priorityLabels, categoryLabels, categoryIcons, priorityColors } from '../Interfaces/Task';
import { HiCheck, HiPencilSquare, HiTrash, HiArrowPath } from 'react-icons/hi2';

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <motion.div
            className={`task-card glass-card ${task.completed ? 'completed' : ''}`}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -100 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            whileHover={{ y: -4 }}
        >
            {/* Priority indicator */}
            <div
                className="card-priority-bar"
                style={{ background: priorityColors[task.priority] }}
            />

            <div className="card-content">
                <div className="card-header">
                    <div className="card-title-row">
                        <motion.button
                            className={`toggle-btn ${task.completed ? 'checked' : ''}`}
                            onClick={() => onToggle(task.id)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                            style={{
                                borderColor: task.completed ? '#34d399' : priorityColors[task.priority],
                                background: task.completed ? '#34d399' : 'transparent',
                            }}
                        >
                            {task.completed && <HiCheck />}
                        </motion.button>
                        <div className="card-title-group">
                            <h3 className={`card-title ${task.completed ? 'line-through' : ''}`}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className="card-description">{task.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="card-actions">
                        <motion.button
                            className="action-btn edit-btn"
                            onClick={() => onEdit(task)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                            title="Düzenle"
                        >
                            <HiPencilSquare />
                        </motion.button>
                        <motion.button
                            className="action-btn delete-btn"
                            onClick={() => onDelete(task)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                            title="Sil"
                        >
                            <HiTrash />
                        </motion.button>
                    </div>
                </div>

                <div className="card-footer">
                    <div className="card-tags">
                        <span
                            className="tag priority-tag"
                            style={{
                                color: priorityColors[task.priority],
                                background: `${priorityColors[task.priority]}18`,
                                borderColor: `${priorityColors[task.priority]}40`,
                            }}
                        >
                            {priorityLabels[task.priority]}
                        </span>
                        <span className="tag category-tag">
                            {categoryIcons[task.category]} {categoryLabels[task.category]}
                        </span>
                    </div>
                    <span className="card-date">
                        <HiArrowPath className="date-icon" />
                        {formatDate(task.createdAt)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default TaskCard;
