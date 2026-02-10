import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

document.body.style.backgroundColor = "#000000";

document.body.classList.add(
  "bg-black",
  "overflow-x-hidden",
  "overflow-y-scroll",
  "select-none",
  "font-gilroy",
  "text-amber-50"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
