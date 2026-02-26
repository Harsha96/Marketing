import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Testimonial = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding border-t border-border/20">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <blockquote className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
          "Online sales have grown crazy, from 2 to 18% of our total revenue"
        </blockquote>
        <p className="font-body text-muted-foreground text-lg">
          Flight Coffee
        </p>
      </motion.div>
    </section>
  );
};

export default Testimonial;
