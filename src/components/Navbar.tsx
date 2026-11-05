import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/clickaddis-logo.png";
import { useSite } from "@/context/SiteDataContext";

const navItems = ["Services", "Solutions", "About", "Contact"];

const Navbar = () => {
  const { settings } = useSite();
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id.toLowerCase());
      if (el) {
        const offset = 80;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-4 sm:px-6 py-1 flex items-center justify-between min-h-[70px]">
        {/* LOGO */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center overflow-visible"
          aria-label="ClickAddis home"
        >
          <motion.img
            src={settings.logo_url || logo}
            alt={settings.legal_name}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="
              h-24
              sm:h-24
              md:h-28
              lg:h-32
              w-auto
              object-contain
              drop-shadow-[0_2px_16px_hsl(36_95%_55%/0.4)]
            "
          />
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        </div>

        {/* MOBILE MENU */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-1"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-left text-base text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm w-full text-center"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
