import { useState } from "react";
import { LogOut, Mail, MapPin, Phone, User } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const ACCOUNT_KEY = "bb_account";

function readAccount() {
  try {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const EMPTY_FORM = { name: "", email: "", phone: "", city: "" };

function Account() {
  const [account, setAccount] = useState(readAccount);
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    const profile = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
    };
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(profile));
    setAccount(profile);
  };

  const handleSignOut = () => {
    localStorage.removeItem(ACCOUNT_KEY);
    setAccount(null);
    setForm(EMPTY_FORM);
    setMode("signin");
  };

  if (account) {
    return (
      <section className="bg-base py-16 md:py-24">
        <div className="container-bb max-w-2xl">
          <SectionHeading
            align="left"
            eyebrow="Your Account"
            title={`Welcome back, ${account.name.split(" ")[0]}`}
            subtitle="Manage your details below — they're saved on this device."
            className="items-start text-left"
          />

          <div className="mt-10 rounded-3xl bg-surface p-8 shadow-soft">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                <User size={24} />
              </span>
              <div>
                <p className="text-lg font-semibold text-ink">{account.name}</p>
                <p className="text-sm text-muted">{account.email}</p>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl bg-base p-4">
                <Mail size={16} className="shrink-0 text-brand" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    Email
                  </dt>
                  <dd className="text-sm text-ink">{account.email}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-base p-4">
                <Phone size={16} className="shrink-0 text-brand" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    Phone
                  </dt>
                  <dd className="text-sm text-ink">
                    {account.phone || "Not added"}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-base p-4 sm:col-span-2">
                <MapPin size={16} className="shrink-0 text-brand" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    City
                  </dt>
                  <dd className="text-sm text-ink">
                    {account.city || "Not added"}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/wishlist" variant="outline">
                View Wishlist
              </Button>
              <Button to="/cart" variant="outline">
                View Cart
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="ml-auto flex items-center gap-2"
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb max-w-md">
        <SectionHeading
          align="left"
          eyebrow="Your Account"
          title={mode === "signin" ? "Sign In" : "Create Your Account"}
          subtitle={
            mode === "signin"
              ? "Enter your details to access your saved wishlist and orders."
              : "Save your details so checkout is faster next time."
          }
          className="items-start text-left"
        />

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
          <Field label="Full Name">
            <input
              type="text"
              value={form.name}
              onChange={updateField("name")}
              placeholder="Your Name"
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
          {mode === "signup" && (
            <>
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={updateField("phone")}
                  placeholder="+92 300 1234567"
                  className="input-bb"
                />
              </Field>
              <Field label="City">
                <input
                  type="text"
                  value={form.city}
                  onChange={updateField("city")}
                  placeholder="Lahore"
                  className="input-bb"
                />
              </Field>
            </>
          )}

          {error && <p className="text-sm text-brand">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="mt-2">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {mode === "signin" ? "New to B&B?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode((m) => (m === "signin" ? "signup" : "signin"));
              setError("");
            }}
            className="font-semibold text-brand hover:underline"
          >
            {mode === "signin" ? "Create an account" : "Sign in instead"}
          </button>
        </p>
      </div>
    </section>
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

export default Account;
