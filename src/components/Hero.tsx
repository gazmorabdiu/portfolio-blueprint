import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, FileDown } from "lucide-react";

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="section-container relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-mono mb-5 text-lg"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Gazmor Abdiu.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-muted-foreground mb-6"
          >
            I build scalable systems.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Full-Stack Software Developer specializing in building high-performance 
            backend systems and modern full-stack applications with{" "}
            <span className="text-primary">Node.js</span>,{" "}
            <span className="text-primary">NestJS</span>, and{" "}
            <span className="text-primary">React</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all duration-300 glow-effect"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="px-8 py-4 border border-primary text-primary rounded-md font-medium hover:bg-primary/10 transition-all duration-300"
            >
              Contact Me
            </a>
            <a
              href="/resume.pdf"
              download="Gazmor-Abdiu-Resume.pdf"
              className="px-8 py-4 border border-primary text-primary rounded-md font-medium hover:bg-primary/10 transition-all duration-300 inline-flex items-center gap-2"
            >
              <FileDown size={18} />
              Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-6"
          >
            <a
              href="https://github.com/gazmorabdiu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/gazmorabdiu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:gazmorabdiu@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={28} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
