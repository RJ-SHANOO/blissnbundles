import { useState } from "react";
import { Plus } from "lucide-react";
import { useData } from "../../context/useData";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import FormField from "../../components/admin/FormField";
import Button from "../../components/ui/Button";

const EMPTY_FORM = {
  customerName: "",
  location: "",
  occasion: "",
  rating: 5,
  text: "",
  avatar: "",
};

const COLUMNS = [
  { key: "customerName", label: "Customer" },
  { key: "location", label: "City" },
  { key: "occasion", label: "Occasion" },
  { key: "rating", label: "Rating" },
];

function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
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
      customerName: row.customerName,
      location: row.location,
      occasion: row.occasion,
      rating: row.rating,
      text: row.text,
      avatar: row.avatar || "",
    });
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete testimonial from "${row.customerName}"? This can't be undone.`))
      return;
    try {
      await deleteTestimonial(row.id);
    } catch (err) {
      window.alert(err.message || "Failed to delete testimonial.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName.trim() || !form.text.trim()) {
      setError("Customer name and testimonial text are required.");
      return;
    }
    setError("");
    setSaving(true);

    const payload = {
      customerName: form.customerName.trim(),
      location: form.location.trim(),
      occasion: form.occasion.trim(),
      rating: Number(form.rating) || 5,
      text: form.text.trim(),
      avatar: form.avatar.trim() || "/assets/avatars/ayesha.svg",
    };

    try {
      if (editingId) {
        await updateTestimonial(editingId, payload);
      } else {
        await addTestimonial(payload);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Testimonials
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage the customer reviews shown on the homepage.
          </p>
        </div>
        <Button onClick={openAdd} variant="primary" className="flex items-center gap-2">
          <Plus size={16} /> Add Testimonial
        </Button>
      </div>

      <div className="mt-6">
        <AdminTable
          columns={COLUMNS}
          rows={testimonials}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel="No testimonials yet."
        />
      </div>

      <AdminModal
        open={modalOpen}
        title={editingId ? "Edit Testimonial" : "Add Testimonial"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Customer Name">
            <input
              type="text"
              value={form.customerName}
              onChange={updateField("customerName")}
              placeholder="Ayesha K."
              className="input-bb"
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="City">
              <input
                type="text"
                value={form.location}
                onChange={updateField("location")}
                placeholder="Lahore"
                className="input-bb"
              />
            </FormField>
            <FormField label="Occasion">
              <input
                type="text"
                value={form.occasion}
                onChange={updateField("occasion")}
                placeholder="Anniversary Gift"
                className="input-bb"
              />
            </FormField>
          </div>
          <FormField label="Rating">
            <select value={form.rating} onChange={updateField("rating")} className="input-bb">
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Testimonial Text">
            <textarea
              value={form.text}
              onChange={updateField("text")}
              rows={4}
              placeholder="The photo tumbler I ordered looked even better than I imagined..."
              className="input-bb resize-none"
            />
          </FormField>
          <FormField label="Avatar Image URL">
            <input
              type="text"
              value={form.avatar}
              onChange={updateField("avatar")}
              placeholder="/assets/avatars/ayesha.svg"
              className="input-bb"
            />
          </FormField>

          {error && <p className="text-sm text-brand">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="mt-2" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Save Changes" : "Add Testimonial"}
          </Button>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminTestimonials;
