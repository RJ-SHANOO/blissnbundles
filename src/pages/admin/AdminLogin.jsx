import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useAdminAuth } from "../../context/useAdminAuth";
import Button from "../../components/ui/Button";
import logo from "../../assets/logo/bliss-and-bundles-logo.jpg";

function AdminLogin() {
  const { isAuthed, checking, login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!checking && isAuthed) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const message = await login(email.trim(), password);
    setSubmitting(false);
    if (message) setError(message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm rounded-3xl bg-base p-8 shadow-softLg">
        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src={logo}
            alt="Bliss & Bundles"
            className="h-14 w-14 rounded-full object-cover shadow-soft"
          />
          <h1 className="font-display text-2xl font-semibold text-ink">
            Admin Login
          </h1>
          <p className="text-sm text-muted">
            Sign in to manage products, pricing, and site content.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Email
            </span>
            <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-surface px-4 py-3 focus-within:border-brand">
              <Mail size={15} className="shrink-0 text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@blissandbundles.pk"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              />
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Password
            </span>
            <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-surface px-4 py-3 focus-within:border-brand">
              <Lock size={15} className="shrink-0 text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              />
            </div>
          </label>

          {error && <p className="text-sm text-brand">{error}</p>}

          <Button type="submit" variant="primary" size="lg" disabled={submitting}>
            {submitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
