import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Database, Server, Cloud, Cpu, Users } from "lucide-react";
import { ProgrammingLanguages, SoftSkills, Technologies } from "@/lib/enums";

const skillCategories = [
  {
    title: "Programming",
    icon: Code,
    skills: [ProgrammingLanguages.JavaScript, ProgrammingLanguages.TypeScript, ProgrammingLanguages.Ruby, ProgrammingLanguages.Java, ProgrammingLanguages.Python],
  },
  {
    title: "Frameworks",
    icon: Cpu,
    skills: [ProgrammingLanguages.Node, ProgrammingLanguages.Nest, ProgrammingLanguages.React, ProgrammingLanguages.Express, ProgrammingLanguages.Ruby, ProgrammingLanguages.Rails],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [Technologies.MongoDB, Technologies.MySQL, Technologies.PostgreSQL, Technologies.SQLite, Technologies.Redis],
  },
  {
    title: "Infrastructure",
    icon: Cloud,
    skills: [Technologies.Docker, Technologies.AWS, Technologies.Git, Technologies.NATS, Technologies.RESTAPI, Technologies.GraphQL],
  },
  {
    title: "Architecture",
    icon: Server,
    skills: [Technologies.Microservices, Technologies.WebSockets, Technologies.ScalableSystems, Technologies.CleanArchitecture],
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: [SoftSkills.ProblemSolving, SoftSkills.TeamCollaboration, SoftSkills.Communication, SoftSkills.QuickLearner],
  },
];

const Skills = () => {
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
        <h2 className="section-title">Skills & Technologies</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <category.icon size={20} />
                </div>
                <h3 className="font-semibold text-lg">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
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
