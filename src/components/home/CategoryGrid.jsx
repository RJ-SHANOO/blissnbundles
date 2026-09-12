import { useData } from "../../context/useData";
import SectionHeading from "../ui/SectionHeading";
import CategoryCard from "./CategoryCard";

function CategoryGrid() {
  const { categories } = useData();

  return (
    <section className="bg-base py-16 md:py-24">
      <div className="container-bb">
        <SectionHeading
          eyebrow="Shop by Category"
          title="Find the perfect canvas for your story"
          subtitle="Four ways to turn a memory into something they'll actually use, every day."
        />

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-4">
          {categories.map((category, i) => (
            <div key={category.id} className="w-[68vw] shrink-0 sm:w-auto">
              <CategoryCard category={category} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
