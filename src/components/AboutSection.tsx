import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import laptopImg from "@/assets/laptop-dashboard.jpg";
import { useSite, useStat } from "@/context/SiteDataContext";
import { getIcon } from "@/lib/icons";

const AboutSection = () => {
  const { values, settings } = useSite();
  const clients = useStat("happy-clients");
  const projects = useStat("projects-delivered");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={ref} className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 mb-4 sm:mb-6 text-foreground">
              A Great Team,<br />
              <span className="text-gradient">Great Results</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6">
              {settings.legal_name} is a premier software development company based in {settings.city},{" "}
              {settings.country}. We specialize in building enterprise-grade ERP systems and custom mobile
              applications that help businesses operate more efficiently and grow faster.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 sm:mb-8">
              With over {clients?.value ?? 20} satisfied clients and {projects?.text ?? "30+"} successfully delivered
              projects, our passionate team continues to push the boundaries of what's possible in East African tech.
            </p>

            <motion.div
              style={{ y: imgY }}
              className="rounded-2xl overflow-hidden border border-border/30 shadow-xl shadow-primary/5"
            >
              <img
                src={settings.about_image_url || laptopImg}
                alt={`${settings.company_name} Software Dashboard`}
                loading="lazy"
                className="w-full"
              />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {values.map((v, i) => {
              const Icon = getIcon(v.icon_key);
              return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                className="p-4 sm:p-6 rounded-2xl glass hover:border-primary/30 transition-all duration-500 group"
              >
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="text-primary mb-2 sm:mb-3 group-hover:scale-110 transition-transform" size={24} />
                </motion.div>
                <h3 className="font-display font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors duration-300">{v.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
