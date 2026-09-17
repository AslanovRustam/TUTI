import CopyLink from "./CopyLink";
import SocialIcon from "./SocialIcon";

/**
 * Поділитися статтею.
 *
 * Три мережі — звичайні посилання, тож працюють і без JS. Клієнтський
 * код потрібен лише кнопці «копіювати».
 */
type Props = {
  url: string;
  title: string;
};

const targets = [
  {
    label: "Telegram",
    icon: "telegram",
    href: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: "Facebook",
    icon: "facebook",
    href: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "LinkedIn",
    icon: "linkedin",
    href: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

export default function ShareLinks({ url, title }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-ink-soft mr-1 text-sm font-bold">Поділитися:</span>

      {targets.map((target) => (
        <a
          key={target.label}
          href={target.href(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Поділитися в ${target.label}`}
          className="bg-paper-deep ease-bounce hover:bg-sun-soft grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
        >
          <SocialIcon name={target.icon} className="h-5 w-5" />
          <span className="sr-only">Поділитися в {target.label}</span>
        </a>
      ))}

      <CopyLink url={url} />
    </div>
  );
}
