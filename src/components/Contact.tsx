import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-primary font-mono mb-4">04. What's Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>

        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          I'm currently open to new opportunities and always excited to discuss
          interesting projects. Whether you have a question or just want to say hi,
          feel free to reach out!
        </p>

        <motion.a
          href="mailto:gazmorabdiu@hotmail.com"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-md font-medium text-lg hover:bg-primary/90 transition-all duration-300 glow-effect"
        >
          <Send size={20} />
          Say Hello
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-8 mt-12"
        >
          <a
            href="mailto:gazmorabdiu@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail size={18} />
            <span className="text-sm">gazmorabdiu@gmail.com</span>
          </a>
          <span className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={18} />
            <span className="text-sm">Pristina, Kosovo</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <a
            href="https://github.com/gazmorabdiu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com/in/gazmorabdiu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Linkedin size={22} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
