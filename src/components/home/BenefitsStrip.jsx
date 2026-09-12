import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useData } from "../../context/useData";
import { BENEFIT_ICONS } from "../../lib/benefitIcons";

function BenefitsStrip() {
  const { benefits } = useData();

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-bb grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {benefits.map((benefit, i) => {
          const Icon = BENEFIT_ICONS[benefit.icon] ?? Sparkles;
          return (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="flex items-start gap-4 rounded-2xl bg-surface p-5 shadow-soft sm:flex-col sm:items-start"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-1 text-sm text-muted">{benefit.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default BenefitsStrip;
