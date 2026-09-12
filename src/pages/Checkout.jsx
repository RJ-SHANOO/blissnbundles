import { useState } from "react";
import { Banknote, CheckCircle2, ShoppingBag } from "lucide-react";
import { useData } from "../context/useData";
import { useStore } from "../context/useStore";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { PAYMENT_ICONS } from "../lib/paymentIcons";
import { createOrder } from "../services/ordersService";

const DELIVERY_FEE = 250;
const EMPTY_FORM = { name: "", phone: "", address: "", city: "", notes: "" };

function formatPrice(value) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function generateOrderNumber() {
  return `BB-${Math.floor(100000 + Math.random() * 900000)}`;
}

function Checkout() {
  const { cart, clearCart } = useStore();
  const { products, paymentMethods } = useData();
  const enabledPaymentMethods = paymentMethods.filter((pm) => pm.enabled);
  const [form, setForm] = useState(EMPTY_FORM);
  const [paymentMethodId, setPaymentMethodId] = useState(enabledPaymentMethods[0]?.id ?? "");
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedMethod =
    enabledPaymentMethods.find((pm) => pm.id === paymentMethodId) ?? enabledPaymentMethods[0];

  const lineItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );
  const total = lineItems.length > 0 ? subtotal + DELIVERY_FEE : 0;

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      setError("Please fill in your name, phone, address, and city.");
      return;
    }
    if (!selectedMethod) {
      setError("Please select a payment method.");
      return;
    }
    setError("");
    setSubmitting(true);

    const orderNumber = generateOrderNumber();
    try {
      await createOrder({
        orderNumber,
        customerName: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        notes: form.notes.trim(),
        paymentMethod: selectedMethod.name,
        items: lineItems.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          qty: item.qty,
        })),
        subtotal,
        deliveryFee: DELIVERY_FEE,
        total,
      });
      setOrder({
        number: orderNumber,
        total,
        name: form.name.trim(),
        paymentMethod: selectedMethod.name,
      });
      clearCart();
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.message || "Couldn't place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (order) {
    return (
      <section className="bg-base py-16 md:py-24">
        <div className="container-bb max-w-lg">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-surface p-10 text-center shadow-soft">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint/20 text-mint-dark">
              <CheckCircle2 size={30} />
            </span>
            <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Thank You, {order.name.split(" ")[0]}!
            </h1>
            <p className="max-w-sm text-muted">
              Your order has been placed and we're already getting it ready
              to craft. {formatPrice(order.total)} via {order.paymentMethod}.
            </p>
            <div className="rounded-2xl bg-base px-6 py-3 shadow-soft">
              <p className="text-xs uppercase tracking-wide text-muted">
                Order Number
              </p>
              <p className="font-display text-xl font-semibold text-brand">
                {order.number}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Button to="/track-order" variant="outline">
                Track Your Order
              </Button>
              <Button to="/" variant="primary">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (lineItems.length === 0) {
    return (
      <section className="bg-base py-16 md:py-24">
        <div className="container-bb">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-surface py-20 text-center shadow-soft">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surfaceAlt text-brand">
              <ShoppingBag size={26} />
            </span>
            <p className="max-w-sm text-muted">
              Your cart is empty, so there's nothing to check out yet.
            </p>
            <Button to="/shop" variant="primary">
              Explore the Shop
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb">
        <SectionHeading
          align="left"
          eyebrow="Almost There"
          title="Checkout"
          subtitle="Enter your delivery details — pay by Cash on Delivery when your gift arrives."
          className="items-start text-left"
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:col-span-2">
            <h2 className="text-lg font-semibold text-ink">Delivery Details</h2>

            <Field label="Full Name">
              <input
                type="text"
                value={form.name}
                onChange={updateField("name")}
                placeholder="Ayesha Khan"
                className="input-bb"
              />
            </Field>
            <Field label="Phone Number">
              <input
                type="tel"
                value={form.phone}
                onChange={updateField("phone")}
                placeholder="+92 300 1234567"
                className="input-bb"
              />
            </Field>
            <Field label="Delivery Address">
              <input
                type="text"
                value={form.address}
                onChange={updateField("address")}
                placeholder="House #, Street, Area"
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
            <Field label="Order Notes (optional)">
              <textarea
                value={form.notes}
                onChange={updateField("notes")}
                placeholder="Anything we should know about your order?"
                rows={3}
                className="input-bb resize-none"
              />
            </Field>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                Payment Method
              </span>
              <div className="mt-2 flex flex-col gap-2">
                {enabledPaymentMethods.map((pm) => {
                  const Icon = PAYMENT_ICONS[pm.icon] ?? Banknote;
                  const active = pm.id === selectedMethod?.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethodId(pm.id)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                        active
                          ? "border-brand bg-brand/5"
                          : "border-ink/10 bg-surfaceAlt hover:border-brand/40"
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-base text-brand">
                        <Icon size={16} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-ink">
                          {pm.name}
                        </span>
                        <span className="block text-xs text-muted">
                          {pm.instructions}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && <p className="text-sm text-brand">{error}</p>}

            <Button type="submit" variant="primary" size="lg" className="mt-2" disabled={submitting}>
              {submitting ? "Placing Order..." : `Place Order — ${formatPrice(total)}`}
            </Button>
          </form>

          <div className="h-fit rounded-2xl bg-surface p-6 shadow-soft lg:sticky lg:top-24">
            <h3 className="text-lg font-semibold text-ink">Order Summary</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {lineItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surfaceAlt">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="truncate text-sm font-medium text-ink">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted">Qty {item.qty}</p>
                  </div>
                  <span className="text-sm font-semibold text-ink">
                    {formatPrice(item.product.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3 border-t border-surfaceAlt pt-5 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Delivery</span>
                <span className="text-ink">{formatPrice(DELIVERY_FEE)}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t border-surfaceAlt pt-4 text-base font-semibold text-ink">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
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

export default Checkout;
