import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    Tag,
    Calendar,
    Clock,
    Layout,
    Eye,
    FileCode,
    Bold,
    Underline,
    Link as LinkIcon,
    Video,
    Heading2,
    Type,
    Trash2
} from "lucide-react";
import { BlogPost, getAllPosts, saveLocalPost, deleteLocalPost } from "@/components/BlogSection";
import { toast } from "sonner";
import DudoNavbar from "@/components/DudoNavbar";

const AdminEditor = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const isNew = slug === "new";
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [formData, setFormData] = useState<BlogPost>({
        title: "",
        slug: "",
        category: "General",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        publishDate: new Date().toISOString().split('T')[0],
        readTime: "5 min read",
        tags: [],
        excerpt: "",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
        fullContent: "",
        status: 'Published',
        isLocal: true
    });

    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("werk-admin-auth") !== "true") {
            navigate("/cms");
            return;
        }

        if (!isNew && slug) {
            const post = getAllPosts(true).find(p => p.slug === slug);
            if (post) {
                setFormData({ ...post, status: post.status || 'Published' });
            } else {
                toast.error("Post not found");
                navigate("/cms/dashboard");
            }
        }
    }, [slug, isNew, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.slug || !formData.fullContent) {
            toast.error("Please fill in the required fields (Title, Slug, Content)");
            return;
        }

        // Format the display date from the publishDate
        const dateObj = new Date(formData.publishDate);
        const displayDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        saveLocalPost({
            ...formData,
            date: displayDate
        });

        toast.success(isNew ? "Article created and saved" : "Changes saved successfully");
        navigate("/cms/dashboard");
    };

    const handleDelete = () => {
        if (confirm("Move this article to trash? This action cannot be undone on local storage articles.")) {
            deleteLocalPost(formData.slug);
            toast.success("Article moved to trash");
            navigate("/cms/dashboard");
        }
    };

    const insertText = (before: string, after: string = "") => {
        if (!contentRef.current) return;

        const textarea = contentRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);
        const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);

        setFormData({ ...formData, fullContent: newText });

        // Focus back and set cursor
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 10);
    };

    const addTag = () => {
        if (tagInput && !formData.tags.includes(tagInput)) {
            setFormData({ ...formData, tags: [...formData.tags, tagInput] });
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <DudoNavbar />

            <main className="pt-32 pb-24">
                <div className="container-custom px-6 md:px-12 lg:px-20">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <Link
                            to="/cms/dashboard"
                            className="group flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-all uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Dashboard
                        </Link>

                        <div className="flex items-center gap-4">
                            <span className="text-[10px] text-muted-foreground uppercase italic tracking-widest">
                                Editing: {isNew ? "Draft Post" : formData.slug}
                            </span>
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                            >
                                <Save className="w-4 h-4" /> {isNew ? "Publish Insight" : "Save Changes"}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">

                        {/* Main Form */}
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="The Heading of your Article..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: isNew ? e.target.value.toLowerCase().replace(/ /g, '-') : formData.slug })}
                                    className="w-full bg-transparent border-none text-heading !text-4xl md:!text-5xl focus:outline-none placeholder:opacity-20"
                                />
                                <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground font-body">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-sm border border-border/50">
                                        <Layout className="w-3 h-3" />
                                        <input
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="bg-transparent focus:outline-none min-w-[100px]"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-sm border border-border/50">
                                        <Clock className="w-3 h-3" />
                                        <input
                                            value={formData.readTime}
                                            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                            className="bg-transparent focus:outline-none min-w-[80px]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-10 border-t border-border/30">
                                <div className="flex items-center gap-3 text-primary mb-2">
                                    <Eye className="w-4 h-4" />
                                    <span className="text-label !text-sm">Teaser Content</span>
                                </div>
                                <textarea
                                    placeholder="Write a compelling excerpt for the blog preview card..."
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full h-24 bg-secondary/20 border border-border/30 rounded-sm p-4 focus:outline-none focus:border-primary/50 font-body text-lg leading-relaxed transition-all placeholder:italic"
                                />
                            </div>

                            <div className="space-y-4 pt-10 border-t border-border/30">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                    <div className="flex items-center gap-3 text-primary">
                                        <FileCode className="w-4 h-4" />
                                        <span className="text-label !text-sm">Main Article Content</span>
                                    </div>

                                    {/* Toolbar */}
                                    <div className="flex items-center gap-1 bg-secondary/40 p-1 rounded-sm border border-border/30">
                                        <button onClick={() => insertText("**", "**")} className="p-1.5 hover:bg-primary/20 hover:text-primary transition-colors rounded-sm" title="Bold"><Bold className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => insertText("<u>", "</u>")} className="p-1.5 hover:bg-primary/20 hover:text-primary transition-colors rounded-sm" title="Underline"><Underline className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => insertText("[", "](url)")} className="p-1.5 hover:bg-primary/20 hover:text-primary transition-colors rounded-sm" title="Link"><LinkIcon className="w-3.5 h-3.5" /></button>
                                        <div className="w-px h-4 bg-border/50 mx-1" />
                                        <button onClick={() => insertText("## ")} className="p-1.5 hover:bg-primary/20 hover:text-primary transition-colors rounded-sm" title="Heading"><Heading2 className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => insertText("> ")} className="p-1.5 hover:bg-primary/20 hover:text-primary transition-colors rounded-sm" title="Quote"><Type className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => insertText("<div className='video-container'><iframe src='", "'></iframe></div>")} className="p-1.5 hover:bg-primary/20 hover:text-primary transition-colors rounded-sm" title="Embed Video"><Video className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>

                                <textarea
                                    ref={contentRef}
                                    placeholder="Unleash your insights here... (Supports multiline text)"
                                    value={formData.fullContent}
                                    onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                                    className="w-full min-h-[500px] bg-secondary/10 border border-border/20 rounded-sm p-6 focus:outline-none focus:border-primary/30 font-body text-xl leading-relaxed selection:bg-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Sidebar Controls */}
                        <aside className="space-y-8">
                            <div className="bg-secondary/20 border border-border/30 p-6 rounded-sm">
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-6">
                                    <Calendar className="w-4 h-4" /> Editorial Logic
                                </h4>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase mb-2 block tracking-tight">Post Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Draft' | 'Published' })}
                                            className="w-full bg-background border border-border/50 rounded-sm p-3 text-xs font-body focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="Published">Published</option>
                                            <option value="Draft">Draft (Hidden)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase mb-2 block tracking-tight">Launch Date</label>
                                        <input
                                            type="date"
                                            value={formData.publishDate}
                                            onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                                            className="w-full bg-background border border-border/50 rounded-sm p-3 text-xs font-body focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                                        Drafts are always private. Published posts follow the launch date.
                                    </p>

                                    {formData.isLocal && (
                                        <button
                                            onClick={handleDelete}
                                            className="w-full flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border/30 text-destructive hover:text-destructive/80 text-[10px] font-bold uppercase tracking-widest transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" /> Move to Trash
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="bg-secondary/20 border border-border/30 p-6 rounded-sm">
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-6">
                                    <ImageIcon className="w-4 h-4" /> Featured Image
                                </h4>
                                <div className="aspect-video bg-muted mb-4 overflow-hidden rounded-sm border border-border/30">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover grayscale opacity-60" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Paste image URL..."
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-background border border-border/50 rounded-sm p-3 text-xs font-body focus:outline-none focus:border-primary/50 transition-all"
                                />
                                <p className="text-[10px] text-muted-foreground mt-2 italic">Use professional Unsplash URLs for best results.</p>
                            </div>

                            <div className="bg-secondary/20 border border-border/30 p-6 rounded-sm">
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-6">
                                    <Tag className="w-4 h-4" /> Indexing & Tags
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase mb-2 block tracking-tight">Post Slug (URL)</label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            readOnly={!isNew}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            className="w-full bg-background border border-border/50 rounded-sm p-3 text-xs font-mono focus:outline-none focus:border-primary/50 transition-all disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase mb-2 block tracking-tight">Add Tags</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                                                className="flex-grow bg-background border border-border/50 rounded-sm p-3 text-xs font-body focus:outline-none focus:border-primary/50 transition-all"
                                                placeholder="e.g. Video"
                                            />
                                            <button onClick={addTag} className="px-4 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 rounded-sm font-bold text-xs transition-colors">Add</button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {formData.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-sm border border-primary/20">
                                                {tag} <button onClick={() => removeTag(tag)} className="hover:text-foreground transition-colors ml-1">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminEditor;
