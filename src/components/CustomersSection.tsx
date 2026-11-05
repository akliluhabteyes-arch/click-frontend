import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useSite, useStat } from "@/context/SiteDataContext";

const CustomersSection = () => {
  const { customers, settings } = useSite();
  const happyClients = useStat("happy-clients");
  return (
    <section id="customers" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-widest">Trusted By</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 text-foreground">
            Our <span className="text-gradient">Customers</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            Businesses across {settings.country} trust {settings.company_name} to power their digital transformation
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
          {customers.map((customer, i) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group relative p-4 sm:p-6 rounded-2xl glass hover:border-primary/40 transition-all duration-500 text-center cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
              
              <motion.div
                className="text-3xl sm:text-4xl mb-3 sm:mb-4 relative z-10"
                whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                {customer.logo_url ? (
                  <img
                    src={customer.logo_url}
                    alt={customer.name}
                    loading="lazy"
                    className="h-10 sm:h-12 w-auto max-w-[80%] mx-auto object-contain"
                  />
                ) : (
                  customer.icon || "🏢"
                )}
              </motion.div>
              <h3 className="font-display font-semibold text-foreground text-xs sm:text-sm relative z-10 group-hover:text-primary transition-colors duration-300">
                {customer.name}
              </h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-10 sm:mt-16 flex items-center justify-center gap-3"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-border/50 bg-card/30">
            <Building2 size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground font-medium">
              {happyClients ? `${happyClients.text} ${happyClients.label}` : `${customers.length} Clients`} & Growing
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </motion.div>
      </div>
    </section>
  );
};

export default CustomersSection;
