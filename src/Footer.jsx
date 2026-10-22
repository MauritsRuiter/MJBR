import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
  const finRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const letters = finRef.current?.querySelectorAll("[data-fin-letter]");
    const underline = underlineRef.current;

    if (!letters?.length || !underline) return;

    let hoverTimeline;
    const footerText = finRef.current;

    const handlePointerEnter = () => hoverTimeline.play();
    const handlePointerLeave = () => hoverTimeline.reverse();
    const handleFocus = () => hoverTimeline.play();
    const handleBlur = () => hoverTimeline.reverse();

    const context = gsap.context(() => {
      hoverTimeline = gsap.timeline({ paused: true });

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

    }, finRef);

    footerText.addEventListener("pointerenter", handlePointerEnter);
    footerText.addEventListener("pointerleave", handlePointerLeave);
    footerText.addEventListener("focus", handleFocus);
    footerText.addEventListener("blur", handleBlur);

    return () => {
      footerText.removeEventListener("pointerenter", handlePointerEnter);
      footerText.removeEventListener("pointerleave", handlePointerLeave);
      footerText.removeEventListener("focus", handleFocus);
      footerText.removeEventListener("blur", handleBlur);
      context.revert();
    };
  }, []);

  return (
    <footer id="contact" className="h-screen bg-black py-6 text-center text-white">
      <div className="flex h-screen items-center justify-center">
        <p
          ref={finRef}
          tabIndex={0}
          aria-label="FIN"
          className="relative inline-flex cursor-pointer pb-3 text-8xl font-extrabold outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#6A45FB]"
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
