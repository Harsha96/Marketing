import { useParams, Link } from "react-router-dom";
import { motion, animate, useInView } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import DudoNavbar from "@/components/DudoNavbar";
import DudoFooter from "@/components/DudoFooter";
import ContactCTA from "@/components/ContactCTA";

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

const CaseStudy = () => {
    const { slug } = useParams<{ slug: string }>();
    const project = projects.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-display font-bold mb-4">Case study not found</h1>
                <Link to="/" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <DudoNavbar />

            <main className="pt-32 pb-20">
                <div className="container-custom px-6 md:px-12 lg:px-20">

                    {/* Header */}
                    <header className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <Link
                                to="/#work"
                                className="group flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase"
                            >
                                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Back to Work
                            </Link>
                            <span className="w-1 h-1 rounded-full bg-border/50" />
                            <span className="text-xs font-medium text-primary tracking-widest uppercase">{project.label.split('|')[0].trim()}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-heading !text-4xl md:!text-7xl mb-8 leading-[1.1]"
                        >
                            {project.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
                        >
                            {project.subtitle}
                        </motion.p>
                    </header>

                    {/* Gallery */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className={`${project.images[0].span || "md:col-span-2"} overflow-hidden rounded-sm`}>
                            <img
                                src={project.images[0].src}
                                alt={project.images[0].alt}
                                className="w-full h-[400px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="overflow-hidden rounded-sm h-[188px] md:h-[calc(50%-0.75rem)]">
                                <img
                                    src={project.images[1].src}
                                    alt={project.images[1].alt}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                />
                            </div>
                            <div className="overflow-hidden rounded-sm h-[188px] md:h-[calc(50%-0.75rem)]">
                                <img
                                    src={project.images[2].src}
                                    alt={project.images[2].alt}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Details Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2 className="text-subheading mb-8 text-foreground uppercase tracking-wider text-sm font-bold flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-primary" /> The Approach
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-display font-medium mb-6 text-foreground leading-tight">
                                {project.approach.heading}
                            </h3>
                            <p className="font-body text-muted-foreground text-lg md:text-xl leading-relaxed mb-10">
                                {project.approach.description}
                            </p>

                            <ul className="space-y-6">
                                {project.approach.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                        <span className="font-body text-foreground/80 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="bg-secondary/30 p-8 md:p-12 rounded-sm border border-border/20"
                        >
                            <h2 className="text-subheading mb-12 text-foreground uppercase tracking-wider text-sm font-bold flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-primary" /> Key Results
                            </h2>
                            <div className="space-y-12">
                                {project.results.map((result, idx) => (
                                    <div key={idx} className="relative">
                                        {result.value !== undefined ? (
                                            <div>
                                                <p className="text-5xl md:text-7xl font-display font-bold text-primary mb-2">
                                                    <CountUp target={result.value} suffix={result.suffix} />
                                                </p>
                                                <p className="font-body text-muted-foreground text-lg uppercase tracking-widest">{result.label}</p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-snug">
                                                    {result.text}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <ContactCTA />
            <DudoFooter />
        </div>
    );
};

export default CaseStudy;
