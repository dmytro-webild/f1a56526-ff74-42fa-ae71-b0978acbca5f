import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { usePreloadImages } from "@/components/kit/kitMotion";
import { MotionMedia } from "@/components/kit/Media";

type Service = { title: string; description?: string; imageSrc?: string; imageAlt?: string };

type ServicesNightListProps = {
  items?: Service[];
  imageSrc?: string;
  imageAlt?: string;
  cta?: { text: string; href: string };
  ariaLabel?: string;
};

const DEFAULT_ITEMS: Service[] = [
  { title: "Swimming pool", description: "A long pool between the villas, lit from below after dark and open until late." },
  { title: "Spa and sauna", description: "A warm stone spa with a sauna, a steam room and rituals booked from your room." },
  { title: "Garden restaurant", description: "Dinner under the pergola, with fish from the morning market and local wine." },
  { title: "Rooftop terrace", description: "A quiet roof above the town for a last drink with the sea in front of you." },
  { title: "Private parking", description: "Covered spaces by the gate, so the car stays out of sight for the whole stay." },
];

const STEP_MS = 5000;
const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.75, 0, 0.25, 1];

const Ring = ({ text, href }: { text: string; href: string }) => (
  <a href={href} className="group relative flex size-[6rem] shrink-0 items-center justify-center rounded-full lg:size-[7rem]">
    <svg aria-hidden="true" viewBox="0 0 112 112" fill="none" className="absolute inset-0 size-full -rotate-90">
      <circle cx="56" cy="56" r="55" stroke="currentColor" strokeOpacity={0.35} strokeWidth={1} />
      <circle
        cx="56"
        cy="56"
        r="55"
        stroke="currentColor"
        strokeWidth={1}
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        className="transition-[stroke-dashoffset] duration-[var(--dur-slow)] ease-[var(--ease-in-out)] group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
      />
    </svg>
    <p className="relative max-w-[5rem] text-center text-[length:var(--text-label)] uppercase leading-[1.3] tracking-[var(--label-tracking)]">{text}</p>
  </a>
);

const ServicesNightList = ({
  items = DEFAULT_ITEMS,
  imageSrc = "https://images.pexels.com/photos/28054874/pexels-photo-28054874.jpeg?auto=compress&cs=tinysrgb&w=1600",
  imageAlt = "Villa pool at dusk",
  cta,
  ariaLabel,
}: ServicesNightListProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<Animation | null>(null);
  usePreloadImages(stageRef, "200%");
  const reduce = useReducedMotion() ?? false;
  const seen = useInView(stageRef, { once: true, amount: 0.5 });
  const visible = useInView(stageRef, { amount: 0.3 });
  const [tabVisible, setTabVisible] = useState(true);
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const count = Math.max(items.length, 1);
  const running = seen && visible && tabVisible && !reduce;
  const current = items[Math.min(active, items.length - 1)];
  const words = (current?.description ?? "").split(" ").filter(Boolean);
  const rise = (delay: number) => ({
    enter: { y: "105%" },
    show: { y: "0%", transition: { duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : delay } },
    leave: { y: "-105%", transition: { duration: reduce ? 0 : 0.4, ease: EASE_IN_OUT } },
  });

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden);
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  useEffect(() => {
    const el = barRef.current;
    if (!el || reduce || count < 2) return;
    const anim = el.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: STEP_MS, easing: "linear", fill: "forwards" });
    anim.pause();
    anim.onfinish = () => setActive((a) => (a + 1) % count);
    animRef.current = anim;
    return () => {
      anim.cancel();
      animRef.current = null;
    };
  }, [active, cycle, reduce, count]);

  useEffect(() => {
    const anim = animRef.current;
    if (!anim) return;
    if (running) anim.play();
    else anim.pause();
  }, [running, active, cycle]);

  return (
    <section aria-label={ariaLabel ?? "Amenities"} className="relative bg-deep text-white">
      <div ref={stageRef} className="relative h-svh min-h-[40rem] overflow-hidden">
        {items.map((item, i) => (
          <MotionMedia
            key={i}
            src={item.imageSrc ?? imageSrc}
            alt={i === active ? (item.imageAlt ?? imageAlt) : ""}
            aria-hidden={i !== active}
            loading="lazy"
            decoding="async"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.08 }}
            transition={{ opacity: { duration: reduce ? 0 : 1.2, ease: EASE_IN_OUT }, scale: { duration: reduce ? 0 : 1.6, ease: EASE } }}
            className="absolute inset-0 size-full object-cover object-center"
          />
        ))}
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.35),rgb(0_0_0/0.1)_45%,rgb(0_0_0/0.55))]" />

        <ul className="absolute left-[var(--gutter)] top-[clamp(6.5rem,16svh,9rem)] flex flex-col gap-[clamp(0.5rem,1vw,0.875rem)] lg:left-auto lg:right-[14vw]">
          {items.map((item, i) => (
            <li key={i} className="overflow-hidden">
              <motion.h3
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: seen ? "0%" : "105%" }}
                transition={{ duration: reduce ? 0 : 1.2, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
              >
                <button
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => select(i)}
                  className={`relative block cursor-pointer whitespace-nowrap pb-[0.6rem] text-left text-[length:clamp(1.75rem,1rem+1.6vw,2.5rem)] uppercase leading-[1] transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)] hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none ${i === active ? "opacity-100" : "opacity-40"}`}
                >
                  {item.title}
                  {i === active && (
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 block h-px bg-white/25">
                      <span
                        ref={barRef}
                        className="block h-full origin-left bg-white"
                        style={{ transform: reduce || count < 2 ? "scaleX(1)" : "scaleX(0)" }}
                      />
                    </span>
                  )}
                </button>
              </motion.h3>
            </li>
          ))}
        </ul>

        <div className="absolute inset-x-0 bottom-[clamp(1.5rem,7svh,4rem)] mx-auto flex w-[var(--container)] flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div aria-live="polite" className="min-h-[1px] max-w-[36rem] lg:ml-[10vw]">
            <AnimatePresence mode="wait" initial={false}>
              {seen && current && (
                <motion.div key={active} initial="enter" animate="show" exit="leave" className="flex flex-col gap-4">
                  <div className="overflow-hidden">
                    <motion.p variants={rise(0)} className="text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)]">
                      {current.title}
                    </motion.p>
                  </div>
                  {words.length > 0 && (
                    <div className="font-[family-name:var(--font-heading)] text-[length:clamp(1.5rem,1rem+1.3vw,2.25rem)] uppercase leading-[1.05] [text-indent:3em]">
                      <p className="sr-only">{current.description}</p>
                      {words.map((word, i) => (
                        <Fragment key={i}>
                          <div aria-hidden="true" className="inline-block overflow-hidden pb-[0.06em] align-top [text-indent:0]">
                            <motion.div variants={rise(0.1 + i * 0.02)} className="inline-block">
                              {word}
                            </motion.div>
                          </div>
                          {i < words.length - 1 && " "}
                        </Fragment>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {cta && <Ring text={cta.text} href={cta.href} />}
        </div>
      </div>
    </section>
  );
};

export default ServicesNightList;
