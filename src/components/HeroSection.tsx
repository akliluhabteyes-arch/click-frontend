import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import laptopImg from "@/assets/laptop-dashboard.jpg";
import { useSite } from "@/context/SiteDataContext";

const HeroSection = () => {
  const { settings, stats } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 1, 0.92]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${settings.hero_background_url || heroBg})`, y: bgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div style={{ opacity, scale }} className="container mx-auto px-4 sm:px-6 relative z-10 pt-20 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary/30 bg-primary/10 mb-6 sm:mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={14} className="text-primary" />
            </motion.div>
            <span className="text-xs sm:text-sm text-primary font-medium">
              {settings.tagline || "We build what people can really use!"}
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-4 sm:mb-6">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-foreground inline-block"
            >
              We Build
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-gradient inline-block"
            >
              Digital Futures
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          >
            From enterprise ERP systems to custom mobile apps, ClickAddis delivers powerful technology solutions that transform businesses across East Africa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px -5px hsl(36 95% 55% / 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base sm:text-lg flex items-center justify-center gap-2 glow-border hover:opacity-90 transition-opacity"
            >
              Explore Solutions
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={20} />
              </motion.div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "hsl(36 95% 55% / 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-border text-foreground font-semibold text-base sm:text-lg hover:bg-secondary transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Laptop showcase */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-16 max-w-4xl mx-auto perspective-[1000px]"
        >
          <motion.div
            whileHover={{ rotateX: -2, y: -5 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10"
          >
            <img
              src={settings.hero_image_url || laptopImg}
              alt={`${settings.company_name} ERP Dashboard`}
              className="w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto pb-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary"
              >
                {stat.value}
                {stat.suffix}
              </motion.div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
