import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import TranslationProvider from './TranslationProvider';

createRoot(document.getElementById("root")!).render(
  <TranslationProvider>
    <App />
    <Toaster />
  </TranslationProvider>
);
