import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Task, type Priority, type Category, priorityLabels, categoryLabels, categoryIcons } from '../Interfaces/Task';
import { HiPlus, HiPencilSquare, HiXMark } from 'react-icons/hi2';

interface TaskFormProps {
    onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
    onUpdate: (task: Task) => void;
    editingTask: Task | null;
    onCancelEdit: () => void;
}

const TaskForm = ({ onAdd, onUpdate, editingTask, onCancelEdit }: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [category, setCategory] = useState<Category>('personal');
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
            setCategory(editingTask.category);
            setIsExpanded(true);
        }
    }, [editingTask]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (editingTask) {
            onUpdate({
                ...editingTask,
                title: title.trim(),
                description: description.trim(),
                priority,
                category,
            });
        } else {
            onAdd({
                title: title.trim(),
                description: description.trim(),
                priority,
                category,
            });
        }

        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setCategory('personal');
        if (!editingTask) setIsExpanded(false);
        onCancelEdit();
    };

    return (
        <motion.div
            className="task-form-container glass-card"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {!isExpanded && !editingTask ? (
                <motion.button
                    className="expand-form-btn"
                    onClick={() => setIsExpanded(true)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <HiPlus className="expand-icon" />
                    <span>Yeni Görev Ekle</span>
                </motion.button>
            ) : (
                <AnimatePresence>
                    <motion.form
                        onSubmit={handleSubmit}
                        className="task-form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="form-header">
                            <h3 className="form-title">
                                {editingTask ? (
                                    <>
                                        <HiPencilSquare /> Görevi Düzenle
                                    </>
                                ) : (
                                    <>
                                        <HiPlus /> Yeni Görev
                                    </>
                                )}
                            </h3>
                            <motion.button
                                type="button"
                                className="form-close-btn"
                                onClick={resetForm}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <HiXMark />
                            </motion.button>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Başlık</label>
                            <motion.input
                                type="text"
                                className="form-input"
                                placeholder="Görev başlığını girin..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                whileFocus={{ scale: 1.01 }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Açıklama</label>
                            <motion.textarea
                                className="form-textarea"
                                placeholder="Görev açıklamasını girin..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                whileFocus={{ scale: 1.01 }}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Öncelik</label>
                                <div className="priority-options">
                                    {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                                        <motion.button
                                            key={p}
                                            type="button"
                                            className={`priority-btn priority-${p} ${priority === p ? 'active' : ''}`}
                                            onClick={() => setPriority(p)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {priorityLabels[p]}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Kategori</label>
                                <div className="category-options">
                                    {(['personal', 'work', 'shopping', 'health', 'other'] as Category[]).map((c) => (
                                        <motion.button
                                            key={c}
                                            type="button"
                                            className={`category-btn ${category === c ? 'active' : ''}`}
                                            onClick={() => setCategory(c)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            title={categoryLabels[c]}
                                        >
                                            <span>{categoryIcons[c]}</span>
                                            <span className="category-btn-label">{categoryLabels[c]}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <motion.button
                                type="button"
                                className="btn-cancel"
                                onClick={resetForm}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                İptal
                            </motion.button>
                            <motion.button
                                type="submit"
                                className="btn-submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {editingTask ? 'Güncelle' : 'Ekle'}
                            </motion.button>
                        </div>
                    </motion.form>
                </AnimatePresence>
            )}
        </motion.div>
    );
};

export default TaskForm;
