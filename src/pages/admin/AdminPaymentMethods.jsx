import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useData } from "../../context/useData";
import { PAYMENT_ICONS } from "../../lib/paymentIcons";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import FormField from "../../components/admin/FormField";
import Button from "../../components/ui/Button";

const ICON_NAMES = Object.keys(PAYMENT_ICONS);
const EMPTY_FORM = { name: "", icon: "Banknote", enabled: true, instructions: "" };

function AdminPaymentMethods() {
  const { paymentMethods, addPaymentMethod, updatePaymentMethod, deletePaymentMethod } =
    useData();
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
      { key: "name", label: "Method" },
      {
        key: "icon",
        label: "Icon",
        render: (row) => {
          const Icon = PAYMENT_ICONS[row.icon] ?? PAYMENT_ICONS.Banknote;
          return (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Icon size={16} />
            </span>
          );
        },
      },
      {
        key: "instructions",
        label: "Instructions",
        render: (row) => (
          <span className="line-clamp-1 max-w-xs text-muted">{row.instructions}</span>
        ),
      },
      {
        key: "enabled",
        label: "Status",
        render: (row) => (
          <button
            type="button"
            onClick={async () => {
              try {
                await updatePaymentMethod(row.id, { ...row, enabled: !row.enabled });
              } catch (err) {
                window.alert(err.message || "Failed to update payment method.");
              }
            }}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              row.enabled ? "bg-mint/20 text-mint-dark" : "bg-surfaceAlt text-muted"
            }`}
          >
            {row.enabled ? "Enabled" : "Disabled"}
          </button>
        ),
      },
    ],
    [updatePaymentMethod]
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
      icon: row.icon || "Banknote",
      enabled: row.enabled,
      instructions: row.instructions || "",
    });
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete "${row.name}"? This can't be undone.`)) return;
    try {
      await deletePaymentMethod(row.id);
    } catch (err) {
      window.alert(err.message || "Failed to delete payment method.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Payment method name is required.");
      return;
    }
    setError("");
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      icon: form.icon.trim() || "Banknote",
      enabled: form.enabled,
      instructions: form.instructions.trim(),
    };

    try {
      if (editingId) {
        await updatePaymentMethod(editingId, payload);
      } else {
        await addPaymentMethod(payload);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save payment method.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Payment Methods
          </h1>
          <p className="mt-1 text-sm text-muted">
            Add, edit, or toggle the payment options shown at checkout.
          </p>
        </div>
        <Button onClick={openAdd} variant="primary" className="flex items-center gap-2">
          <Plus size={16} /> Add Payment Method
        </Button>
      </div>

      <div className="mt-6">
        <AdminTable
          columns={columns}
          rows={paymentMethods}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyLabel="No payment methods yet."
        />
      </div>

      <AdminModal
        open={modalOpen}
        title={editingId ? "Edit Payment Method" : "Add Payment Method"}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Name">
            <input
              type="text"
              value={form.name}
              onChange={updateField("name")}
              placeholder="JazzCash"
              className="input-bb"
            />
          </FormField>
          <FormField label="Icon">
            <select value={form.icon} onChange={updateField("icon")} className="input-bb">
              {ICON_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Instructions (shown to customer at checkout)">
            <textarea
              value={form.instructions}
              onChange={updateField("instructions")}
              rows={3}
              placeholder="Send payment to 0300-1234567 and share the transaction ID."
              className="input-bb resize-none"
            />
          </FormField>

          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={updateField("enabled")}
              className="h-4 w-4 rounded accent-brand"
            />
            Enabled (visible at checkout)
          </label>

          {error && <p className="text-sm text-brand">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="mt-2" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Save Changes" : "Add Payment Method"}
          </Button>
        </form>
      </AdminModal>
    </div>
  );
}

export default AdminPaymentMethods;
