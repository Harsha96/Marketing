import { motion } from "framer-motion";
import heroPhone from "@/assets/hero-phone.png";

const servicePills = [
  "Strategy",
  "Digital Advertising",
  "Social Media Management",
  "Websites",
  "E-Commerce Marketing",
  "Event Marketing",
];

const Hero = () => {
  return (
    <section className="section-padding pt-32 md:pt-40 min-h-screen flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-display mb-6">
            Marketing<br />Services
          </h1>
          <h2 className="text-subtitle text-foreground/90 mb-6">
            Be seen. Be chosen. Top targets. Repeat.
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
            Whether you and your audience are acquaintances or best mates – that relationship status ain't got nothing unless they actually{" "}
            <em className="text-foreground">choose</em> you. Engaging people at the right place and time to inspire action is like…our really long middle name.
          </p>

          {/* Service Pills */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {servicePills.map((pill, i) => (
              <motion.a
                key={pill}
                href={`#${pill.toLowerCase().replace(/\s+/g, "-")}`}
                className="service-pill"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                whileHover={{ scale: 1.05 }}
              >
                {pill}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative w-72 md:w-80 lg:w-96">
            <div className="absolute -inset-8 bg-foreground/5 rounded-3xl -rotate-3" />
            <img
              src={heroPhone}
              alt="Social media campaign mockup on smartphone"
              className="relative z-10 w-full h-auto rounded-2xl"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
