import Button from "../components/ui/Button";

// Scaffold-only route target — Shop, Product Detail, Cart, Account, and Customize
// Studio pages are built in a later phase per CLAUDE.md Section 11.
function ComingSoon({ label = "This page" }) {
  return (
    <section className="container-bb flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Coming Soon
      </span>
      <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
        {label} is on its way
      </h1>
      <p className="max-w-md text-muted">
        We're still crafting this part of the B&amp;B experience. In the
        meantime, explore the homepage or start customizing your gift.
      </p>
      <div className="mt-4 flex gap-4">
        <Button to="/" variant="outline">
          Back to Home
        </Button>
        <Button to="/customize" variant="primary">
          Customize Your Gift
        </Button>
      </div>
    </section>
  );
}

export default ComingSoon;
