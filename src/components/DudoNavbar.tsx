import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Showreel", href: "#showreel" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Clients", href: "#clients" },
  { label: "Blog", href: "#blog" },
];

const DudoNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 section-padding flex items-center justify-between py-5 bg-background/70 backdrop-blur-lg border-b border-border/30">
      <a href="/" className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">
        Dudo<span className="text-primary">.</span>
      </a>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-body text-sm text-muted-foreground hover-gold tracking-wide"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="font-body text-sm px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          Contact
        </a>
      </div>

      {/* Mobile */}
      <button
        className="md:hidden text-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg p-6 flex flex-col gap-4 md:hidden border-b border-border/30"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-lg text-muted-foreground hover-gold"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-body text-lg text-primary"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default DudoNavbar;
