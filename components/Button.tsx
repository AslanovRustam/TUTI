/**
 * Кнопка-пігулка. Без рамки: суцільна заливка.
 * На телефоні розтягується на всю ширину, текст по центру.
 */
type Props = {
  href: string;
  variant?: "ink" | "paper";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const variants = {
  ink: "bg-ink text-paper hover:bg-ink/90",
  paper: "bg-white text-ink",
};

const sizes = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  href,
  variant = "ink",
  size = "md",
  className = "",
  children,
}: Props) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className={[
        "group inline-flex w-full items-center justify-center gap-2 rounded-full font-display font-semibold sm:w-auto",
        "transition-transform duration-300 ease-bounce hover:-translate-y-1 active:translate-y-0",
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
        className="transition-transform duration-300 ease-bounce group-hover:translate-x-1"
      >
        <path d="M2.5 8h11M9.5 4l4 4-4 4" />
      </svg>
    </a>
  );
}
