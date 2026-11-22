import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import EraTitle from "@/components/kit/EraTitle";
import EraArchWindow from "@/components/kit/EraArchWindow";
import { useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Detail = { label: string; value: string };

type FormLabels = { name?: string; email?: string; enquiry?: string; message?: string; sending?: string; sent?: string; thanks?: string };

type ContactPlumFormProps = {
  title?: string;
  script?: string;
  options?: string[];
  labels?: FormLabels;
  submitText?: string;
  imageSrc?: string;
  imageAlt?: string;
  details?: Detail[];
  ariaLabel?: string;
  className?: string;
};

const ContactPlumForm = ({
  title = "Get in touch",
  script = "hello",
  options = ["A booking", "An event", "Something else"],
  labels,
  submitText = "Send",
  imageSrc,
  imageAlt = "",
  details = [],
  ariaLabel,
  className,
}: ContactPlumFormProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const timer = useRef<number>(undefined);
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "200%");

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state !== "idle") return;
    const form = event.currentTarget;
    setState("sending");
    timer.current = window.setTimeout(() => {
      setState("sent");
      form.reset();
    }, 1200);
  };

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: kit.base, ease: kit.ease, delay },
  });

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title} className={cn("relative bg-secondary py-[var(--section-space)] text-secondary-foreground", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-[clamp(3rem,6vw,6rem)] lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col gap-[clamp(2.5rem,5vw,4rem)]">
          <EraTitle text={title} script={script} align="left" className="max-w-[3.95em]" />
          <motion.form {...fade(0.2)} onSubmit={onSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
              <label className="flex flex-col gap-2">
                <p className="text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)] text-secondary-foreground/75">{labels?.name ?? "Name"}</p>
                <input name="name" required autoComplete="name" className="border-0 border-b border-secondary-foreground/30 bg-transparent py-2 text-[length:var(--text-body)] text-secondary-foreground outline-none transition-colors duration-300 focus:border-secondary-foreground" />
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)] text-secondary-foreground/75">{labels?.email ?? "Email"}</p>
                <input name="email" type="email" required autoComplete="email" className="border-0 border-b border-secondary-foreground/30 bg-transparent py-2 text-[length:var(--text-body)] text-secondary-foreground outline-none transition-colors duration-300 focus:border-secondary-foreground" />
              </label>
            </div>
            {options.length > 0 && (
              <label className="flex flex-col gap-2">
                <p className="text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)] text-secondary-foreground/75">{labels?.enquiry ?? "Enquiry"}</p>
                <select name="topic" defaultValue={options[0]} className="border-0 border-b border-secondary-foreground/30 bg-transparent py-2 text-[length:var(--text-body)] text-secondary-foreground outline-none transition-colors duration-300 focus:border-secondary-foreground">
                  {options.map((option) => (
                    <option key={option} value={option} className="bg-secondary text-secondary-foreground">
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="flex flex-col gap-2">
              <p className="text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)] text-secondary-foreground/75">{labels?.message ?? "Message"}</p>
              <textarea name="message" rows={3} className="resize-none border-0 border-b border-secondary-foreground/30 bg-transparent py-2 text-[length:var(--text-body)] text-secondary-foreground outline-none transition-colors duration-300 focus:border-secondary-foreground" />
            </label>
            <div className="flex items-center gap-6">
              <button type="submit" disabled={state !== "idle"} className="btn-secondary disabled:cursor-default">
                {state === "sending" ? (labels?.sending ?? "Sending") : state === "sent" ? (labels?.sent ?? "Sent") : submitText}
              </button>
              <p aria-live="polite" className="text-[length:var(--text-small)] text-secondary-foreground/75">
                {state === "sent" ? (labels?.thanks ?? "Thank you, we will reply within a day.") : ""}
              </p>
            </div>
          </motion.form>
        </div>

        <div className="flex flex-col gap-8">
          {imageSrc && (
            <div className="flex w-full flex-col border border-secondary-foreground/25 p-2 lg:min-h-[28rem] lg:flex-1">
              <EraArchWindow className="aspect-[4/5] w-full lg:aspect-auto lg:flex-1">
                <Media src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </EraArchWindow>
            </div>
          )}
          {details.length > 0 && (
            <motion.dl {...fade(0.3)} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {details.map((detail, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <dt className="text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)] text-secondary-foreground/75">{detail.label}</dt>
                  <dd className="text-[length:var(--text-body)] leading-[1.5] [overflow-wrap:anywhere]">{detail.value}</dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactPlumForm;
