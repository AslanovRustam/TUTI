/**
 * Кнопка-пігулка в кольорах лого.
 *
 * sun     — головна дія: жовта заливка, темний текст (9.9:1).
 * outline — другорядна: біла, з жовтою обводкою й притемненим жовтим
 *           текстом (6.7:1 на білому, обводка 3.6:1). Світлий жовтий
 *           на тексті чи рамці не читався б узагалі.
 *
 * На телефоні кнопка розтягується на всю ширину, текст по центру.
 */
import Link from "next/link";

type Props = {
  href: string;
  variant?: "sun" | "outline";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variants = {
  sun: "bg-sun text-ink hover:brightness-95",
  outline: "bg-white text-sun-deep ring-2 ring-inset ring-sun-line hover:bg-sun-soft",
};

const sizes = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  href,
  variant = "sun",
  size = "md",
  className = "",
  children,
}: Props) {
  // Всередині сайту — next/link, щоб перехід був без перезавантаження.
  // Якорі й mailto лишаються звичайними посиланнями.
  const external = href.startsWith("http");
  const inApp = href.startsWith("/");
  const Tag = inApp ? Link : "a";

  return (
    <Tag
      href={href}
      className={[
        "group font-display inline-flex w-full items-center justify-center gap-2 rounded-full font-semibold sm:w-auto",
        "ease-bounce transition-transform duration-300 hover:-translate-y-1 active:translate-y-0",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {/* Стрілка саме SVG, а не «→»: текстовий символ не входить у latin-підмножину
          шрифта і тягнув би за собою окремий файл на 18 KB заради однієї гліфи. */}
      <svg
        aria-hidden="true"
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ease-bounce transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M2.5 8h11M9.5 4l4 4-4 4" />
      </svg>
    </Tag>
  );
}
