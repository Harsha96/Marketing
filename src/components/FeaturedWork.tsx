import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

/* ─── Animated Counter ─── */
const CountUp = ({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
};

/* ─── Single Project Block ─── */
const ProjectBlock = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={index > 0 ? "mt-8 md:mt-12 pt-8 border-t border-border/20" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-label mb-4">{project.label}</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
          <h2 className="text-heading text-foreground">{project.title}</h2>
          <Link
            to={`/work/${project.slug}`}
            className="group inline-flex items-center gap-2 text-primary font-display font-medium text-lg hover:gap-3 transition-all duration-300"
          >
            View Case Study <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <p className="font-body text-muted-foreground mb-6 max-w-xl">{project.subtitle}</p>
      </motion.div>

      {/* Gallery */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className={`${project.images[0].span || ""} overflow-hidden rounded-sm`}>
          <img src={project.images[0].src} alt={project.images[0].alt} className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-1000" loading="lazy" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-sm h-44 md:h-[calc(50%-0.5rem)]">
            <img src={project.images[1].src} alt={project.images[1].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" loading="lazy" />
          </div>
          <div className="overflow-hidden rounded-sm h-44 md:h-[calc(50%-0.5rem)]">
            <img src={project.images[2].src} alt={project.images[2].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" loading="lazy" />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-subheading mb-4 text-foreground">{project.approach.heading}</h3>
          <p className="font-body text-muted-foreground leading-relaxed mb-6">{project.approach.description}</p>
          <h4 className="font-display text-lg font-semibold text-foreground mb-3">Our Approach</h4>
          <ul className="space-y-3">
            {project.approach.items.map((item: string) => (
              <li key={item} className="font-body text-muted-foreground flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h4 className="font-display text-lg font-semibold text-foreground mb-6">Results</h4>
          <div className="space-y-6">
            {project.results.map((r: any, idx: number) => (
              <div key={idx} className="border-l-2 border-primary pl-6 py-1">
                {r.value !== undefined ? (
                  <>
                    <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-1">
                      <CountUp target={r.value} suffix={r.suffix} />
                    </p>
                    <p className="font-body text-muted-foreground">{r.label}</p>
                  </>
                ) : (
                  <p className="font-display text-xl md:text-2xl font-medium text-foreground leading-snug">
                    {r.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const FeaturedWork = () => {
  return (
    <section id="work" className="section-padding section-gap border-t border-border/30">
      {projects.map((project, i) => (
        <ProjectBlock key={project.title} project={project} index={i} />
      ))}
    </section>
  );
};

export default FeaturedWork;
