import About from "@/sections/About";
import Apps from "@/sections/Apps";
import Articles from "@/sections/Articles";
import Careers from "@/sections/Careers";
import Contact from "@/sections/Contact";
import Games from "@/sections/Games";
import Hero from "@/sections/Hero";
import Highlights from "@/sections/Highlights";

export default function Page() {
  return (
    <>
      <Hero />
      <Highlights />
      <Apps />
      <Games />
      <About />
      <Careers />
      <Articles />
      <Contact />
    </>
  );
}
