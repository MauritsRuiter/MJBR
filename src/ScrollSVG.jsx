import React, { useEffect, useState } from "react"
import { gsap } from "gsap"

export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 0 && !hidden) {
        setHidden(true)
        gsap.to(".scroll-indicator", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hidden])

  return (
    <div
      className={`scroll-indicator fixed bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-100 z-50 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <svg
        className="w-6 h-6 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        ></path>
      </svg>
    </div>
  )
}
