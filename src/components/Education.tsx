import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const Education = () => {
  const { t } = useTranslation("education");
  const certifications = t("certs", { returnObjects: true }) as string[];
  const languages = t("langs", { returnObjects: true }) as string[];
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
        <h2 className="section-title">{t("title")}</h2>

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
              <h3 className="text-xl font-bold">{t("education")}</h3>
            </div>

            <div className="border-l-2 border-primary pl-6">
              <h4 className="font-semibold text-lg">{t("degree")}</h4>
              <p className="text-muted-foreground">{t("institution")}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t("location")}
              </p>
            </div>

            <h4 className="font-semibold mt-8 mb-3">{t("languages")}</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <span key={language} className="skill-chip">
                  {language}
                </span>
              ))}
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
              <h3 className="text-xl font-bold">{t("certifications")}</h3>
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
