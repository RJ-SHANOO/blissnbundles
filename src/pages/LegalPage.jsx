import { legalPages } from "../data/legalPages";
import ComingSoon from "./ComingSoon";

function LegalPage({ slug }) {
  const page = legalPages[slug];
  if (!page) return <ComingSoon label="This page" />;

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {page.eyebrow}
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: {page.updated}</p>

        <div className="mt-10 flex flex-col gap-8">
          {page.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-semibold text-ink">
                {section.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LegalPage;
