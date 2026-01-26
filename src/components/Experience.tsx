import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Technologies } from "@/lib/enums";

const experiences = [
  {
    company: "ISA Consulting - Revealdata",
    role: "Full Stack Developer",
    location: "Remote",
    period: "2024 – Present",
    description: [
      "Building legal tech platform features for eDiscovery and legal holds",
      "Developing with Ruby on Rails and React in an international team",
      "Growing expertise in the Rails ecosystem and legal technology domain",
      "Collaborating remotely with teams across different time zones",
    ],
    tech: [Technologies.Ruby, Technologies.Rails, Technologies.React, Technologies.LegalTech],
  },
  {
    company: "Ice Software",
    role: "Software Developer",
    location: "Pristina, Kosovo",
    period: "2023 – 2024",
    description: [
      "Led microservices optimization achieving 3x performance improvement",
      "Built in-memory storage layer using Redis for faster data access",
      "Designed and implemented transparent refund system",
      "Mentored interns and contributed to team knowledge sharing",
    ],
    tech: [Technologies.Node, Technologies.Redis, Technologies.SQLite, Technologies.MySQL, Technologies.NATS, Technologies.Microservices],
  },
  {
    company: "Appbites",
    role: "Software Developer",
    location: "Pristina, Kosovo",
    period: "2022 – 2023",
    description: [
      "Led backend development with Node.js and NestJS",
      "Implemented AWS S3 file storage and real-time chat with Socket.io",
      "Designed database architecture with MongoDB and Prisma",
      "Created comprehensive API documentation with Swagger",
    ],
    tech: [Technologies.Node, Technologies.Nest, Technologies.MongoDB, Technologies.Prisma, Technologies.AWS, Technologies.Socketio],
  },
  {
    company: "Starlabs",
    role: "Intern Web Developer",
    location: "Pristina, Kosovo, Remote",
    period: "2021 – 2021",
    description: [
      "Developed web applications using PHP Laravel framework",
      "Worked on responsive design and user experience",
      "Collaborated with the development team to deliver projects on time",
    ],
    tech: [Technologies.PHP, Technologies.Laravel],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-container bg-secondary/20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Experience</h2>

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`relative pl-8 pb-12 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:pl-0" : "md:ml-auto md:pl-12"
                }`}
            >
              {/* Timeline dot */}
              <div
                className={`timeline-dot md:left-auto ${index % 2 === 0 ? "md:-right-[7px]" : "md:-left-[7px]"
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
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
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
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
