import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useData } from "../context/useData";
import { useStore } from "../context/useStore";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

function formatPrice(value) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function Cart() {
  const { cart, updateCartQty, removeFromCart } = useStore();
  const { products } = useData();

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

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb">
        <SectionHeading
          align="left"
          eyebrow="Your Order"
          title="Your Cart"
          subtitle={
            lineItems.length > 0
              ? "Review your picks before we start crafting them just for you."
              : "Your cart is empty. Let's find something worth personalizing."
          }
          className="items-start text-left"
        />

        {lineItems.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <ul className="flex flex-col gap-4 lg:col-span-2">
              {lineItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-2xl bg-surface p-4 shadow-soft sm:gap-5 sm:p-5"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surfaceAlt sm:h-28 sm:w-28">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-ink sm:text-lg">
                          {item.product.name}
                        </h3>
                        <p className="mt-0.5 text-sm text-muted">
                          {formatPrice(item.product.price)} each
                        </p>
                      </div>
                      <button
                        aria-label="Remove from cart"
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surfaceAlt hover:text-brand"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full bg-surfaceAlt px-1.5 py-1.5">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateCartQty(item.id, item.qty - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-base hover:text-brand"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-4 text-center text-sm font-semibold text-ink">
                          {item.qty}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateCartQty(item.id, item.qty + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-base hover:text-brand"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-base font-semibold text-ink">
                        {formatPrice(item.product.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="h-fit rounded-2xl bg-surface p-6 shadow-soft lg:sticky lg:top-24">
              <h3 className="text-lg font-semibold text-ink">Order Summary</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="text-ink">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Delivery</span>
                  <span className="text-ink">Calculated at checkout</span>
                </div>
              </div>
              <div className="mt-5 flex justify-between border-t border-surfaceAlt pt-5 text-base font-semibold text-ink">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Button to="/checkout" variant="primary" className="mt-6 w-full">
                Proceed to Checkout
              </Button>
              <p className="mt-4 text-center text-xs text-muted">
                Cash on delivery available nationwide across Pakistan.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-5 rounded-3xl bg-surface py-20 text-center shadow-soft">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surfaceAlt text-brand">
              <ShoppingBag size={26} />
            </span>
            <p className="max-w-sm text-muted">
              You haven't added anything yet. Browse our customizable gifts
              and start building your order.
            </p>
            <Button to="/shop" variant="primary">
              Explore the Shop
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
