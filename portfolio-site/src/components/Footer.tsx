export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-32 border-t border-white/[0.03] py-12 text-center">
      {/* Decorative gold line */}
      <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent" />

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 sm:grid-cols-3 sm:px-10">
        {/* Left: Copyright */}
        <div className="text-center sm:text-left">
          <p className="text-xs tracking-widest uppercase text-text-muted/30">
            杨存邦 / Yang Cunbang
          </p>
          <p className="mt-2 text-xs text-text-muted/20">
            &copy; {year} All rights reserved.
          </p>
        </div>

        {/* Center: Tech stack */}
        <div className="text-center">
          <p className="text-xs tracking-widest uppercase text-text-muted/30">
            Built with
          </p>
          <p className="mt-2 text-xs text-text-muted/20">
            Next.js · Three.js · Framer Motion
          </p>
        </div>

        {/* Right: Social placeholder */}
        <div className="text-center sm:text-right">
          <p className="text-xs tracking-widest uppercase text-text-muted/30">
            Connect
          </p>
          <p className="mt-2 text-xs text-accent-primary/40">yangcunbang@outlook.com</p>
        </div>
      </div>
    </footer>
  );
}
