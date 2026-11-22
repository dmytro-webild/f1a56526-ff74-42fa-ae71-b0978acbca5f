import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FooterLink = { text: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };

type FooterPlumPhoneProps = {
  phone?: string;
  email?: string;
  address?: string[];
  columns?: FooterColumn[];
  legal?: string;
  brand?: string;
  toTopText?: string;
  ariaLabel?: string;
  className?: string;
};

const defaultColumns: FooterColumn[] = [
  { title: "Stay", links: [{ text: "Rooms", href: "#rooms" }, { text: "Spa", href: "#spa" }, { text: "Restaurant", href: "#restaurant" }] },
  { title: "Visit", links: [{ text: "Getting here", href: "#contact" }, { text: "Gift cards", href: "#contact" }] },
  { title: "Follow", links: [{ text: "Instagram", href: "#" }, { text: "Newsletter", href: "#" }] },
];

const EASE_OUT: [number, number, number, number] = [0.25, 1, 0.5, 1];

const FooterPlumPhone = ({
  phone = "+34 938 11 42 00",
  email = "stay@villasolenne.es",
  address = ["Passeig de la Ribera 42", "08870 Sitges, Spain"],
  columns = defaultColumns,
  legal = "Villa Solenne. All rights reserved.",
  brand = "Villa Solenne",
  toTopText = "To top",
  ariaLabel,
  className,
}: FooterPlumPhoneProps) => {
  const reduce = useReducedMotion();
  const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer
      aria-label={ariaLabel ?? `${brand} contact`}
      className={cn("relative z-10 bg-deep pt-[var(--section-space)] pb-[clamp(1.5rem,3vw,2.5rem)] text-deep-foreground", className)}
    >
      <div className="mx-auto flex w-[var(--container)] flex-col items-center text-center">
        <svg aria-hidden="true" viewBox="0 0 40 40" className="h-10 w-10 text-current">
          <path d="M20 4 V36 M4 20 H36 M8.7 8.7 L31.3 31.3 M31.3 8.7 L8.7 31.3" stroke="currentColor" strokeWidth={1} strokeLinecap="round" fill="none" />
          <circle cx="20" cy="20" r="3" stroke="currentColor" strokeWidth={1} fill="none" />
        </svg>
        <p className="mt-6 text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-70">{brand}</p>
        <motion.div initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mt-[clamp(2rem,5vw,4rem)] overflow-hidden pb-[0.06em]">
          <motion.a
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1.2, ease: EASE_OUT } } }}
            className="block text-balance text-[length:min(var(--text-display),11vw)] uppercase leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
          >
            {phone}
          </motion.a>
        </motion.div>
        {email && (
          <a href={`mailto:${email}`} className="btn-link mt-[clamp(1.5rem,3vw,2.5rem)] [overflow-wrap:anywhere]">
            {email}
          </a>
        )}
        {address.length > 0 && (
          <div className="mt-6 flex flex-col gap-1">
            {address.map((line, index) => (
              <p key={index} className="text-[length:var(--text-small)] leading-[1.5] opacity-80">
                {line}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto mt-[var(--section-space)] w-[var(--container)] border-t border-deep-foreground/20 pt-[clamp(1.5rem,3vw,2.5rem)]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {columns.length > 0 && (
            <div className="grid grid-cols-2 gap-x-[var(--gap)] gap-y-8 lg:flex lg:gap-[clamp(2rem,5vw,5rem)]">
              {columns.map((column, index) => (
                <nav key={index} aria-label={column.title} className="flex min-w-0 flex-col gap-3">
                  <p className="text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-60">{column.title}</p>
                  {column.links.map((link, linkIndex) => (
                    <a key={linkIndex} href={link.href} className="text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] [overflow-wrap:anywhere]">
                      {link.text}
                    </a>
                  ))}
                </nav>
              ))}
            </div>
          )}
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <button type="button" onClick={toTop} className="btn-link">
              {toTopText}
            </button>
            {legal && <p className="text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] opacity-60">{legal}</p>}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPlumPhone;
