const DudoFooter = () => (
  <footer className="section-padding py-10 border-t border-border/30">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-display text-lg font-bold text-foreground">
        Dudo<span className="text-primary">.</span>
      </span>
      <span className="font-body text-xs text-muted-foreground tracking-wide">
        © {new Date().getFullYear()} Dudo Studio. All rights reserved.
      </span>
    </div>
  </footer>
);

export default DudoFooter;
