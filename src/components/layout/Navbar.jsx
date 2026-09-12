import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useStore } from "../../context/useStore";
import { useData } from "../../context/useData";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/logo/bliss-and-bundles-logo.jpg";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop", dropdown: true },
  { label: "Customize", to: "/customize" },
  { label: "About", to: "/about" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { wishlist, cartCount } = useStore();
  const { products, categories } = useData();
  const navigate = useNavigate();
  const searchWrapRef = useRef(null);

  const suggestions =
    query.trim().length > 0
      ? products
          .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
          .slice(0, 5)
      : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const onClickOutside = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [searchOpen]);

  const runSearch = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-base/95 shadow-soft backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container-bb flex h-16 items-center justify-between lg:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Bliss & Bundles emblem"
              className="h-11 w-11 rounded-full object-cover shadow-soft lg:h-12 lg:w-12"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold text-ink sm:text-2xl">
                Bliss &amp; Bundles
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
                Personalized Gifts, Made For You
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <ShopDropdown key={link.to} categories={categories} />
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-brand ${
                      isActive ? "text-brand" : "text-ink/80"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <div ref={searchWrapRef} className="relative hidden items-center sm:flex">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runSearch(query);
                }}
                className={`flex items-center overflow-hidden rounded-full border border-ink/10 bg-surface transition-all duration-300 ${
                  searchOpen ? "w-52 px-3" : "w-11 justify-center"
                }`}
              >
                <button
                  type="button"
                  aria-label="Toggle search"
                  onClick={() => setSearchOpen((v) => !v)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center text-ink/70 hover:text-brand"
                >
                  <Search size={18} />
                </button>
                {searchOpen && (
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search gifts..."
                    className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                  />
                )}
              </form>

              {searchOpen && suggestions.length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-ink/10 bg-base shadow-softLg">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => runSearch(product.name)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink hover:bg-surface"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="h-8 w-8 shrink-0 rounded-lg object-cover"
                      />
                      <span className="truncate">{product.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <IconButton label="Wishlist" to="/wishlist" count={wishlist.length}>
              <Heart size={19} />
            </IconButton>
            <IconButton label="Cart" to="/cart" count={cartCount}>
              <ShoppingBag size={19} />
            </IconButton>
            <IconButton label="Account" to="/account">
              <User size={19} />
            </IconButton>

            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="ml-1 flex h-11 w-11 items-center justify-center rounded-full text-ink/80 hover:bg-surface lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
        categories={categories}
      />
    </>
  );
}

function ShopDropdown({ categories }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-1">
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-brand ${
              isActive ? "text-brand" : "text-ink/80"
            }`
          }
        >
          Shop
        </NavLink>
        <button
          type="button"
          aria-label="Toggle shop categories"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-ink/60 transition-colors hover:text-brand"
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-ink/10 bg-base p-2 shadow-softLg"
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-surface hover:text-brand"
              >
                {cat.name.replace("Customized ", "")}
              </Link>
            ))}
            <div className="my-1 border-t border-surfaceAlt" />
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-surface"
            >
              Shop All →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IconButton({ label, to, count = 0, children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-surface hover:text-brand"
    >
      {children}
      {count > 0 && (
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white animate-pop">
          {count}
        </span>
      )}
    </Link>
  );
}

export default Navbar;
