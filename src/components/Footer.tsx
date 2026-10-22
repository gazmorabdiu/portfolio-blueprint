import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import { richText } from "@/i18n/richText";

const Footer = () => {
  const { t } = useTranslation("footer");
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="py-8 border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground font-mono">
          <Trans t={t} i18nKey="designedBy" components={richText} />
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {t("builtWith")}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
