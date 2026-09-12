import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faqs";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

function FAQs() {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb max-w-3xl">
        <SectionHeading
          eyebrow="Frequently Asked"
          title="Questions? We've Got Answers"
          subtitle="Everything you need to know about ordering, customizing, and delivery."
        />

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl bg-surface shadow-soft"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 bg-transparent px-5 py-4 text-left text-ink [forced-color-adjust:none] sm:px-6 sm:py-5"
                >
                  <span className="text-sm font-semibold text-ink sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-brand transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-cream p-8 text-center">
          <p className="text-sm text-muted">Still have a question?</p>
          <Button to="/contact" variant="primary">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
