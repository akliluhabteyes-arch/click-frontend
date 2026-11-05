import { motion } from "framer-motion";
import { useSite } from "@/context/SiteDataContext";
import { getIcon } from "@/lib/icons";

const ServicesSection = () => {
  const { services } = useSite();
  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-widest">What We Do</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 text-foreground">
            Our Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon_key);
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group p-6 sm:p-8 rounded-2xl glass hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-700"
              />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/20 transition-colors duration-300"
                >
                  <Icon className="text-primary" size={24} />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
