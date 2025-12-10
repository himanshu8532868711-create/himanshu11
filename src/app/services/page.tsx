"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Code, 
  Palette, 
  TrendingUp, 
  Megaphone,
  Smartphone,
  Globe,
  ShoppingCart,
  Layout,
  Package,
  Instagram,
  Users,
  Search,
  Mail,
  BarChart,
  Target,
  Sparkles,
  Zap,
  Loader2,
  MapPin,
  Tablet,
  HardDrive,
  Share2,
  Image,
  Award,
  Camera,
  Video,
  PlayCircle,
  Briefcase,
  Film,
  Cpu,
  Server,
  Database,
  Layers,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
// import { JsonLd, serviceSchema, generateBreadcrumbSchema } from "@/components/JsonLd";

// Icon mapping for dynamic rendering
const iconMap: Record<string, any> = {
  Code,
  Palette,
  TrendingUp,
  Instagram,
  Megaphone,
  Smartphone,
  Globe,
  ShoppingCart,
  Layout,
  Package,
  Users,
  Search,
  Mail,
  BarChart,
  Target,
  MapPin,
  Tablet,
  HardDrive,
  Share2,
  Image,
  Award,
  Camera,
  Video,
  PlayCircle,
  Briefcase,
  Film,
  Cpu,
  Server,
  Database,
  Layers,
  MessageSquare,
};

