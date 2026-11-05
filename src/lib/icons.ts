import {
  Monitor, Smartphone, Code2, Database, BarChart3, Shield, UtensilsCrossed, Package, Wine, UserCheck,
  Dumbbell, Building, Building2, ShoppingBag, Store, Target, Lightbulb, Heart, Rocket, Cloud, Server, Cpu,
  Globe, Laptop, Tablet, Wifi, Lock, Settings, Users, Briefcase, Truck, Hospital, Stethoscope, GraduationCap,
  Hotel, Car, Coffee, ShoppingCart, CreditCard, Wallet, PieChart, LineChart, TrendingUp, Zap, Star, Award,
  Headphones, MessageSquare, Calendar, ClipboardList, FileText, Layers, Box, Warehouse, Factory, Home,
  Sparkles, Wrench, type LucideIcon,
} from "lucide-react";

/**
 * Icons selectable in the Admin panel, stored in the database by name
 * (icon_key). Keep in sync with ICON_KEYS in Admin/index.html.
 */
const ICONS: Record<string, LucideIcon> = {
  Monitor, Smartphone, Code2, Database, BarChart3, Shield, UtensilsCrossed, Package, Wine, UserCheck,
  Dumbbell, Building, Building2, ShoppingBag, Store, Target, Lightbulb, Heart, Rocket, Cloud, Server, Cpu,
  Globe, Laptop, Tablet, Wifi, Lock, Settings, Users, Briefcase, Truck, Hospital, Stethoscope, GraduationCap,
  Hotel, Car, Coffee, ShoppingCart, CreditCard, Wallet, PieChart, LineChart, TrendingUp, Zap, Star, Award,
  Headphones, MessageSquare, Calendar, ClipboardList, FileText, Layers, Box, Warehouse, Factory, Home,
  Sparkles, Wrench,
};

export const getIcon = (key?: string | null): LucideIcon => (key && ICONS[key]) || Sparkles;
