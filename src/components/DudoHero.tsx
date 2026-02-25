import { motion } from "framer-motion";
import heroVilla from "@/assets/hero-villa.jpg";

const DudoHero = () => {
  return (
    <section id="showreel" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroVilla}
          alt="Luxury villa with infinity pool at sunset"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding pb-20 md:pb-28 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.p
            className="text-label mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Creative Studio for Hospitality
          </motion.p>
          <h1 className="text-display mb-6">
            We bring<br />
            <span className="italic text-primary">hospitality</span><br />
            brands to life
          </h1>
          <p className="font-body text-lg md:text-xl text-foreground/70 max-w-lg mb-10 leading-relaxed">
            Branding, video production & social media strategy for luxury villas,
            boutique hotels, and cafes worldwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="font-body text-sm px-8 py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 tracking-wide"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="font-body text-sm px-8 py-3.5 border border-foreground/30 text-foreground hover:border-primary hover:text-primary transition-all duration-300 tracking-wide"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DudoHero;
