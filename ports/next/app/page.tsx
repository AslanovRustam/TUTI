import Footer from "@/components/Footer";
import Header from "@/components/Header";
import About from "@/sections/About";
import Apps from "@/sections/Apps";
import Careers from "@/sections/Careers";
import Contact from "@/sections/Contact";
import Games from "@/sections/Games";
import Hero from "@/sections/Hero";
import Highlights from "@/sections/Highlights";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-honey px-5 py-2.5 font-bold focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
      >
        Перейти до вмісту
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Highlights />
        <Apps />
        <Games />
        <About />
        <Careers />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
