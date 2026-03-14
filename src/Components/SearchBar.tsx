import { motion } from 'framer-motion';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <motion.div
            className="search-bar glass-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <HiMagnifyingGlass className="search-icon" />
            <input
                type="text"
                className="search-input"
                placeholder="Görev ara..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {value && (
                <motion.button
                    className="search-clear"
                    onClick={() => onChange('')}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <HiXMark />
                </motion.button>
            )}
        </motion.div>
    );
};

export default SearchBar;
