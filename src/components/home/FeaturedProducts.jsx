import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useData } from "../../context/useData";
import SectionHeading from "../ui/SectionHeading";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const { products } = useData();
  const featured = products.slice(0, 8);

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-bb">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Best Sellers"
            title="Loved, gifted, and ordered again"
            subtitle="The pieces our customers keep coming back for."
            className="items-start text-left"
          />
          <Link
            to="/shop"
            className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
