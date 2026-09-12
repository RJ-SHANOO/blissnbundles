import { motion } from "framer-motion";
import { Image as ImageIcon, Palette, Truck, Type } from "lucide-react";
import Button from "../ui/Button";

const STEPS = [
  {
    number: "01",
    icon: Palette,
    title: "Choose Your Product",
    description: "Pick a mug, tumbler, wallet, or bottle to start with.",
  },
  {
    number: "02",
    icon: Type,
    title: "Personalize It",
    description: "Add your text, upload your photo, pick colors and designs.",
  },
  {
    number: "03",
    icon: Truck,
    title: "We Craft & Deliver",
    description: "Premium printing, quality-checked, delivered to your door.",
  },
];

const SWATCHES = ["#CE9A7C", "#D8A868", "#F4F1EC", "#0A0B0D", "#6FD1AC"];

function CustomizationShowcase() {
  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            The B&amp;B Experience
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl md:text-[2.6rem]">
            Make It Yours in 3 Simple Steps
          </h2>
          <p className="mt-4 max-w-md text-base text-muted sm:text-lg">
            Every B&amp;B piece starts as a blank canvas — your words, your
            photos, your colors turn it into something only you could have made.
          </p>

          <div className="mt-9 flex flex-col gap-7">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-brand">
                  <step.icon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gold">
                      {step.number}
                    </span>
                    <h3 className="text-base font-semibold text-ink">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Button to="/customize" variant="primary" size="lg" className="mt-9">
            Start Customizing
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto max-w-md rounded-[2rem] bg-surface p-6 shadow-softLg sm:p-8">
            <div className="overflow-hidden rounded-2xl bg-surfaceAlt shadow-soft">
              <img
                src="/assets/products/mug-01.svg"
                alt="Preview of a personalized mug design in progress"
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="mt-5 space-y-4 rounded-2xl bg-surfaceAlt p-4 shadow-soft">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Add Your Text
                </label>
                <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-ink/10 bg-cream px-3 py-2.5">
                  <Type size={15} className="text-muted" />
                  <span className="text-sm text-ink/60">
                    "To the best mom ever..."
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Upload Your Photo
                </label>
                <div className="mt-1.5 flex items-center gap-2 rounded-2xl border-2 border-dashed border-ink/15 px-3 py-2.5 text-muted">
                  <ImageIcon size={15} />
                  <span className="text-sm">Drop image or browse</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Choose Color
                </label>
                <div className="mt-2 flex items-center gap-2.5">
                  {SWATCHES.map((color, i) => (
                    <button
                      key={color}
                      aria-label={`Select color ${color}`}
                      style={{ backgroundColor: color }}
                      className={`h-7 w-7 rounded-full ring-2 ring-offset-2 ring-offset-surfaceAlt transition-transform hover:scale-110 ${
                        i === 0 ? "ring-brand" : "ring-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -right-4 -top-4 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-void shadow-gold sm:-right-6">
              Live Preview
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CustomizationShowcase;
