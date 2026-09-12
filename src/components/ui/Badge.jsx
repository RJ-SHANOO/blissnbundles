const TONES = {
  brand: "bg-brand text-white",
  gold: "bg-gold text-void",
  new: "bg-mint text-void",
};

function Badge({ tone = "brand", children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
