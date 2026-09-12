import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useData } from "../context/useData";
import SectionHeading from "../components/ui/SectionHeading";
import ProductCard from "../components/home/ProductCard";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

function sortProducts(list, sortBy) {
  const sorted = [...list];
  if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}

function Shop() {
  const { products, categories } = useData();
  const { category: activeSlug } = useParams();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("featured");

  const activeCategory = categories.find((c) => c.slug === activeSlug);
  const searchTerm = searchParams.get("search")?.trim() ?? "";
  const filter = searchParams.get("filter");

  const visibleProducts = useMemo(() => {
    let base = activeSlug
      ? products.filter((p) => p.category === activeSlug)
      : products;
    if (searchTerm) {
      base = base.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filter === "best-sellers") {
      base = base.filter((p) => p.isBestSeller);
    }
    return sortProducts(base, sortBy);
  }, [products, activeSlug, sortBy, searchTerm, filter]);

  const title = searchTerm
    ? `Results for "${searchTerm}"`
    : activeCategory
      ? activeCategory.name
      : filter === "best-sellers"
        ? "Best Sellers"
        : "All Products";

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb">
        <SectionHeading
          align="left"
          eyebrow="Shop"
          title={title}
          subtitle={
            activeCategory
              ? activeCategory.tagline
              : "Personalized mugs, tumblers, wallets, and bottles — made uniquely for you."
          }
          className="items-start text-left"
        />

        <div className="mt-8 flex flex-col gap-4 border-b border-surfaceAlt pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Link
              to="/shop"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                !activeSlug
                  ? "bg-brand text-white"
                  : "bg-surface text-muted hover:text-ink"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop/${cat.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeSlug === cat.slug
                    ? "bg-brand text-white"
                    : "bg-surface text-muted hover:text-ink"
                }`}
              >
                {cat.name.replace("Customized ", "")}
              </Link>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm text-muted">
            Sort by
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-surfaceAlt bg-surface px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {visibleProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-muted">
            {searchTerm
              ? `No products matched "${searchTerm}".`
              : "No products found in this category yet."}
          </p>
        )}
      </div>
    </section>
  );
}

export default Shop;
