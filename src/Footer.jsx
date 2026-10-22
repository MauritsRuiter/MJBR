import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
  const finRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const letters = finRef.current?.querySelectorAll("[data-fin-letter]");
    const underline = underlineRef.current;

    if (!letters?.length || !underline) return;

    const context = gsap.context(() => {
      const hoverTimeline = gsap.timeline({ paused: true });

      hoverTimeline
        .to(
          letters,
          {
            y: -24,
            rotation: (index) => (index === 1 ? 9 : -7),
            scale: 1.1,
            color: "#6A45FB",
            duration: 0.3,
            stagger: { each: 0.08, from: "center" },
            ease: "back.out(2)",
          },
          0,
        )
        .to(
          underline,
          { scaleX: 1, duration: 0.35, ease: "power3.out" },
          0.08,
        );

      finRef.current.addEventListener("pointerenter", () => hoverTimeline.play());
      finRef.current.addEventListener("pointerleave", () => hoverTimeline.reverse());
      finRef.current.addEventListener("focus", () => hoverTimeline.play());
      finRef.current.addEventListener("blur", () => hoverTimeline.reverse());
    }, finRef);

    return () => context.revert();
  }, []);

  return (
    <footer id="contact" className="h-screen bg-black py-6 text-center text-white">
      <div className="flex h-screen items-center justify-center">
        <p
          ref={finRef}
          tabIndex={0}
          aria-label="FIN"
          className="relative inline-flex cursor-pointer pb-3 text-8xl font-extrabold outline-none"
        >
          {Array.from("FIN", (letter, index) => (
            <span
              key={`${letter}-${index}`}
              aria-hidden="true"
              data-fin-letter
              className="inline-block"
            >
              {letter}
            </span>
          ))}
          <span
            ref={underlineRef}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 rounded-full bg-[#6A45FB]"
          />
        </p>
      </div>
      <p className="text-sm text-neutral-600 hover:text-white pb-24">
        &copy; {new Date().getFullYear()} Maurits Ruiter. All rights reserved.
      </p>
    </footer>
  );
}
