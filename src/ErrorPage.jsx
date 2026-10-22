import { ArrowLeft } from "lucide-react";

export default function ErrorPage({ status = 404 }) {
  const isForbidden = status === 403;
  const title = isForbidden ? "Geen toegang." : "Looks like you've lost your way.";
  const message = isForbidden
    ? "Je hebt geen toestemming om deze pagina te bekijken."
    : "This page doesn't exist, or the link may be incorrect.";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-center text-white">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
      <div className="relative flex flex-col items-center">
        <p className="mb-3 text-xs tracking-[0.3em] text-[#6A45FB] uppercase">
          {isForbidden ? "Verboden toegang" : "Page not found"}
        </p>
        <p
          aria-hidden="true"
          className="select-none text-[clamp(9rem,32vw,24rem)] leading-[0.8] font-extrabold text-[#6A45FB]"
        >
          {status}
        </p>
        <h1 className="mt-8 text-2xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-white/60 sm:text-base">
          {message}
        </p>
        <a
          href="/"
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-5 text-sm transition-colors hover:border-[#6A45FB] hover:bg-[#6A45FB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6A45FB]"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          {isForbidden ? "Terug naar home" : "Back to home"}
        </a>
      </div>
      <p className="absolute right-6 bottom-6 text-xs text-white/30">
        MAURITS RUITER <span className="mx-2 text-[#6A45FB]">/</span> {status}
      </p>
    </main>
  );
}