// Fallback static services data
const fallbackServices: Service[] = [
  {
    id: 1,
    categoryIcon: "TrendingUp",
    categoryTitle: "Digital Marketing",
    categoryDescription: "Drive growth with data-driven marketing strategies that deliver measurable results",
    categoryGradient: "from-blue-500 to-indigo-600",
    displayOrder: 1,
    isActive: true,
    items: [
      { id: 1, serviceId: 1, icon: "Search", title: "SEO Optimization", items: ["Keyword Research", "On-Page SEO", "Technical SEO", "Link Building"], displayOrder: 1 },
      { id: 2, serviceId: 1, icon: "Instagram", title: "Social Media Marketing", items: ["Content Strategy", "Community Management", "Paid Advertising", "Analytics"], displayOrder: 2 },
      { id: 3, serviceId: 1, icon: "Mail", title: "Email Marketing", items: ["Campaign Design", "Automation", "A/B Testing", "Analytics"], displayOrder: 3 },
    ]
  },
  {
    id: 2,
    categoryIcon: "Code",
    categoryTitle: "Web Development",
    categoryDescription: "Build powerful, scalable web solutions with cutting-edge technologies",
    categoryGradient: "from-green-500 to-emerald-600",
    displayOrder: 2,
    isActive: true,
    items: [
      { id: 4, serviceId: 2, icon: "Globe", title: "Website Development", items: ["Custom Websites", "CMS Integration", "Landing Pages", "Web Portals"], displayOrder: 1 },
      { id: 5, serviceId: 2, icon: "ShoppingCart", title: "E-Commerce Solutions", items: ["Online Stores", "Payment Integration", "Inventory Management", "Order Tracking"], displayOrder: 2 },
      { id: 6, serviceId: 2, icon: "Layout", title: "UI/UX Design", items: ["User Research", "Wireframing", "Prototyping", "Responsive Design"], displayOrder: 3 },
    ]
  },
  {
    id: 3,
    categoryIcon: "Smartphone",
    categoryTitle: "Mobile App Development",
    categoryDescription: "Create engaging mobile experiences for iOS and Android platforms",
    categoryGradient: "from-purple-500 to-fuchsia-600",
    displayOrder: 3,
    isActive: true,
    items: [
      { id: 7, serviceId: 3, icon: "Smartphone", title: "iOS Development", items: ["Native Apps", "Swift/SwiftUI", "App Store Optimization", "Maintenance"], displayOrder: 1 },
      { id: 8, serviceId: 3, icon: "Tablet", title: "Android Development", items: ["Native Apps", "Kotlin/Java", "Play Store Optimization", "Support"], displayOrder: 2 },
      { id: 9, serviceId: 3, icon: "Layers", title: "Cross-Platform", items: ["React Native", "Flutter", "Progressive Web Apps", "Hybrid Solutions"], displayOrder: 3 },
    ]
  },
  {
    id: 4,
    categoryIcon: "Server",
    categoryTitle: "Cloud & Infrastructure",
    categoryDescription: "Robust hosting and server solutions for optimal performance",
    categoryGradient: "from-orange-500 to-amber-600",
    displayOrder: 4,
    isActive: true,
    items: [
      { id: 10, serviceId: 4, icon: "Database", title: "Cloud Hosting", items: ["AWS", "Google Cloud", "Azure", "Scalable Solutions"], displayOrder: 1 },
      { id: 11, serviceId: 4, icon: "Server", title: "Server Management", items: ["Setup & Config", "Monitoring", "Security", "Optimization"], displayOrder: 2 },
      { id: 12, serviceId: 4, icon: "HardDrive", title: "DevOps", items: ["CI/CD Pipelines", "Containerization", "Automation", "Infrastructure as Code"], displayOrder: 3 },
    ]
  },
  {
    id: 5,
    categoryIcon: "Palette",
    categoryTitle: "Creative Design",
    categoryDescription: "Stunning visual designs that capture attention and communicate your brand",
    categoryGradient: "from-yellow-500 to-rose-600",
    displayOrder: 5,
    isActive: true,
    items: [
      { id: 13, serviceId: 5, icon: "Palette", title: "Brand Identity", items: ["Logo Design", "Brand Guidelines", "Color Systems", "Typography"], displayOrder: 1 },
      { id: 14, serviceId: 5, icon: "Image", title: "Graphic Design", items: ["Marketing Materials", "Social Media Graphics", "Print Design", "Packaging"], displayOrder: 2 },
      { id: 15, serviceId: 5, icon: "Award", title: "Illustration", items: ["Custom Illustrations", "Icon Design", "Infographics", "Character Design"], displayOrder: 3 },
    ]
  },
  {
    id: 6,
    categoryIcon: "Video",
    categoryTitle: "Video Production",
    categoryDescription: "Professional video content that tells your story and engages audiences",
    categoryGradient: "from-cyan-500 to-sky-600",
    displayOrder: 6,
    isActive: true,
    items: [
      { id: 16, serviceId: 6, icon: "Camera", title: "Video Shooting", items: ["Commercial Videos", "Corporate Films", "Product Videos", "Event Coverage"], displayOrder: 1 },
      { id: 17, serviceId: 6, icon: "Film", title: "Video Editing", items: ["Post-Production", "Color Grading", "Motion Graphics", "Sound Design"], displayOrder: 2 },
      { id: 18, serviceId: 6, icon: "PlayCircle", title: "Animation", items: ["2D Animation", "3D Animation", "Explainer Videos", "Promotional Content"], displayOrder: 3 },
    ]
  },
];

interface ServiceItem {
  id: number;
  serviceId: number;
  icon: string;
  title: string;
  items: string[];
  displayOrder: number;
}

interface Service {
  id: number;
  categoryIcon: string;
  categoryTitle: string;
  categoryDescription: string;
  categoryGradient: string;
  displayOrder: number;
  isActive: boolean;
  items: ServiceItem[];
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // const breadcrumbSchema = generateBreadcrumbSchema([
  //   { name: "Home", url: "https://humdigitalstudio.com" },
  //   { name: "Services", url: "https://humdigitalstudio.com/services" }
  // ]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch('/api/services?withItems=true&isActive=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        
        // Parse items if they come as JSON strings from the database
        const parsedData = data.map((service: any) => {
          // Ensure items is an array
          const serviceItems = Array.isArray(service.items) ? service.items : [];
          
          return {
            ...service,
            items: serviceItems.map((item: any) => {
              let parsedItems: string[] = [];
              
              // Parse the items field if it's a string
              if (typeof item.items === 'string') {
                try {
                  parsedItems = JSON.parse(item.items);
                } catch (e) {
                  console.error('Failed to parse item.items:', item.items, e);
                  parsedItems = [];
                }
              } else if (Array.isArray(item.items)) {
                parsedItems = item.items;
              }
              
              return {
                ...item,
                items: parsedItems
              };
            })
          };
        });
        
