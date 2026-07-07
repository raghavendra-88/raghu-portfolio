export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-cyan-glow px-5 py-3 font-mono text-sm font-medium text-void transition-transform duration-200 focus:translate-y-0 focus-visible:translate-y-0"
    >
      Skip to content
    </a>
  );
}
