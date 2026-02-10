import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

const education = {
  degree: "BSc Computer Engineering",
  institution: "Ondokuz Mayis University",
  location: "Turkey",
};

const certifications = [
  "GraphQL Course (Udemy)",
  "Ruby (Udemy)",
  "Node.js Bootcamp (Udemy)",
  "ReactJS Development (ICK)",
  "MySQL Bootcamp",
  "GraphQL Course",
  "Ruby Programming",
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="education"
      className="section-container bg-secondary/20"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Education & Certifications</h2>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold">Education</h3>
            </div>

            <div className="border-l-2 border-primary pl-6">
              <h4 className="font-semibold text-lg">{education.degree}</h4>
              <p className="text-muted-foreground">{education.institution}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {education.location}
              </p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold">Certifications</h3>
            </div>

            <ul className="space-y-3">
              {certifications.map((cert, index) => (
                <motion.li
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  {cert}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
