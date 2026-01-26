import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="py-8 border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground font-mono">
          Designed & Built by{" "}
          <span className="text-primary">Gazmor Abdiu</span>
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Built with React, TypeScript & Tailwind CSS
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
