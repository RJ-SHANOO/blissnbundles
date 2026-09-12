import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Heart, MessageSquareQuote, Package, ShoppingBag, Tags } from "lucide-react";
import { useData } from "../../context/useData";
import { listOrders } from "../../services/ordersService";

function AdminDashboard() {
  const { products, categories, paymentMethods, benefits, testimonials } = useData();
  const [orderCount, setOrderCount] = useState(null);

  useEffect(() => {
    listOrders()
      .then((orders) => setOrderCount(orders.length))
      .catch(() => setOrderCount(null));
  }, []);

  const stats = [
    {
      label: "Orders",
      value: orderCount ?? "—",
      to: "/admin/orders",
      icon: ShoppingBag,
    },
    { label: "Products", value: products.length, to: "/admin/products", icon: Package },
    { label: "Categories", value: categories.length, to: "/admin/categories", icon: Tags },
    {
      label: "Payment Methods Active",
      value: paymentMethods.filter((p) => p.enabled).length,
      to: "/admin/payment-methods",
      icon: CreditCard,
    },
    { label: "Trust Benefits", value: benefits.length, to: "/admin/benefits", icon: Heart },
    {
      label: "Testimonials",
      value: testimonials.length,
      to: "/admin/testimonials",
      icon: MessageSquareQuote,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-muted">
        Manage orders, products, pricing, discounts, payment methods, and
        site content from here.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            className="flex items-center gap-4 rounded-2xl bg-base p-5 shadow-soft transition-shadow hover:shadow-softLg"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <stat.icon size={20} />
            </span>
            <div>
              <p className="text-2xl font-semibold text-ink">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-surfaceAlt p-5 text-sm text-muted">
        Product, category, and content data lives in Supabase and is shared
        across every device. Orders are private — only visible here, signed
        in as an admin.
      </div>
    </div>
  );
}

export default AdminDashboard;
