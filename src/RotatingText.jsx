"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
} from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useVisibilityObserver from "@/hooks/useVisibilityObserver";

gsap.registerPlugin(ScrollTrigger);

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts = ["thinking", "coding", "components", "designing", "deploying"],
    transition = { type: "spring", damping: 30, stiffness: 400 },
    initial = { y: "100%" },
    animate = { y: 0 },
    exit = { y: "-120%" },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0.025,
    staggerFrom = "last",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName = "px-3 sm:px-4 md:px-4 bg-[#6A45FB] text-black overflow-hidden py-5 sm:py-2 md:py-2 justify-center rounded-2xl",
    splitLevelClassName = "overflow-hidden pb-0.5 sm:pb-1 md:pb-1",
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const containerRef = useRef(null);
  const { ref: visibilityRef, isVisible } = useVisibilityObserver({
    name: 'RotatingText Animation'
  });

  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }

    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration],
  );

  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext],
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange],
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
    }),
    [next, previous, jumpTo, reset],
  );

  useEffect(() => {
    if (!auto || !isVisible) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto, isVisible]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "top+=500vh",
        scrub: 1,
        markers: false,
      },
      opacity: 0,
      duration: 1,
      onUpdate: function () {
        if (this.progress() === 1) {
          container.style.display = "none";
        } else {
          container.style.display = "flex";
        }
      },
    });

    return () => {
      gsap.killTweensOf(container);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={visibilityRef}>
      <div
        ref={containerRef}
        className="fixed inset-0 flex items-center justify-center pointer-events-none  scale-75 sm:scale-100 md:scale-100"
      >
      <LayoutGroup>
        <div className="flex items-center justify-center gap-2">
          <motion.span
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mr-2"
            layout
            layoutId="creative-text"
            transition={transition}
          >
            Creative
          </motion.span>
          <motion.span
            className={cn(
              "relative flex flex-wrap text-center whitespace-pre-wrap text-5xl md:text-7xl lg:text-8xl font-bold text-white",
              mainClassName,
            )}
            {...rest}
            layout
            layoutId="rotating-text-container"
            transition={transition}
          >
            <span className="sr-only">{texts[currentTextIndex]}</span>
            <AnimatePresence
              mode={animatePresenceMode}
              initial={animatePresenceInitial}
            >
              <motion.span
                key={currentTextIndex}
                className={cn(
                  splitBy === "lines"
                    ? "flex w-full flex-col"
                    : "relative flex flex-wrap whitespace-pre-wrap",
                )}
                layout
                layoutId={`rotating-text-${currentTextIndex}`}
                aria-hidden="true"
              >
                {elements.map((wordObj, wordIndex, array) => {
                  const previousCharsCount = array
                    .slice(0, wordIndex)
                    .reduce((sum, word) => sum + word.characters.length, 0);
                  return (
                    <span
                      key={wordIndex}
                      className={cn("inline-flex", splitLevelClassName)}
                    >
                      {wordObj.characters.map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          initial={initial}
                          animate={animate}
                          exit={exit}
                          transition={{
                            ...transition,
                            delay: getStaggerDelay(
                              previousCharsCount + charIndex,
                              array.reduce(
                                (sum, word) => sum + word.characters.length,
                                0,
                              ),
                            ),
                          }}
                          className={cn("inline-block", elementLevelClassName)}
                        >
                          {char}
                        </motion.span>
                      ))}
                      {wordObj.needsSpace && (
                        <span className="whitespace-pre"> </span>
                      )}
                    </span>
                  );
                })}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </div>
      </LayoutGroup>
      </div>
    </div>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;