        if (parsedData.length > 0) {
          setServices(parsedData);
        } else {
          // Use fallback if no data returned
          setServices(fallbackServices);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        // Use fallback data on error
        setServices(fallbackServices);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Get icon component from string name
  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Code;
  };

  // Background configurations for each service category
  const getBackgroundForService = (index: number) => {
    const backgrounds = [
      {
        // Digital Marketing - AI Neural Network Background
        bg: "bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-background",
        elements: (
          <>
            {/* Neural network nodes */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Network connections */}
              <line x1="150" y1="100" x2="350" y2="200" stroke="url(#neural-gradient)" strokeWidth="2" className="animate-pulse" filter="url(#glow)" />
              <line x1="350" y1="200" x2="550" y2="150" stroke="url(#neural-gradient)" strokeWidth="2" className="animate-pulse delay-500" filter="url(#glow)" />
              <line x1="550" y1="150" x2="750" y2="250" stroke="url(#neural-gradient)" strokeWidth="2" className="animate-pulse" filter="url(#glow)" />
              <line x1="150" y1="100" x2="450" y2="300" stroke="url(#neural-gradient)" strokeWidth="1" className="animate-pulse delay-1000" opacity="0.5" />
              <line x1="350" y1="200" x2="650" y2="350" stroke="url(#neural-gradient)" strokeWidth="1" className="animate-pulse" opacity="0.5" />
              
              {/* Neural nodes */}
              <circle cx="150" cy="100" r="8" fill="#3b82f6" className="animate-pulse" filter="url(#glow)" />
              <circle cx="350" cy="200" r="10" fill="#6366f1" className="animate-pulse delay-500" filter="url(#glow)" />
              <circle cx="550" cy="150" r="8" fill="#3b82f6" className="animate-pulse delay-1000" filter="url(#glow)" />
              <circle cx="750" cy="250" r="10" fill="#6366f1" className="animate-pulse" filter="url(#glow)" />
              <circle cx="450" cy="300" r="6" fill="#3b82f6" className="animate-pulse delay-500" filter="url(#glow)" />
            </svg>
            
            {/* Floating data particles */}
            <div className="absolute top-20 left-20 w-3 h-3 bg-blue-500 rounded-full animate-float blur-sm" />
            <div className="absolute top-40 right-32 w-2 h-2 bg-indigo-500 rounded-full animate-float-delayed blur-sm" />
            <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-float blur-sm" />
            
            {/* Holographic grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f630_1px,transparent_1px),linear-gradient(to_bottom,#3b82f630_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            </div>
            
            {/* Glowing orbs */}
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-500/30 to-indigo-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-500/30 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        ),
      },
      {
        // Web Development - Circuit Board Matrix
        bg: "bg-gradient-to-br from-green-600/10 via-emerald-600/10 to-background",
        elements: (
          <>
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path d="M0,100 L200,100 L220,120 L400,120" stroke="url(#circuit-gradient)" strokeWidth="3" fill="none" className="animate-pulse" />
              <path d="M0,200 L300,200 L320,220 L600,220" stroke="url(#circuit-gradient)" strokeWidth="3" fill="none" className="animate-pulse delay-500" />
              <path d="M200,300 L500,300 L520,320 L800,320" stroke="url(#circuit-gradient)" strokeWidth="3" fill="none" className="animate-pulse delay-1000" />
              <circle cx="200" cy="100" r="6" fill="#10b981" className="animate-pulse" />
              <circle cx="300" cy="200" r="6" fill="#14b8a6" className="animate-pulse delay-500" />
              <circle cx="500" cy="300" r="6" fill="#10b981" className="animate-pulse delay-1000" />
            </svg>
            <div className="absolute top-10 left-10 font-mono text-sm text-green-500/20 animate-float leading-tight">
              01010011<br/>11001010<br/>10110101
            </div>
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-green-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-emerald-500/30 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        ),
      },
      {
        // Mobile App Development
        bg: "bg-gradient-to-br from-purple-600/10 via-fuchsia-600/10 to-background",
        elements: (
          <>
            <div className="absolute top-24 left-24 w-40 h-72 border-2 border-purple-500/30 rounded-[3rem] animate-float backdrop-blur-sm">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-purple-500/30 rounded-full" />
              <div className="absolute inset-8 bg-gradient-to-b from-purple-500/10 to-fuchsia-500/10 rounded-3xl" />
            </div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-fuchsia-500/30 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        ),
      },
      {
        // Server - Data Center Infrastructure
        bg: "bg-gradient-to-br from-orange-600/10 via-amber-600/10 to-background",
        elements: (
          <>
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="server-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <g className="animate-pulse">
                <rect x="100" y="120" width="100" height="240" stroke="url(#server-gradient)" strokeWidth="3" fill="none" />
                <line x1="100" y1="160" x2="200" y2="160" stroke="url(#server-gradient)" strokeWidth="2" />
                <line x1="100" y1="200" x2="200" y2="200" stroke="url(#server-gradient)" strokeWidth="2" />
                <circle cx="180" cy="140" r="3" fill="#f97316" className="animate-pulse" />
              </g>
            </svg>
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-orange-500/30 to-amber-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-amber-500/30 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        ),
      },
      {
        // Creative Designing
        bg: "bg-gradient-to-br from-yellow-600/10 via-rose-600/10 to-background",
        elements: (
          <>
            <div className="absolute top-24 left-24 w-32 h-32 border-4 border-yellow-500/20 rounded-full animate-float" />
            <div className="absolute top-40 right-32 w-40 h-40 border-4 border-rose-500/20 rotate-45 animate-float-delayed" />
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-500/30 to-rose-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-rose-500/30 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        ),
      },
      {
        // Video Production
        bg: "bg-gradient-to-br from-cyan-600/10 via-sky-600/10 to-background",
        elements: (
          <>
            <div className="absolute top-28 left-20 w-40 h-32 border-2 border-cyan-500/30 animate-float">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-500/30" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-500/30" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-500/30" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-500/30" />
            </div>
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/30 to-sky-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-sky-500/30 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        ),
      },
    ];

    return backgrounds[index % backgrounds.length];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
            <p className="text-xl text-muted-foreground">Loading services...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} /> */}
      
      <Navigation />

      {/* Hero Section - Creative */}
      <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-slate-900">
          {/* Glowing orbs */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500" />
          
          {/* Floating tech icons */}
          <div className="absolute top-32 left-20 text-6xl opacity-5 animate-float">💻</div>
          <div className="absolute top-48 right-32 text-5xl opacity-5 animate-float-delayed">🚀</div>
          <div className="absolute bottom-40 left-1/3 text-7xl opacity-5 animate-float">🎨</div>
          <div className="absolute bottom-28 right-1/4 text-4xl opacity-5 animate-float-delayed">⚡</div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00bfa610_1px,transparent_1px),linear-gradient(to_bottom,#00bfa610_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>
          
          {/* Matrix-style falling code */}
          <div className="absolute top-1/4 left-10 font-mono text-xs text-cyan-500/10 leading-relaxed animate-float">
            &lt;div&gt;<br/>  class<br/>  style<br/>&lt;/div&gt;
          </div>
          <div className="absolute top-1/3 right-20 font-mono text-xs text-accent/10 leading-relaxed animate-float-delayed">
            function()<br/>  return<br/>  true<br/>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Our Services</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-white">
              Comprehensive <span className="text-accent drop-shadow-[0_0_15px_rgba(0,191,166,0.5)]">Digital Solutions</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Tailored to elevate your brand and drive business growth in the digital landscape
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Service Sections */}
      {services.map((service, index) => {
        const CategoryIcon = getIcon(service.categoryIcon);
        const background = getBackgroundForService(index);

        return (
          <section key={service.id} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background */}
            <div className={`absolute inset-0 ${background.bg}`}>
              {background.elements}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <div className={`inline-flex h-20 w-20 rounded-2xl bg-gradient-to-br ${service.categoryGradient} items-center justify-center mb-6 shadow-lg shadow-${service.categoryGradient}/20`}>
                  <CategoryIcon className="h-10 w-10 text-white drop-shadow-lg" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">{service.categoryTitle}</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {service.categoryDescription}
                </p>
              </div>

              <div className={`grid md:grid-cols-2 lg:grid-cols-${service.items.length === 4 ? '4' : '3'} gap-6`}>
                {service.items.map((item) => {
                  const ItemIcon = getIcon(item.icon);
                  
                  return (
                    <Card key={item.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-transparent overflow-hidden relative backdrop-blur-sm bg-background/80">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.categoryGradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      <CardHeader className="relative z-10">
                        <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${service.categoryGradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg`}>
                          <ItemIcon className="h-7 w-7 text-white" />
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <ul className="space-y-3">
                          {item.items.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Why Choose Us - Feature Cards */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
          {/* Glowing orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00bfa610_1px,transparent_1px),linear-gradient(to_bottom,#00bfa610_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          </div>
          
          {/* Floating icons */}
          <div className="absolute top-20 left-16 text-6xl opacity-5 animate-float">⭐</div>
          <div className="absolute top-40 right-24 text-5xl opacity-5 animate-float-delayed">🏆</div>
          <div className="absolute bottom-32 left-1/3 text-7xl opacity-5 animate-float">💎</div>
          <div className="absolute bottom-20 right-1/4 text-4xl opacity-5 animate-float-delayed">✨</div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm mb-6">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Why Choose Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              What Makes Us <span className="text-accent drop-shadow-[0_0_15px_rgba(0,191,166,0.5)]">Different</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experience excellence with our unique approach to digital solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Expert Team", desc: "Skilled professionals with 10+ years experience", color: "from-blue-500 to-cyan-500" },
              { title: "On-Time Delivery", desc: "We respect deadlines and deliver on schedule", color: "from-purple-500 to-pink-500" },
              { title: "24/7 Support", desc: "Round-the-clock assistance whenever you need", color: "from-orange-500 to-red-500" },
              { title: "Affordable Pricing", desc: "Premium quality at competitive rates", color: "from-green-500 to-emerald-500" }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-accent/50 text-center relative overflow-hidden backdrop-blur-sm bg-card/80">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <CardContent className="p-8 relative z-10">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg text-3xl font-bold text-white`}>
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-primary">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTRjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMlMwIDIwLjYyNyAwIDE0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
          
          {/* Neon glow effects */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Animated lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00bfa6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path d="M0,200 Q400,100 800,200 T1600,200" stroke="url(#cta-gradient)" strokeWidth="3" fill="none" className="animate-pulse" />
            <path d="M0,400 Q400,300 800,400 T1600,400" stroke="url(#cta-gradient)" strokeWidth="3" fill="none" className="animate-pulse delay-500" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
            Ready to Transform<br />
            <span className="text-accent drop-shadow-[0_0_20px_rgba(0,191,166,0.6)]">Your Business?</span>
          </h2>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              asChild 
              size="lg" 
              className="text-lg h-14 px-8 bg-gradient-to-r from-accent via-primary to-cyan-500 hover:from-accent/90 hover:via-primary/90 hover:to-cyan-500/90 text-white shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all hover:scale-105 font-semibold border-0"
            >
              <Link href="/contact">
                Start Your Project Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="text-lg h-14 px-8 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-600/90 hover:via-fuchsia-600/90 hover:to-pink-600/90 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105 font-semibold border-0"
            >
              <Link href="/portfolio">Explore Our Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
}