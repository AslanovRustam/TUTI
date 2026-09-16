import Image from "next/image";

import { getArt } from "@/content/images";

type Props = {
  className?: string;
  size?: "sm" | "md";
};

const sizes = { sm: "h-10 sm:h-11", md: "h-14" };

export default function Wordmark({ className = "", size = "sm" }: Props) {
  return (
    <a
      href="#top"
      className={[
        "ease-bounce inline-block transition-transform duration-300 hover:-translate-y-0.5",
        className,
      ].join(" ")}
    >
      <Image
        src={getArt("logo")}
        alt="TUTI Games"
        sizes="180px"
        className={["w-auto", sizes[size]].join(" ")}
        priority
      />
    </a>
  );
}
