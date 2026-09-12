import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "../../context/useData";
import SectionHeading from "../ui/SectionHeading";
import TestimonialCard from "./TestimonialCard";

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCount(3);
      else if (window.innerWidth >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function Testimonials() {
  const { testimonials } = useData();
  const visible = useVisibleCount();
  const maxIndex = Math.max(testimonials.length - visible, 0);
  const [index, setIndex] = useState(0);
  const current = Math.min(index, maxIndex);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (Math.min(prev, maxIndex) >= maxIndex ? 0 : Math.min(prev, maxIndex) + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const goTo = (dir) => {
    setIndex((prev) => {
      const next = Math.min(prev, maxIndex) + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Real Stories"
            title="Loved By Our Customers"
            subtitle="Gifts made for anniversaries, birthdays, and everything in between."
            className="items-start text-left"
          />
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              aria-label="Previous testimonial"
              onClick={() => goTo(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/70 hover:border-brand hover:text-brand"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => goTo(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/70 hover:border-brand hover:text-brand"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) goTo(1);
                else if (info.offset.x > 60) goTo(-1);
              }}
              className="grid grid-cols-1 gap-6 touch-pan-y sm:grid-cols-2 lg:grid-cols-3"
            >
              {testimonials
                .slice(current, current + visible)
                .map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 sm:hidden">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-brand" : "w-2 bg-ink/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
