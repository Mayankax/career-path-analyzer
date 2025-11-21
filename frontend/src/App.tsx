import { motion } from "framer-motion";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="p-10 space-y-6">
      <motion.h1
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Framer Motion Working 🎉
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button>Shadcn + Animation</Button>
      </motion.div>
    </div>
  );
}

export default App;
