import { motion } from "framer-motion";
import { MapPin, Navigation, Layers, Maximize2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSite } from "@/context/SiteDataContext";

type MapView = "satellite" | "street";

const MapSection = () => {
  const { settings } = useSite();
  const LAT = settings.latitude;
  const LNG = settings.longitude;
  const ZOOM = settings.map_zoom || 19;
  const [view, setView] = useState<MapView>("satellite");
  const [interactive, setInteractive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-disable interaction when section leaves viewport (prevents scroll hijack)
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setInteractive(false);
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Esri World Imagery (satellite) — free, no API key, modern tiles
  const satelliteUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d986.5!2d${LNG}!3d${LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1700000000000`;
  const streetUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d986.5!2d${LNG}!3d${LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1700000000000`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
  const viewOnMapsUrl = `https://www.google.com/maps/@${LAT},${LNG},${ZOOM}z`;
  const locality = [settings.address_line2, settings.city].filter(Boolean).join(", ");

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-primary font-medium text-xs sm:text-sm uppercase tracking-widest">Find Us</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mt-3 text-foreground">
            Our <span className="text-gradient">Location</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm sm:text-base px-2">
            Visit us at {[settings.address_line1, settings.address_line2].filter(Boolean).join(", ")} — the heart
            of {settings.city}'s business district.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-border/50 glow-border shadow-2xl"
        >
          {/* Map iframe */}
          <div className="relative w-full h-[340px] sm:h-[460px] bg-muted">
            <iframe
              key={view}
              title={`${settings.company_name} Office Location`}
              src={view === "satellite" ? satelliteUrl : streetUrl}
              width="100%"
              height="100%"
              className="border-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Tap-to-interact overlay (prevents scroll hijack on mobile) */}
            {!interactive && (
              <button
                onClick={() => setInteractive(true)}
                className="absolute inset-0 z-10 flex items-center justify-center bg-background/10 backdrop-blur-[1px] group cursor-pointer"
                aria-label="Tap to interact with map"
              >
                <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full glass border border-primary/40 text-xs sm:text-sm font-medium text-foreground flex items-center gap-2 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
                  <Maximize2 size={14} className="text-primary" />
                  Tap to interact
                </div>
              </button>
            )}

            {/* Pointer events guard when not interactive */}
            {!interactive && (
              <div className="absolute inset-0 pointer-events-none" />
            )}
          </div>

          {/* Top-right view toggle */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex gap-1 p-1 rounded-full glass border border-border/50">
            <button
              onClick={() => setView("satellite")}
              className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all flex items-center gap-1.5 ${
                view === "satellite"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              <Layers size={12} />
              Satellite
            </button>
            <button
              onClick={() => setView("street")}
              className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all ${
                view === "street"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Street
            </button>
          </div>

          {/* Bottom info card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm z-20 p-3 sm:p-4 rounded-2xl glass border border-border/50 shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                <MapPin className="text-primary-foreground" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold text-foreground text-sm sm:text-base">{settings.company_name} HQ</h4>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {settings.address_line1}
                  <br className="sm:hidden" /> {locality}
                </p>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                  >
                    <Navigation size={11} />
                    Directions
                  </a>
                  <a
                    href={viewOnMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground text-[10px] sm:text-xs font-medium hover:bg-secondary transition-colors"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
