import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Technologies } from "@/lib/enums";

const experiences = [
  {
    company: "ISA Consulting - Revealdata",
    tech: [
      Technologies.Ruby,
      Technologies.Rails,
      Technologies.React,
      Technologies.GraphQL,
      Technologies.Docker,
      Technologies.LegalTech,
    ],
  },
  {
    company: "Ice Software",
    tech: [
      Technologies.Node,
      Technologies.Redis,
      Technologies.SQLite,
      Technologies.MySQL,
      Technologies.NATS,
      Technologies.Microservices,
    ],
  },
  {
    company: "Appbites",
    tech: [
      Technologies.Node,
      Technologies.Nest,
      Technologies.MongoDB,
      Technologies.Prisma,
      Technologies.AWS,
      Technologies.Socketio,
    ],
  },
  {
    company: "Freelance",
    tech: [
      Technologies.Node,
      Technologies.Express,
      Technologies.RESTAPI,
      Technologies.MongoDB,
      Technologies.PostgreSQL,
    ],
  },
  {
    company: "Starlabs",
    tech: [Technologies.PHP, Technologies.Laravel, Technologies.React],
  },
];

interface ExperienceText {
  role: string;
  location: string;
  period: string;
  description: string[];
}

const Experience = () => {
  const { t } = useTranslation("experience");
  const texts = t("items", { returnObjects: true }) as ExperienceText[];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="section-container bg-secondary/20"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{t("title")}</h2>

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {experiences.map((base, index) => {
            const exp = { ...base, ...texts[index] };
            return (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`relative pl-8 pb-12 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:pl-0" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`timeline-dot md:left-auto ${
                  index % 2 === 0 ? "md:-right-[7px]" : "md:-left-[7px]"
                }`}
              />

              <div className="glass-card p-6 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-2 text-primary font-mono text-sm mb-2">
                  <Calendar size={14} />
                  {exp.period}
                </div>

                <h3 className="text-xl font-bold mb-1">{exp.role}</h3>

                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="text-primary mt-1.5">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
