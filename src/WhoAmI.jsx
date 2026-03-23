import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhoAmI({ text = "Ok, but who am I?" }) {
  // Animate the heading words like before
  useEffect(() => {
    const animatedText = document.querySelector(".who-am-i");

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

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-screen items-center justify-center gap-8 lg:gap-16 px-4 py-12 lg:py-0">
      <div id="about" className="flex-1 flex flex-col justify-center sm:items-end items-end text-right">
        <h1 className="who-am-i text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {text}
        </h1>
        <p className="text-lg md:text-xl max-w-lg leading-relaxed">
          {/* lil script to make my birthday always accurate */}
          I'm a passionate {Math.floor((new Date() - new Date(2005, 8, 1)) / (365.25 * 24 * 60 * 60 * 1000))}-year-old Web and AI Developer with 4 years of experience building web applications and websites. I specialize in creating responsive, user-friendly interfaces and robust backend systems.
        </p>
        <p className="text-lg md:text-xl max-w-lg leading-relaxed mt-4">
          When I'm not coding, you can find me learning about new technologies, libraries or expanding my skill set.
        </p>
        <p className="text-lg md:text-xl max-w-lg leading-relaxed mt-4">
          I consistently deliver scalable, enterprise-grade solutions that align technical execution with business objectives.
        </p>
        <p className="text-lg md:text-xl max-w-lg leading-relaxed mt-4">
          I excel at cross-functional collaboration, prioritize data-driven decisions, and am committed to delivering measurable impact and operational excellence.
        </p>
        <p className="text-lg md:text-xl max-w-lg leading-relaxed mt-4">
          I also contribute to open-source projects, mentor aspiring developers, and share my work on GitHub and my personal blog.
        </p>
      </div>

      <div className="flex-1 flex justify-center">
        <img
          src="./src/assets/photos/foto.png"
          alt="A photo of me."
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
    </div>
  );
}