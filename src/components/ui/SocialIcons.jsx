// lucide-react no longer ships trademarked brand marks, so these are small
// local outline icons kept visually consistent with the lucide icon set.
function iconProps(size) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
}

export function InstagramIcon({ size = 17 }) {
  return (
    <svg {...iconProps(size)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 17 }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M14 9h2.5V6H14c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.28.22-.5.5-.5H14z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 17 }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M4 20l1.3-3.8A7.5 7.5 0 1 1 9 18.5L4 20z" />
      <path d="M9 10c0 3 2 5 5 5" />
    </svg>
  );
}

export function TikTokIcon({ size = 17 }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M15 4v9.5a3.5 3.5 0 1 1-3-3.46" />
      <path d="M15 4c0 2.5 1.8 4.2 4 4.4" />
    </svg>
  );
}
