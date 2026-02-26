import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

const cities = [
  "Ahangama",
  "Habaraduwa",
  "Mirissa",
  "Hikkaduwa",
  "Hiriketiya",
  "Bentota",
  "Colombo",
  "Galle",
  "Kandy",
];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="clients" ref={ref} className="section-padding section-gap border-t border-border/30">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto"
      >
        <p className="text-label mb-4">Our Clients</p>
        <h2 className="text-heading text-foreground mb-4">
          Trusted by hospitality brands across the island
        </h2>
        <p className="font-body text-muted-foreground mb-6 text-lg">
          We collaborate with boutique hotels, luxury villas, and cafes across the globe.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {cities.map((city, i) => (
          <motion.div
            key={city}
            className="flex items-center gap-2 px-4 py-2 border border-border/40 text-muted-foreground font-body text-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.35 + i * 0.06 }}
          >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {city}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ClientsSection;
