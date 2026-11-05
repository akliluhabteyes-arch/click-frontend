import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { getSiteData, type SiteData } from "@/lib/api";
import fallbackLogo from "@/assets/clickaddis-logo.png";

const SiteDataContext = createContext<SiteData | null>(null);

/** Website content loaded from the backend (GET /api/site). */
export const useSite = (): SiteData => {
  const data = useContext(SiteDataContext);
  if (!data) throw new Error("useSite must be used inside <SiteDataProvider>");
  return data;
};

/** Finds a hero stat by slug, e.g. "happy-clients" → "20+". */
export const useStat = (slug: string) => {
  const stat = useSite().stats.find((s) => s.slug === slug);
  return stat ? { ...stat, text: `${stat.value}${stat.suffix}` } : undefined;
};

const Splash = ({ children }: { children?: ReactNode }) => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-6 text-center">
    <motion.img
      src={fallbackLogo}
      alt="ClickAddis"
      className="h-24 w-auto object-contain drop-shadow-[0_2px_16px_hsl(36_95%_55%/0.4)]"
      animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    />
    {children}
  </div>
);

export const SiteDataProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["site"],
    queryFn: getSiteData,
    staleTime: 60_000,
    retry: 2,
  });

  if (isLoading) {
    return (
      <Splash>
        <div className="w-40 h-1 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full w-1/3 bg-primary rounded-full"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </Splash>
    );
  }

  if (isError || !data) {
    return (
      <Splash>
        <div className="space-y-2">
          <h1 className="text-xl font-display font-semibold text-foreground">We'll be right back</h1>
          <p className="text-sm text-muted-foreground max-w-sm">
            The website content could not be loaded. Please check your connection and try again.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
          Try again
        </button>
      </Splash>
    );
  }

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
};
