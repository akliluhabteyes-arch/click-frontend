import { motion } from "framer-motion";
import techPattern from "@/assets/tech-pattern.jpg";
import { useSite } from "@/context/SiteDataContext";
import { getIcon } from "@/lib/icons";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const SolutionsSection = () => {
  const { solutions, settings } = useSite();
  return (
    <section id="solutions" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${settings.solutions_background_url || techPattern})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-widest">ERP Products</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 text-foreground">
            Enterprise <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            Industry-specific ERP systems designed to streamline your operations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {solutions.map((sol) => {
            const Icon = getIcon(sol.icon_key);
            return (
            <motion.div
              key={sol.id}
              variants={itemVariants}
              whileHover={{
                y: -12,
                scale: 1.04,
                transition: { duration: 0.3 },
              }}
              className="group relative p-4 sm:p-6 rounded-2xl glass hover:border-primary/30 transition-all duration-500 cursor-pointer text-center overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
              
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${sol.gradient_classes} flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform relative z-10`}
              >
                <Icon className="text-foreground" size={24} />
              </motion.div>
              <h3 className="font-display font-semibold text-foreground text-xs sm:text-sm relative z-10 group-hover:text-primary transition-colors duration-300">{sol.name}</h3>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
