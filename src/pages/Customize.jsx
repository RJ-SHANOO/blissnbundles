import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Check,
  Image as ImageIcon,
  Minus,
  Plus,
  ShoppingBag,
  Type,
  X,
} from "lucide-react";
import { useData } from "../context/useData";
import { useStore } from "../context/useStore";
import SectionHeading from "../components/ui/SectionHeading";

const COLORWAYS = [
  { id: "blush", label: "Blush", hex: "#CE9A7C" },
  { id: "gold", label: "Gold", hex: "#D8A868" },
  { id: "ivory", label: "Ivory", hex: "#F4F1EC" },
  { id: "charcoal", label: "Charcoal", hex: "#0A0B0D" },
  { id: "mint", label: "Mint", hex: "#6FD1AC" },
];

function formatPrice(value) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

function Customize() {
  const { products, categories } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useStore();
  const fileInputRef = useRef(null);

  const requestedId = searchParams.get("product");
  const requestedCategory = searchParams.get("category");

  const initialProduct =
    products.find((p) => p.id === requestedId) ||
    products.find((p) => p.category === requestedCategory) ||
    products[0];

  const [activeCategory, setActiveCategory] = useState(
    initialProduct.category
  );
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [customText, setCustomText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [color, setColor] = useState(COLORWAYS[0]);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === activeCategory),
    [products, activeCategory]
  );

  const handleSelectCategory = (slug) => {
    setActiveCategory(slug);
    const firstInCategory = products.find((p) => p.category === slug);
    if (firstInCategory) {
      setSelectedProduct(firstInCategory);
      setSearchParams({ product: firstInCategory.id });
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSearchParams({ product: product.id });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct.id, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb">
        <SectionHeading
          align="left"
          eyebrow="Customize Studio"
          title="Make It Yours"
          subtitle="Pick a product, add your text and photo, choose a colorway — see it come together before you order."
          className="items-start text-left"
        />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Controls */}
          <div className="flex flex-col gap-8 lg:col-span-3">
            {/* Step 1: choose product */}
            <div>
              <StepLabel number="01" title="Choose Your Product" />
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      activeCategory === cat.slug
                        ? "bg-brand text-white"
                        : "bg-surface text-muted hover:text-ink"
                    }`}
                  >
                    {cat.name.replace("Customized ", "")}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {categoryProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className={`overflow-hidden rounded-2xl bg-surface shadow-soft transition-all ${
                      selectedProduct.id === product.id
                        ? "ring-2 ring-brand"
                        : "hover:shadow-softLg"
                    }`}
                  >
                    <div className="aspect-square bg-surfaceAlt">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="truncate p-2 text-left text-xs font-medium text-ink">
                      {product.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: personalize */}
            <div>
              <StepLabel number="02" title="Personalize It" />

              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Add Your Text
                  </label>
                  <div className="mt-1.5 flex items-center gap-2 rounded-2xl border border-ink/10 bg-surface px-3 py-2.5 focus-within:border-brand">
                    <Type size={15} className="shrink-0 text-muted" />
                    <input
                      type="text"
                      maxLength={40}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder='e.g. "To the best mom ever..."'
                      className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Upload Your Photo
                  </label>
                  {photo ? (
                    <div className="mt-1.5 flex items-center gap-3 rounded-2xl border border-ink/10 bg-surface px-3 py-2.5">
                      <img
                        src={photo}
                        alt="Uploaded preview"
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <span className="flex-1 text-sm text-ink/70">
                        Photo added
                      </span>
                      <button
                        aria-label="Remove photo"
                        onClick={() => setPhoto(null)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-surfaceAlt hover:text-brand"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-1.5 flex w-full items-center gap-2 rounded-2xl border-2 border-dashed border-ink/15 px-3 py-2.5 text-muted transition-colors hover:border-brand hover:text-brand"
                    >
                      <ImageIcon size={15} />
                      <span className="text-sm">Drop image or browse</span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Choose Color
                  </label>
                  <div className="mt-2 flex items-center gap-2.5">
                    {COLORWAYS.map((c) => (
                      <button
                        key={c.id}
                        aria-label={`Select ${c.label}`}
                        onClick={() => setColor(c)}
                        style={{ backgroundColor: c.hex }}
                        className={`h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-base transition-transform hover:scale-110 ${
                          color.id === c.id ? "ring-brand" : "ring-transparent"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-muted">
                      {color.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: order */}
            <div>
              <StepLabel number="03" title="We Craft & Deliver" />
              <p className="mt-2 text-sm text-muted">
                Premium printing, quality-checked, delivered to your door
                across Pakistan — COD available.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 rounded-full bg-surface px-1.5 py-1.5">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-surfaceAlt hover:text-brand"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="min-w-4 text-center text-sm font-semibold text-ink">
                    {qty}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-surfaceAlt hover:text-brand"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold tracking-wide shadow-soft transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
                    justAdded
                      ? "bg-mint text-void"
                      : "bg-brand text-white hover:bg-brand-light hover:shadow-softLg"
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check size={16} /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Add to Cart —{" "}
                      {formatPrice(selectedProduct.price * qty)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Live preview */}
          <div className="lg:col-span-2">
            <div className="relative mx-auto max-w-md rounded-[2rem] bg-surface p-6 shadow-softLg sm:p-8 lg:sticky lg:top-24">
              <div
                className="overflow-hidden rounded-2xl p-6 shadow-soft transition-colors duration-300"
                style={{ backgroundColor: color.hex }}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-surfaceAlt">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />

                  {photo && (
                    <img
                      src={photo}
                      alt="Your uploaded photo overlay"
                      className="absolute bottom-3 left-3 h-14 w-14 rounded-full border-2 border-cream object-cover shadow-soft"
                    />
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-void/70 px-3 py-2.5 backdrop-blur-sm">
                    <p className="truncate text-center font-display text-sm italic text-white/90">
                      {customText || "Your custom text will appear here"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {selectedProduct.name}
                  </p>
                  <p className="text-xs text-muted">
                    {formatPrice(selectedProduct.price)} each
                  </p>
                </div>
                <span className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-void shadow-gold">
                  Live Preview
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepLabel({ number, title }) {
  return (
    <div className="flex items-center gap-2 border-b border-surfaceAlt pb-3">
      <span className="text-xs font-semibold text-gold">{number}</span>
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
    </div>
  );
}

export default Customize;
