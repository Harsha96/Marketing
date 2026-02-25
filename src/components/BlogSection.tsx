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
    title: "Best Beachfront Villas in Mirissa for a Private Getaway",
    slug: "best-beachfront-villas-mirissa",
    category: "Luxury Travel",
    date: "Feb 12, 2026",
    publishDate: "2026-02-12",
    readTime: "7 min read",
    tags: ["Mirissa", "Villas", "Beachfront"],
    excerpt: "Discover the most exclusive beachfront villas in Mirissa, where ultimate privacy meets the rhythmic sounds of the Indian Ocean.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200",
    fullContent: "Mirissa is no longer just a backpacker's stop; it has evolved into a premier destination for luxury seekers. The coastline is now dotted with architectural marvels that offer seamless indoor-outdoor living. From colonial-inspired estates to contemporary glass-fronted villas, our curated list explores the properties that define luxury in the south. \n\nWe look at amenities like private chefs, infinity pools that blend into the horizon, and direct access to secret coves that make Mirissa beachfront living so unique. Whether you are planning a romantic retreat or a large family gathering, these villas provide the perfect canvas for your Sri Lankan adventure.",
    status: 'Published'
  },
  {
    title: "Surf & Stay: Villas Near Unawatuna’s Top Surf Spots",
    slug: "unawatuna-surf-villas-guide",
    category: "Surf & Vibe",
    date: "Feb 15, 2026",
    publishDate: "2026-02-15",
    readTime: "6 min read",
    tags: ["Unawatuna", "Surfing", "Stay"],
    excerpt: "A guide to the best coastal retreats in Unawatuna that put you just steps away from the island's legendary breaks.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200",
    fullContent: "Unawatuna offers a unique blend of energetic surf culture and serene villa living. For those who live by the tide, staying close to the break is essential. In this guide, we highlight villas that offer more than just a bed; they offer a lifestyle. \n\nExpect outdoor showers for rinsing off the salt, secure board storage, and terraces built for watching the swell from the comfort of your lounge. We cover the top spots for both beginners and seasoned surfers, ensuring your stay in Unawatuna is as thrilling as it is relaxing. From the iconic Main Break to the hidden gems further down the coast, your perfect surf base awaits.",
    status: 'Published'
  },
  {
    title: "Luxury Villas in Hikkaduwa with Stunning Ocean Views",
    slug: "luxury-hikkaduwa-villas-ocean-view",
    category: "Boutique Stays",
    date: "Feb 20, 2026",
    publishDate: "2026-02-20",
    readTime: "5 min read",
    tags: ["Hikkaduwa", "Modern", "Ocean View"],
    excerpt: "Experience the vibrant spirit of Hikkaduwa from the tranquility of your own private cliffside or beachside sanctuary.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    fullContent: "Hikkaduwa remains a cornerstone of Sri Lankan tourism for a reason. Its vibrant coral reefs and lively strip are best enjoyed when you have a sophisticated retreat to return to. We've scouted the most impressive modern villas that maximize the dramatic views of the Indian Ocean. \n\nThese properties are defined by clean lines, local craftsmanship, and a commitment to high-end hospitality. Explore villas that feel like private resorts, complete with sprawling gardens, dedicated spa rooms, and sunset decks that offer front-row seats to the best light shows on the island. Discover why Hikkaduwa continues to lead the way in tropical luxury living.",
    status: 'Published'
  },
];

const LOCAL_STORAGE_KEY = "werk-cms-posts";
const DELETED_CORE_KEY = "werk-deleted-core";
const LEGACY_SLUGS = ["video-trends-luxury-hospitality", "social-strategy-boutique-hotels", "power-drone-photography"];

export const getAllPosts = (isAdmin = false): BlogPost[] => {
  if (typeof window === "undefined") return CORE_POSTS;

  // Load local posts
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  let localPosts: BlogPost[] = localData ? JSON.parse(localData) : [];

  // Auto-Cleanup: Remove legacy demo posts if they exist in local storage
  if (localPosts.some(p => LEGACY_SLUGS.includes(p.slug))) {
    localPosts = localPosts.filter(p => !LEGACY_SLUGS.includes(p.slug));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localPosts));
  }

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
