import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Code, Database, Server, Cloud, Layout, Users } from "lucide-react";

// Skill names stay in English; `soft` categories are translated via the "soft" keys.
const skillCategories = [
  {
    id: "coreStack",
    icon: Code,
    skills: ["Ruby", "Ruby on Rails", "React", "JavaScript", "TypeScript"],
  },
  {
    id: "backend",
    icon: Database,
    skills: ["Rails (controllers, REST APIs, RSpec)", "Node.js", "NestJS", "PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    id: "architecture",
    icon: Server,
    skills: ["GraphQL", "Sockets", "Microservices", "REST API"],
  },
  {
    id: "frontend",
    icon: Layout,
    skills: ["React", "React Hook Form", "Context API", "Component architecture"],
  },
  {
    id: "tools",
    icon: Cloud,
    skills: ["Git", "Docker", "CI/CD", "AWS (S3, Personalize)", "NATS"],
  },
  {
    id: "softSkills",
    icon: Users,
    soft: true,
    skills: ["adaptive", "problemSolver", "teamPlayer", "communicator", "quickLearner"],
  },
];

const Skills = () => {
  const { t } = useTranslation("skills");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{t("title")}</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <category.icon size={20} />
                </div>
                <h3 className="font-semibold text-lg">{t(`categories.${category.id}`)}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {category.soft ? t(`soft.${skill}`) : skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
