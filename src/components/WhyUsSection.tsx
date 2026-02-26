import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Earth, Sparkles, HandshakeIcon } from "lucide-react";

const reasons = [
  {
    icon: Earth,
    title: "Hospitality Focused, Globally Minded",
    description:
      "We know villas, cafes, and hotels inside out. Our team blends creative storytelling with marketing expertise to make your property stand out—online and offline.",
  },
  {
    icon: Sparkles,
    title: "Specialist Efficiency",
    description:
      "From drone operators to filmmakers and social strategists, we assemble a lean, expert team for each project—no wasted overheads, just results.",
  },
  {
    icon: HandshakeIcon,
    title: "Hands-On Experience",
    description:
      "Many of our team members have worked in hospitality and client-side marketing. We understand the industry, your challenges, and your audience.",
  },
];

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-us" ref={ref} className="section-padding section-gap border-t border-border/30">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-label mb-4">The Dudo Difference</p>
        <h2 className="text-heading text-foreground">Why Us?</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 * i }}
          >
            <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-4">
              <reason.icon className="w-8 h-8 text-primary" strokeWidth={1.2} />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">{reason.title}</h3>
            <p className="font-body text-muted-foreground leading-relaxed">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
