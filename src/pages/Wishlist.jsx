import { Heart } from "lucide-react";
import { useData } from "../context/useData";
import { useStore } from "../context/useStore";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import ProductCard from "../components/home/ProductCard";

function Wishlist() {
  const { wishlist } = useStore();
  const { products } = useData();
  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb">
        <SectionHeading
          align="left"
          eyebrow="Saved For Later"
          title="Your Wishlist"
          subtitle={
            savedProducts.length > 0
              ? "The pieces you've fallen for — ready whenever you're ready to make them a gift."
              : "Nothing here yet. Tap the heart on any product to save it for later."
          }
          className="items-start text-left"
        />

        {savedProducts.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {savedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-5 rounded-3xl bg-surface py-20 text-center shadow-soft">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surfaceAlt text-brand">
              <Heart size={26} className="fill-transparent" />
            </span>
            <p className="max-w-sm text-muted">
              Your wishlist is empty. Explore the shop and save the gifts that
              catch your eye.
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

export default Wishlist;
