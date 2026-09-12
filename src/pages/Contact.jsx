import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "../components/ui/SocialIcons";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const CONTACT_DETAILS = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+92 300 1234567"],
    href: "tel:+923001234567",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    lines: ["+92 300 1234567"],
    href: "https://wa.me/923001234567",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@blissandbundles.pk"],
    href: "mailto:hello@blissandbundles.pk",
  },
  {
    icon: MapPin,
    title: "Studio",
    lines: ["Lahore, Pakistan"],
    href: null,
  },
];

const EMPTY_FORM = { name: "", email: "", message: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSent(true);
    setForm(EMPTY_FORM);
  };

  return (
    <>
      <section className="bg-cream py-16 md:py-24">
        <div className="container-bb flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Get In Touch
          </span>
          <h1 className="max-w-xl font-display text-4xl font-semibold text-ink sm:text-5xl">
            We'd Love to Hear From You
          </h1>
          <p className="max-w-lg text-base text-muted sm:text-lg">
            Questions about an order, a custom design idea, or just want to
            say hi — reach out and our team will get back to you within a
            day.
          </p>
        </div>
      </section>

      <section className="bg-base py-16 md:py-24">
        <div className="container-bb grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <SectionHeading
              align="left"
              eyebrow="Contact Details"
              title="Reach Us Directly"
              className="items-start text-left"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CONTACT_DETAILS.map((detail) => {
                const Content = (
                  <div className="flex h-full items-start gap-4 rounded-2xl bg-surface p-5 shadow-soft transition-shadow hover:shadow-softLg">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <detail.icon size={19} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">
                        {detail.title}
                      </h3>
                      {detail.lines.map((line) => (
                        <p key={line} className="mt-1 text-sm text-muted">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
                return detail.href ? (
                  <a
                    key={detail.title}
                    href={detail.href}
                    target={detail.href.startsWith("http") ? "_blank" : undefined}
                    rel={detail.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {Content}
                  </a>
                ) : (
                  <div key={detail.title}>{Content}</div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-surfaceAlt p-5">
              <Clock size={18} className="shrink-0 text-brand" />
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">Business Hours:</span>{" "}
                Mon–Sat, 10am–7pm PKT
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="rounded-3xl bg-surface p-8 shadow-soft"
          >
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint/20 text-mint-dark">
                  <CheckCircle2 size={28} />
                </span>
                <h3 className="text-xl font-semibold text-ink">
                  Message Sent!
                </h3>
                <p className="max-w-xs text-sm text-muted">
                  Thanks for reaching out — we'll get back to you within a
                  day.
                </p>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-ink">Send a Message</h2>

                <Field label="Full Name">
                  <input
                    type="text"
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Ayesha Khan"
                    className="input-bb"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={updateField("email")}
                    placeholder="you@example.com"
                    className="input-bb"
                  />
                </Field>
                <Field label="Message">
                  <textarea
                    value={form.message}
                    onChange={updateField("message")}
                    placeholder="Tell us what you have in mind..."
                    rows={5}
                    className="input-bb resize-none"
                  />
                </Field>

                {error && <p className="text-sm text-brand">{error}</p>}

                <Button type="submit" variant="primary" size="lg" className="mt-2">
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

export default Contact;
