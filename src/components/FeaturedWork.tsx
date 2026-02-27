import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import villaInterior from "@/assets/villa-interior.jpg";
import villaExterior from "@/assets/villa-exterior.jpg";
import brandingFlatlay from "@/assets/branding-flatlay.jpg";
import cafeInterior from "@/assets/cafe-interior.jpg";
import hotelRooftop from "@/assets/hotel-rooftop.jpg";
import foodStyling from "@/assets/food-styling.jpg";
import resortPool from "@/assets/resort-pool.jpg";

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

/* ─── Project Data ─── */
const projects = [
  {
    label: "Social Media | Booking Platforms | Business Strategy",
    title: "Celanka Resort – Kandy",
    subtitle: "Art Direction & Strategy: Celanka Resort is a calm retreat in the heart of Kandy. We partnered with the team to build a smooth guest journey, from online discovery to on-property experience.",
    images: [
      { src: resortPool, alt: "Celanka Resort infinity pool", span: "md:col-span-2" },
      { src: villaInterior, alt: "Luxury suite interior" },
      { src: villaExterior, alt: "Resort exterior" },
    ],
    approach: {
      heading: "Art Direction & Strategy",
      description: "Celanka Resort is a calm retreat in the heart of Kandy. We partnered with the team to build a smooth guest journey, from online discovery to on-property experience.",
      items: [
        "Structured guest experience guidelines",
        "Managed social media presence with consistent, calming visuals",
        "Optimized and managed listings on Airbnb, Agoda & Booking.com",
        "Set up and managed Google Business Profile for visibility and reviews",
        "Guided reservation flow and guest communication standards",
      ],
    },
    results: [
      { text: "Stronger booking consistency across platforms" },
      { text: "Improved guest experience and reviews" },
      { text: "Clear operational structure for daily management" },
    ],
  },
  {
    label: "Drone Video | Photography",
    title: "Peaceful Paradise Villa – Hanthana",
    subtitle: "Art Direction & Visual Storytelling: Nestled in the hills of Hanthana, Peaceful Paradise Villa offers breathtaking views and quiet luxury. We focused on capturing the feeling of space, nature, and calm.",
    images: [
      { src: villaExterior, alt: "Peaceful Paradise Villa exterior", span: "md:col-span-2" },
      { src: villaInterior, alt: "Villa interior view" },
      { src: brandingFlatlay, alt: "Visual storytelling content" },
    ],
    approach: {
      heading: "Art Direction & Visual Storytelling",
      description: "Nestled in the hills of Hanthana, Peaceful Paradise Villa offers breathtaking views and quiet luxury. We focused on capturing the feeling of space, nature, and calm.",
      items: [
        "Cinematic drone coverage showcasing landscape and surroundings",
        "Lifestyle and property photography for digital platforms",
        "Visual content crafted for social media and booking platforms",
      ],
    },
    results: [
      { text: "High-impact visual assets for online listings" },
    ],
  },
];

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
        <h2 className="text-heading mb-2 text-foreground">{project.title}</h2>
        <p className="font-body text-muted-foreground mb-6 max-w-xl">{project.subtitle}</p>
      </motion.div>

      {/* Gallery */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className={project.images[0].span || ""}>
          <img src={project.images[0].src} alt={project.images[0].alt} className="w-full h-72 md:h-96 object-cover rounded-sm" loading="lazy" />
        </div>
        <div className="flex flex-col gap-4">
          <img src={project.images[1].src} alt={project.images[1].alt} className="w-full h-44 md:h-[calc(50%-0.5rem)] object-cover rounded-sm" loading="lazy" />
          <img src={project.images[2].src} alt={project.images[2].alt} className="w-full h-44 md:h-[calc(50%-0.5rem)] object-cover rounded-sm" loading="lazy" />
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
