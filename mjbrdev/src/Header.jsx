import React from "react";

function Header() {

  return (
    <>
      {/* Top gradient overlay */}
      <div className="pointer-events-none fixed top-0 right-0 left-0 z-40 h-64 bg-linear-to-b from-black to-transparent" />

      {/* Bottom gradient overlay */}
      <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 h-64 bg-linear-to-t from-black to-transparent" />
    </>
  );
}

export default Header;
