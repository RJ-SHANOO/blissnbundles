import { useState } from "react";
import { Plus } from "lucide-react";
import { useData } from "../../context/useData";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import FormField from "../../components/admin/FormField";
import Button from "../../components/ui/Button";

const EMPTY_FORM = { name: "", slug: "", image: "", tagline: "", productCount: "" };

const COLUMNS = [
  { key: "name", label: "Category" },
  { key: "slug", label: "Slug" },
  { key: "tagline", label: "Tagline" },
  { key: "productCount", label: "Item Count" },
];

function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

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
      slug: row.slug,
      image: row.image,
      tagline: row.tagline || "",
      productCount: row.productCount ?? "",
    });
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete "${row.name}"? This can't be undone.`)) return;
    try {
      await deleteCategory(row.id);
    } catch (err) {
      window.alert(err.message || "Failed to delete category.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) {
      setError("Name and slug are required.");
      return;
    }
    setError("");
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim().toLowerCase(),
      image: form.image.trim() || "/assets/categories/mugs.svg",
      tagline: form.tagline.trim(),
      productCount: form.productCount ? Number(form.productCount) : 0,
    };

    try {
      if (editingId) {
        await updateCategory(editingId, payload);
      } else {
        await addCategory(payload);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save category.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Categories
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage the product categories shown across the site.
          </p>
        </div>
        <Button onClick={openAdd} variant="primary" className="flex items-center gap-2">
          <Plus size={16} /> Add Category
        </Button>
      </div>

      <div className="mt-6">
        <AdminTable
          columns={COLUMNS}
          rows={categories}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel="No categories yet."
        />
      </div>

      <AdminModal
        open={modalOpen}
        title={editingId ? "Edit Category" : "Add Category"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Category Name">
            <input
              type="text"
              value={form.name}
              onChange={updateField("name")}
              placeholder="Customized Mugs"
              className="input-bb"
            />
          </FormField>
          <FormField label="Slug (used in URLs)">
            <input
              type="text"
              value={form.slug}
              onChange={updateField("slug")}
              placeholder="mugs"
              className="input-bb"
            />
          </FormField>
          <FormField label="Image URL">
            <input
              type="text"
              value={form.image}
              onChange={updateField("image")}
              placeholder="/assets/categories/mugs.svg"
              className="input-bb"
            />
          </FormField>
          <FormField label="Tagline">
            <input
              type="text"
              value={form.tagline}
              onChange={updateField("tagline")}
              placeholder="Photo mugs & quote mugs made just for them."
              className="input-bb"
            />
          </FormField>
          <FormField label="Item Count (shown as '24+ designs')">
            <input
              type="number"
              min="0"
              value={form.productCount}
              onChange={updateField("productCount")}
              placeholder="24"
              className="input-bb"
            />
          </FormField>

          {error && <p className="text-sm text-brand">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="mt-2" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Save Changes" : "Add Category"}
          </Button>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminCategories;
