export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-32 border-t border-white/[0.10] py-16 text-center">
      {/* Decorative gold line */}
      <div className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-accent-primary/40 to-transparent" />

      <div className="mx-auto max-w-2xl px-6 sm:px-10">
        {/* Name */}
        <p className="text-sm tracking-widest text-text-muted/80 uppercase">
          杨存邦 / Yang Cunbang
        </p>

        {/* Tagline */}
        <p className="mt-3 text-sm text-text-secondary/80">
          Medical Student Building with AI
        </p>

        {/* Social / contact */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <a
            href="mailto:yangcunbang@outlook.com"
            className="text-xs text-accent-secondary/80 transition-colors duration-300 hover:text-accent-secondary"
          >
            yangcunbang@outlook.com
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-[10px] tracking-wider text-text-muted/60 uppercase">
          &copy; {year} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
