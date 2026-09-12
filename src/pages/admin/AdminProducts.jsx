import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useData } from "../../context/useData";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import FormField from "../../components/admin/FormField";
import Button from "../../components/ui/Button";

function formatPrice(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;
}

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  compareAtPrice: "",
  image: "",
  hoverImage: "",
  tags: "",
  isBestSeller: false,
  isCustomizable: true,
};

function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateField = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const columns = useMemo(
    () => [
      {
        key: "name",
        label: "Product",
        render: (row) => (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-surfaceAlt">
              <img src={row.image} alt="" className="h-full w-full object-cover" />
            </div>
            <span className="font-medium">{row.name}</span>
          </div>
        ),
      },
      { key: "category", label: "Category" },
      {
        key: "price",
        label: "Price",
        render: (row) => (
          <div>
            <span className="font-semibold">{formatPrice(row.price)}</span>
            {row.compareAtPrice > row.price && (
              <span className="ml-2 text-xs text-muted line-through">
                {formatPrice(row.compareAtPrice)}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "discount",
        label: "Discount",
        render: (row) =>
          row.compareAtPrice > row.price
            ? `${Math.round(
                ((row.compareAtPrice - row.price) / row.compareAtPrice) * 100
              )}% off`
            : "—",
      },
      {
        key: "isBestSeller",
        label: "Best Seller",
        render: (row) => (row.isBestSeller ? "Yes" : "No"),
      },
    ],
    []
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      name: row.name,
      category: row.category,
      price: row.price,
      compareAtPrice: row.compareAtPrice ?? "",
      image: row.image,
      hoverImage: row.hoverImage || "",
      tags: (row.tags || []).join(", "),
      isBestSeller: !!row.isBestSeller,
      isCustomizable: row.isCustomizable !== false,
    });
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete "${row.name}"? This can't be undone.`)) return;
    try {
      await deleteProduct(row.id);
    } catch (err) {
      window.alert(err.message || "Failed to delete product.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category || !form.price) {
      setError("Name, category, and price are required.");
      return;
    }
    setError("");
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
      currency: "PKR",
      image: form.image.trim() || "/assets/products/mug-01.svg",
      hoverImage: form.hoverImage.trim() || form.image.trim() || "/assets/products/mug-01.svg",
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      isBestSeller: form.isBestSeller,
      isCustomizable: form.isCustomizable,
      rating: 4.5,
      reviewCount: 0,
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await addProduct(payload);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted">
            Add products, change prices, and apply discounts.
          </p>
        </div>
        <Button onClick={openAdd} variant="primary" className="flex items-center gap-2">
          <Plus size={16} /> Add Product
        </Button>
      </div>

      <div className="mt-6">
        <AdminTable
          columns={columns}
          rows={products}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel="No products yet."
        />
      </div>

      <AdminModal
        open={modalOpen}
        title={editingId ? "Edit Product" : "Add Product"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Product Name">
            <input
              type="text"
              value={form.name}
              onChange={updateField("name")}
              placeholder="Personalized Photo Mug"
              className="input-bb"
            />
          </FormField>

          <FormField label="Category">
            <select value={form.category} onChange={updateField("category")} className="input-bb">
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Price (PKR)">
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={updateField("price")}
                placeholder="1299"
                className="input-bb"
              />
            </FormField>
            <FormField label="Compare-at Price (Discount)">
              <input
                type="number"
                min="0"
                value={form.compareAtPrice}
                onChange={updateField("compareAtPrice")}
                placeholder="1599"
                className="input-bb"
              />
            </FormField>
          </div>

          <FormField label="Image URL">
            <input
              type="text"
              value={form.image}
              onChange={updateField("image")}
              placeholder="/assets/products/mug-01.svg"
              className="input-bb"
            />
          </FormField>
          <FormField label="Hover Image URL (optional)">
            <input
              type="text"
              value={form.hoverImage}
              onChange={updateField("hoverImage")}
              placeholder="/assets/products/mug-01-alt.svg"
              className="input-bb"
            />
          </FormField>
          <FormField label="Tags (comma-separated)">
            <input
              type="text"
              value={form.tags}
              onChange={updateField("tags")}
              placeholder="photo, text, best-seller"
              className="input-bb"
            />
          </FormField>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={form.isBestSeller}
                onChange={updateField("isBestSeller")}
                className="h-4 w-4 rounded accent-brand"
              />
              Best Seller
            </label>
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={form.isCustomizable}
                onChange={updateField("isCustomizable")}
                className="h-4 w-4 rounded accent-brand"
              />
              Customizable
            </label>
          </div>

          {error && <p className="text-sm text-brand">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="mt-2" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Save Changes" : "Add Product"}
          </Button>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminProducts;
