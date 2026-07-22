import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";

import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
