import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import LetterGlitch from "./LetterGlitch";

gsap.registerPlugin(ScrollTrigger);

export default function MyWork({ text = "Some of my work" }) {
  const [selected, setSelected] = useState("All");
  const [activeCard, setActiveCard] = useState(null);

  const categoryColors = {
    All: "#ffffff",
    Web: "#2e8eff",
    Design: "#ff6b6b",
    Writing: "#f1c40f",
    Code: "#9b59b6",
    Motion: "#1abc9c",
  };

  function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  const projects = [
    {
      id: 1,
      title: "MJBR Portfolio",
      category: "Web",
      libs: ["React.js", "TailwindCSS", "GSAP"],
      description:
        "My personal portfolio built to showcase my design, coding, and animation projects with smooth interactions.",
      details:
        "This portfolio website was designed and developed to create an immersive experience showcasing my diverse skill set across design, development, and animation. The site features custom GSAP animations for smooth scroll interactions, a responsive grid layout for project displays, and optimized performance across all devices.",
      features: [
        "Smooth scroll animations with GSAP and ScrollTrigger",
        "Responsive grid layout with Tailwind CSS",
        "Project filtering by category",
        "Dark theme with gradient accents",
        "Mobile-first design approach",
      ],
      results:
        "Increased portfolio visibility and client inquiries by 40% within the first month of launch.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
    },
    {
      id: 2,
      title: "Brand Design Kit",
      category: "Design",
      libs: ["Figma", "Illustrator"],
      description:
        "A complete visual identity kit including logos, typography, and brand guidelines for a client.",
      details:
        "Developed a comprehensive brand identity system for a forward-thinking tech startup. This included primary and secondary logos, a detailed brand color palette with accessibility guidelines, typography hierarchy, and extensive brand usage guidelines.",
      features: [
        "3 logo variations with multiple formats",
        "Complete color palette with accessibility compliance",
        "Typography system with 6 font weights",
        "Icon library with 50+ custom icons",
        "Brand guidelines documentation",
        "Social media templates",
      ],
      results:
        "Enabled consistent brand communication across all platforms and increased brand recognition by 60% among target audience.",
      img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=600",
    },
    {
      id: 3,
      title: "Writing Portfolio",
      category: "Writing",
      libs: ["Notion", "Markdown"],
      description:
        "Curated articles and essays focusing on tech, design, and creative thinking.",
      details:
        "A collection of 30+ published articles exploring the intersection of technology, design, and creativity. Topics range from UI/UX best practices to the psychology of animation in digital products, attracting thousands of readers monthly.",
      features: [
        "30+ published articles and essays",
        "Categories: Web Design, Motion Graphics, Tech Trends",
        "Average read time: 5-8 minutes",
        "Monthly newsletter with 5k+ subscribers",
        "Guest contributions to industry publications",
        "High engagement rates on social platforms",
      ],
      results:
        "Built an audience of 10k+ followers and established thought leadership in the design and tech community.",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
    },
    {
      id: 4,
      title: "Interactive Code Demos",
      category: "Code",
      libs: ["React", "GSAP"],
      description:
        "Fun mini web experiments and interactive components demonstrating advanced UI concepts.",
      details:
        "A collection of interactive web experiments showcasing advanced JavaScript, CSS, and animation techniques. Each demo explores a specific UI/UX concept with clean, well-documented code available on GitHub.",
      features: [
        "15+ interactive component demos",
        "Advanced GSAP animation techniques",
        "Custom React hooks for state management",
        "Performance-optimized implementations",
        "Fully documented source code",
        "Live sandbox environments",
      ],
      results:
        "Generated 20k+ GitHub stars and became a learning resource for 50k+ developers worldwide.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
    },
    {
      id: 5,
      title: "3D Landing Page",
      category: "Web",
      libs: ["Three.js", "Next.js"],
      description:
        "A 3D interactive landing page with animated models and smooth scroll-based transitions.",
      details:
        "An innovative landing page that combines Three.js 3D models with scroll-triggered animations. The site features interactive 3D product visualization, smooth page transitions, and optimized performance using Next.js.",
      features: [
        "Real-time 3D model rendering",
        "Scroll-based animation triggers",
        "Touch and mouse interaction support",
        "Optimized asset loading strategy",
        "Cross-browser compatibility",
        "SEO-optimized metadata",
      ],
      results:
        "Achieved 2M+ page views and 35% conversion rate increase compared to previous static landing page.",
      img: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=600",
    },
    {
      id: 6,
      title: "Motion Identity",
      category: "Motion",
      libs: ["After Effects", "Blender"],
      description:
        "Animated logo sequences and brand motion graphics for social media and presentations.",
      details:
        "Created a complete motion design system including animated logo sequences, transition animations, and dynamic graphics for various platforms. All assets are optimized for social media, web, and presentation use.",
      features: [
        "5 animated logo variations",
        "20+ motion graphic templates",
        "Social media optimized dimensions",
        "4K video exports",
        "Motion guidelines documentation",
        "Smooth 60fps animations",
      ],
      results:
        "Enhanced brand presence across social media with 150% increase in video engagement rates.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600",
    },
    {
      id: 7,
      title: "Typography System",
      category: "Design",
      libs: ["Figma", "Typekit"],
      description:
        "A consistent typography system for a multi-platform brand, including headings, paragraphs, and UI text styles.",
      details:
        "Designed a scalable typography system that works seamlessly across web, mobile, and print. The system includes detailed specifications for font pairing, sizing, line height, and letter spacing to ensure consistency.",
      features: [
        "3 font families (primary, secondary, mono)",
        "8-level sizing scale",
        "Detailed line height specifications",
        "Letter spacing guidelines",
        "Usage examples for all components",
        "WCAG AA accessibility compliance",
      ],
      results:
        "Reduced design inconsistencies by 85% and cut design-to-development handoff time by 40%.",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    },
    {
      id: 8,
      title: "AI Writing Tools",
      category: "Writing",
      libs: ["OpenAI API", "React"],
      description:
        "A suite of AI-assisted writing tools to generate blog posts, summaries, and creative content efficiently.",
      details:
        "Developed a web application that leverages OpenAI's API to provide writers with intelligent assistance for content creation. Features include auto-complete, tone adjustment, content expansion, and SEO optimization.",
      features: [
        "Content generation with customizable tone",
        "Real-time editing and suggestions",
        "SEO optimization recommendations",
        "Content summarization tool",
        "Multiple language support",
        "Usage analytics dashboard",
        "Export to multiple formats",
      ],
      results:
        "Helped 5k+ writers increase productivity by 3x and reduce content creation time from hours to minutes.",
      img: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=600",
    },
  ];

  const categories = ["All", "Web", "Design", "Writing", "Code", "Motion"];

  const filtered =
    selected === "All"
      ? projects
      : projects.filter((p) => p.category === selected);

  useEffect(() => {
    if (activeCard) {
      // disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // re-enable scrolling
      document.body.style.overflow = "";
    }

    // cleanup in case component unmounts while open
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCard]);

  // Animate the heading words like before
  useEffect(() => {
    const animatedText = document.querySelector(".my-work-title");

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

      // --- Category buttons animation ---
      const categoryButtons = document.querySelectorAll(".categories button");
      gsap.fromTo(
        categoryButtons,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          delay: 0.3,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".categories",
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
            scrub: 1,
          },
        },
      );

      // --- Category buttons animation ---
      const pill = document.querySelectorAll(".pill");
      gsap.fromTo(
        pill,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          delay: 0.3,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".categories",
            start: "top 90%",
            end: "bottom 65%",
            toggleActions: "play none none reverse",
            scrub: 1,
          },
        },
      );
    });
  }, [text]);

  return (
    <>
      <div id="services" className="absolute h-screen w-full overflow-hidden">
        {/* Top gradient overlay */}
        <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-128 bg-linear-to-b from-black to-transparent" />

        {/* Bottom gradient overlay */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-128 bg-linear-to-t from-black to-transparent" />
        <LetterGlitch />
      </div>
      <div className="my-work-section flex h-full w-full flex-col py-36">
        <h2 className="my-work-title z-20 mb-6 text-center text-6xl font-bold text-white sm:text-8xl">
          {text}
        </h2>

        <div className="categories mb-10 flex flex-wrap justify-center">
          {categories.map((cat) => (
            <motion.div key={cat} layout className="relative">
              {selected === cat && (
                <motion.div
                  layoutId="pill-highlight"
                  className="pill absolute inset-0 rounded-full"
                  style={{
                    backgroundColor:
                      cat === "All"
                        ? hexToRgba(categoryColors[cat], 0.6)
                        : hexToRgba(categoryColors[cat], 0.3),
                    border:
                      cat === "All"
                        ? "2px solid rgba(255,255,255,0.6)"
                        : `2px solid ${hexToRgba(categoryColors[cat], 0.6)}`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                  }}
                />
              )}

              <motion.button
                layout
                onClick={() => setSelected(cat)}
                className="relative z-20 cursor-pointer rounded-full px-4 py-1 text-sm font-medium transition-colors duration-200"
                style={{
                  color:
                    selected === cat
                      ? cat === "All"
                        ? "#000"
                        : "#fff"
                      : "rgba(255,255,255,0.8)",
                }}
              >
                {cat}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div className="z-20 mx-auto grid max-h-full min-h-full w-full max-w-6xl grid-cols-1 grid-rows-3 gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="sync">
            {filtered.map((proj) => (
              <motion.div
                layoutId={`card-${proj.id}`}
                onClick={() => setActiveCard(proj)}
                key={proj.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="project-card z-20 cursor-zoom-in rounded-2xl p-1 backdrop-blur-md"
                style={{
                  background: `linear-gradient(
                to bottom right, 
                ${hexToRgba(categoryColors[proj.category], 0.1)}, 
                transparent 70%
                )`,
                  borderRight: `4px solid ${hexToRgba(categoryColors[proj.category], 0.7)}`,
                  borderBottom: `4px solid ${hexToRgba(categoryColors[proj.category], 0.7)}`,
                  backdropFilter: 'blur(2px)',
                }}
              >
                <div className="relative flex h-full flex-col justify-between p-4">
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold text-white">
                      {proj.title}
                    </h3>
                    <p className="mb-2 text-gray-400">{proj.category}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {proj.libs.map((lib) => (
                      <span
                        key={lib}
                        className="rounded-full px-3 py-1 text-sm"
                        style={{
                          background: hexToRgba(
                            categoryColors[proj.category],
                            0.2,
                          ),
                          color: categoryColors[proj.category],
                        }}
                      >
                        {lib}
                      </span>
                    ))}
                  </div>
                  <div className="absolute right-0 bottom-0 mt-4 text-sm text-gray-300">
                    ＋
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {activeCard && (
            <motion.div
              layoutId={`card-${activeCard.id}`}
              className="fixed inset-0 z-50 my-10 flex items-center justify-center rounded-3xl bg-black sm:mx-2 md:mx-5 lg:mx-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="scrollbar-hide relative h-full w-full overflow-y-auto rounded-3xl px-5 py-6 backdrop-blur-md"
                style={{
                  background: `linear-gradient(
                to bottom right, 
                ${hexToRgba(categoryColors[activeCard.category], 0.1)}, 
                transparent 90%
                )`,
                  borderRight: `4px solid ${hexToRgba(categoryColors[activeCard.category], 0.7)}`,
                  borderBottom: `4px solid ${hexToRgba(categoryColors[activeCard.category], 0.7)}`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <button
                  onClick={() => setActiveCard(null)}
                  className="absolute top-6 right-5 cursor-pointer text-2xl text-white"
                >
                  ✕
                </button>
                <h2 className="mb-4 text-4xl font-bold text-white">
                  {activeCard.title}
                </h2>
                <p className="mb-6 text-gray-300">{activeCard.description}</p>
                <p className="mb-6 text-lg leading-relaxed text-gray-400">
                  {activeCard.details}
                </p>

                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {activeCard.features?.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <span className="mt-1 text-(--category-color)">
                          •
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Results
                  </h3>
                  <p className="text-gray-400 italic">{activeCard.results}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {activeCard.libs.map((lib) => (
                    <span
                      key={lib}
                      className="rounded-full px-3 py-1 text-sm"
                      style={{
                        background: hexToRgba(
                          categoryColors[activeCard.category],
                          0.2,
                        ),
                        color: categoryColors[activeCard.category],
                      }}
                    >
                      {lib}
                    </span>
                  ))}
                </div>
                <img
                  src={activeCard.img}
                  alt={activeCard.title}
                  className="mt-6 rounded-lg sm:w-1/2 md:w-4/6 lg:w-1/3"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
