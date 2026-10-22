import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Camera,
  Film,
  Video,
  Sparkles,
  Flag,
  Heart,
  Boxes,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type ProjectStatus = "live" | "inProgress";

interface Project {
  id: string;
  icon: LucideIcon;
  status: ProjectStatus;
  nda?: boolean;
  url?: string;
  tech?: string[];
}

const projects: Project[] = [
  {
    id: "festsnap",
    icon: Camera,
    status: "live",
    url: "https://www.festsnap.com/",
    tech: ["Next.js", "PostgreSQL", "AWS S3", "Microservices"],
  },
  {
    id: "valleyFestival",
    icon: Film,
    status: "live",
    url: "https://festivalley.org/en/festival/2026",
    tech: ["Next.js", "i18n"],
  },
  { id: "danzo", icon: Video, status: "live" },
  {
    id: "aiQuiz",
    icon: Sparkles,
    status: "inProgress",
    nda: true,
    tech: ["Next.js", "OpenAI API"],
  },
  { id: "trackDay", icon: Flag, status: "live", nda: true },
  { id: "wedding", icon: Heart, status: "live", nda: true },
  { id: "stock", icon: Boxes, status: "live", nda: true },
];

const FeaturedProjects = () => {
  const { t } = useTranslation("featured");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{t("title")}</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {projects.map((project, index) => {
            const highlights = t(`items.${project.id}.highlights`, {
              returnObjects: true,
              defaultValue: [],
            }) as string[];

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card p-8 group hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <project.icon size={28} />
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {project.nda && (
                      <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        {t("ndaNote")}
                      </span>
                    )}
                    <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {t(`status.${project.status}`)}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      {t(`items.${project.id}.title`)}
                    </a>
                  ) : (
                    t(`items.${project.id}.title`)
                  )}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {t(`items.${project.id}.description`)}
                </p>

                {highlights.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-0.5">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline mb-6 self-start"
                  >
                    {t("visit")}
                    <ExternalLink size={14} />
                  </a>
                )}

                {project.tech && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
