import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail } from "lucide-react";

const ContactCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="section-padding section-gap border-t border-border/30">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="gold-line mx-auto mb-4" />
        <h2 className="text-heading text-foreground mb-4">
          Have an idea?<br />
          <span className="italic text-primary">Let's talk.</span>
        </h2>
        <p className="font-body text-muted-foreground text-lg mb-4 leading-relaxed">
          Get in touch to bring your villa, cafe, or hotel to life.
        </p>
        <p className="font-body text-foreground/80 mb-2">
          Shanika H., Founder & CEO
        </p>
        <a
          href="mailto:shanika@dudostudio.com"
          className="inline-flex items-center gap-2 font-body text-primary hover:text-primary/80 transition-colors duration-300 text-lg mb-6"
        >
          <Mail className="w-5 h-5" />
          shanika@dudostudio.com
        </a>
        <div className="mt-4">
          <a
            href="mailto:shanika@dudostudio.com"
            className="inline-block font-body text-sm px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 tracking-wide"
          >
            Start a Project
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactCTA;
