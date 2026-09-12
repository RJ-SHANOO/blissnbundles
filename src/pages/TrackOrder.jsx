import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Package, Search, Truck } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { trackOrder } from "../services/ordersService";

const STAGES = [
  { key: "placed", label: "Order Placed", icon: Check },
  { key: "processing", label: "Being Crafted", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Check },
];

const STATUS_TO_STAGE = { placed: 0, processing: 1, shipped: 2, delivered: 3 };

function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const key = orderNumber.trim().toUpperCase();
    if (!key) return;

    setLoading(true);
    setError("");
    try {
      const row = await trackOrder(key);
      setResult(
        row
          ? { number: row.order_number, city: row.city, stage: STATUS_TO_STAGE[row.status] ?? 0 }
          : null
      );
      setSearched(true);
    } catch (err) {
      setError(err.message || "Couldn't look up that order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb max-w-2xl">
        <SectionHeading
          align="left"
          eyebrow="Track Your Order"
          title="Where's My Gift?"
          subtitle="Enter your order number — it was sent to you when you placed your order."
          className="items-start text-left"
        />

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="e.g. BB-482913"
            className="input-bb flex-1"
          />
          <Button
            type="submit"
            variant="primary"
            className="flex items-center justify-center gap-2"
            disabled={loading}
          >
            <Search size={16} />
            {loading ? "Searching..." : "Track Order"}
          </Button>
        </form>

        {error && <p className="mt-3 text-sm text-brand">{error}</p>}

        {searched && !error && (
          <div className="mt-10">
            {result ? (
              <div className="rounded-3xl bg-surface p-8 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted">
                      Order Number
                    </p>
                    <p className="font-display text-xl font-semibold text-brand">
                      {result.number}
                    </p>
                  </div>
                  <p className="text-sm text-muted">
                    Delivering to <span className="text-ink">{result.city}</span>
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  {STAGES.map((stage, i) => {
                    const done = i <= result.stage;
                    return (
                      <div
                        key={stage.key}
                        className="flex flex-1 flex-col items-center gap-2 text-center"
                      >
                        <div className="flex w-full items-center">
                          <div
                            className={`h-0.5 flex-1 ${
                              i === 0 ? "opacity-0" : done ? "bg-brand" : "bg-surfaceAlt"
                            }`}
                          />
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                              done ? "bg-brand text-white" : "bg-surfaceAlt text-muted"
                            }`}
                          >
                            <stage.icon size={16} />
                          </span>
                          <div
                            className={`h-0.5 flex-1 ${
                              i === STAGES.length - 1
                                ? "opacity-0"
                                : i < result.stage
                                ? "bg-brand"
                                : "bg-surfaceAlt"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            done ? "text-ink" : "text-muted"
                          }`}
                        >
                          {stage.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-surface p-8 text-center shadow-soft">
                <p className="text-muted">
                  We couldn't find an order with that number. Double-check it
                  and try again, or{" "}
                  <Link to="/contact" className="font-semibold text-brand hover:underline">
                    contact us
                  </Link>{" "}
                  for help.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default TrackOrder;
