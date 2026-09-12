import { useData } from "../context/useData";

// Gates the whole app behind the initial Supabase fetch so no screen ever
// renders on top of empty/undefined data. Failure shows a retry instead of
// a stuck spinner — the site should never just hang for a visitor.
function DataGate({ children }) {
  const { loading, error, reload } = useData();

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Couldn't load the site
        </h1>
        <p className="max-w-sm text-muted">{error}</p>
        <button
          type="button"
          onClick={reload}
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03]"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand/20 border-t-brand" />
      </div>
    );
  }

  return children;
}

export default DataGate;
