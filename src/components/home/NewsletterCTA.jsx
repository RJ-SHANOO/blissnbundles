import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Button from "../ui/Button";

function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-void py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container-bb flex flex-col items-center gap-6 text-center"
      >
        <h2 className="max-w-xl text-3xl font-semibold text-white sm:text-4xl">
          Got someone special in mind?
        </h2>
        <p className="max-w-md text-base text-white/70">
          Let's create their perfect gift — and get early access to new designs
          and offers along the way.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button to="/customize" variant="primary" size="lg">
            Customize Your Gift
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for offers"
            className="h-12 flex-1 rounded-full border border-white/20 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand-light/60"
          />
          <button
            type="submit"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <Send size={15} />
            {submitted ? "Subscribed" : "Subscribe"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}

export default NewsletterCTA;
