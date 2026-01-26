import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>
        
        <div className="grid md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-2 space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm a passionate software developer with a strong focus on{" "}
              <span className="text-foreground">backend development</span> and{" "}
              <span className="text-foreground">scalable architectures</span>. 
              Currently working as a Full Stack Developer at{" "}
              <span className="text-primary">Revealdata</span>, building legal tech 
              solutions with Ruby on Rails and React.
            </p>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              My experience spans designing and implementing{" "}
              <span className="text-foreground">microservices architectures</span>,
              optimizing performance with in-memory storage solutions, and building
              real-time communication systems. I thrive on solving complex problems
              and delivering clean, maintainable code.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              When I'm not coding, I'm constantly learning new technologies and
              exploring better ways to architect software systems. Currently 
              deepening my expertise in <span className="text-primary">React</span> and{" "}
              <span className="text-primary">Ruby on Rails</span>.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative group"
          >
            <div className="relative">
              <div className="w-full aspect-square rounded-lg bg-secondary overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/30 font-mono">GA</span>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
