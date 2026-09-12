import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "../ui/SocialIcons";
import logo from "../../assets/logo/bliss-and-bundles-logo.jpg";

const SHOP_LINKS = [
  { label: "Mugs", to: "/shop/mugs" },
  { label: "Tumblers", to: "/shop/tumblers" },
  { label: "Wallets", to: "/shop/wallets" },
  { label: "Bottles", to: "/shop/bottles" },
  { label: "Best Sellers", to: "/shop?filter=best-sellers" },
];

const COMPANY_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Track Order", to: "/track-order" },
  { label: "FAQs", to: "/faqs" },
];

const LEGAL_LINKS = [
  { label: "Shipping Policy", to: "/shipping-policy" },
  { label: "Return Policy", to: "/return-policy" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surfaceAlt text-muted">
      <div className="container-bb grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-2">
          <img
            src={logo}
            alt="Bliss & Bundles — Personalized Gifts"
            className="w-24 rounded-full shadow-softLg"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Personalized gifts made for the moments that matter — mugs, tumblers,
            wallets, and bottles, crafted uniquely for you and delivered across
            Pakistan.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: InstagramIcon, label: "Instagram" },
              { Icon: FacebookIcon, label: "Facebook" },
              { Icon: TikTokIcon, label: "TikTok" },
              { Icon: WhatsAppIcon, label: "WhatsApp" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-brand hover:text-white"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Shop" links={SHOP_LINKS} />
        <FooterColumn title="Company" links={COMPANY_LINKS} />
        <FooterColumn title="Support" links={LEGAL_LINKS} />
      </div>

      <div className="border-t border-ink/10">
        <div className="container-bb flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} B&amp;B (Bliss &amp; Bundles). All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone size={13} /> +92 300 1234567
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} /> hello@blissandbundles.pk
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> Lahore, Pakistan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-ink">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-ink/60 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
