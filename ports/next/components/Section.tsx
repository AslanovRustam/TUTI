/**
 * Секція на всю ширину.
 *
 * Кольорові блоки «розкриваються» при появі: стартують меншими й
 * скругленими з усіх боків, потім пружинять у повну ширину.
 */
import type { Tone } from "@/content/tones";

type Props = {
  id?: string;
  tone?: Tone | "paper";
  className?: string;
  children: React.ReactNode;
};

const fills: Record<string, string> = {
  paper: "",
  sky: "bg-sky",
  grass: "bg-grass",
  honey: "bg-honey",
  coral: "bg-coral",
  berry: "bg-berry",
};

export default function Section({ id, tone = "paper", className = "", children }: Props) {
  const colored = tone !== "paper";

  return (
    <section id={id} className={["relative", className].join(" ")}>
      {/* Анімується внутрішній шар, а спостерігач стежить за зовнішньою
          секцією. Якщо стежити за самим анімованим блоком, він на межі
          екрана починає блимати: з'явився -> змінив розмір -> вийшов
          із зони видимості -> зник -> знову з'явився. */}
      <div
        {...(colored ? { "data-watch-parent": "" } : {})}
        className={[
          "stars relative px-5 py-24 sm:px-8 sm:py-32",
          fills[tone],
          colored ? "stars-light reveal reveal-block overflow-hidden" : "",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </section>
  );
}
