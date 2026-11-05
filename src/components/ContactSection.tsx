import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ArrowUpRight, Loader2 } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useSite } from "@/context/SiteDataContext";
import { submitContact, ApiError } from "@/lib/api";

const EMPTY_FORM = { name: "", email: "", message: "" };
const DEMO_MESSAGE = "Hello, I would like to schedule a demo of your ERP solutions.";

const ContactSection = () => {
  const { settings } = useSite();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [honeypot, setHoneypot] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const [sending, setSending] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const address = [settings.address_line1, settings.address_line2, settings.city, settings.country]
    .filter(Boolean)
    .join(", ");
  const contactItems = [
    { icon: MapPin, text: address },
    { icon: Phone, text: settings.phone, href: `tel:${settings.phone.replace(/\s+/g, "")}` },
    { icon: Mail, text: settings.email, href: `mailto:${settings.email}` },
    ...(settings.working_hours ? [{ icon: Clock, text: settings.working_hours }] : []),
  ];

  const requestDemo = () => {
    setIsDemo(true);
    setFormData((f) => ({ ...f, message: f.message || DEMO_MESSAGE }));
    messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => messageRef.current?.focus(), 400);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };
    if (!payload.name || !payload.email || !payload.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setSending(true);
    try {
      const res = await submitContact({
        ...payload,
        source: isDemo ? "demo_request" : "contact_form",
        website: honeypot,
      });
      toast.success(res.message);
      setFormData(EMPTY_FORM);
      setIsDemo(false);
    } catch (err) {
      const details = err instanceof ApiError ? err.details : undefined;
      toast.error(details?.[0]?.message || (err as Error).message || "Could not send your message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-primary/3 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 text-foreground">
            Let's Build <span className="text-gradient">Together</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-5">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3 sm:gap-4 group"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="text-primary" size={16} />
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.text}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              onClick={requestDemo}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), requestDemo())}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 cursor-pointer group"
            >
              <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2 text-sm sm:text-base">
                Schedule a Demo
                <ArrowUpRight
                  size={16}
                  className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                See our ERP solutions in action with a personalized demo
                session.
              </p>
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4 sm:space-y-5 p-5 sm:p-8 rounded-2xl glass"
          >
            {/* honeypot: hidden from people, bots fill it in */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            {[
              {
                label: "Name",
                type: "text",
                key: "name",
                placeholder: "Your name",
              },
              {
                label: "Email",
                type: "email",
                key: "email",
                placeholder: "your@email.com",
              },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.key}
                  required
                  maxLength={field.key === "email" ? 255 : 150}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-sm sm:text-base"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Message
              </label>
              <textarea
                ref={messageRef}
                rows={4}
                required
                maxLength={5000}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-shadow text-sm sm:text-base"
                placeholder="Tell us about your project..."
              />
            </div>
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 40px -5px hsl(36 95% 55% / 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 sm:py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed glow-border text-sm sm:text-base"
            >
              {sending ? "Sending..." : "Send Message"}
              {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
