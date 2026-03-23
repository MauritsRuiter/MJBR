import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function DynamicText({ text = "“I don't just build websites, I design digital ecosystems where creativity meets precision.”" }) {
  useEffect(() => {
    const animatedText = document.querySelector(".dynamic-text");

    document.fonts.ready.then(() => {
      // Split text into word spans
      animatedText.innerHTML = text
        .split(" ")
        .map((word) => `<span class='d-inline-flex word'>${word}</span>`)
        .join(" ");

      const words = animatedText.querySelectorAll(".word");

      gsap.fromTo(
        words,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.2,
          ease: "linear",
          scrollTrigger: {
            trigger: animatedText,
            start: "top 20%",
            end: "bottom 90%",
            scrub: 1,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [text]);

  return (
    <div className="dynamic-text sm:h-[150vh] md:h-[110vh] lg:h-screen p-10 pt-100 text-center text-5xl md:text-7xl lg:text-8xl">{text}</div>
  );
}
