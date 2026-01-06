import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: string;
  target: number;
  label: string;
  delay?: number;
}

const StatCard = ({ icon, target, label, delay = 0 }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(stepValue * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-10 rounded-2xl stat-card-3d cursor-default"
    >
      <div className="text-5xl mb-5 text-gradient">{icon}</div>
      <div className="text-5xl font-light text-foreground mb-2">
        {count.toLocaleString()}
      </div>
      <div className="text-muted-foreground font-medium uppercase tracking-widest text-sm">
        {label}
      </div>
    </motion.div>
  );
};

export default StatCard;
