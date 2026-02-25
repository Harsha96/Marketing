import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Twitter, Linkedin, Link as LinkIcon, Facebook } from "lucide-react";
import { getAllPosts } from "@/components/BlogSection";
import DudoNavbar from "@/components/DudoNavbar";
import { useEffect } from "react";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const allPosts = getAllPosts();
    const post = allPosts.find((p) => p.slug === slug);

    // Get other posts for the "Related" section
    const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-display font-bold mb-4">Post not found</h1>
                <Link to="/" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    return (
        <div className="min-h-screen bg-background text-foreground">
            <DudoNavbar />

            <main className="pt-32 pb-20">
                <div className="container-custom px-6 md:px-12 lg:px-20">

                    {/* Article Header - Spotify Style */}
                    <article className="max-w-4xl mx-auto">
                        <header className="mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <Link
                                    to="/"
                                    className="group flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase"
                                >
                                    <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Back
                                </Link>
                                <span className="w-1 h-1 rounded-full bg-border/50" />
                                <span className="text-xs font-medium text-primary tracking-widest uppercase">{post.category}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-heading !text-4xl md:!text-6xl mb-8 leading-[1.1]"
                            >
                                {post.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/30 pb-8"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-foreground">{post.date}</span>
                                </div>
                                <span className="w-1 h-1 rounded-full bg-border/50" />
                                <div className="flex items-center gap-2 italic">
                                    <span>{post.readTime}</span>
                                </div>
                                <div className="flex gap-2 ml-auto">
                                    {post.tags?.map(tag => (
                                        <span key={tag} className="px-2 py-1 rounded bg-secondary/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </header>

                        {/* Featured Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-[21/9] w-full overflow-hidden mb-16 rounded-sm group"
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                        </motion.div>

                        {/* Content Section with Share Sidebar */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_100px] gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="prose prose-invert prose-lg max-w-none"
                            >
                                <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-12 border-l-2 border-primary pl-8 italic">
                                    {post.excerpt}
                                </p>
                                <div className="font-body text-muted-foreground leading-relaxed space-y-8 text-lg md:text-xl whitespace-pre-line first-letter:text-5xl first-letter:font-display first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                                    {post.fullContent}
                                </div>
                            </motion.div>

                            {/* Share Side Bar - Desktop */}
                            <aside className="hidden lg:flex flex-col items-center gap-4 sticky top-32 h-fit">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest [writing-mode:vertical-rl] mb-4 text-center">Share</p>

                                {/* X / Twitter */}
                                <button
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                                    className="p-3 rounded-full border border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
                                    title="Share on X"
                                >
                                    <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                </button>

                                {/* LinkedIn */}
                                <button
                                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                                    className="p-3 rounded-full border border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
                                    title="Share on LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                </button>

                                {/* Facebook */}
                                <button
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                                    className="p-3 rounded-full border border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
                                    title="Share on Facebook"
                                >
                                    <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                </button>

                                {/* WhatsApp */}
                                <button
                                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`, '_blank')}
                                    className="p-3 rounded-full border border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
                                    title="Share on WhatsApp"
                                >
                                    <svg className="w-5 h-5 fill-muted-foreground group-hover:fill-primary transition-colors" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </button>

                                {/* Reddit */}
                                <button
                                    onClick={() => window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`, '_blank')}
                                    className="p-3 rounded-full border border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
                                    title="Share on Reddit"
                                >
                                    <svg className="w-5 h-5 fill-muted-foreground group-hover:fill-primary transition-colors" viewBox="0 0 24 24">
                                        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-2c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1.385-11.69c.307 0 .584.144.715.405.13.26.105.572-.07.808l-2.5 3.333c-.15.2-.387.31-.63.31s-.48-.11-.63-.31l-2.5-3.333c-.175-.236-.2-.548-.07-.808.13-.26.408-.405.715-.405h5z" />
                                    </svg>
                                </button>

                                {/* Copy Link */}
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(shareUrl);
                                    }}
                                    className="p-3 rounded-full border border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
                                    title="Copy Link"
                                >
                                    <LinkIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                </button>
                            </aside>
                        </div>

                        {/* Mobile Sharing */}
                        <div className="flex lg:hidden flex-col items-center justify-center gap-6 mt-16 py-10 border-y border-border/30">
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">Share this Insight</span>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank')} className="p-4 rounded-full border border-border/50 hover:bg-primary/10 transition-all"><Twitter className="w-5 h-5" /></button>
                                <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')} className="p-4 rounded-full border border-border/50 hover:bg-primary/10 transition-all"><Linkedin className="w-5 h-5" /></button>
                                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')} className="p-4 rounded-full border border-border/50 hover:bg-primary/10 transition-all"><Facebook className="w-5 h-5" /></button>
                                <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, '_blank')} className="p-4 rounded-full border border-border/50 hover:bg-primary/10 transition-all">
                                    <svg className="w-5 h-5 fill-foreground" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                </button>
                                <button onClick={() => window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`, '_blank')} className="p-4 rounded-full border border-border/50 hover:bg-primary/10 transition-all font-bold text-xs">Threads</button>
                                <button onClick={() => { navigator.clipboard.writeText(shareUrl); }} className="p-4 rounded-full border border-border/50 hover:bg-primary/10 transition-all"><LinkIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </article>

                    {/* Related Content Section */}
                    <section className="mt-32 pt-20 border-t border-border/30 max-w-5xl mx-auto">
                        <h2 className="text-heading !text-3xl mb-12 flex items-center gap-4">
                            Latest Insights <span className="gold-line" />
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {relatedPosts.map((rPost) => (
                                <Link key={rPost.slug} to={`/blog/${rPost.slug}`} className="group block h-full">
                                    <div className="aspect-video overflow-hidden rounded-sm mb-6">
                                        <img
                                            src={rPost.image}
                                            alt={rPost.title}
                                            className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                                        />
                                    </div>
                                    <p className="text-label !text-[10px] mb-3">{rPost.category}</p>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 mb-2">
                                        {rPost.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                                        Read article <ArrowRight className="w-4 h-4" />
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default BlogPost;
