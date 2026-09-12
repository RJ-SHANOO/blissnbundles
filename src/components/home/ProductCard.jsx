import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Palette, ShoppingBag } from "lucide-react";
import Badge from "../ui/Badge";
import RatingStars from "../ui/RatingStars";
import { useStore } from "../../context/useStore";

function formatPrice(value) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);
  const isNew = product.tags?.includes("new");

  const handleAddToCart = () => {
    addToCart(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface shadow-soft transition-shadow duration-300 hover:shadow-softLg"
    >
      <div className="relative aspect-square overflow-hidden bg-surfaceAlt">
        <img
          src={hovered ? product.hoverImage : product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isBestSeller && <Badge tone="brand">Best Seller</Badge>}
          {isNew && <Badge tone="new">New</Badge>}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          <button
            aria-label="Toggle wishlist"
            onClick={() => toggleWishlist(product.id)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-void/80 text-base shadow-soft backdrop-blur-sm transition-colors hover:text-brand-light"
          >
            <Heart
              size={16}
              className={
                isWishlisted
                  ? "fill-brand text-brand animate-pop"
                  : "fill-transparent"
              }
            />
          </button>
          <button
            aria-label="Add to cart"
            onClick={handleAddToCart}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-void/80 text-base shadow-soft backdrop-blur-sm transition-colors hover:text-brand-light"
          >
            <ShoppingBag
              size={16}
              className={justAdded ? "text-brand animate-pop" : ""}
            />
          </button>
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            to={`/customize?product=${product.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-void/90 py-2.5 text-xs font-semibold text-base backdrop-blur-sm transition-colors hover:bg-brand hover:text-base"
          >
            <Palette size={14} /> Customize Now
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-base font-semibold text-ink">{product.name}</h3>
        <RatingStars rating={product.rating} className="mt-0.5" />
        <div className="mt-1 flex items-center gap-2">
          <span className="text-base font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
