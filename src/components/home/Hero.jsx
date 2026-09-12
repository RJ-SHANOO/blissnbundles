import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Button from "../ui/Button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-gold/15 blur-3xl"
      />

      <div className="container-bb relative grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:gap-10 lg:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start text-left"
        >
          <motion.span
            variants={item}
            className="mb-5 inline-flex items-center rounded-full border border-brand/40 bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand backdrop-blur-sm"
          >
            Made Uniquely For You
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl md:text-6xl"
          >
            Gifts That Feel <span className="text-brand">Personal.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-base text-muted sm:text-lg"
          >
            Turn your memories into gifts they'll keep forever. Add your text,
            your photos, your colors — to mugs, tumblers, wallets, and bottles,
            crafted with premium care.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <Button to="/customize" variant="primary" size="lg">
              Customize Your Gift
            </Button>
            <Button to="/shop" variant="outline" size="lg">
              Shop Now
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-7 flex items-center gap-2 text-sm text-muted"
          >
            <span className="flex items-center gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-gold text-gold" />
              ))}
            </span>
            <span>4.8/5 from 2,000+ happy customers · Nationwide Delivery</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] bg-surface shadow-softLg">
            <img
              src="/assets/hero/hero-collage.svg"
              alt="Collage of personalized mug, tumbler, wallet, and bottle from Bliss & Bundles"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-surface px-5 py-3 shadow-softLg sm:-left-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              Best Seller
            </p>
            <p className="text-sm font-medium text-ink">Photo Tumbler</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
