import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link
        to={`/shop/${category.slug}`}
        className="group relative block overflow-hidden rounded-2xl bg-surface shadow-soft transition-shadow duration-300 hover:shadow-softLg"
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-void/80 via-void/20 to-transparent p-5">
          <h3 className="text-lg font-semibold text-white">{category.name}</h3>
          <p className="mt-1 text-xs text-white/80">{category.tagline}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-white/70">
              {category.productCount}+ designs
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Shop {category.name.split(" ").pop()} <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default CategoryCard;
