import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "5 Video Trends Shaping Luxury Hospitality in 2026",
    category: "Video Production",
    excerpt: "How cinematic content is transforming how travelers discover and book boutique properties.",
  },
  {
    title: "Building a Social Strategy for Boutique Hotels",
    category: "Social Media",
    excerpt: "A step-by-step guide to creating engagement-driven content that converts followers into guests.",
  },
  {
    title: "The Power of Drone Photography in Property Marketing",
    category: "Photography",
    excerpt: "Why aerial imagery has become essential for showcasing villa and hotel properties online.",
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="blog" ref={ref} className="section-padding section-gap border-t border-border/30">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-label mb-4">Insights</p>
        <h2 className="text-heading text-foreground">Blog</h2>
        <p className="font-body text-muted-foreground mt-3">
          Tips, stories, and trends for hospitality marketing.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <motion.article
            key={post.title}
            className="group border border-border/30 p-6 hover:border-primary/30 transition-all duration-500 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 * i }}
          >
            <p className="text-label mb-3 !text-xs">{post.category}</p>
            <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>
            <span className="inline-flex items-center gap-2 font-body text-sm text-primary group-hover:gap-3 transition-all duration-300">
              Read More <ArrowRight className="w-4 h-4" />
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
