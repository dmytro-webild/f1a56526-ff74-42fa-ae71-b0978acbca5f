import { useEffect, useId, useRef, useState } from "react";
import { useImageReady, usePreloadImages } from "@/components/kit/kitMotion";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DrawOnScroll from "@/components/animation/DrawOnScroll";
import EraTitle from "@/components/kit/EraTitle";
import { MotionMedia } from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Slide = { imageSrc: string; imageAlt?: string };

type AboutArchCurveProps = {
  title?: string;
  label?: string;
  placeTitle?: string;
  description?: string;
  note?: string;
  items?: Slide[];
  className?: string;
};

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

const AboutArchCurve = ({
  title = "Three reasons to stay",
  label = "A place to return to, year after year",
  placeTitle = "By the sea",
  description = "A small house on the Ribera, two minutes from the beach and the lanes of old Sitges, with Barcelona forty minutes up the coast.",
  note = "A house, not a hotel",
  items = [
    { imageSrc: px(9500327), imageAlt: "Bay with white houses and boats" },
    { imageSrc: px(31711941), imageAlt: "White terraces above the sea" },
  ],
  className,
}: AboutArchCurveProps) => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "200%");
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInView = useInView(photoRef, { once: true, amount: 0.3 });
  const photoReady = useImageReady(photoRef, photoInView);
  const pathId = useId().replace(/:/g, "");
  const count = items.length;
  const [active, setActive] = useState(0);
  const current = count ? active % count : 0;
  const go = (step: number) => setActive((i) => (i + step + count) % count);

  useEffect(() => {
    if (reduce || count < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), 5000);
    return () => window.clearInterval(id);
  }, [reduce, count]);

  return (
    <section
      ref={sectionRef}
      aria-label={title || "About"}
      className={cn("relative z-10 rounded-t-[50vw] bg-secondary pb-[var(--section-space)] text-secondary-foreground", className)}
    >
      <div className="relative mx-auto aspect-[2/1] w-full">
        {title && (
          <svg viewBox="0 0 1000 500" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <path id={pathId} d="M 110 500 A 390 390 0 0 1 890 500" fill="none" />
            </defs>
            <motion.text
              fill="currentColor"
              fontSize={54}
              textAnchor="middle"
              className="uppercase [font-family:var(--font-heading)]"
              initial={reduce ? false : { letterSpacing: "0em" }}
              whileInView={{ letterSpacing: "0.35em" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 2.2, ease: EASE }}
            >
              <textPath href={`#${pathId}`} startOffset="50%">
                {title}
              </textPath>
            </motion.text>
          </svg>
        )}
        {title && <h2 className="sr-only">{title}</h2>}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 pb-[clamp(1rem,3vw,3rem)]">
          <svg viewBox="0 0 40 40" aria-hidden="true" className="h-8 w-8 text-current lg:h-10 lg:w-10">
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((deg) => (
              <line key={deg} x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="1" transform={`rotate(${deg} 20 20)`} />
            ))}
          </svg>
          <div className="h-12 w-px">
            <DrawOnScroll d="M0.5 0 V48" viewBox="0 0 1 48" strokeWidth={1} className="h-12 text-current opacity-50" />
          </div>
          {label && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="max-w-[16rem] text-balance text-center text-[length:var(--text-label)] uppercase leading-[1.5] tracking-[var(--label-tracking)]"
            >
              {label}
            </motion.p>
          )}
        </div>
      </div>

      <div className="mx-auto flex w-[var(--container)] flex-col items-center pt-[var(--section-space)]">
        {placeTitle && <EraTitle text={placeTitle} className="uppercase" />}

        {count > 0 && (
          <motion.div
            ref={photoRef}
            initial={reduce ? false : "hidden"}
            animate={reduce || (photoInView && photoReady) ? "show" : "hidden"}
            className="mt-[clamp(2.5rem,5vw,4rem)] w-full max-w-[22rem] lg:max-w-[26rem]"
          >
          <motion.div
            variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: [0.75, 0, 0.25, 1] } } }}
            className="relative aspect-[16/9] w-full overflow-hidden"
          >
            <AnimatePresence initial={false}>
              <MotionMedia
                key={current}
                src={items[current].imageSrc}
                alt={items[current].imageAlt ?? ""}
                loading="lazy"
                decoding="async"
                initial={reduce ? false : { opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </motion.div>
          </motion.div>
        )}

        {count > 1 && (
          <div className="mt-6 flex items-center gap-6">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-current/40 transition-colors duration-300 hover:border-current"
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth={1} />
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <p className="text-[length:var(--text-label)] font-semibold tabular-nums">{current + 1}</p>
              <div aria-hidden="true" className="h-px w-16 bg-current/40">
                <motion.div
                  key={current}
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduce ? 0 : 5, ease: "linear" }}
                  className="h-px w-full origin-left bg-current"
                />
              </div>
              <p aria-hidden="true" className="text-[length:var(--text-label)] font-semibold tabular-nums">{count}</p>
            </div>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-current/40 transition-colors duration-300 hover:border-current"
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth={1} />
              </svg>
            </button>
          </div>
        )}

        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-[clamp(2.5rem,5vw,4rem)] max-w-[34rem] text-balance text-center text-[length:var(--text-body)] leading-[1.55]"
          >
            {description}
          </motion.p>
        )}
        {note && (
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-center text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)]"
          >
            {note}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default AboutArchCurve;
