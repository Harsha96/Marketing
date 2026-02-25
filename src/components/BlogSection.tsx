import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  date: string;
  publishDate: string; // ISO date string for scheduling
  readTime: string;
  tags: string[];
  excerpt: string;
  image: string;
  fullContent: string;
  status?: 'Draft' | 'Published';
  isLocal?: boolean;
}

const CORE_POSTS: BlogPost[] = [
  {
    title: "5 Video Trends Shaping Luxury Hospitality in 2026",
    slug: "video-trends-luxury-hospitality",
    category: "Video Production",
    date: "Feb 12, 2026",
    publishDate: "2026-02-12",
    readTime: "6 min read",
    tags: ["Video", "Hospitality", "Luxury"],
    excerpt: "How cinematic content is transforming how travelers discover and book boutique properties.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    fullContent: "The landscape of luxury hospitality is evolving rapidly. In 2026, potential guests are no longer just looking for a room; they are looking for an experience. Cinematic video content has become the primary tool for boutique properties to showcase their unique narrative. From first-person POV tours to high-production emotional storytelling, video is the bridge between discovery and booking. We've seen a 40% increase in direct bookings for clients who lean into immersive video trends.",
    status: 'Published'
  },
  {
    title: "Building a Social Strategy for Boutique Hotels",
    slug: "social-strategy-boutique-hotels",
    category: "Social Media",
    date: "Feb 15, 2026",
    publishDate: "2026-02-15",
    readTime: "8 min read",
    tags: ["Social Media", "Strategy", "Marketing"],
    excerpt: "A step-by-step guide to creating engagement-driven content that converts followers into guests.",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800",
    fullContent: "Social media is the new concierge. For boutique hotels, a strong social strategy isn't just about posting pretty pictures; it's about building community. This guide explores how to leverage user-generated content, real-time engagement, and strategic influencer partnerships to create a digital presence that feels as welcoming as your physical lobby. Learn how to turn 'likes' into check-ins through authenticated storytelling and consistent brand voice.",
    status: 'Published'
  },
  {
    title: "The Power of Drone Photography in Property Marketing",
    slug: "power-drone-photography",
    category: "Photography",
    date: "Feb 20, 2026",
    publishDate: "2026-02-20",
    readTime: "5 min read",
    tags: ["Photography", "Drone", "Real Estate"],
    excerpt: "Why aerial imagery has become essential for showcasing villa and hotel properties online.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    fullContent: "Perspective is everything. Drone photography has revolutionized property marketing by providing a scale and context that ground-level photos simply cannot match. For luxury villas and expansive hotel grounds, aerial shots highlight the relationship between the architecture and its surrounding environment—whether it's a private beach or a mountain cliffside. This article dives into the technical and creative aspects of high-end drone photography for the hospitality sector.",
    status: 'Published'
  },
];

const LOCAL_STORAGE_KEY = "werk-cms-posts";
const DELETED_CORE_KEY = "werk-deleted-core";

export const getAllPosts = (isAdmin = false): BlogPost[] => {
  if (typeof window === "undefined") return CORE_POSTS;

  // Load local posts
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const localPosts: BlogPost[] = localData ? JSON.parse(localData) : [];

  // Load deleted core slugs
  const deletedData = localStorage.getItem(DELETED_CORE_KEY);
  const deletedCoreSlugs: string[] = deletedData ? JSON.parse(deletedData) : [];

  // Merge and Deduplicate (Local overrides Core)
  const postsMap = new Map<string, BlogPost>();

  // Add core posts first (if not deleted)
  CORE_POSTS.forEach(post => {
    if (!deletedCoreSlugs.includes(post.slug)) {
      postsMap.set(post.slug, post);
    }
  });

  // Add local posts (overwriting core if slug matches)
  localPosts.forEach(post => {
    postsMap.set(post.slug, { ...post, isLocal: true });
  });

  const allPosts = Array.from(postsMap.values());

  if (isAdmin) return allPosts;

  const today = new Date().toISOString().split('T')[0];
  return allPosts.filter(post => {
    // For backward compatibility: if status is missing, assume Published
    const status = post.status || 'Published';
    return status === 'Published' && (post.publishDate || "0") <= today;
  });
};

export const saveLocalPost = (post: BlogPost) => {
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const localPosts: BlogPost[] = localData ? JSON.parse(localData) : [];

  const existingIndex = localPosts.findIndex(p => p.slug === post.slug);
  const newPost = { ...post, isLocal: true };

  if (existingIndex > -1) {
    localPosts[existingIndex] = newPost;
  } else {
    localPosts.unshift(newPost);
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localPosts));
};

export const deleteLocalPost = (slug: string) => {
  // 1. Remove from local storage if it exists
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const localPosts: BlogPost[] = localData ? JSON.parse(localData) : [];
  const filteredLocal = localPosts.filter(p => p.slug !== slug);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredLocal));

  // 2. If it's a core post slug, add to deleted list
  if (CORE_POSTS.some(p => p.slug === slug)) {
    const deletedData = localStorage.getItem(DELETED_CORE_KEY);
    const deletedCoreSlugs: string[] = deletedData ? JSON.parse(deletedData) : [];
    if (!deletedCoreSlugs.includes(slug)) {
      deletedCoreSlugs.push(slug);
      localStorage.setItem(DELETED_CORE_KEY, JSON.stringify(deletedCoreSlugs));
    }
  }
};

export const posts = getAllPosts(); // Fallback for components that don't need real-time updates


const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const displayPosts = getAllPosts(); // Fetch fresh data including local storage

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
        {displayPosts.map((post, i) => (
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
