import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import Beams from "./Beams";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function HorizontalScroll({ text = "What I do" }) {
  const containerRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const animatedText = document.querySelector(".what-i-do");

    if (!animatedText) return;

    document.fonts.ready.then(() => {
      // --- Title animation ---
      animatedText.innerHTML = text
        .split(" ")
        .map((word) => `<span class='d-inline-flex word'>${word}</span>`)
        .join(" ");

      const words = animatedText.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: animatedText,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      );
    });
  }, [text]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;

    if (!wrapper || !container) return;

    wrapper.style.width = "100vw";
    wrapper.style.marginLeft = "calc(50% - 50vw)";
    wrapper.style.position = "relative";
    wrapper.style.overflow = "hidden";

    const sections = gsap.utils.toArray(".panel");

    // Create horizontal scroll timeline
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      paused: true, // we’ll control it with ScrollTrigger
    });

    ScrollTrigger.create({
      trigger: wrapper,
      pin: true,
      scrub: 1,
      animation: scrollTween,
      end: () => "+=" + window.innerWidth * (sections.length - 1),
      snap: 1 / (sections.length - 1),
    });

    // Animate SVG based on horizontal scroll
    gsap.fromTo(
      ".svg1 path",
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".panel:nth-child(2)",
          containerAnimation: scrollTween,
          start: "left 25%",
          end: "left 25%",
        },
      },
    );

    gsap.fromTo(
      ".svg2 path",
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".panel:nth-child(3)",
          containerAnimation: scrollTween,
          start: "left 25%",
          end: "left 25%",
        },
      },
    );

    gsap.fromTo(
      ".svg3 path",
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".panel:nth-child(4)",
          containerAnimation: scrollTween,
          start: "left 25%",
          end: "left 25%",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className="horizontal-section relative w-screen overflow-hidden"
      >
        {/* Top gradient overlay */}
        <div className="pointer-events-none fixed top-0 left-0 right-0 h-128 bg-linear-to-b from-black to-transparent z-10" />
        
        {/* Bottom gradient overlay */}
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-128 bg-linear-to-t from-black to-transparent z-10" />
        
        <div ref={containerRef} className="flex h-screen w-screen flex-row">
          <div className="fixed h-full w-full overflow-hidden -z-10">
            <Beams />
          </div>
          <section className="panel flex h-screen w-screen shrink-0 items-center justify-center bg-transparent text-center text-6xl">
            <span className="what-i-do text-5xl md:text-7xl lg:text-9xl">
              {text}
            </span>
          </section>

          <section className="panel flex h-screen w-screen shrink-0 items-center justify-center bg-transparent text-center text-6xl">
            <svg
              viewBox="-10 -10 56 56"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="svg1 iconify iconify--twemoji mr-4 h-10 w-10 md:h-16 md:w-16 lg:h-24 lg:w-24"
            >
              <path
                d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z"
                stroke="#00ff00"
                fill="none"
                strokeWidth="6"
              ></path>
            </svg>
            <span className="text-3xl md:text-5xl lg:text-7xl">
              Web Development
            </span>
          </section>

          <section className="panel flex h-screen w-screen shrink-0 items-center justify-center bg-transparent text-center text-6xl">
            <svg
              viewBox="-10 -10 56 56"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="svg2 iconify iconify--twemoji mr-4 h-10 w-10 md:h-16 md:w-16 lg:h-24 lg:w-24"
            >
              <path
                d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z"
                stroke="#00ff00"
                fill="none"
                strokeWidth="6"
              ></path>
            </svg>
            <span className="text-3xl md:text-5xl lg:text-7xl">
              UI/UX Design
            </span>
          </section>

          <section className="panel flex h-screen w-screen shrink-0 items-center justify-center bg-transparent text-center text-6xl">
            <svg
              viewBox="-10 -10 56 56"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="svg3 iconify iconify--twemoji mr-4 h-10 w-10 md:h-16 md:w-16 lg:h-24 lg:w-24"
            >
              <path
                d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z"
                stroke="#00ff00"
                fill="none"
                strokeWidth="6"
              ></path>
            </svg>
            <span className="text-3xl md:text-5xl lg:text-7xl">
              Digital Marketing
            </span>
          </section>
        </div>
      </div>
    </>
  );
}
