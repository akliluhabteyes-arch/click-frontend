import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useSite } from "@/context/SiteDataContext";

const TestimonialsSection = () => {
  const { testimonials } = useSite();
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary/30 bg-primary/10 mb-4 sm:mb-6"
          >
            <Quote size={14} className="text-primary" />
            <span className="text-xs sm:text-sm text-primary font-medium">
              Client Stories
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
            What Our Customers{" "}
            <span className="text-gradient">Say About Us</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            Don't just take our word for it — hear from the businesses we've
            transformed
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group relative p-5 sm:p-8 rounded-2xl glass hover:border-primary/40 transition-all duration-500 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/8 group-hover:to-transparent transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6 italic">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl sm:text-2xl overflow-hidden shrink-0">
                    {t.avatar_url ? (
                      <img src={t.avatar_url} alt={t.client_name} loading="lazy" className="w-full h-full object-cover" />
                    ) : (
                      t.icon || "💬"
                    )}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-xs sm:text-sm">
                      {t.client_name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {t.author_name ? `${t.author_name} · ${t.author_role}` : t.author_role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
