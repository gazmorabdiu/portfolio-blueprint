import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, CreditCard, Server, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Technologies } from "@/lib/enums";

const projects = [
  {
    id: "performance",
    icon: Zap,
    tech: [Technologies.Redis, Technologies.Node, Technologies.Microservices],
  },
  {
    id: "refund",
    icon: CreditCard,
    tech: [Technologies.Nest, Technologies.MySQL, Technologies.FinancialLogic],
  },
  {
    id: "apis",
    icon: Server,
    tech: [Technologies.Node, Technologies.Nest, Technologies.RESTAPI],
  },
  {
    id: "apiDocs",
    icon: FileText,
    tech: [Technologies.Swagger, Technologies.OpenAPI, Technologies.RESTAPI],
  },
];

const Projects = () => {
  const { t } = useTranslation("projects");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="achievements" className="section-container" ref={ref}>
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
          className="grid md:grid-cols-2 gap-6 mt-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="glass-card p-8 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <project.icon size={28} />
                </div>
                <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {t(`items.${project.id}.impact`)}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {t(`items.${project.id}.title`)}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t(`items.${project.id}.description`)}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground"
                  >
                    {tech}
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

export default Projects;
