import { useState, useEffect, useCallback } from 'react';
import type { Task, Priority, Category } from '../Interfaces/Task';
import Header from '../Components/Header';
import StatsPanel from '../Components/StatsPanel';
import TaskForm from '../Components/TaskForm';
import SearchBar from '../Components/SearchBar';
import FilterBar, { type StatusFilter } from '../Components/FilterBar';
import TaskList from '../Components/TaskList';
import ConfirmDialog from '../Components/ConfirmDialog';

const STORAGE_KEY = 'taskflow-tasks';

const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const HomePage = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
    const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<Task | null>(null);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    // CRUD operations
    const addTask = useCallback(
        (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
            const newTask: Task = {
                ...taskData,
                id: generateId(),
                completed: false,
                createdAt: new Date().toISOString(),
            };
            setTasks((prev) => [newTask, ...prev]);
        },
        []
    );

    const updateTask = useCallback((updatedTask: Task) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
        setEditingTask(null);
    }, []);

    const deleteTask = useCallback((id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        setDeletingTask(null);
    }, []);

    const toggleTask = useCallback((id: string) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    }, []);

    // Filtering logic
    const filteredTasks = tasks.filter((task) => {
        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (
                !task.title.toLowerCase().includes(query) &&
                !task.description.toLowerCase().includes(query)
            ) {
                return false;
            }
        }

        // Status
        if (statusFilter === 'active' && task.completed) return false;
        if (statusFilter === 'completed' && !task.completed) return false;

        // Priority
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

        // Category
        if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;

        return true;
    });

    return (
        <div className="page-container">
            <Header />

            <main className="main-content">
                <StatsPanel tasks={tasks} />

                <TaskForm
                    onAdd={addTask}
                    onUpdate={updateTask}
                    editingTask={editingTask}
                    onCancelEdit={() => setEditingTask(null)}
                />

                <div className="toolbar">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    <FilterBar
                        statusFilter={statusFilter}
                        priorityFilter={priorityFilter}
                        categoryFilter={categoryFilter}
                        onStatusChange={setStatusFilter}
                        onPriorityChange={setPriorityFilter}
                        onCategoryChange={setCategoryFilter}
                    />
                </div>

                <TaskList
                    tasks={filteredTasks}
                    onToggle={toggleTask}
                    onEdit={setEditingTask}
                    onDelete={setDeletingTask}
                />
            </main>

            <ConfirmDialog
                isOpen={!!deletingTask}
                title="Görevi Sil"
                message={`"${deletingTask?.title}" görevini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
                onConfirm={() => deletingTask && deleteTask(deletingTask.id)}
                onCancel={() => setDeletingTask(null)}
            />
        </div>
    );
};

export default HomePage;
