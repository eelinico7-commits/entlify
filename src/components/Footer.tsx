export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-40 border-t border-black/[0.08] py-16 text-center">
      {/* Decorative gold line */}
      <div className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent" />

      <div className="mx-auto max-w-2xl px-6 sm:px-10">
        {/* Name */}
        <p className="text-sm tracking-[0.08em] text-text-muted/80 uppercase">
          杨存邦 / Yang Cunbang
        </p>

        {/* Tagline */}
        <p className="mt-3 text-sm text-text-secondary/80">
          Medical Student Growing with AI
        </p>

        {/* Social / contact */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <a
            href="mailto:yangcunbang2026@outlook.com"
            className="text-xs text-accent-secondary/80 transition-colors duration-300 hover:text-accent-secondary"
          >
            yangcunbang2026@outlook.com
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-xs tracking-[0.08em] text-text-muted/60 uppercase">
          &copy; {year} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
