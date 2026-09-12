import { Link } from "react-router-dom";

const VARIANTS = {
  primary:
    "bg-brand text-white hover:bg-brand-light shadow-soft hover:shadow-softLg",
  outline:
    "border-2 border-ink/25 text-ink bg-transparent hover:border-brand hover:text-brand hover:bg-surface",
  ghost: "text-ink hover:text-brand bg-transparent",
  light:
    "bg-surface text-ink hover:bg-surfaceAlt shadow-soft hover:shadow-softLg",
};

const SIZES = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
