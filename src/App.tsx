import { useState } from 'react';
import Preloader from './Components/Preloader';
import AnimatedBackground from './Components/AnimatedBackground';
import HomePage from './Pages/HomePage';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedBackground />
          <HomePage />
        </motion.div>
      )}
    </>
  );
}

export default App;
