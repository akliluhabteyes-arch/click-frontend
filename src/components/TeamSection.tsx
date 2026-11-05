import { motion } from "framer-motion";
import { Send, Instagram, Mail, User, type LucideIcon } from "lucide-react";
import { useSite } from "@/context/SiteDataContext";
import type { TeamMember } from "@/lib/api";

// Telegram / Instagram / Email icons — they become links when set in the Admin panel
const memberLinks = (m: TeamMember): { icon: LucideIcon; href: string | null; label: string }[] => [
  { icon: Send, href: m.telegram_url, label: "Telegram" },
  { icon: Instagram, href: m.instagram_url, label: "Instagram" },
  { icon: Mail, href: m.email ? `mailto:${m.email}` : null, label: "Email" },
];

const SocialIcons = ({ member, animated }: { member: TeamMember; animated?: boolean }) => (
  <div className="flex gap-3">
    {memberLinks(member).map(({ icon: Icon, href, label }) => {
      const className = `w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center ${
        href ? "cursor-pointer hover:bg-primary/20 transition" : ""
      }`;
      const content = <Icon size={16} className="text-primary" />;
      const hover = animated ? { scale: 1.2, rotate: 5 } : undefined;
      return href ? (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={`${member.full_name} on ${label}`}
          whileHover={hover}
          className={className}
        >
          {content}
        </motion.a>
      ) : (
        <motion.div key={label} whileHover={hover} className={className} aria-hidden="true">
          {content}
        </motion.div>
      );
    })}
  </div>
);

const Photo = ({ member, hoverClass }: { member: TeamMember; hoverClass: string }) => (
  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-secondary">
    {member.image_url ? (
      <img
        src={member.image_url}
        alt={member.full_name}
        loading="lazy"
        className={`w-full h-full object-cover object-top transition-transform duration-500 ${hoverClass}`}
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <User size={48} className="text-muted-foreground" />
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
  </div>
);

const TeamSection = () => {
  const { team, settings } = useSite();

  return (
    <section id="team" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary text-xs sm:text-sm uppercase tracking-widest font-medium">
            Our Team
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 text-foreground">
            Meet The <span className="text-gradient">Experts</span>
          </h2>

          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base">
            The passionate minds behind {settings.company_name} delivering powerful solutions.
          </p>
        </motion.div>

        {/* MOBILE: HORIZONTAL SCROLL */}
        <div className="flex sm:hidden gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[75%] snap-center group relative p-5 rounded-2xl glass border border-border/30"
            >
              <Photo member={member} hoverClass="group-hover:scale-105" />
              <h3 className="text-lg font-semibold text-foreground">{member.full_name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
              <SocialIcons member={member} />
            </motion.div>
          ))}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="group relative p-5 sm:p-6 rounded-2xl glass border border-border/30 hover:border-primary/40 transition-all duration-500"
            >
              <Photo member={member} hoverClass="group-hover:scale-110" />
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {member.full_name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
              <SocialIcons member={member} animated />

              {/* glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none shadow-[0_0_40px_-10px_hsl(36_95%_55%_/_0.3)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
