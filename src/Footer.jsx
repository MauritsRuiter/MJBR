import React from "react";

export default function Footer() {
  return (
    <footer id="contact" className="h-screen bg-black py-6 text-center text-white">
      <div className="h-screen flex-col content-center justify-center">
        <p className="text-8xl">FIN</p>
      </div>
      <p className="text-sm text-neutral-600 hover:text-white pb-24">
        &copy; {new Date().getFullYear()} Maurits Ruiter. All rights reserved.
      </p>
    </footer>
  );
}
