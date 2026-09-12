import { motion } from "framer-motion";
import { Heart, Package, Sparkles, Truck } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const VALUES = [
  {
    icon: Heart,
    title: "Made With Meaning",
    description:
      "Every mug, tumbler, wallet, and bottle we craft carries a story — a memory, an inside joke, a name that matters. We treat each order like the gift it's meant to be.",
  },
  {
    icon: Sparkles,
    title: "Premium, Not Mass-Produced",
    description:
      "Studio-grade printing, careful quality checks, and materials chosen to last — because a gift that fades in a month isn't a gift worth giving.",
  },
  {
    icon: Package,
    title: "Personalization First",
    description:
      "Text, photos, colors, designs — our entire catalog exists to be shaped around the person you're giving it to, not the other way around.",
  },
  {
    icon: Truck,
    title: "Built for Pakistan",
    description:
      "Nationwide delivery with Cash on Delivery, secure checkout, and support that actually replies — trust shouldn't be a leap of faith.",
  },
];

function About() {
  return (
    <>
      <section className="bg-cream py-16 md:py-24">
        <div className="container-bb flex flex-col items-center gap-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Our Story
          </span>
          <h1 className="max-w-2xl font-display text-4xl font-semibold text-ink sm:text-5xl md:text-[3.4rem]">
            Gifts That Feel Personal, Because They Are.
          </h1>
          <p className="max-w-xl text-base text-muted sm:text-lg">
            B&amp;B — Bliss &amp; Bundles — started with a simple belief:
            the best gifts aren't the most expensive ones, they're the ones
            that feel like they were made for exactly one person. So that's
            what we build, one custom mug, tumbler, wallet, and bottle at
            a time.
          </p>
        </div>
      </section>

      <section className="bg-base py-16 md:py-24">
        <div className="container-bb grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Why We Exist
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Turning Memories Into Something You Can Hold
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We noticed that most "personalized" gifting online felt
              anything but personal — generic templates, rushed printing,
              and zero room to make something truly yours. B&amp;B was
              built to fix that: a place where customization isn't an
              afterthought, it's the entire product.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Today, we make it easy to turn a favorite photo, a name, or a
              private joke into a mug your mum drinks from every morning,
              or a wallet your husband carries for years. Every piece is
              produced to order, checked for quality, and shipped across
              Pakistan with care.
            </p>
            <div className="mt-8">
              <Button to="/customize" variant="primary" size="lg">
                Start Customizing
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="order-1 grid grid-cols-2 gap-4 lg:order-2"
          >
            {[
              { label: "Happy Customers", value: "2,000+" },
              { label: "Avg. Rating", value: "4.8 / 5" },
              { label: "Cities Delivered To", value: "60+" },
              { label: "Products Handcrafted", value: "10,000+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-1 rounded-3xl bg-surface p-8 text-center shadow-soft"
              >
                <span className="font-display text-3xl font-semibold text-brand">
                  {stat.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="container-bb">
          <SectionHeading
            eyebrow="What We Stand For"
            title="The Values Behind Every Order"
            subtitle="These aren't slogans on a wall — they're how we decide what to build and how to build it."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="flex flex-col items-start gap-4 rounded-2xl bg-surface p-6 shadow-soft"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <value.icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-ink">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand py-16 text-center md:py-20">
        <div className="container-bb flex flex-col items-center gap-6">
          <h2 className="max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Got someone special in mind?
          </h2>
          <p className="max-w-md text-white/85">
            Let's turn your memory into a gift they'll actually keep.
          </p>
          <Button to="/customize" variant="light" size="lg">
            Customize Your Gift
          </Button>
        </div>
      </section>
    </>
  );
}

export default About;
