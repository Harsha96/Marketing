import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const posts = [
  {
    title: "5 Video Trends Shaping Luxury Hospitality in 2026",
    slug: "video-trends-luxury-hospitality",
    category: "Video Production",
    date: "May 12, 2026",
    readTime: "6 min read",
    tags: ["Video", "Hospitality", "Luxury"],
    excerpt: "How cinematic content is transforming how travelers discover and book boutique properties.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    fullContent: "The landscape of luxury hospitality is evolving rapidly. In 2026, potential guests are no longer just looking for a room; they are looking for an experience. Cinematic video content has become the primary tool for boutique properties to showcase their unique narrative. From first-person POV tours to high-production emotional storytelling, video is the bridge between discovery and booking. We've seen a 40% increase in direct bookings for clients who lean into immersive video trends.",
  },
  {
    title: "Building a Social Strategy for Boutique Hotels",
    slug: "social-strategy-boutique-hotels",
    category: "Social Media",
    date: "June 05, 2026",
    readTime: "8 min read",
    tags: ["Social Media", "Strategy", "Marketing"],
    excerpt: "A step-by-step guide to creating engagement-driven content that converts followers into guests.",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800",
    fullContent: "Social media is the new concierge. For boutique hotels, a strong social strategy isn't just about posting pretty pictures; it's about building community. This guide explores how to leverage user-generated content, real-time engagement, and strategic influencer partnerships to create a digital presence that feels as welcoming as your physical lobby. Learn how to turn 'likes' into check-ins through authenticated storytelling and consistent brand voice.",
  },
  {
    title: "The Power of Drone Photography in Property Marketing",
    slug: "power-drone-photography",
    category: "Photography",
    date: "July 18, 2026",
    readTime: "5 min read",
    tags: ["Photography", "Drone", "Real Estate"],
    excerpt: "Why aerial imagery has become essential for showcasing villa and hotel properties online.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    fullContent: "Perspective is everything. Drone photography has revolutionized property marketing by providing a scale and context that ground-level photos simply cannot match. For luxury villas and expansive hotel grounds, aerial shots highlight the relationship between the architecture and its surrounding environment—whether it's a private beach or a mountain cliffside. This article dives into the technical and creative aspects of high-end drone photography for the hospitality sector.",
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
          <Link key={post.title} to={`/blog/${post.slug}`}>
            <motion.article
              className="group border border-border/30 overflow-hidden hover:border-primary/30 transition-all duration-500 cursor-pointer h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="text-label mb-3 !text-xs">{post.category}</p>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 font-body text-sm text-primary group-hover:gap-3 transition-all duration-300">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
