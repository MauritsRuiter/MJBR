import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Loader() {
  useLayoutEffect(() => {
    const loader = document.querySelector(".loader");
    const span = loader.querySelector(".text span");

    // Wait for fonts to load before splitting
    document.fonts.ready.then(() => {
      const split = new SplitText(span, { type: "chars" });

      gsap.set(span, { visibility: "visible" });
      
      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power4.out" },
      );

      // Loader fade out
      gsap.to(".loader", {
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        onComplete: () => {
          document.querySelector(".loader").style.display = "none";
        },
      });
    }, []);
  }, []);

  return (
    <div className="loader fixed z-50 flex h-full w-full items-center justify-center overflow-hidden bg-black">
      <div className="text relative flex space-x-1 overflow-hidden text-9xl font-bold">
        <span className="relative">MJBR</span>
      </div>
    </div>
  );
}
