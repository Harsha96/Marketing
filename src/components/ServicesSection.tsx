import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Clapperboard, Megaphone } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Strategy & Consulting",
    items: [
      "Market positioning & branding for villas, cafes & hotels",
      "Go-to-market campaigns",
      "Digital & social strategy",
      "Consumer insight & competitor analysis",
    ],
  },
  {
    icon: Clapperboard,
    title: "Creative & Production",
    items: [
      "Brand identity & storytelling",
      "Video production (drone & cinematic footage)",
      "Photography & social content creation",
      "Packaging & on-property branding",
      "Digital design & website visuals",
    ],
  },
  {
    icon: Megaphone,
    title: "Social Media & Marketing",
    items: [
      "Social media management & growth strategy",
      "Community engagement & influencer partnerships",
      "Paid social campaigns & reporting",
      "Content planning & creative direction",
    ],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="section-padding section-gap border-t border-border/30">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-label mb-4">What We Do</p>
        <h2 className="text-heading text-foreground">Our Services</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className="group p-6 bg-card border border-border/30 hover:border-primary/30 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 * i }}
          >
            <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-500">
              <service.icon className="w-7 h-7 text-primary" strokeWidth={1.4} />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
              {service.title}
            </h3>
            <ul className="space-y-3">
              {service.items.map((item) => (
                <li key={item} className="font-body text-sm text-muted-foreground flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
