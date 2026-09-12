import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Heart, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "../../context/useStore";
import logo from "../../assets/logo/bliss-and-bundles-logo.jpg";

function MobileMenu({ open, onClose, links, categories }) {
  const { wishlist, cartCount } = useStore();
  const [shopExpanded, setShopExpanded] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-void/60 lg:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 z-[70] flex h-full w-[82%] max-w-sm flex-col bg-surface shadow-softLg lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <span className="flex items-center gap-2.5">
                <img
                  src={logo}
                  alt="Bliss & Bundles emblem"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="font-display text-lg font-semibold text-ink">
                  Bliss &amp; Bundles
                </span>
              </span>
              <button
                aria-label="Close menu"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surfaceAlt"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
              {links.map((link) =>
                link.dropdown ? (
                  <div key={link.to} className="border-b border-ink/5">
                    <button
                      type="button"
                      aria-expanded={shopExpanded}
                      onClick={() => setShopExpanded((v) => !v)}
                      className="flex min-h-[44px] w-full items-center justify-between py-3 text-left text-base font-medium text-ink/85 transition-colors hover:text-brand"
                    >
                      {link.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          shopExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {shopExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-3 pl-3">
                            {categories.map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/shop/${cat.slug}`}
                                onClick={onClose}
                                className="min-h-[44px] py-2 text-sm text-ink/70 transition-colors hover:text-brand"
                              >
                                {cat.name.replace("Customized ", "")}
                              </Link>
                            ))}
                            <Link
                              to="/shop"
                              onClick={onClose}
                              className="min-h-[44px] py-2 text-sm font-semibold text-brand"
                            >
                              Shop All →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `min-h-[44px] border-b border-ink/5 py-3 text-base font-medium transition-colors ${
                        isActive ? "text-brand" : "text-ink/85 hover:text-brand"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="flex items-center justify-around border-t border-ink/10 px-6 py-5">
              <MobileIcon to="/shop" icon={<Search size={20} />} label="Search" onClick={onClose} />
              <MobileIcon
                to="/wishlist"
                icon={<Heart size={20} />}
                label="Wishlist"
                count={wishlist.length}
                onClick={onClose}
              />
              <MobileIcon
                to="/cart"
                icon={<ShoppingBag size={20} />}
                label="Cart"
                count={cartCount}
                onClick={onClose}
              />
              <MobileIcon to="/account" icon={<User size={20} />} label="Account" onClick={onClose} />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileIcon({ to, icon, label, count = 0, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label={label}
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink/70 hover:bg-surfaceAlt hover:text-brand"
    >
      {icon}
      {count > 0 && (
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

export default MobileMenu;
