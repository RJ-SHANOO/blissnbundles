import { NavLink, Outlet } from "react-router-dom";
import {
  CreditCard,
  ExternalLink,
  Heart,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Package,
  ShoppingBag,
  Tags,
} from "lucide-react";
import { useAdminAuth } from "../../context/useAdminAuth";
import logo from "../../assets/logo/bliss-and-bundles-logo.jpg";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/payment-methods", label: "Payment Methods", icon: CreditCard },
  { to: "/admin/benefits", label: "Benefits", icon: Heart },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
];

function AdminLayout() {
  const { logout } = useAdminAuth();

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/10 bg-base p-5 lg:flex">
        <div className="flex items-center gap-3 px-1">
          <img
            src={logo}
            alt="Bliss & Bundles"
            className="h-10 w-10 rounded-full object-cover shadow-soft"
          />
          <div>
            <p className="text-sm font-semibold text-ink">B&amp;B Admin</p>
            <p className="text-xs text-muted">Site Control Panel</p>
          </div>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-brand text-white" : "text-ink/70 hover:bg-surface"
                }`
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-1 border-t border-surfaceAlt pt-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-surface"
          >
            <ExternalLink size={17} />
            View Site
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink/70 hover:bg-surface"
          >
            <LogOut size={17} />
            Log Out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <MobileAdminNav onLogout={logout} />
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function MobileAdminNav({ onLogout }) {
  return (
    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-ink/10 bg-base px-4 py-3 lg:hidden">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              isActive ? "bg-brand text-white" : "bg-surface text-ink/70"
            }`
          }
        >
          <item.icon size={14} />
          {item.label}
        </NavLink>
      ))}
      <button
        type="button"
        onClick={onLogout}
        className="flex shrink-0 items-center gap-2 rounded-full bg-surface px-4 py-2 text-xs font-semibold text-ink/70"
      >
        <LogOut size={14} />
        Log Out
      </button>
    </div>
  );
}

export default AdminLayout;
