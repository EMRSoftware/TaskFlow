import { AnimatePresence } from 'framer-motion';
import type { Task } from '../Interfaces/Task';
import TaskCard from './TaskCard';
import { motion } from 'framer-motion';
import { HiInbox } from 'react-icons/hi2';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

const TaskList = ({ tasks, onToggle, onEdit, onDelete }: TaskListProps) => {
    if (tasks.length === 0) {
        return (
            <motion.div
                className="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="empty-icon"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <HiInbox />
                </motion.div>
                <h3 className="empty-title">Henüz görev yok</h3>
                <p className="empty-text">
                    Yeni bir görev ekleyerek başlayın!
                </p>
            </motion.div>
        );
    }

    return (
        <div className="task-list">
            <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TaskList;
