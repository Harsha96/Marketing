import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Plus,
    Trash2,
    Edit3,
    ExternalLink,
    LogOut,
    FileCode,
    LayoutDashboard
} from "lucide-react";
import { BlogPost, getAllPosts, deleteLocalPost } from "@/components/BlogSection";
import { toast } from "sonner";
import DudoNavbar from "@/components/DudoNavbar";

const AdminDashboard = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Auth Check
        if (sessionStorage.getItem("werk-admin-auth") !== "true") {
            navigate("/cms");
            return;
        }
        setUser(sessionStorage.getItem("werk-admin-user") || "Admin");
        loadPosts();
    }, [navigate]);

    const loadPosts = () => {
        setPosts(getAllPosts(true));
    };

    const getStatus = (date: string) => {
        const today = new Date().toISOString().split('T')[0];
        return date > today ? "Scheduled" : "Published";
    };

    const handleDelete = (slug: string) => {
        if (confirm("Are you sure you want to delete this post? This only affects your local browser storage.")) {
            deleteLocalPost(slug);
            toast.success("Post deleted from local repository");
            loadPosts();
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("werk-admin-auth");
        sessionStorage.removeItem("werk-admin-user");
        navigate("/");
    };

    const handleExport = () => {
        const localPosts = posts.filter(p => p.isLocal);
        if (localPosts.length === 0) {
            toast.info("No local posts to export.");
            return;
        }

        const json = JSON.stringify(localPosts, null, 2);
        navigator.clipboard.writeText(json);
        toast.success("Local posts JSON copied to clipboard! Paste this to the assistant to bake them in.");
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <DudoNavbar />

            <main className="pt-32 pb-24">
                <div className="container-custom px-6 md:px-12 lg:px-20">

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-border/30">
                        <div>
                            <div className="flex items-center gap-3 text-primary mb-4">
                                <LayoutDashboard className="w-5 h-5" />
                                <span className="text-label !text-sm">Admin HQ • {user}</span>
                            </div>
                            <h1 className="text-heading !text-4xl">Content Management</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border/50 hover:border-primary/50 text-xs font-bold uppercase tracking-widest transition-all"
                                title="Export posts to JSON for permanent storage"
                            >
                                <FileCode className="w-4 h-4" /> Sync with Assistant
                            </button>
                            <Link
                                to="/cms/edit/new"
                                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
                            >
                                <Plus className="w-4 h-4" /> New Article
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2 border border-border/50 hover:bg-destructive/10 hover:border-destructive text-muted-foreground hover:text-destructive transition-all"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {posts.map((post, i) => {
                            const status = getStatus(post.publishDate);
                            return (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={post.slug}
                                    className={`group flex flex-col md:flex-row items-center gap-6 p-4 rounded-sm border ${post.isLocal ? 'border-primary/20 bg-primary/5' : 'border-border/30 bg-secondary/20 opacity-80'}`}
                                >
                                    <div className="w-24 aspect-video overflow-hidden shrink-0">
                                        <img src={post.image} alt="" className="w-full h-full object-cover grayscale" />
                                    </div>

                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">{post.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-border" />
                                            <span className="text-[10px] text-muted-foreground uppercase">{post.date}</span>
                                            {post.status === "Draft" && (
                                                <span className="text-[8px] bg-secondary-foreground/20 text-secondary-foreground px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest ml-1">Draft</span>
                                            )}
                                            {post.status !== "Draft" && status === "Scheduled" && (
                                                <span className="text-[8px] bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest ml-1">Scheduled</span>
                                            )}
                                            {post.status === "Published" && status === "Published" && (
                                                <span className="text-[8px] bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest ml-1">Live</span>
                                            )}
                                            {post.isLocal && (
                                                <span className="text-[8px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest ml-1">Stored Locally</span>
                                            )}
                                        </div>
                                        <h3 className="font-display font-medium text-lg truncate">{post.title}</h3>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            target="_blank"
                                            className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                            title="View post"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            to={`/cms/edit/${post.slug}`}
                                            className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                            title="Edit post"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.slug)}
                                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                            title="Delete post"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        {!post.isLocal && (
                                            <div className="p-2 text-muted-foreground/30 font-body text-[10px] uppercase italic tracking-widest" title="Editing this post will save a local copy.">Core Post</div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}

                        {posts.length === 0 && (
                            <div className="text-center py-20 border border-dashed border-border/50 rounded-sm">
                                <p className="text-muted-foreground italic">No articles found in repository.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
