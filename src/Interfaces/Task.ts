export type Priority = 'low' | 'medium' | 'high';

export type Category = 'personal' | 'work' | 'shopping' | 'health' | 'other';

export interface Task {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    category: Category;
    completed: boolean;
    createdAt: string;
}

export const priorityLabels: Record<Priority, string> = {
    low: 'Düşük',
    medium: 'Orta',
    high: 'Yüksek',
};

export const categoryLabels: Record<Category, string> = {
    personal: 'Kişisel',
    work: 'İş',
    shopping: 'Alışveriş',
    health: 'Sağlık',
    other: 'Diğer',
};

export const priorityColors: Record<Priority, string> = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
};

export const categoryIcons: Record<Category, string> = {
    personal: '👤',
    work: '💼',
    shopping: '🛒',
    health: '❤️',
    other: '📌',
};
