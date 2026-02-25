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
    label: "Featured Work",
    title: "Villa Lumière",
    subtitle: "Brand Launch & Content Creation — Branding | Video Production | Social Media Strategy",
    images: [
      { src: villaExterior, alt: "Villa Lumière exterior at twilight", span: "md:col-span-2" },
      { src: villaInterior, alt: "Villa Lumière interior with warm lighting" },
      { src: brandingFlatlay, alt: "Villa Lumière branding materials" },
    ],
    approach: {
      heading: "Art Direction & Strategy",
      description: "Villa Lumière had a stunning property but needed a compelling online presence to attract high-end clientele.",
      items: [
        "Developed a full brand identity that reflects luxury and comfort",
        "Produced cinematic videos with drone shots to highlight property features",
        "Crafted a social media strategy to engage global travelers",
      ],
    },
    results: [
      { value: 20, suffix: "%", label: "increase in bookings within first month" },
      { value: 10, suffix: "K+", label: "social interactions in first campaign" },
    ],
  },
  {
    label: "Case Study",
    title: "Maison Café",
    subtitle: "Brand Identity & Digital Launch — Branding | Social Media | Photography",
    images: [
      { src: cafeInterior, alt: "Maison Café interior", span: "md:col-span-2" },
      { src: foodStyling, alt: "Artisan food styling" },
      { src: brandingFlatlay, alt: "Brand materials" },
    ],
    approach: {
      heading: "Visual Storytelling",
      description: "A specialty café in Bangkok needed a distinct identity to stand out in a saturated market.",
      items: [
        "Created a warm, artisanal brand identity with custom typography",
        "Shot on-location content showcasing the craft behind every cup",
        "Launched targeted social campaigns for local foodies",
      ],
    },
    results: [
      { value: 45, suffix: "%", label: "foot traffic increase after launch" },
      { value: 8, suffix: "K", label: "followers gained in 3 months" },
    ],
  },
  {
    label: "Case Study",
    title: "The Silk Hotel",
    subtitle: "Digital Repositioning — Video | Web Design | Paid Media",
    images: [
      { src: hotelRooftop, alt: "Rooftop bar at sunset", span: "md:col-span-2" },
      { src: resortPool, alt: "Resort infinity pool" },
      { src: villaInterior, alt: "Luxury suite interior" },
    ],
    approach: {
      heading: "Digital Repositioning",
      description: "A heritage boutique hotel in Singapore wanted to attract a younger, global audience without losing its classic charm.",
      items: [
        "Refreshed digital presence with cinematic brand films",
        "Redesigned the website with immersive visual storytelling",
        "Ran performance-driven ad campaigns across Meta & Google",
      ],
    },
    results: [
      { value: 3, suffix: "x", label: "return on ad spend within 60 days" },
      { value: 30, suffix: "%", label: "increase in direct bookings" },
    ],
  },
];

/* ─── Single Project Block ─── */
const ProjectBlock = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={index > 0 ? "mt-28 md:mt-36 pt-20 border-t border-border/20" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-label mb-4">{project.label}</p>
        <h2 className="text-heading mb-2 text-foreground">{project.title}</h2>
        <p className="font-body text-muted-foreground mb-12 max-w-xl">{project.subtitle}</p>
      </motion.div>

      {/* Gallery */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className={project.images[0].span || ""}>
          <img src={project.images[0].src} alt={project.images[0].alt} className="w-full h-72 md:h-96 object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col gap-4">
          <img src={project.images[1].src} alt={project.images[1].alt} className="w-full h-44 md:h-[calc(50%-0.5rem)] object-cover" loading="lazy" />
          <img src={project.images[2].src} alt={project.images[2].alt} className="w-full h-44 md:h-[calc(50%-0.5rem)] object-cover" loading="lazy" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-subheading mb-4 text-foreground">{project.approach.heading}</h3>
          <p className="font-body text-muted-foreground leading-relaxed mb-6">{project.approach.description}</p>
          <h4 className="font-display text-lg font-semibold text-foreground mb-3">Our Approach</h4>
          <ul className="space-y-3">
            {project.approach.items.map((item) => (
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
          <div className="space-y-8">
            {project.results.map((r) => (
              <div key={r.label} className="border-l-2 border-primary pl-6">
                <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-1">
                  <CountUp target={r.value} suffix={r.suffix} />
                </p>
                <p className="font-body text-muted-foreground">{r.label}</p>
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
