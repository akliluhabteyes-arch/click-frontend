// ClickAddis API client — all website content comes from the backend.
export const API_URL = (import.meta.env.VITE_API_URL || "https://click-backend-xjio.onrender.com/api").replace(/\/+$/, "");
// export const API_URL = (import.meta.env.VITE_API_URL || "https://localhost:5000/api").replace(/\/+$/, "");

// ---------------------------------------------------------------------------
// Types (mirror the Supabase tables)
// ---------------------------------------------------------------------------
export interface SiteSettings {
  company_name: string;
  legal_name: string;
  tagline: string | null;
  short_description: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  country: string;
  phone: string;
  email: string;
  support_email: string | null;
  working_hours: string | null;
  latitude: number;
  longitude: number;
  map_zoom: number;
  logo_url: string | null;
  hero_background_url: string | null;
  hero_image_url: string | null;
  about_image_url: string | null;
  solutions_background_url: string | null;
  chat_bot_name: string;
  chat_welcome_message: string;
  chat_default_response: string;
}

interface Row {
  id: string;
  slug: string;
  display_order: number;
}

export interface Stat extends Row { value: number; suffix: string; label: string }
export interface CompanyValue extends Row { title: string; description: string; icon_key: string }
export interface Service extends Row { title: string; description: string; icon_key: string }
export interface Solution extends Row {
  name: string;
  short_description: string | null;
  icon_key: string;
  gradient_classes: string;
  image_url: string | null;
}
export interface Customer extends Row { name: string; icon: string | null; logo_url: string | null; website_url: string | null }
export interface Testimonial extends Row {
  client_name: string;
  author_name: string | null;
  author_role: string;
  icon: string | null;
  avatar_url: string | null;
  quote: string;
  rating: number;
}
export interface TeamMember extends Row {
  full_name: string;
  role: string;
  image_url: string | null;
  email: string | null;
  telegram_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
}
export interface SocialLink { id: string; platform: string; label: string; url: string }
export interface QuickAction { id: string; label: string; query: string }
export interface FooterItem { slug: string; label: string }

export interface SiteData {
  settings: SiteSettings;
  stats: Stat[];
  values: CompanyValue[];
  services: Service[];
  solutions: Solution[];
  customers: Customer[];
  testimonials: Testimonial[];
  team: TeamMember[];
  socialLinks: SocialLink[];
  footer: { services: FooterItem[]; solutions: FooterItem[] };
  chat: { botName: string; welcomeMessage: string; quickActions: QuickAction[] };
}

// ---------------------------------------------------------------------------
// Requests
// ---------------------------------------------------------------------------
export class ApiError extends Error {
  constructor(message: string, public status: number, public details?: { field: string; message: string }[]) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new ApiError("Unable to reach the server. Please check your connection.", 0);
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new ApiError(json.error?.message || "Something went wrong", res.status, json.error?.details);
  }
  return json.data as T;
}

export const getSiteData = () => request<SiteData>("/site");

export const sendChatMessage = (message: string) =>
  request<{ reply: string; matched: string | null }>("/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  source?: "contact_form" | "demo_request";
  website?: string; // honeypot
}

export const submitContact = (payload: ContactPayload) =>
  request<{ message: string; id?: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
