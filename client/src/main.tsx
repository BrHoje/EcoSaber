import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
// Import i18n (needs to be bundled)
import './i18n';

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
