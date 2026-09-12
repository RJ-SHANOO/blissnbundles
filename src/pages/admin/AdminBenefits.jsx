import { useState } from "react";
import { Plus } from "lucide-react";
import { useData } from "../../context/useData";
import { BENEFIT_ICONS } from "../../lib/benefitIcons";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import FormField from "../../components/admin/FormField";
import Button from "../../components/ui/Button";

const ICON_NAMES = Object.keys(BENEFIT_ICONS);
const EMPTY_FORM = { icon: "Sparkles", title: "", description: "" };

function AdminBenefits() {
  const { benefits, addBenefit, updateBenefit, deleteBenefit } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const columns = [
    {
      key: "icon",
      label: "Icon",
      render: (row) => {
        const Icon = BENEFIT_ICONS[row.icon] ?? BENEFIT_ICONS.Sparkles;
        return (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <Icon size={16} />
          </span>
        );
      },
    },
    { key: "title", label: "Title" },
    {
      key: "description",
      label: "Description",
      render: (row) => <span className="line-clamp-1 max-w-sm text-muted">{row.description}</span>,
    },
  ];

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({ icon: row.icon, title: row.title, description: row.description });
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete "${row.title}"? This can't be undone.`)) return;
    try {
      await deleteBenefit(row.id);
    } catch (err) {
      window.alert(err.message || "Failed to delete benefit.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setError("");
    setSaving(true);

    const payload = {
      icon: form.icon.trim() || "Sparkles",
      title: form.title.trim(),
      description: form.description.trim(),
    };

    try {
      if (editingId) {
        await updateBenefit(editingId, payload);
      } else {
        await addBenefit(payload);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save benefit.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Trust Benefits
          </h1>
          <p className="mt-1 text-sm text-muted">
            Edit the trust strip shown on the homepage (delivery, quality, etc.).
          </p>
        </div>
        <Button onClick={openAdd} variant="primary" className="flex items-center gap-2">
          <Plus size={16} /> Add Benefit
        </Button>
      </div>

      <div className="mt-6">
        <AdminTable
          columns={columns}
          rows={benefits}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel="No benefits yet."
        />
      </div>

      <AdminModal
        open={modalOpen}
        title={editingId ? "Edit Benefit" : "Add Benefit"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Icon">
            <select value={form.icon} onChange={updateField("icon")} className="input-bb">
              {ICON_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Title">
            <input
              type="text"
              value={form.title}
              onChange={updateField("title")}
              placeholder="Delivery Across Pakistan"
              className="input-bb"
            />
          </FormField>
          <FormField label="Description">
            <textarea
              value={form.description}
              onChange={updateField("description")}
              rows={3}
              placeholder="Nationwide shipping with Cash on Delivery available."
              className="input-bb resize-none"
            />
          </FormField>

          {error && <p className="text-sm text-brand">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="mt-2" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Save Changes" : "Add Benefit"}
          </Button>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminBenefits;
