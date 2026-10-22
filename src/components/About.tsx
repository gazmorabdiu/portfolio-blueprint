import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { richText } from "@/i18n/richText";

const About = () => {
  const { t } = useTranslation("about");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{t("title")}</h2>

        <div className="grid md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-2 space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              <Trans t={t} i18nKey="p1" components={richText} />
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              <Trans t={t} i18nKey="p2" components={richText} />
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              <Trans t={t} i18nKey="p3" components={richText} />
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
                  <img
                    src="/Gazi.jpeg"
                    alt={t("photoAlt")}
                    className="w-full h-full object-cover"
                  />
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
