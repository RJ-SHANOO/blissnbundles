import { Pencil, Trash2 } from "lucide-react";

function AdminTable({ columns, rows, onEdit, onDelete, emptyLabel = "Nothing here yet." }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl bg-surface p-10 text-center text-sm text-muted shadow-soft">
        {emptyLabel}
      </div>
    );
  }

  const showActions = Boolean(onEdit || onDelete);

  return (
    <div className="overflow-x-auto rounded-2xl bg-surface shadow-soft">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-surfaceAlt text-xs uppercase tracking-wide text-muted">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold">
                {col.label}
              </th>
            ))}
            {showActions && (
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-surfaceAlt/60 last:border-0 hover:bg-surfaceAlt/40"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-middle text-ink">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {showActions && (
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    {onEdit && (
                      <button
                        type="button"
                        aria-label="Edit"
                        onClick={() => onEdit(row)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-base hover:text-brand"
                      >
                        <Pencil size={15} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        aria-label="Delete"
                        onClick={() => onDelete(row)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-base hover:text-brand"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
