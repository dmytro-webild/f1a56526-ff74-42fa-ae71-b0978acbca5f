import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { scrollRange } from "@/components/kit/kitMotion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import EraTitle from "@/components/kit/EraTitle";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Faq = { title: string; description: string };

type FaqPlusAccordionProps = {
  title?: string;
  script?: string;
  items?: Faq[];
  cta?: { text: string; href: string };
  ariaLabel?: string;
  className?: string;
};

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.75, 0, 0.25, 1];

const Hairline = ({ progress, range, reduce, className }: { progress: MotionValue<number>; range: [number, number]; reduce: boolean; className?: string }) => {
  const scaleX = useTransform(progress, range, [0, 1]);
  return <motion.div aria-hidden="true" style={reduce ? undefined : { scaleX }} className={cn("absolute inset-x-0 h-px origin-left bg-foreground/25", className)} />;
};

const FaqPlusAccordion = ({
  title = "Good to know",
  script = "Questions",
  items = [
    { title: "What time is check in?", description: "Rooms are ready from 3 pm. Arrive earlier and we keep your bags while you swim." },
    { title: "Is breakfast included?", description: "Yes, every stay includes breakfast in the garden from 8 to 11." },
    { title: "Can we bring children?", description: "Children over twelve are welcome. The house is kept quiet for rest." },
  ],
  cta = { text: "Still have a question", href: "#contact" },
  ariaLabel,
  className,
}: FaqPlusAccordionProps) => {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start end", "end center"] });

  return (
    <section aria-label={ariaLabel ?? title ?? "Questions"} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto flex w-[var(--container)] flex-col items-center">
        <EraTitle text={title} script={script} rule />
        <ul ref={listRef} className="relative mt-[clamp(2.5rem,5vw,4rem)] w-full max-w-[52rem]">
          <Hairline progress={scrollYProgress} range={scrollRange(0, 0.4)} reduce={!!reduce} className="top-0" />
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const start = ((i + 1) / (items.length + 1)) * 0.6;
            return (
              <motion.li
                key={i}
                className="relative"
                initial={reduce ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                <h3 className="text-[length:var(--text-h3)]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left uppercase [overflow-wrap:anywhere] focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                  >
                    <div className="overflow-hidden pb-[0.08em]">
                      <motion.div variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1.2, ease: EASE, delay: Math.min(i, 6) * 0.06 } } }}>
                        {item.title}
                      </motion.div>
                    </div>
                    <div
                      aria-hidden="true"
                      className={cn("relative h-4 w-4 shrink-0 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)]", isOpen && "rotate-45")}
                    >
                      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
                    </div>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={reduce ? { opacity: 0 } : { height: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: "auto" }}
                      exit={reduce ? { opacity: 0 } : { height: 0 }}
                      transition={{ duration: 0.8, ease: EASE_IN_OUT }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={reduce ? false : { clipPath: "inset(-10% 100% -10% 0%)" }}
                        animate={{ clipPath: "inset(-10% 0% -10% 0%)" }}
                        transition={{ duration: 1.2, ease: EASE_IN_OUT, delay: 0.15 }}
                        className="max-w-[40rem] pb-6 text-[length:var(--text-body)] leading-[1.6] text-muted-foreground"
                      >
                        {item.description}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Hairline progress={scrollYProgress} range={scrollRange(start, start + 0.4)} reduce={!!reduce} className="bottom-0" />
              </motion.li>
            );
          })}
        </ul>
        {cta?.text && (
          <a href={cta.href} className="btn-link mt-[clamp(2rem,4vw,3rem)]">
            {cta.text}
          </a>
        )}
      </div>
    </section>
  );
};

export default FaqPlusAccordion;
