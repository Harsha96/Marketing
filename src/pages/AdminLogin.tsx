import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would be a proper hash/token check.
        // For this No-DB setup, we use a professional barrier.
        if (username === "admin" && password === "werk2026") {
            sessionStorage.setItem("werk-admin-auth", "true");
            sessionStorage.setItem("werk-admin-user", username);
            toast.success(`Welcome back, ${username}`);
            navigate("/cms/dashboard");
        } else {
            toast.error("Invalid credentials. Access denied.");
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 selection:bg-primary/30">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-heading !text-3xl mb-2">Internal Access</h1>
                    <p className="text-muted-foreground font-body">Werk Marketing Engine • CMS v1.0</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-secondary/50 border border-border/50 rounded-sm px-4 py-4 focus:outline-none focus:border-primary/50 transition-colors font-body text-foreground"
                            placeholder="e.g. admin"
                            autoFocus
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-secondary/50 border border-border/50 rounded-sm px-4 py-4 focus:outline-none focus:border-primary/50 transition-colors font-body text-foreground"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full group bg-primary text-primary-foreground font-bold py-4 rounded-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 transform active:scale-[0.98]"
                    >
                        Authenticate Access
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </form>

                <p className="mt-8 text-center text-xs text-muted-foreground/50 tracking-widest uppercase">
                    Unauthorized access is strictly prohibited
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
