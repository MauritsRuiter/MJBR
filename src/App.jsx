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
import ErrorPage from "./ErrorPage";

function App() {
  const pathname = window.location.pathname;

  if (pathname === "/404" || pathname === "/403") {
    const status = pathname === "/404" ? 404 : 403;
    return <ErrorPage status={status} />;
  }

  if (pathname !== "/" && pathname !== "/index.html") {
    return <ErrorPage />;
  }

  return (
    <>
      <Header />
      <Loader />
      <RotatingText />
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
