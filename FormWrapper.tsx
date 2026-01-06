import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
}

const FormWrapper = ({ title, description, children }: FormWrapperProps) => {
  return (
    <main className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-12 rounded-2xl w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">{title}</h2>
        <p className="text-muted-foreground text-center mb-10">{description}</p>
        {children}
      </motion.div>
    </main>
  );
};

export default FormWrapper;
