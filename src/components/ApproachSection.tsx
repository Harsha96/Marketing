import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ApproachSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding border-t border-border/20">
      <motion.div
        className="max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Our Approach
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Everything is connected.
        </h2>
        <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Marketing is a multifaceted beast. We step back to see the bigger picture because everything needs to work together to get the results you crave. Brand, web, content, advertising. It's all connected, man! We're your team of specialists who know their shit, championing your cause. We don't deal in vanity metrics or hide behind vague reports. We get results that matter most to you. Werk means growth.
        </p>
      </motion.div>
    </section>
  );
};

export default ApproachSection;
