const Footer = () => (
  <footer className="section-padding !py-12 border-t border-border/20">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-display text-lg font-bold text-foreground">Werk Agency</span>
      <span className="font-body text-sm text-muted-foreground">
        © {new Date().getFullYear()} Werk Agency. All rights reserved.
      </span>
    </div>
  </footer>
);

export default Footer;
