import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-cubic", offset: 60 });
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
