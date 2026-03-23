import React from "react";
import Header from "./Header";
import HorizontalScroll from "./HorizontalScroll";
import DynamicText from "./DynamicText";
import Loader from "./Loader";
import ScrollSVG from "./ScrollSVG";
import Footer from "./Footer";
import MyWork from "./MyWork";
import WhoAmI from "./WhoAmI";
import StaggeredMenu from "./StaggeredMenu";
import RotatingText from "./RotatingText";
import LogoLoop from "./LogoLoop";

function App() {
  return (
    <>
      <Header />
      <Loader />
      <RotatingText
        texts={["thinking", "coding", "components", "designing", "deploying"]}
        mainClassName="px-3 sm:px-4 md:px-4 bg-[#6A45FB] text-black overflow-hidden py-5 sm:py-2 md:py-2 justify-center rounded-2xl"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={2000}
      />
      <StaggeredMenu />
      <DynamicText />
      <LogoLoop />
      <HorizontalScroll />
      <ScrollSVG />
      <WhoAmI />
      <MyWork />
      <Footer />
    </>
  );
}

export default App;
