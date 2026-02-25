import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ServiceSectionProps {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  links?: { label: string; href: string }[];
  reverse?: boolean;
}

const ServiceSection = ({
  id,
  title,
  description,
  image,
  imageAlt,
  links = [],
  reverse = false,
}: ServiceSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className="section-padding border-t border-border/20"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          reverse ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* Text */}
        <motion.div
          className={reverse ? "lg:[direction:ltr]" : ""}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            {title}
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
            {description}
          </p>
          {links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="service-pill"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Image */}
        <motion.div
          className={reverse ? "lg:[direction:ltr]" : ""}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
